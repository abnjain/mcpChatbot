import mongoose from "mongoose";
import { ConverseCommand, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { startConversation, storeChatData } from "../../services/store.data.js";
import { customerMcpSessionManage, merchantMcpSessionManager } from "../../index.js";
import { sseManager } from "../../utils/sseManager.js";
import { awsBedrockClient } from "../../index.js";
import { parseArgs } from "../Ollama/utils.js";
import { asUserText, toBedrockTools, stripThinking } from "./utils.js";
import { AIChatHistory } from '../../models/model.js';
import { log } from "console";

const { Types } = mongoose;

const TOOLS_NEED_SUMMARY = new Set(["insights_ae", "storefront_database_ae"]);


function compactJSONStringify(obj) {
    try {
        return JSON.stringify(obj);
    } catch (_) {
        return String(obj).slice(0, 4000);
    }
}

// Build one concise, cached system prompt. Keep it short to reduce cache size.
function buildSystemPrompt(config) {
    const minimal = {
        shopDomain: config?.storefrontUrl,
        storefrontUrl: config?.storefrontUrl,
        customerId: config?.customerId,
        orderId: config?.orderId,
        customerEmail: config?.customerEmail,
        customerName: config?.customerName,
        cart_id: config?.cart_id,
    };


    return [

        // "Do not include <thinking></thinking> in response ",
        `
        Role and Behavior:
        You are an Account Editor AI Agent. Your responses and actions should align with the behavior of an Account Editor AI agent.
        You can do following things:
        - Cart Item add update delete and view
        - Order manage 
        - Order update before fullfilment in order update you can add new item , change quantity ,change shipping address, remove items , cancel order.
        - Search product 
        - Book and manage support ticket
        - View Store policy
        - See Latest Discount
        - Profile manage
        Do not reference Shopify at any point.

    
        Conversation Protocol:
        Always begin conversations using the customer’s name (e.g., “Hi {{Customer Name}}” or “Hello {{Customer Name}}”).
        Stay strictly within the defined workflows (e.g., catalog, cart, orders, policies, storefront, support tickets).
        If a user’s query is outside of these workflows, ask if they need help with any other relevant category instead.
        Do not guess or randomly invoke tools. Only call tools when necessary to answer the user’s request effectively.
        For unrelated or general queries, respond directly in natural language without invoking a tool.
        If a required parameter for a tool is missing or ambiguous, ask the customer for that parameter before calling the tool.
        Do not return and call tool with undefine or null value.
        Do not show long order id in response its for internal perpose.

        Profile Details: 
        If User ask for profile then you can share customer name and email details but user must be login means we need customer id.

        Tool Invocation Protocol:
            Order Identifiers:
            - If user provides a long numeric string (e.g., 5793462681755), treat it as the order ID.
            - If user provides a short number (e.g., 1045 or #1045), treat it as the order name. 
            - Never assume order name = order ID. 

            User Identifiers:
            - For each every order and profile related tools we need customer id if customer id is blank null or GuestId then ask user to login for identity.
            - Do not call directly login tool ask to user and confirm before calling login tool. if user confirm then call login tool. 
            
            
            Add Product to Order:
            - If the user requests to add a product to an order, check if you have an order ID. If you do not, ask for the order ID. Once you have it, confirm with the user before invoking the "add to order" tool.

            Add Product to Cart:
            - If the user wants to add a product to their cart and you do not have the variant ID, use the search_shop_catalog tool to select the product.

            Place Order or Checkout:
            - If the user requests to place an order or check out their cart, use the get_cart tool to verify cart details.

            Order Status:
            - If the user asks about the status of an order or their last order, use the get_order_details_ae tool. If the order ID is not available, invoke the orders_list_ae tool to retrieve the necessary details.

            security:
            - You have to never show id's like customer id, order id, line item id, cart id, variant id or all kind of id in response. Instead of id's you can show order name or product name or product title variant title .
            - If you never get any values so you can use like your order,your product but do not show these ids in response.
            - If user ask for any id's like order id,cart id,variant id,line item id,customer id you have to politely refuse.
            - Do not tell the user that you are AI model or about your development just say that you are built by Account Editors team at Itgeeks, You are basically an Account Editor AI so behave like that.

            FixedInfo:${compactJSONStringify(minimal)}`,
    ].join("\n");
}

export const bedrockChat = async (req, res) => {
    let isExternal = JSON.parse(req.headers["isexternal"]), isMerchant = JSON.parse(req.headers["ismerchant"]);
    const { clientId, conversationId, message, newConversation, config } = req.body || {};
    const SYSTEM_PROMPT = buildSystemPrompt(config);

    let history = [];
    if (!clientId || !conversationId || typeof message !== "string") {
        return res
            .status(400)
            .json({ ok: false, error: "clientId, conversationId and message required" });
    }

    try {
        const dataToSave = {
            partnerId: new Types.ObjectId(process.env.PARTNER_ID),
            shop: process.env.SHOP_NAME,
        };

        if (!clientId || typeof message !== "string" || !conversationId) {
            return res.status(400).json({ ok: false, error: "clientId, conversationId and message required" });
        }

        if (newConversation) {
            await startConversation(clientId, conversationId, [
                { role: "user", content: [{ text: String(message) }] },
            ]);
            history.push({ role: "user", content: [{ text: String(message) }] });
            await storeChatData(clientId, conversationId, { role: "user", content: [{ text: String(message) }] }, dataToSave);
        } else {
            const existing = await AIChatHistory.findOne({ conversationId, clientId });
            if (!existing) {
                await startConversation(clientId, conversationId, [
                    { role: "user", content: [{ text: String(message) }] }
                ]);

                history.push({ role: "user", content: [{ text: String(message) }] });
            } else {
                history = existing.messages;
                history.push({ role: "user", content: [{ text: String(message) }] });
                // sseManager.send(conversationId, "history", existing.messages);
                await storeChatData(clientId, conversationId, { role: "user", content: [{ text: String(message) }] }, dataToSave);
            }
        }
        let sess;
        if (isMerchant) {
            sess = { ...(await merchantMcpSessionManager.ensureSession(conversationId)) };
        } else {
            sess = { ...(await customerMcpSessionManage.ensureSession(conversationId)) };
        }

        if (!sess.tools) {
            const { mcp } = sess;
            const { tools } = await mcp.listTools();
            sess.tools = tools || [];
        }

        const bedrockTools = toBedrockTools(sess.tools);
        let messages = [{ role: "user", content: asUserText(history) }];

        messages = history

        const first = await awsBedrockClient.send(
            new ConverseStreamCommand({
                modelId: process.env.BEDROCK_MODEL_ID,
                system: [
                    { text: SYSTEM_PROMPT },
                    { cachePoint: { type: "default" } },
                ],

                inferenceConfig: {
                    maxTokens: 768,
                    temperature: 0.5,
                    topP: 0.9,
                },
                messages,
                toolConfig: {
                    tools: bedrockTools,
                    toolChoice: { auto: {} },
                },

            })
        );

        // if (first?.usage) console.log("usage tokens :", first.usage);
        const assistantMsg = { role: "assistant", content: [] };
        // const contentBlocks = assistantMsg?.content ?? [];
        // const toolUses = contentBlocks.filter((b) => b.toolUse).map((b) => b.toolUse);
        // If the model requested tools, execute them and (optionally) do one skinny second call.

        // Track all in-flight blocks by contentBlockIndex
        var pendingTools = new Map(); // index -> { toolUseId, name, inputStr }
        var toolUsesReady = [];       // collected finished tool uses to execute
        let individualHistory = ""


        for await (const ev of first.stream) {

            console.log("####################### ev", ev)
            if (ev.messageStart) {
                assistantMsg.role = ev.messageStart.role;
                individualHistory = "";       // so old deltas don’t leak
                pendingTools.clear?.();       // clear any leftover partial tool blocks
                toolUsesReady = [];
            }
            // ===== 1) ToolUse block starts here =====
            else if (ev.contentBlockStart?.start?.toolUse) {
                const idx = ev.contentBlockStart.contentBlockIndex; // IMPORTANT
                const { toolUseId, name } = ev.contentBlockStart.start.toolUse;
                // Initialize an entry for this tool block
                pendingTools.set(idx, { toolUseId, name, inputStr: "" });
            }
            // ===== 2) Token / ToolUse deltas stream here =====
            else if (ev.contentBlockDelta?.delta) {
                const idx = ev.contentBlockDelta.contentBlockIndex;
                const d = ev.contentBlockDelta.delta;
                console.log("contentBlockDelta", d);
                console.log("contentBlockDelta contentBlockIndex", idx);
                // a) Normal text tokens
                if (d.text && idx == 0) {
                    console.log("Tool calling…5", d.text);
                    const cleanPlain = stripThinking(d.text);
                    individualHistory += cleanPlain

                    if (isExternal) {
                        res.write?.(""); // optional; you seem to sseManager.send elsewhere
                    } else {
                        // console.log("Tool calling…5", cleanPlain);
                        sseManager.send(conversationId, "message", {
                            role: "assistant",
                            text: cleanPlain,
                            content: [{ text: cleanPlain }],
                            conversationId,
                            clientId,
                        });
                    }
                }

                // b) Tool input arrives in chunks as JSON string pieces

                if (d.toolUse?.input !== undefined) {
                    const entry = pendingTools.get(idx);
                    if (entry) {
                        entry.inputStr += d.toolUse.input; // accumulate raw JSON string
                    } else {
                        // (rare) if we didn't see the start, create a placeholder
                        pendingTools.set(idx, {
                            toolUseId: d.toolUse.toolUseId ?? `unknown-${idx}`,
                            name: d.toolUse.name ?? "unknown",
                            inputStr: d.toolUse.input,
                        });
                    }
                }
            }
            // ===== 3) Block stop means this tool's JSON is complete =====
            else if (ev.contentBlockStop) {
                const idx = ev.contentBlockStop.contentBlockIndex;
                const hasThinkingTag = individualHistory.includes('<thinking>');
                if (hasThinkingTag) {
                    individualHistory = individualHistory.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();
                }

                // if (!hasThinkingTag) {
                if (String(individualHistory) != '') {
                    storeChatData(
                        clientId,
                        conversationId,
                        { role: "assistant", content: [{ text: String(individualHistory) }] },
                        dataToSave
                    );
                }
                // }
                const entry = pendingTools.get(idx);
                if (entry) {
                    // Parse tool args safely
                    let args = {};
                    try {
                        args = entry.inputStr ? JSON.parse(entry.inputStr) : {};
                    } catch (e) {
                        // Fallback: try to salvage JSON, or pass raw string
                        console.warn("Failed to parse tool input JSON:", entry.inputStr);
                        args = entry.inputStr;
                    }

                    toolUsesReady.push({
                        toolUseId: entry.toolUseId,
                        name: entry.name,
                        input: args,
                    });
                    pendingTools.delete(idx);
                }
            }
            // ===== 4) Message stop: execute any tools we collected =====
            else if (ev.messageStop) {

                // If tools were requested in this message, run them now
                if (toolUsesReady.length > 0) {
                    // Keep the assistant's toolUse in history
                    //messages.push(assistantMsg);

                    const { mcp } = sess;
                    const toolResultBlocks = [];
                    let needsSecondCall = false;

                    for (const tu of toolUsesReady) {
                        const { name, input, toolUseId } = tu;
                        console.log("Tool calling…", name);

                        if (!isExternal) {
                            console.log("Tool calling…1", name);

                            sseManager.send(conversationId, "message", {
                                role: "assistant",
                                text: `${name}`,
                                content: [{ text: name }],
                                conversationId,
                                toolName: name,
                            });
                        }

                        const result = await mcp.callTool({
                            name,
                            arguments: typeof input === "string" ? parseArgs(input) : input,
                        });

                        storeChatData(
                            clientId,
                            conversationId,
                            {
                                role: "assistant", name, content: [{
                                    "toolUse": {
                                        toolUseId: toolUseId,
                                        name: name,
                                        input: {
                                            ...input,
                                            lastOrderDetails: result?.lastOrderDetails || null, // new field added
                                        },
                                    }
                                },
                                ], tool_call_id: toolUseId
                            },
                            dataToSave
                        );
                        console.log("$$$$$$$$$$$$$$$$$ result of tools in loop lenght", result?.content.length);
                        for (const element of (result?.content || [])) {

                            console.log("$$$$$$$$$$$$$$$$$ result of tools in loop", element.type);

                            const rawText =
                                element?.text ?? compactJSONStringify({ content: [element] } ?? {});

                            // Persist tool call for auditing (associate with tool_use_id)
                            if (element.type == "text") {
                                storeChatData(
                                    clientId,
                                    conversationId,
                                    {
                                        role: "assistant", name, content: [element
                                        ]
                                    },
                                    dataToSave
                                );
                                console.log("Tool calling…2", rawText);
                                sseManager.send(conversationId, "message", {
                                    role: "assistant",
                                    text: rawText,
                                    content: [{ text: rawText }],
                                    conversationId,
                                    clientId,
                                    toolName: name,
                                });
                            }
                            else {

                                if (TOOLS_NEED_SUMMARY.has(name)) {
                                    needsSecondCall = true;
                                    toolResultBlocks.push({
                                        toolResult: {
                                            toolUseId,
                                            content: [{ text: rawText }],
                                            status: "success",
                                        },
                                    });
                                } else {
                                    if (isExternal) {
                                        return res.json({
                                            ok: true,
                                            role: "assistant",
                                            text: rawText,
                                            conversationId,
                                            toolName: name,
                                        });
                                    } else {
                                        // console.log("Tool calling…3", rawText);
                                        sseManager.send(conversationId, "message", {
                                            role: "assistant",
                                            text: rawText,
                                            content: [{ text: rawText }],
                                            conversationId,
                                            clientId,
                                            toolName: name,
                                        });

                                    }
                                }
                            }

                        };



                    }

                    // Optional skinny second call with all toolResults
                    // if (needsSecondCall && toolResultBlocks.length) {
                    //     messages.push({ role: "user", content: toolResultBlocks });

                    //     const second = await awsBedrockClient.send(
                    //         new ConverseCommand({
                    //             modelId: process.env.BEDROCK_MODEL_ID,
                    //             system: [
                    //                 { text: SYSTEM_PROMPT },
                    //                 { cachePoint: { type: "default" } },
                    //             ],
                    //             messages,
                    //             inferenceConfig: {
                    //                 maxTokens: 1024,
                    //                 temperature: 0.5,
                    //                 topP: 0.9,
                    //             },
                    //             toolConfig: {
                    //                 tools: bedrockTools,
                    //                 toolChoice: { auto: {} },
                    //             },
                    //         })
                    //     );

                    //     if (second?.usage) console.log("usage tokens second call :", second.usage);

                    //     const finalBlocks = second.output?.message?.content ?? [];
                    //     const resultText = finalBlocks
                    //         .map((b) => (b.text ? b.text : ""))
                    //         .filter(Boolean)
                    //         .join("\n")
                    //         .trim();

                    //     const cleanFinal = stripThinking(resultText);


                    //     await storeChatData(
                    //         clientId,
                    //         conversationId,
                    //         { role: "assistant", content: [{ text: String(resultText) }] },
                    //         dataToSave
                    //     );

                    //     if (isExternal) {
                    //         return res.send({ role: "model", text: cleanFinal, conversationId });
                    //     } else {
                    //         sseManager.send(conversationId, "message", {
                    //             role: "model",
                    //             text: cleanFinal,
                    //             content: [{ text: cleanFinal }],
                    //             conversationId,
                    //             clientId,
                    //         });
                    //         return res.json({ ok: true, conversationId, clientId });
                    //     }
                    // }


                }
                toolUsesReady.length = 0;
                // If no tools, just end
                return res.json({ ok: true, conversationId, clientId });
            }
            // ===== 4) Message matadata: show token uses =====
            if (ev.metadata) {
                console.log("Token usage:", ev.metadata.usage);
            }

        }



    } catch (err) {
        console.error("bedrockChat error:", err);
        return res.status(500).json({ ok: false, error: "server_error" });
    }
};
