import { ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { storeChatData } from "../../services/store.data.js";
import { awsBedrockClient } from "../../index.js";
import { compactJSONStringify } from "./index.js";
import { cleanLastDetails, stripThinking } from "./utils.js";
import { sseManager } from "../../utils/sseManager.js";
import { cleanObject } from "../../utils/toolsHelper.js";

export async function externalFnc({ req, res, SYSTEM_PROMPT, messages, bedrockTools, conversationId, clientId, sess, dataToSave }) {
    try {
        // console.log("start --------------------------------- ", JSON.stringify(messages, null, 2), SYSTEM_PROMPT, JSON.stringify(bedrockTools, null, 2) )
        messages = cleanObject(messages)
        messages = cleanLastDetails(messages)
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

        const assistantMsg = first.output?.message;
        const contentBlocks = Array.isArray(assistantMsg?.content) ? assistantMsg.content : [];
        const toolUses = contentBlocks.filter(b => b.toolUse).map(b => b.toolUse);

        // If tools were requested
        if (toolUses.length > 0) {
            const { mcp } = sess;

            // Keep the assistant's tool request in history with correct content shape
            messages.push({
                role: "assistant",
                content: toolUses.map(tu => ({ text: `[Tool request: ${tu.name}]` })),
            });

            const results = [];

            for (const tu of toolUses) {
                let { name, input, toolUseId } = tu;

                console.log("Tool calling…", name);
                //
                // Call the tool
                input.selectedMethod = input.selectedMethod ? input.selectedMethod : null
                // console.log("inputs ----------------------------------------- ", JSON.stringify(input));

                const result = await mcp.callTool({
                    name,
                    arguments: typeof input === "string" ? parseArgs(input) : input,
                });

                // Get the raw text or fallback to JSON string
                const rawData = result?.rawData ? result?.rawData : null
                const rawText = result?.rawText ? result?.rawText : null

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

                await storeChatData(
                    clientId,
                    conversationId,
                    {
                        role: "assistant", name, content: [{
                            "toolUse": {
                                toolUseId: toolUseId,
                                name: name,
                                input: {
                                    ...input,
                                },
                            }
                        }], tool_call_id: toolUseId,
                        lastDetails: {
                            lastOrderDetails: lastOrderDetailsToStore, // new field added
                            lastCartDetails: lastCartDetailsToStore, // new field added
                        },
                    },
                    dataToSave
                );

                results.push({ toolName: name, rawData, rawText });
                break;
            }

            // Return the last tool result or all results if you want
            let lastResult = results.length <= 0 ? results[0] : results[results.length - 1];
            lastResult = {
                ...lastResult,
                text: lastResult?.text ? lastResult.text : lastResult?.rawText ? lastResult.rawText : null
            }
            sseManager.send(conversationId, "message", { role: "assistant", text: lastResult.text, content: [{ text: lastResult.text }], conversationId, clientId, toolName: lastResult.toolName })
            return res.json({ ok: true, conversationId, clientId, text: lastResult.text, toolName: lastResult.toolName, rawData: lastResult.rawData, rawText: lastResult.rawText });
            // const lastResult = results[results.length - 1];
            // return res.json({ ok: true, conversationId, clientId, text: lastResult.text, toolName: lastResult.toolName, rawData: lastResult.rawData, rawText: lastResult.rawText });

        } else {
            // Plain assistant message if no tools
            const plain = contentBlocks
                .map(b => (b.text ? b.text : ""))
                .filter(Boolean)
                .join("\n")
                .trim();

            const cleanPlain = stripThinking(plain);

            await storeChatData(clientId, conversationId, { role: "assistant", content: [{ text: cleanPlain }] }, dataToSave);

            sseManager.send(conversationId, "message", { role: "assistant", text: cleanPlain, content: [{ text: cleanPlain }], conversationId, clientId })

            return res.status(200).json({ ok: true, conversationId, clientId, rawText: cleanPlain, toolName: null, rawData: null });
        }
    } catch (error) {
        console.log("External Bedrock Function Error: ", error);
        return res.status(500).json({ ok: false, clientId, conversationId, error: error.message })
    }
}