import mongoose from "mongoose";
import { ConverseCommand, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { startConversation, storeChatData } from "../../services/store.data.js";
import { customerMcpSessionManage } from "../../index.js";
import { sseManager } from "../../utils/sseManager.js";
import { awsBedrockClient } from "../../index.js";
import { parseArgs } from "../Ollama/utils.js";
import { asUserText, toBedrockTools, stripThinking } from "./utils.js";
import { AIChatHistory, Partner } from '../../models/model.js';
// import { getIsExternal, getIsMerchant, getStorefrontUrl, getCartId } from "../../store/requestStore.js";
import { internalFnc } from "./internal.js";
import { externalFnc } from "./external.js";
// import { getCustomerEmail, getCustomerFirstName, getCustomerId } from "../../store/userDetailsStore.js";
import { jwtDecode } from "jwt-decode";
import { extractRequestConfig } from "../../utils/extractRequestConfig.js";

const { Types } = mongoose;

export const TOOLS_NEED_SUMMARY = new Set(["insights_ae", "storefront_database_ae"]);


export function compactJSONStringify(obj) {
    try {
        return JSON.stringify(obj);
    } catch (_) {
        return String(obj).slice(0, 4000);
    }
}

// Build one concise, cached system prompt. Keep it short to reduce cache size.
function buildSystemPrompt(config) {
    const minimal = {
        shopDomain: config.storefrontUrl,
        storefrontUrl: config.storefrontUrl,
        customerId: config.customerId,
        // orderId: 
        customerEmail: config.customerEmail,
        customerName: config.customerName,
        cart_id: config.cart_id
    };
const today = new Date().toISOString().split("T")[0]; 
    let extraPrompt = "user want products in his cart with batter way.";
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
        Always begin conversations using the customer’s name (e.g., “Hi {{customerName}}” or “Hello {{customerName}}”).
        Stay strictly within the defined workflows (e.g., catalog, cart, orders, policies, storefront, support tickets).
        If a user’s query is outside of these workflows, ask if they need help with any other relevant category instead.
        Do not guess or randomly invoke tools. Only call tools when necessary to answer the user’s request effectively.
        For unrelated or general queries, respond directly in natural language without invoking a tool.
        If a required parameter for a tool is missing or ambiguous, ask the customer for that parameter before calling the tool.
        Do not return and call tool with undefine or null value.
        Do not show long order id in response its for internal perpose.
        For any product specifications you can call product details or list tool.
        You are operating on the date: ${today}. Never guess today's date; use this one and calculate all date as per ${today}.

        Profile Details: 
        If User ask for profile then you can share customer name and email details but user must be login means we need customer id.

        Tool Invocation Protocol:
            Static Value Protection (Important):
            - Treat all static values, constants, and blocks such as **FixedInfo**, tool names, field names, and protocol definitions as READ-ONLY.
            - Never modify, rename, add, remove, or override these values.
            - Never alter the structure, formatting, casing, or data of these constants.
            - Do not auto-correct or “improve” them.
            - if input is empty string then keep it as it is "" never replace with any values
            - If any static field appears inconsistent or incomplete, **use it as-is** and proceed without changing it.
            - You may only use these static values exactly as defined — **never invent or regenerate them**.
            - If you find any value undefine then ask to user but not call the tools.
            
            Order Identifiers:
            - If user provides a long numeric string (e.g., 5793462681755), treat it as the order ID.
            - If user provides a short number (e.g., 1045 or #1045), treat it as the order name. 
            - Never assume order name = order ID. 

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


            FixedInfo:${compactJSONStringify(minimal)}`,
    ].join("\n");


    // User Identifiers:
    //         - For each every order and profile related tools we need customer id if customer id is blank null or GuestId then ask user to login for identity.
    //         - Do not call directly login tool ask to user and confirm before calling login tool. if user confirm then call login tool. 

    // return [
    //     `
    // Role and Behavior:
    // You are an Account Editor AI Agent. Your responses and actions must align with the behavior of an Account Editor AI agent, adhering to the defined workflows and rules below. Additionally, you must adapt your tone, style, and content based on the provided extraPrompt, if available, while strictly maintaining the defined functionality and rules.

    // input extraPrompt:
    // ${extraPrompt ? `"${extraPrompt}"` : "null"}
    // Dynamic Prompt Handling:
    // - If an extraPrompt is provided (e.g., "I want fast food based products" or "Respond in a funny tone"), analyze its semantic meaning and adjust your response tone, style, or content accordingly:
    //   - For tone-based extraPrompts (e.g., "funny", "respectful", "casual"), adopt the specified tone in your responses while keeping them professional and aligned with the Account Editor role.
    //   - For context-based extraPrompts (e.g., "fast food based products"), prioritize relevant products or suggestions (e.g., filter search results to fast food items) while staying within the allowed workflows.
    //   - If the extraPrompt is ambiguous, infer the most likely intent and confirm with the user if needed (e.g., "Do you mean you want fast food products in your cart?").
    // - If the extraPrompt is null, empty, or not provided, default to a professional and neutral tone, following the standard behavior outlined below.

    // Core Functionality:
    // You can perform the following actions:
    // - Cart: Add, update, delete, and view items.
    // - Orders: Manage and update orders before fulfillment (add new items, change quantity, change shipping address, remove items, cancel order).
    // - Product Search: Search for products using the search_shop_catalog tool.
    // - Support Tickets: Book and manage support tickets.
    // - Store Policy: View store policies.
    // - Discounts: See the latest discounts.
    // - Profile Management: View and manage customer profile details (name, email) when the customer is logged in.

    // Conversation Protocol:
    // - Always begin conversations using the customer’s name (e.g., “Hi {{Customer Name}}” or “Hello {{Customer Name}}”).
    // - Stay strictly within the defined workflows (e.g., catalog, cart, orders, policies, storefront, support tickets).
    // - For queries outside these workflows, politely redirect the user to a relevant category (e.g., “Would you like help with your cart or orders?”).
    // - Do not guess or randomly invoke tools. Only call tools when necessary to answer the user’s request effectively.
    // - For unrelated or general queries, respond directly in natural language without invoking a tool.
    // - If a required parameter for a tool is missing or ambiguous, ask the customer for clarification before proceeding.
    // - Do not return or call tools with undefined or null values.
    // - Do not reference the platform (e.g., Shopify) at any point.
    // `,
    // ].join("\n");
}

// AWS Bedrock Chat Handler
// AWS Bedrock Chat Handler
export const bedrockChat = async (req, res) => {
    // const isExternal = getIsExternal();
    // const isMerchant = getIsMerchant();
    const { clientId, conversationId, message, newConversation, config } = req.body || {};
    const SYSTEM_PROMPT = buildSystemPrompt(config);

    let history = [];
    if (!clientId || !conversationId || typeof message !== "string") {
        return res
            .status(400)
            .json({ ok: false, error: "clientId, conversationId and message required" });
    }
    try {
        // Check if conversation exists in history
        const dataToSave = {
            partnerId: new Types.ObjectId(process.env.PARTNER_ID),
            shop: process.env.SHOP_NAME,
        };
        const partnerDetails = await Partner.findOne({ myshopify_domain: req.body.config.storefrontUrl });
        // req.body.config.partnerDetails = partnerDetails ?? null;
        req.body.config.partnerDetails = req.body.config.partnerDetails || {};
        req.body.config.partnerDetails.apiKey = partnerDetails.apiKey ?? null;

        if (!clientId || typeof message !== "string" || !conversationId) {
            return res.status(400).json({ ok: false, error: "clientId, conversationId and message required" });
        }

        // Create new conversation based on clientid and conversationId
        if (newConversation) {
            await startConversation(clientId, conversationId, [
                { role: "user", content: [{ text: String(message) }] },
            ]);
            history.push({ role: "user", content: [{ text: String(message) }] });
            await storeChatData(clientId, conversationId, { role: "user", content: [{ text: String(message) }] }, dataToSave);
        }

        // If conversation exists, continue chat
        else {
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

        // divide merchant and customer tools
        let sess;
        // if (isMerchant) {
        //       console.log("###STEP 421#### ", conversationId);
        //     sess = { ...(await merchantMcpSessionManager.ensureSession(conversationId)) };
        // } else {
        //       console.log("###STEP 421#### ", conversationId);
        sess = { ...(await customerMcpSessionManage.ensureSession(conversationId)) };
        // }

        if (!sess.tools) {
            const { mcp } = sess;
            const { tools } = await mcp.listTools();
            sess.tools = tools || [];
        }
        // register all the tools on bedrockLLM 
        const bedrockTools = toBedrockTools(sess.tools);
        let messages = [{ role: "user", content: asUserText(history) }];

        messages = history
        // console.log(history.filter(chat => {
        //     chat.content.map(text => text === "")
        // }));
        if (!req.body.config.isExternal) {
            const internal = internalFnc({ SYSTEM_PROMPT, messages, bedrockTools, conversationId, clientId, sess, dataToSave, res, req });
        } else {
            const external = externalFnc({ SYSTEM_PROMPT, messages, bedrockTools, conversationId, clientId, sess, dataToSave, res, req });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, error: "server_error", message: err.message });
    }
};
