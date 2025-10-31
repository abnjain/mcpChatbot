export const TOOLS = {
    // 🔑 Global Guideline for Tool Use
    // Use only the most relevant tool for a user query.
    // If the query clearly requires multiple actions (e.g., "add a product and then apply discount"),
    // then call multiple tools in sequence. Avoid unnecessary tool calls.

    SEARCH_SHOP_CATALOG: "search_shop_catalog_cart",
    SEARCH_SHOP_CATALOG_DESCRIPTION: "Search and fetch product listings from the Shopify storefront. Returns product titles, descriptions, prices, and availability.",

    SEARCH_SHOP_CATALOG_ORDER: "search_shop_catalog_order",
    SEARCH_SHOP_CATALOG_DESCRIPTION_ORDER: "Search, fetch and add a specific product from the Shopify storefront by its ID. Returns product details including title, description, price, and availability or add in order.",


    SHOP_POLICIES: "search_shop_policies_and_faqs",
    SHOP_POLICIES_DESCRIPTION: "Access shop policies and FAQs stored in the Shopify MCP server. Includes details on returns, refunds, shipping, payments, warranties, and customer support.",

    GET_CART: "get_cart",
    GET_CART_DESCRIPTION: "When user want to see current cart details. only for get cart details. If cart Id is given else call add cart tool",

    UPDATE_CART: "update_cart",
    UPDATE_CART_DESCRIPTION: "Modify the Shopify cart by adding, updating, or removing items, applying/removing discounts, and recalculating totals.",

    ADD_CART_ITEM_AE: "add_cart_item_ae",
    ADD_CART_ITEM_AE_DESCRIPTION: `Add Product in the cart if the cart_id is not present or empty string("") or null in the user's Shopify cart. User Can add items and recalculate totals (taxes & shipping).`,

    UPDATE_CART_ITEM_AE: "update_cart_item_ae",
    UPDATE_CART_ITEM_AE_DESCRIPTION: "UPDATE Product in the cart present in the user's Shopify cart. Update cart when cart_id is present else call add cart tool. User Can add, update items and recalculate totals (taxes & shipping).",

    ADD_NUMBERS: "addTwoNumbers",
    ADD_NUMBERS_DESCRIPTION: "Utility function to add two numbers. For testing/demo purposes only.",

    ORDER_DETAILS: "get_order_details_ae",
    ORDER_DETAILS_DESCRIPTION: "Fetch Shopify order details by resolving customer input (order name, order ID, email, product title, order status, or natural language like 'last order').",

    ADD_PRODUCT: "add_product_order_ae",
    ADD_PRODUCT_DESCRIPTION: "Add new products to an existing order. Consider currentQuantity as the actual quantity in the order. If currentQuantity is 0, it means the product is not in the order.",

    REMOVE_PRODUCT: "remove_product_order_ae",
    REMOVE_PRODUCT_DESCRIPTION: "Remove products from an existing order and update totals/inventory.",

    EDIT_PRODUCT: "edit_quantity_order_ae",
    EDIT_PRODUCT_DESCRIPTION: `Update product quantities in an existing order and recalculate totals. Use currentQuantity as the order's current quantity. 
        `,
    // ⚠️ IMPORTANT RULES:
    // - Respond ONLY with valid JSON strictly matching the schema. 
    //         - Do not include explanations or text outside JSON.


    //         ---

    //     If discountChange = true, ask the question from user:
    // <response>
    //     "Do you want to apply the discount? (yes/no)"

    //     - If user responds yes/true/yup/accept → return JSON:
    //     {"selectedMethod": {"discountChange": true } }

    //     - If user responds no/false/decline → just reply okay, not applying discount. Don't call the edit quantity tool.

    //     ---

    //     If shippingOptions are available AND selectedMethod is null:
    //     - Select the available shipping options only if user choose out of the box then ask again.
    //     - Show the user all shipping options by name/price only (do not expose raw IDs).
    //     - Ask the user to choose one option.
    //     - If user responds no/false/decline → just reply okay, not applying discount. Don't call the edit quantity tool.
    //     - When the user selects, return JSON in this format:

    //     {
    //         "selectedMethod": {
    //         "<deliveryProfilesid>": "<deliveryProfilesid>__<chosenMethod.index>___<end>_<chosenMethod.name>/<chosenMethod.price>"
    //         }
    //         }

    //             Example:
    //             {
    //                 "selectedMethod": {
    //                 "gid://shopify/DeliveryProfile/99469263003_gid://shopify/DeliveryLocationGroup/100003545243":
    //             "gid://shopify/DeliveryProfile/99469263003_gid://shopify/DeliveryLocationGroup/100003545243__0___<end>_Economy/0"
    //         }
    //         }

    EDIT_ADDRESS: "edit_address_order_ae",
    EDIT_ADDRESS_DESCRIPTION: "Update the shipping address for an existing order. Don't change the billing address. If asked to change billing address, politely refuse.",

    APPLY_DISCOUNT: "apply_discount_ae",
    APPLY_DISCOUNT_DESCRIPTION: "Apply a discount code or custom discount to an order and recalculate totals.",

    CANCEL_ORDER: "cancel_order_ae",
    CANCEL_ORDER_DESCRIPTION: "Cancel an order and update status, refunds, or inventory.",

    ADD_CANCEL_OFFER: "add_cancel_offer_ae",
    ADD_CANCEL_OFFER_DESCRIPTION: "Update the offer of smart cancellation in the customer order.",

    // ORDER_LIST: "orders_list_ae",
    // ORDER_LIST_DESCRIPTION: `Retrieve a list of all orders including IDs, statuses, dates, and summaries base on following filter parameter
    // - If user ask about last order then use created date for filter 
    // - If user ask order for financial status then use financial_status key with value paid, pending, authorized, partially_paid, partially_refunded, refunded, voided, expired.
    // - If user ask order list with fulfillment status then use fulfillment_status key with value unshipped, shipped, fulfilled, partial, scheduled, on_hold, unfulfilled, request_declined.
    // - If user ask order list with tag then use tag argument for tag value
    // - 
    
    // `,
ORDER_LIST: "orders_list_ae",
ORDER_LIST_DESCRIPTION: `
Retrieve Shopify customer orders using flexible, natural-language filters.

This tool automatically interprets user intent and converts common phrases into valid Shopify query filters.
If a term doesn't match a supported field, it will be safely ignored.
created_at and updated_at must be exact dates in YYYY-MM-DD format only.
No natural language, no time, no ranges. Convert phrases before calling tool.
Valid Formate: 2025-01-20. Invalid: "today", "yesterday", "2025-01-20T10:00".
2025-01-20 is just example you need to use valid date as per user request.
Supported filters

created_at / updated_at — supports dates and operators
Example: 2025-01-20, >2025-01-20, >=2025-01-20

delivery_method — "pickup", "local delivery"

status — open, closed, cancelled, returned, in progress, no return, unfulfilled, shipped, fulfilled, paid, pending, authorized, partially_paid

tag — "priority", "wholesale", etc.

Example natural-language inputs and interpretations
User Query	Interpreted Filter
“Show me orders this week”	created_at >= (today − 7 days)
“Show me today’s orders”	created_at >= today
“Show me orders this month”	created_at >= first day of current month
“Show me orders from last 30 days”	created_at >= (today − 30 days)
“Show me unpaid orders”	status = pending
“Show me paid orders”	status = paid
“Show me partially-paid orders”	status = partially_paid
“List closed pickup orders”	status = closed and delivery_method = pickup
“Orders tagged priority before 2024”	tag = priority and created_at < 2024-01-01
`,
 

    ACCEPT_REFUND: "accept_refund_ae",
    ACCEPT_REFUND_DESCRIPTION: "Process and approve a refund for an order, updating payment and order records.",

    CREATE_CHATBOT_TICKET: "create_chatbot_ticket_ae",
    CREATE_CHATBOT_TICKET_DESCRIPTION: `Handle support ticket creation intelligently. CustomerId is optional not ask to user.
    - If the user message explicitly includes "create ticket" or a direct request to create one, immediately call the create support ticket tool.
            - If the user describes any issue, problem, or complaint (e.g., “I have an issue with my order 1245”, “My product is damaged”, “I’m facing a problem with the website”) but does not explicitly say “create ticket”, ask first: “Do you want to create a support ticket for this issue? (yes/no)”.
            - Only create the ticket if the user confirms with yes/true/okay; otherwise, follow their next instruction or clarify what they want to do.
            - Do not redirect to other tools unless the user clearly requests a different action.`,


    REPLY_CHATBOT_TICKET: "reply_chatbot_ticket_ae",
    REPLY_CHATBOT_TICKET_DESCRIPTION: "when your add message with ticket then Reply to an existing customer support ticket in the helpdesk system.",

    GET_SUPPORT_DETAILS: "get_support_details_ae",
    GET_SUPPORT_DETAILS_DESCRIPTION: "When user ask about specific about ticket then Fetch details of a specific customer support by ticketId if ticketid is not available then find by customerId. You have to never ask customerId nor ticketId if not given in the input.",

    STORE_FRONT_DATABASE: "storefront_database_ae",
    STORE_FRONT_DATABASE_DESCRIPTION: "Query the storefront analytics database for order edits, revenue, and metrics (via RAG retrieval).",

    INSIGHTS: "insights_ae",
    INSIGHTS_DESCRIPTION: "Generate customer and business insights including analytics, trends, and recommendations.",

    // LOGIN: "account_login_ae",
    // LOGIN_DESCRIPTION: "Login customer to there account ",

    // PRODUCT_SELECT: "product_select_ae",
    // PRODUCT_SELECT_DESCRIPTION: "Select Product for Opration.",



}