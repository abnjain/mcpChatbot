import { ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

export const toBedrockTools = (mcpTools = []) =>
    (mcpTools || []).map((t) => ({
        toolSpec: {
            name: t.name,
            description: t.description || "",
            inputSchema: {
                json: t.input_schema || t.inputSchema || { type: "object" },
            },
        },
    }));

export const asSystem = (text) => [{ text }];
export const asUserText = (text) => [{ text }, { cachePoint: { type: "default" } }];


/**
 * Lightweight intent classification using nova-micro.
 * Returns boolean: true if this turn likely needs tools.
 */
export async function classifyNeedsTools(awsBedrockClient, text) {
    const SYS_PROMPT = {
        text: `Answer strictly in JSON as {"needsTools": true|false}.
- "true" if the user asks to perform an action on Shopify data 
  (cart, orders, products, shipping, taxes, discount, refund, cancellation).
- "false" for greetings, thanks, general questions, or small talk.`
    };

    const req = {
        modelId: "amazon.nova-micro-v1:0",
        system: [SYS_PROMPT],
        messages: [
            { role: "user", content: [{ text }] }
        ],
        inferenceConfig: { maxTokens: 16, temperature: 0 }
    };

    const resp = await awsBedrockClient.send(new ConverseCommand(req));
    console.log("classifyNeedsTools usage tokens :", first?.usage);

    const txt = resp.output?.message?.content?.[0]?.text ?? "{}";

    try {
        const parsed = JSON.parse(txt);
        return parsed.needsTools === true;
    } catch (e) {
        console.warn("Router parse error, defaulting to false:", txt);
        return false;
    }
}

export function stripThinking(text = "") {
  return text.replace(/<thinking>[\s\S]*?<\/thinking>/gi, "");
}