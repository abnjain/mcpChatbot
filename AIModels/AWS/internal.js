import { ConverseCommand, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { sseManager } from "../../utils/sseManager.js";
import { storeChatData } from "../../services/store.data.js";
import { awsBedrockClient } from "../../index.js";
import { cleanLastDetails, stripThinking } from "./utils.js";
import { compactJSONStringify, TOOLS_NEED_SUMMARY } from "./index.js";
import { cleanObject } from "../../utils/toolsHelper.js";
// import { getIsExternal } from "../../store/requestStore.js";

// export async function internalFnc({ req, res, SYSTEM_PROMPT, messages, bedrockTools, conversationId, clientId, sess, dataToSave }) {
//     try {
//         const first = await awsBedrockClient.send(
//             new ConverseStreamCommand({
//                 modelId: process.env.BEDROCK_MODEL_ID,
//                 system: [
//                     { text: SYSTEM_PROMPT },
//                     { cachePoint: { type: "default" } },
//                 ],

//                 inferenceConfig: {
//                     maxTokens: 4500,
//                     temperature: 0.5,
//                     topP: 0.9,
//                 },
//                 messages,
//                 toolConfig: {
//                     tools: bedrockTools,
//                     toolChoice: { auto: {} },
//                 },

//             })
//         );
// console.log("###STEP 7#### ", "messages");
//         // if (first) console.log("usage tokens :", first);
//         const assistantMsg = { role: "assistant", content: [] };
//         // const contentBlocks = assistantMsg?.content ?? [];
//         // const toolUses = contentBlocks.filter((b) => b.toolUse).map((b) => b.toolUse);
//         // If the model requested tools, execute them and (optionally) do one skinny second call.

//         // Track all in-flight blocks by contentBlockIndex
//         var pendingTools = new Map(); // index -> { toolUseId, name, inputStr }
//         var toolUsesReady = [];       // collected finished tool uses to execute
//         let individualHistory = ""   // create a buffer of streaming data to handle <thinking> tags not save in history

//         for await (const ev of first.stream) {

//             // console.log("####################### ev", ev)
//             if (ev.messageStart) {
//                 assistantMsg.role = ev.messageStart.role;
//                 individualHistory = "";       // so old deltas don’t leak
//                 pendingTools.clear?.();       // clear any leftover partial tool blocks
//                 toolUsesReady = [];
//             }
//             // ===== 1) ToolUse block starts here =====
//             else if (ev.contentBlockStart?.start?.toolUse) {
//                 const idx = ev.contentBlockStart.contentBlockIndex; // IMPORTANT
//                 const { toolUseId, name } = ev.contentBlockStart.start.toolUse;
//                 // Initialize an entry for this tool block
//                 pendingTools.set(idx, { toolUseId, name, inputStr: "" });
//             }
//             // ===== 2) Token / ToolUse deltas stream here =====
//             else if (ev.contentBlockDelta?.delta) {
//                 const idx = ev.contentBlockDelta.contentBlockIndex;
//                 const d = ev.contentBlockDelta.delta;
//                 // console.log("contentBlockDelta", d);
//                 // console.log("contentBlockDelta contentBlockIndex", idx);
//                 // a) Normal text tokens
//                 if (d.text && idx == 0) {
//                     // console.log("Tool calling…5", d.text);
//                     const cleanPlain = stripThinking(d.text);
//                     individualHistory += cleanPlain

//                     // if (isExternal) {
//                     //     res.write?.(""); // optional; you seem to sseManager.send elsewhere
//                     // } else {
//                     // console.log("Tool calling…5", cleanPlain);
//                     sseManager.send(conversationId, "message", {
//                         role: "assistant",
//                         text: cleanPlain,
//                         content: [{ text: cleanPlain }],
//                         conversationId,
//                         clientId,
//                     });
//                     // }
//                 }

//                 // b) Tool input arrives in chunks as JSON string pieces

//                 if (d.toolUse?.input !== undefined) {
//                     const entry = pendingTools.get(idx);
//                     if (entry) {
//                         entry.inputStr += d.toolUse.input; // accumulate raw JSON string
//                     } else {
//                         // (rare) if we didn't see the start, create a placeholder
//                         pendingTools.set(idx, {
//                             toolUseId: d.toolUse.toolUseId ?? `unknown-${idx}`,
//                             name: d.toolUse.name ?? "unknown",
//                             inputStr: d.toolUse.input,
//                         });
//                     }
//                 }
//             }
//             // ===== 3) Block stop means this tool's JSON is complete =====
//             else if (ev.contentBlockStop) {
//                 const idx = ev.contentBlockStop.contentBlockIndex;
//                 const hasThinkingTag = individualHistory.includes('<thinking>');
//                 if (hasThinkingTag) {
//                     individualHistory = individualHistory.replace(/<thinking>[\s\S]*?<\/thinking>/g, '').trim();
//                 }

//                 // if (!hasThinkingTag) {
//                 if (String(individualHistory) != '') {
//                     storeChatData(
//                         clientId,
//                         conversationId,
//                         { role: "assistant", content: [{ text: String(individualHistory) }] },
//                         dataToSave
//                     );
//                 }
//                 // }
//                 const entry = pendingTools.get(idx);
//                 if (entry) {
//                     // Parse tool args safely
//                     let args = {};
//                     try {
//                         args = entry.inputStr ? JSON.parse(entry.inputStr) : {};
//                     } catch (e) {
//                         // Fallback: try to salvage JSON, or pass raw string
//                         console.warn("Failed to parse tool input JSON:", entry.inputStr);
//                         args = entry.inputStr;
//                     }

//                     toolUsesReady.push({
//                         toolUseId: entry.toolUseId,
//                         name: entry.name,
//                         input: args,
//                     });
//                     pendingTools.delete(idx);
//                 }
//             }
//             // ===== 4) Message stop: execute any tools we collected =====
//             else if (ev.messageStop) {

//                 // If tools were requested in this message, run them now
//                 if (toolUsesReady.length > 0) {
//                     // Keep the assistant's toolUse in history
//                     //messages.push(assistantMsg);

//                     const { mcp } = sess;
//                     const toolResultBlocks = [];
//                     let needsSecondCall = false;

//                     for (const tu of toolUsesReady) {
//                         const { name, input, toolUseId } = tu;
//                         console.log("Tool calling…", name);

//                         // if (!isExternal) {
//                         console.log("Tool calling…1", name);

//                         sseManager.send(conversationId, "message", {
//                             role: "assistant",
//                             text: `${name}`,
//                             content: [{ text: name }],
//                             conversationId,
//                             toolName: name,
//                         });
//                         // }

//                         const result = await mcp.callTool({
//                             name,
//                             arguments: typeof input === "string" ? parseArgs(input) : input,
//                         });

//                         storeChatData(
//                             clientId,
//                             conversationId,
//                             {
//                                 role: "assistant", name, content: [{
//                                     "toolUse": {
//                                         toolUseId: toolUseId,
//                                         name: name,
//                                         input: {
//                                             ...input,
//                                             lastDetails: {
//                                                 lastOrderDetails: result?.lastOrderDetails ? result.lastOrderDetails : null, // new field added
//                                                 cartDetails: result?.cartDetails ? result.cartDetails : null, // new field added
//                                             },
//                                         },
//                                     }
//                                 }], tool_call_id: toolUseId
//                             },
//                             dataToSave
//                         );
//                         // console.log("$$$$$$$$$$$$$$$$$ result of tools in loop lenght", result?.content.length);
//                         for (const element of (result?.content || [])) {

//                             // console.log("$$$$$$$$$$$$$$$$$ result of tools in loop", element.type);

//                             const rawText =
//                                 element?.text ?? compactJSONStringify({ content: [element] } ?? {});

//                             // Persist tool call for auditing (associate with tool_use_id)
//                             if (element.type == "text") {
//                                 storeChatData(
//                                     clientId,
//                                     conversationId,
//                                     {
//                                         role: "assistant", name, content: [element
//                                         ]
//                                     },
//                                     dataToSave
//                                 );
//                                 console.log("Tool calling…2", rawText);
//                                 sseManager.send(conversationId, "message", {
//                                     role: "assistant",
//                                     text: rawText,
//                                     content: [{ text: rawText }],
//                                     conversationId,
//                                     clientId,
//                                     toolName: name,
//                                 });
//                             }
//                             else {

//                                 if (TOOLS_NEED_SUMMARY.has(name)) {
//                                     needsSecondCall = true;
//                                     toolResultBlocks.push({
//                                         toolResult: {
//                                             toolUseId,
//                                             content: [{ text: rawText }],
//                                             status: "success",
//                                         },
//                                     });
//                                 } else {
//                                     // if (isExternal) {
//                                     //     return res.json({
//                                     //         ok: true,
//                                     //         role: "assistant",
//                                     //         text: rawText,
//                                     //         conversationId,
//                                     //         toolName: name,
//                                     //     });
//                                     // } else {
//                                     // console.log("Tool calling…3", rawText);
//                                     sseManager.send(conversationId, "message", {
//                                         role: "assistant",
//                                         text: rawText,
//                                         content: [{ text: rawText }],
//                                         conversationId,
//                                         clientId,
//                                         toolName: name,
//                                     });

//                                     // }
//                                 }
//                             }

//                         };



//                     }

//                     // Optional skinny second call with all toolResults
//                     // if (needsSecondCall && toolResultBlocks.length) {
//                     //     messages.push({ role: "user", content: toolResultBlocks });

//                     //     const second = await awsBedrockClient.send(
//                     //         new ConverseCommand({
//                     //             modelId: process.env.BEDROCK_MODEL_ID,
//                     //             system: [
//                     //                 { text: SYSTEM_PROMPT },
//                     //                 { cachePoint: { type: "default" } },
//                     //             ],
//                     //             messages,
//                     //             inferenceConfig: {
//                     //                 maxTokens: 1024,
//                     //                 temperature: 0.5,
//                     //                 topP: 0.9,
//                     //             },
//                     //             toolConfig: {
//                     //                 tools: bedrockTools,
//                     //                 toolChoice: { auto: {} },
//                     //             },
//                     //         })
//                     //     );

//                     //     if (second?.usage) console.log("usage tokens second call :", second.usage);

//                     //     const finalBlocks = second.output?.message?.content ?? [];
//                     //     const resultText = finalBlocks
//                     //         .map((b) => (b.text ? b.text : ""))
//                     //         .filter(Boolean)
//                     //         .join("\n")
//                     //         .trim();

//                     //     const cleanFinal = stripThinking(resultText);


//                     //     await storeChatData(
//                     //         clientId,
//                     //         conversationId,
//                     //         { role: "assistant", content: [{ text: String(resultText) }] },
//                     //         dataToSave
//                     //     );

//                     //     if (isExternal) {
//                     //         return res.send({ role: "model", text: cleanFinal, conversationId });
//                     //     } else {
//                     //         sseManager.send(conversationId, "message", {
//                     //             role: "model",
//                     //             text: cleanFinal,
//                     //             content: [{ text: cleanFinal }],
//                     //             conversationId,
//                     //             clientId,
//                     //         });
//                     //         return res.json({ ok: true, conversationId, clientId });
//                     //     }
//                     // }


//                 }
//                 toolUsesReady.length = 0;
//                 // If no tools, just end
//                 return res.status(200).json({ ok: true, conversationId, clientId });
//             }
//             // ===== 4) Message matadata: show token uses =====
//             if (ev.metadata) {
//                 console.log("Token usage:", ev.metadata.usage);
//             }

//         }
//     } catch (error) {
//         console.log("Bedrock Internal Function Error: ", error);
//         return res.status(500).json({ ok: false, clientId, conversationId, error: error.message })
//     }
// }


export async function internalFnc({ req, res, SYSTEM_PROMPT, messages, bedrockTools, conversationId, clientId, sess, dataToSave }) {
    try {
        // console.log("start --------------------------------- ", JSON.stringify(messages, null, 2), SYSTEM_PROMPT, JSON.stringify(bedrockTools, null, 2) )
        messages = cleanObject(messages)
        messages = cleanLastDetails(messages)
        // const isExternal = getIsExternal();
        console.time("bedrock");
        // console.log("start ---------------------->", JSON.stringify(messages, null, 2));

        const first = await awsBedrockClient.send(
            new ConverseCommand({
                modelId: process.env.BEDROCK_MODEL_ID,
                system: [
                    { text: SYSTEM_PROMPT },
                    { cachePoint: { type: "default" } },
                ],
                inferenceConfig: {
                    maxTokens: 4000,
                    temperature: 0.3,
                    topP: 0.9,
                },
                messages,
                toolConfig: {
                    tools: bedrockTools,
                    toolChoice: { auto: {} },
                },
            })
        );
        console.timeEnd("bedrock");

        // if (first?.usage) console.log("usage tokens :", first.usage);

        const assistantMsg = first.output?.message;
        const contentBlocks = assistantMsg?.content ?? [];
        const toolUses = contentBlocks.filter((b) => b.toolUse).map((b) => b.toolUse);

        // If the model requested tools, execute them and (optionally) do one skinny second call.
        if (toolUses.length > 0) {

            const { mcp } = sess;

            // Keep the assistant toolUse message in history
            messages.push(assistantMsg);


            for (const tu of toolUses) {
                const name = tu.name;
                const args = tu.input ?? {};
                console.log("Tool calling…", name);

                sseManager.send(conversationId, "message", {
                    role: "assistant",
                    text: `${name}`,
                    conversationId,
                    toolName: name,
                });

                args.selectedMethod = args.selectedMethod ? args.selectedMethod : null
                args.config = req.body.config ?? null;

                const result = await mcp.callTool({
                    name,
                    arguments: typeof args === "string" ? parseArgs(args) : args,
                });
                // console.log(JSON.stringify(result.content.map(t => t)));

                const textBlock = result?.content?.find(block => block.type === 'text');
                const resourceBlock = result?.content?.find(b => b.type === 'resource' && b.resource?.mimeType === 'text/html');

                const rawText = textBlock?.text ?? compactJSONStringify(result ?? {});
                let resource = resourceBlock?.text ?? compactJSONStringify(resourceBlock ?? {});
                resource = compactJSONStringify({ content: [{ ...resourceBlock }] })
                // console.log(result.content, "jfdlkasdjflkjdsfldsa--------------------------------");

                // Get previous stored details if any
                // Find the last assistant message that actually has lastDetails
                const previousToolMessage = [...messages].reverse().find(msg =>
                    msg.role === "assistant" &&
                    msg.content?.some(c => c.toolUse?.input?.lastDetails)
                );

                const previousLastCartDetails = previousToolMessage?.content?.[0]?.toolUse?.input?.lastDetails?.lastCartDetails;
                const previousLastOrderDetails = previousToolMessage?.content?.[0]?.toolUse?.input?.lastDetails?.lastOrderDetails;

                // Only update if new data exists
                const lastCartDetailsToStore = result?.lastCartDetails ?? previousLastCartDetails;
                const lastOrderDetailsToStore = result?.lastOrderDetails ?? previousLastOrderDetails;

                // Remove `config` inside `tu.input` before saving to the DB
                if (tu.input) {
                    delete tu.input.config; // This deletes the config property inside tu.input
                }
                // Persist raw tool result for auditing
                await storeChatData(
                    clientId,
                    conversationId,
                    {
                        role: "assistant", name, content: [{
                            "toolUse": tu
                        }], tool_call_id: tu.toolUseId,
                        lastDetails: {
                            lastOrderDetails: lastOrderDetailsToStore,
                            lastCartDetails: lastCartDetailsToStore,
                        },
                    },
                    dataToSave
                );

                sseManager.send(conversationId, "message", {
                    role: "assistant",
                    text: rawText,
                    conversationId,
                    clientId,
                    toolName: name,
                });
                // rawText = resource ? JSON.parse(rawText) : rawText

                // console.log("Text ------------------------------------------------------------ fadsfs", compactJSONStringify({content:(rawText.content)}), resource, compactJSONStringify(rawText.content) === compactJSONStringify(resource))

                if (resourceBlock?.resource?.mimeType === 'text/html' && rawText !== resource) {
                    sseManager.send(conversationId, "message", {
                        role: "assistant",
                        text: resource,
                        conversationId,
                        clientId,
                        toolName: name,
                    });
                }
                break;
            }

            return res.json({ ok: true, conversationId, clientId })
        } else {
            const plain = (contentBlocks
                .map((b) => (b.text ? b.text : ""))
                .filter(Boolean)
                .join("\n")
                .trim()) || "";

            const cleanPlain = stripThinking(plain);

            await storeChatData(clientId, conversationId, { role: "assistant", content: [{ text: String(cleanPlain) }] }, dataToSave);

            sseManager.send(conversationId, "message", {
                role: "assistant",
                text: cleanPlain,
                conversationId,
                clientId,
            });
            return res.json({ ok: true, conversationId, clientId })
        }
    } catch (error) {
        console.log("Internal Bedrock Function Error: ", error);
        return res.status(500).json({ ok: false, clientId, conversationId, error: error.message })
    }
}