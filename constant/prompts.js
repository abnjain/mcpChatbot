
export const PROMPTS = {
    CUSTOMER_SUPPORT: "customer_support_ae",
    CUSTOMER_SUPPORT_DESCRIPTION: "Find out if any bogus words or the words like 'help', 'support', or 'issue' are present in the user's query. If such words are found, the customer is required to talk to a support agent via reading the prompts or query in the chat. If required, redirect to customer support socket. Return the message with 'Special Message - f32efe3b' tag.",

    CART_DETAILS: "cart_details_ae",
    CART_DETAILS_DESCRIPTION: "Retrieve the details of a specific cart using the cart ID and storefront URL.",

    SEARCH_CATALOG: "search_catalog_ae",
    SEARCH_CATALOG_DESCRIPTION: "Find products in the shop via Shopify Storefront catalog based on the user's query, context and storefront URL."
}
