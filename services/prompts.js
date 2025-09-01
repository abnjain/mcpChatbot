import z from "zod"
import { PROMPTS } from "../constant/prompts.js"
import { customerSupport } from "./ae.prompt.js";

export function registerPrompts (server) {
    server.prompt(
        PROMPTS.SEARCH_CATALOG,
        PROMPTS.SEARCH_CATALOG_DESCRIPTION,
        {
            type: "object",
            properties: {
                query: { type: "string", description: "Search term (e.g., 't-shirt')" },
                context: { type: "string", description: "Context for the search", maxLength: 200 },
                storefrontUrl: { type: "string", description: "Shopify Storefront URL", format: "uri" }
            },
            required: ["query", "storefrontUrl"]
        }
    )

    server.prompt(
        PROMPTS.CART_DETAILS,
        PROMPTS.CART_DETAILS_DESCRIPTION,
        {
            type: "object",
            properties: {
                storefrontUrl: { type: "string", description: "Shopify Storefront URL", format: "uri" },
                cartId: { type: "string", description: "Cart ID", format: "uuid" }
            },
            required: ["storefrontUrl", "cartId"]
        }
    )

    server.prompt(
        PROMPTS.CUSTOMER_SUPPORT,
        PROMPTS.CUSTOMER_SUPPORT_DESCRIPTION,
        customerSupport
    )
}