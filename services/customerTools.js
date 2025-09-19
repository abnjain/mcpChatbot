import z from "zod"
import { addProduct, editQuantity, getOrderDetails, removeProduct, editAddress, applyDiscount, cancelOrder, orderList, acceptRefund, shopPolicies, shopCatalog, cartDetails, addCartItems, updateCartItems, searchOrderDetails } from "./ae.tool.js"
import { TOOLS } from "../constant/constant.js";
import { createUIResource } from '@mcp-ui/server';
import { getOrderDetailsBuild, getCartBuild, getFaqPoliciesBuild, getOrdersListHtml, loginButtonBuild, getDiscountPopupHtml, getShippingPopupHtml, shopCatalogBuild } from "./htmlBuilder.js";
import { getClientId, getMessage, getConversationId, getCustomerId, getCustomerEmail, getCartId, getStorefrontUrl, getOrderId } from "../store/requestStore.js"
import { config } from "../config/config.js";
import { globalOrderId } from "../utils/utils.js";

let start = new Date();
start.setDate(start.getDate() - 30);

function tryParse(input) {
    if (input == null) return {};

    // If string, try parsing
    if (typeof input === "string") {
        try {
            return JSON.parse(input);
        } catch {
            return {};
        }
    }

    // If RPC envelope (result.content[0].text is JSON string)
    if (input?.result?.content && Array.isArray(input.result.content)) {
        const first = input.result.content[0];
        if (first?.text && typeof first.text === "string") {
            try {
                return JSON.parse(first.text);
            } catch {
                return {};
                // fallthrough
            }
        }
    }

    // If already an object, return as-is
    return input;
}

// Example tool implementations
function addTwoNumbers({ a, b }) {
    return {
        content: [
            {
                type: "text",
                text: `The sum of ${a} and ${b} is ${a + b}`
            }
        ]
    };
}


// Export a function to register all tools
export function registerCustomerTools(server) {


    // login tool button
    server.tool(
        TOOLS.LOGIN,
        TOOLS.LOGIN_DESCRIPTION,
        {
        },
        async (arg) => {

            const html = loginButtonBuild();
            const resource = createUIResource({
                uri: `ui://shopify/products/123123`,
                content: {
                    type: "rawHtml",
                    htmlString: html
                },
                encoding: "text",
                mimeType: "text/html",
            });
            // console.log(resource);
            console.log("Fetched Product List");
            return {
                content: [resource],
            };
        }
    );

    // find products list for cart
    server.tool(
        TOOLS.SEARCH_SHOP_CATALOG,
        TOOLS.SEARCH_SHOP_CATALOG_DESCRIPTION,
        {
            query: z.string(),
            context: z.string().optional(),
        },
        async (arg) => {
            const { query, context } = arg
            try {
                const data = await shopCatalog(query, context, getStorefrontUrl());
                if (data?.products <= 0) {
                    console.log("No Products Fetched");
                    return { content: [{ type: "text", text: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help." }] }
                };
                const html = shopCatalogBuild({ data, type: "cart" });
                // console.log("------------------------------------ html",html);
                const firstId = data.products?.[0]?.product_id;
                const resource = createUIResource({
                    uri: `ui://shopify/products/${firstId}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                // console.log(resource);
                console.log("Fetched Product List");
                return {
                    content: [{
                        type: "text",
                        text: "Please select any product for add in your cart"
                    }, resource],
                };

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ]
                };
            }
        }
    );

    server.tool(
        TOOLS.SEARCH_SHOP_CATALOG_ORDER,
        TOOLS.SEARCH_SHOP_CATALOG_DESCRIPTION_ORDER,
        {
            query: z.string(),
            context: z.string().optional(),
        },
        async (arg) => {
            const { query, context } = arg
            try {
                console.log(arg);
                const data = await shopCatalog(query, context, getStorefrontUrl());
                // console.log(data);
                if (data?.products <= 0) {
                    console.log("No Products Fetched");
                    return { content: [{ type: "text", text: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help." }] }
                };
                const html = shopCatalogBuild({ data, type: "order" });
                // console.log("------------------------------------ html",html);
                const firstId = data.products?.[0]?.product_id;
                const resource = createUIResource({
                    uri: `ui://shopify/products/${firstId}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                // console.log(resource);
                console.log("Fetched Product List");
                return {
                    content: [{
                        type: "text",
                        text: "Please select any product for add in your order."
                    }, resource],
                };

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ]
                };
            }
        }
    );
    // faqs and shop policies
    server.tool(
        TOOLS.SHOP_POLICIES,
        TOOLS.SHOP_POLICIES_DESCRIPTION,
        {
            query: z.string().optional(),
            context: z.string().optional(),
        },
        async (arg) => {
            const { query, context } = arg;
            try {
                // Send MCP-formatted request to external MCP server
                const data = await shopPolicies(query, context, getStorefrontUrl());
                if (data?.length <= 0 || typeof (data) === "string") {
                    console.log("No Policies Found");
                    return { content: [{ type: "text", text: "No Such FAQ or policy currently found.Please Visit Shop to see more enhanced Queries and FAQs" }] }
                };
                const html = getFaqPoliciesBuild(data);
                const firstId = data?.[0]?.id;
                const resource = createUIResource({
                    uri: `ui://shopify/faqs/${firstId}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                // console.log(data);
                console.log("Policies Fetched");
                return {
                    content: [resource]
                };

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ]
                };
            }
        }
    );

    // cart details from shopify
    server.tool(
        TOOLS.GET_CART,
        TOOLS.GET_CART_DESCRIPTION,
        async () => {
            try {
                let data = null;
                if (getCartId().length == 0) {
                    console.log("No Cart Fetched");
                    return {
                        content: [

                            { text: "No Products Found Currently in your cart. Do you want to search or browse product?", type: "text", }

                        ]
                    }
                } else {
                    // Send MCP-formatted request to external MCP server
                    let data = await cartDetails(getStorefrontUrl(), getCartId());
                    if (data?.result?.isError) {
                        console.log("No Cart Fetched");
                        return {
                            content: [
                                {
                                    text: "API Error. No Products Found Currently in your cart. Do you want to search or browse product?",
                                    type: "text",
                                }

                            ]
                        }
                    }

                };
                const { html, cart } = getCartBuild(data);
                const firstId = data?.products?.[0]?.product_id;
                const resource = createUIResource({
                    uri: `ui://${cart.id}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                data = tryParse(data)
                console.log("Cart Fetching errors - ", data?.errors);
                return {
                    content: [resource]
                };

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ]
                };
            }
        }
    );

    // add cart item in cart from shopify
    server.tool(
        TOOLS.ADD_CART_ITEM_AE,
        TOOLS.ADD_CART_ITEM_AE_DESCRIPTION,
        {
            add_items: z.array(z.object({
                product_variant_id: z.string(),
                quantity: z.number()
            }))
        },
        async (arg) => {
            const { add_items } = arg;
            try {
                const data = await addCartItems(getStorefrontUrl(), getCartId(), getCustomerEmail(), add_items);
                // if (data?.products.length >= 0) {
                //     console.log("No Product Added");
                //     return { content: [{ text: "No Products Added Currently in your cart" }] }
                // };
                const { html, cart } = getCartBuild(data);
                const firstId = data.products?.[0]?.product_id;
                const resource = createUIResource({
                    uri: `ui://${cart.id}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                console.log("Product Added in the Cart");
                // Return the content exactly as received from remote MCP
                return {
                    content: [resource]
                };

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ]
                };
            }
        }
    );

    // update cart item in cart from shopify
    server.tool(
        TOOLS.UPDATE_CART_ITEM_AE,
        TOOLS.UPDATE_CART_ITEM_AE_DESCRIPTION,
        {
            update_items: z.array(z.object({
                id: z.string(),
                product_variant_id: z.string(),
                quantity: z.number()
            }))
        },
        async (arg) => {
            const { update_items } = arg;
            try {
                const data = await updateCartItems(getStorefrontUrl(), getCartId(), getCustomerEmail(), update_items);
                const text = JSON.parse(data.result.content[0].text)
                // console.log(text);
                if (text.errors.length > 0) {
                    console.log(text.errors);
                    return { content: [{ type: "text", text: JSON.stringify(text.errors[0].message) }] }
                };
                const { html, cart } = getCartBuild(data);
                const firstId = data.products?.[0]?.product_id;
                const resource = createUIResource({
                    uri: `ui://${cart.id}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                console.log("No Error in fetching cart");
                // Return the content exactly as received from remote MCP
                return {
                    content: [resource]
                };

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ]
                };
            }
        }
    );

    // add numbers
    server.tool(
        TOOLS.ADD_NUMBERS,
        TOOLS.ADD_NUMBERS_DESCRIPTION,
        {
            a: z.number(),
            b: z.number()
        },
        async (arg) => {
            try {
                return addTwoNumbers(arg);
            } catch (error) {
                console.error(`Error in ${TOOLS.ADD_NUMBERS} tool:`, error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while adding numbers."
                        }
                    ]
                };
            }
        }
    );

    // order details by id
    server.tool(
        TOOLS.ORDER_DETAILS,
        TOOLS.ORDER_DETAILS_DESCRIPTION,
        {
            orderNameOrId: z.string(),
        },
        async (arg) => {
            try {
                let { orderNameOrId } = arg;

                const orderData = await searchOrderDetails(orderNameOrId, getStorefrontUrl());
                console.log("Search Order Resp -", orderData.status, "Message -", orderData.data?.message || orderData.status || orderData?.data?.result?.[0]?.message);
                const orderGid = orderData?.data?.result?.orderId;
                orderNameOrId = orderGid?.split("/").pop();


                if (!orderData || orderData.status !== 200 || !orderData.data?.result) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }

                // Step 3: Handle errors
                if (orderData?.status >= 400 && orderData?.status <= 500) {
                    return { content: [{ type: "text", text: orderData.data?.message || "Client error." }] };
                }

                if (orderData?.status >= 500) {
                    return { content: [{ type: "text", text: orderData.data?.message || "Server error." }] };
                }

                // Step 4: Success
                if (
                    (orderData?.status === 200 || orderData?.status === 201) &&
                    orderData.data?.result &&
                    orderData.data?.message !== "Not available"
                ) {
                    const html = getOrderDetailsBuild(orderData.data.result);
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${orderNameOrId}`,
                        content: { type: "rawHtml", htmlString: html },
                        encoding: "text",
                        mimeType: "text/html",
                    });

                    const order = orderData.data.result;
                    let { country, ...shippingAddress } = order.shippingAddress;
                    shippingAddress.country = order.shippingAddress.countryCode;
                    const lastOrderDetails = {
                        refundedAmount: order.refundAmount,
                        totalPaidAmount: order.totalPaidAmount,
                        lineItems: order.lineItems.map(item => ({
                            id: item.id,
                            quantity: item.quantity,
                            currentQuantity: item.currentQuantity,
                            title: item.title,
                            variant: {
                                id: item.variant.id,
                                title: item.variant.title
                            }
                        })),
                        orderNumber: order.orderNumber,
                        currencyCode: order.currencyCode,
                        totalOutstanding: {
                            amount: order.totalOutstanding.amount
                        },
                        shippingAddress: shippingAddress
                    };

                    return {
                        content: [resource],
                        lastOrderDetails
                    };
                }

                // Step 5: Unexpected fallback
                return { content: [{ type: "text", text: orderData?.data?.message || "Unknown response." }] };

            } catch (error) {
                console.error("Error fetching order details:", error);
                return { content: [{ type: "text", text: "Failed to fetch order details." }] };
            }
        }
    );

    // add product in order
    server.tool(
        TOOLS.ADD_PRODUCT,
        TOOLS.ADD_PRODUCT_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            productVariantId: z.string(),
            quantity: z.number(),
            selectedMethod: z.union([
                z.null(), // allow null
                z.object({ discountChange: z.boolean(), }).transform((val) => (val.discountChange ? { discountChange: "true" } : null)), // 3️⃣ dynamic key object { "<profileId>": "Economy/0" } 
                z.record(z.string(), z.string()).transform((val) => { // ensure only one key-value pair is allowed 
                    const entries = Object.entries(val); if (entries.length !== 1) return null;
                    const [profileId, method] = entries[0];
                    return {
                        profileId, method, // e.g. "Economy/0" }; 
                    }
                }),
            ])
        },
        async (arg) => {
            try {
                let { orderNameOrId, productVariantId, quantity, selectedMethod } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;
                const lineItem = details?.lineItems?.find(
                    item => item.variant?.id === productVariantId
                );

                // Extract currentQuantity if found, else 0 (or null)
                const currentQ = lineItem ? lineItem?.currentQuantity : 0;
                if (lineItem && currentQ < 0) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "This Product is already exist in your order you can increase or decrease the quantity. Either choose another product."
                            }
                        ]
                    };
                }
                console.log("mainOId", mainOId);

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }
                const data = await addProduct(mainOId, getCustomerId(), productVariantId, quantity, selectedMethod)
                console.log("Added Product -", data.status, "Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId, customerId: getCustomerId(), productVariantId, quantity, result: datas.result });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange === "false") || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    const html = getDiscountPopupHtml({ discountToken, mainOId, customerId: getCustomerId(), productVariantId, quantity, selectedMethod });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available' || data.data.message == 'shipping false')) {
                    const orderData = await getOrderDetails(mainOId, getStorefrontUrl());
                    console.log("Order Fetched -", orderData.status, "Message - ", orderData.data.message ? orderData.data.message ? orderData.data.message : orderData.status : orderData?.data?.result[0]?.message);
                    // console.log(orderData);
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        console.log("message ->", orderData.data.message);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if (orderData?.status >= 500 && orderData?.status <= 600) {
                        console.log("message ->", orderData.statusText);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if ((orderData?.status === 200 || orderData.status === 201) && !(orderData.data.message == 'Not available')) {
                        const html = getOrderDetailsBuild(orderData.data.result);
                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${mainOId}`,
                            content: {
                                type: "rawHtml",
                                htmlString: html
                            },
                            encoding: "text",
                            mimeType: "text/html",
                        });

                        const order = orderData.data.result;
                        let { country, ...shippingAddress } = order.shippingAddress;
                        shippingAddress.country = order.shippingAddress.countryCode;
                        const lastOrderDetails = {
                            refundedAmount: order.refundAmount,
                            totalPaidAmount: order.totalPaidAmount,
                            lineItems: order.lineItems.map(item => ({
                                id: item.id,
                                quantity: item.quantity,
                                currentQuantity: item.currentQuantity,
                                title: item.title,
                                variant: {
                                    id: item.variant.id,
                                    title: item.variant.title
                                }
                            })),
                            orderNumber: order.orderNumber,
                            currencyCode: order.currencyCode,
                            totalOutstanding: {
                                amount: order.totalOutstanding.amount
                            },
                            shippingAddress: shippingAddress
                        };

                        return {
                            content: [resource],
                            lastOrderDetails
                        };
                    }
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: data.data.result?.[0]?.message
                        }
                    ]
                };

            } catch (error) {
                console.error("Error in ADD_PRODUCT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while adding product."
                        }
                    ]
                };
            }
        }
    )

    // remove product
    server.tool(
        TOOLS.REMOVE_PRODUCT,
        TOOLS.REMOVE_PRODUCT_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            productVariantId: z.string(),
            calculatedLineItemId: z.string(),
            selectedMethod: z.union([
                z.null(), // allow null
                z.object({ discountChange: z.boolean(), })
                    .transform((val) => (val.discountChange ? { discountChange: "true" } : null)), // 3️⃣ dynamic key object { "<profileId>": "Economy/0" } 
                z.record(z.string(), z.string())
                    .transform((val) => { // ensure only one key-value pair is allowed 
                        const entries = Object.entries(val); if (entries.length !== 1) return null;
                        const [profileId, method] = entries[0];
                        return {
                            profileId, method, // e.g. "Economy/0" }; 
                        }
                    }),
            ])
        },
        async (arg) => {
            try {
                let { orderNameOrId, productVariantId, calculatedLineItemId, selectedMethod } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }
                const data = await removeProduct(mainOId, getCustomerId(), productVariantId, calculatedLineItemId, selectedMethod)
                console.log("Remove Product - ", data?.status, "Remove Product Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                if (data?.status >= 400 && data?.status <= 500 || data.data.message === "The order cannot be edited.") {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId, customerId: getCustomerId(), productVariantId, calculatedLineItemId, result: datas.result });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange === "false") || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    const html = getDiscountPopupHtml({ discountToken, mainOId, customerId: getCustomerId(), productVariantId, calculatedLineItemId, selectedMethod });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const orderData = await getOrderDetails(mainOId, getStorefrontUrl());
                    console.log("Order Fetched -", orderData.status, "Message - ", orderData.data.message ? orderData.data.message ? orderData.data.message : orderData.status : orderData?.data?.result[0]?.message);
                    // console.log(orderData);
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        console.log("message ->", orderData.data.message);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if (orderData?.status >= 500 && orderData?.status <= 600) {
                        console.log("message ->", orderData.statusText);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if ((orderData?.status === 200 || orderData.status === 201) && !(orderData.data.message == 'Not available')) {
                        const html = getOrderDetailsBuild(orderData.data.result);
                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${mainOId}`,
                            content: {
                                type: "rawHtml",
                                htmlString: html
                            },
                            encoding: "text",
                            mimeType: "text/html",
                        });

                        const order = orderData.data.result;
                        let { country, ...shippingAddress } = order.shippingAddress;
                        shippingAddress.country = order.shippingAddress.countryCode;
                        const lastOrderDetails = {
                            refundedAmount: order.refundAmount,
                            totalPaidAmount: order.totalPaidAmount,
                            lineItems: order.lineItems.map(item => ({
                                id: item.id,
                                quantity: item.quantity,
                                currentQuantity: item.currentQuantity,
                                title: item.title,
                                variant: {
                                    id: item.variant.id,
                                    title: item.variant.title
                                }
                            })),
                            orderNumber: order.orderNumber,
                            currencyCode: order.currencyCode,
                            totalOutstanding: {
                                amount: order.totalOutstanding.amount
                            },
                            shippingAddress: shippingAddress
                        };

                        return {
                            content: [resource],
                            lastOrderDetails
                        };
                    }

                    return {
                        content: [{ type: "text", text: data.data.result[0].message }]
                    };
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: data.data.result?.[0].message
                        }
                    ]
                };
            } catch (error) {
                console.error("Error in REMOVE_PRODUCT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while removing product."
                        }
                    ]
                };
            }
        }
    )

    // edit quantity
    server.tool(
        TOOLS.EDIT_PRODUCT,
        TOOLS.EDIT_PRODUCT_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            calculatedLineItemId: z.string(),
            quantity: z.coerce.number(),
            oldQuantity: z.coerce.number(),
            productVariantId: z.string(),
            selectedMethod: z.union([
                z.null(), // allow null
                z.object({ discountChange: z.boolean(), }).transform((val) => (val.discountChange ? { discountChange: "true" } : null)), // 3️⃣ dynamic key object { "<profileId>": "Economy/0" } 
                z.record(z.string(), z.string()).transform((val) => { // ensure only one key-value pair is allowed 
                    const entries = Object.entries(val); if (entries.length !== 1) return null;
                    const [profileId, method] = entries[0];
                    return {
                        profileId, method, // e.g. "Economy/0" }; 
                    }
                }),
            ])
        },
        async (arg) => {
            try {
                let { orderNameOrId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }

                const data = await editQuantity(mainOId, getCustomerId(), productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod)
                console.log("Order Edit - ", data?.status, "Order Edit Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if ((data?.status >= 500 && data?.status <= 600)) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId, customerId: getCustomerId(), productVariantId, calculatedLineItemId, quantity, oldQuantity, result: datas.result });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange === "false") || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    const html = getDiscountPopupHtml({ discountToken, mainOId, customerId: getCustomerId(), productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const orderData = await getOrderDetails(mainOId, getStorefrontUrl());
                    console.log("Order Fetched -", orderData.status, "Message - ", orderData.data.message ? orderData.data.message ? orderData.data.message : orderData.status : orderData?.data?.result[0]?.message);
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        console.log("message ->", orderData.data.message);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if (orderData?.status >= 500 && orderData?.status <= 600) {
                        console.log("message ->", orderData.statusText);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if ((orderData?.status === 200 || orderData.status === 201) && !(orderData.data.message == 'Not available')) {
                        const html = getOrderDetailsBuild(orderData.data.result);
                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${mainOId}`,
                            content: {
                                type: "rawHtml",
                                htmlString: html
                            },
                            encoding: "text",
                            mimeType: "text/html",
                        });

                        const order = orderData.data.result;
                        let { country, ...shippingAddress } = order.shippingAddress;
                        shippingAddress.country = order.shippingAddress.countryCode;
                        const lastOrderDetails = {
                            refundedAmount: order.refundAmount,
                            totalPaidAmount: order.totalPaidAmount,
                            lineItems: order.lineItems.map(item => ({
                                id: item.id,
                                quantity: item.quantity,
                                currentQuantity: item.currentQuantity,
                                title: item.title,
                                variant: {
                                    id: item.variant.id,
                                    title: item.variant.title
                                }
                            })),
                            orderNumber: order.orderNumber,
                            currencyCode: order.currencyCode,
                            totalOutstanding: {
                                amount: order.totalOutstanding.amount
                            },
                            shippingAddress: shippingAddress
                        };

                        return {
                            content: [resource],
                            lastOrderDetails
                        };
                    }

                    return {
                        content: [{ type: "text", text: data.data.result[0].message }]
                    };
                }

                return {
                    content: [{ type: "text", text: data.data.result[0].message }]
                };
            } catch (error) {
                console.error("Error in EDIT_PRODUCT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while editing product."
                        }
                    ]
                };
            }
        }
    )

    // edit address (working right now but required to work on different which is not implemented right now)
    server.tool(
        TOOLS.EDIT_ADDRESS,
        TOOLS.EDIT_ADDRESS_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            address1: z.string(),
            address2: z.string(),
            city: z.string(),
            country: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            phone: z.string(),
            province: z.string(),
            provinceCode: z.string(),
            zip: z.string(),
            selectedMethod: z.union([
                z.null(), // allow null
                z.object({ discountChange: z.boolean(), }).transform((val) => (val.discountChange ? { discountChange: "true" } : null)), // 3️⃣ dynamic key object { "<profileId>": "Economy/0" } 
                z.record(z.string(), z.string()).transform((val) => { // ensure only one key-value pair is allowed 
                    const entries = Object.entries(val); if (entries.length !== 1) return null;
                    const [profileId, method] = entries[0];
                    return {
                        profileId, method, // e.g. "Economy/0" }; 
                    }
                }),
            ])
        },
        async (arg) => {
            try {
                let { orderNameOrId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }
                const data = await editAddress(mainOId, getCustomerId(), address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod)

                console.log("Edit Address - ", data?.status, "Edit Address Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                console.log("Address Edit Data - ", data.data);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId, customerId: getCustomerId(), address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, result: datas.result });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange === "false") || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    const html = getDiscountPopupHtml({ discountToken, mainOId, customerId: getCustomerId(), address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: data?.data?.result[0]?.message || data?.data.message
                        }
                    ]
                };
            } catch (error) {
                console.error("Error in EDIT_ADDRESS tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while editing address."
                        }
                    ]
                };
            }
        }
    )

    // apply discount (not working because of api endpoint working)
    server.tool(
        TOOLS.APPLY_DISCOUNT,
        TOOLS.APPLY_DISCOUNT_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            discountCode: z.string(),
            isChecking: z.boolean().default(false),
            removeOldDiscount: z.boolean().default(false)
        },
        async (arg) => {
            try {
                let { orderNameOrId, discountCode, isChecking, removeOldDiscount } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }
                const data = await applyDiscount(mainOId, getCustomerId(), discountCode, isChecking, removeOldDiscount)
                console.log("Apply Discount - ", data?.status, "Apply Discount Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                if (data?.status >= 400 && data?.status <= 500 || data.data.message === "The order cannot be edited.") {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId, customerId: getCustomerId(), productVariantId, quantity, result: datas.result });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'shipping false') {
                    let discountToken = data?.data?.result[0]?.discountChange
                    const html = getDiscountPopupHtml({ discountToken, mainOId, customerId: getCustomerId(), productVariantId, quantity, selectedMethod });
                    const resource = createUIResource({
                        uri: `ui://shopify/Order/${mainOId}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: data.data.result[0].message
                        }
                    ]
                };
            } catch (error) {
                console.error("Error in APPLY_DISCOUNT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while applying discount."
                        }
                    ]
                };
            }
        }
    )

    // cancel order
    server.tool(
        TOOLS.CANCEL_ORDER,
        TOOLS.CANCEL_ORDER_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            currencyCode: z.string(),
            customerRefundedAmount: z.number().min(0).optional(),
            refund: z.boolean().default(false),
            restock: z.boolean().default(false),
            staffNote: z.string().max(500).default("Customer requested to cancel the order."),
            totalAmount: z.string()
        },
        async (arg) => {
            try {
                let { orderNameOrId, currencyCode, customerRefundedAmount, refund, restock, staffNote, totalAmount } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }
                const data = await cancelOrder(mainOId, currencyCode, getCustomerId(), customerRefundedAmount, refund, restock, staffNote, totalAmount);
                console.log("Cancel Order - ", data?.status, "Cancel Order Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }
                if (data?.status >= 200 && data?.status <= 300 && data?.data?.message?.trim() == 'Order canceled successfully.') {
                    const orderData = await getOrderDetails(mainOId, getStorefrontUrl());
                    console.log("Order Fetched -", orderData.status, "Message - ", orderData.data.message ? orderData.data.message ? orderData.data.message : orderData.status : orderData?.data?.result[0]?.message);
                    // console.log(orderData);
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        console.log("message ->", orderData.data.message);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if (orderData?.status >= 500 && orderData?.status <= 600) {
                        console.log("message ->", orderData.statusText);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if ((orderData?.status === 200 || orderData.status === 201) && !(orderData.data.message == 'Not available')) {
                        const html = getOrderDetailsBuild(orderData.data.result);
                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${orderNameOrId}`,
                            content: {
                                type: "rawHtml",
                                htmlString: html
                            },
                            encoding: "text",
                            mimeType: "text/html",
                        });
                        return {
                            content: [resource],
                        };
                    }
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }
            } catch (error) {
                console.error("Error in CANCEL_ORDER tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while canceling order."
                        }
                    ]
                };
            }
        }
    );

    // order list
    server.tool(
        TOOLS.ORDER_LIST,
        TOOLS.ORDER_LIST_DESCRIPTION,
        {
            cursor: z.string().default("").optional(),
        },
        async (arg) => {
            try {
                const { cursor } = arg;
                if (getCustomerId() == null || getCustomerId() == "" || getCustomerId() == "GuestId") {
                    console.log("message ->", "Customer not login");
                    return {
                        content: [
                            {
                                type: "text",
                                text: "For get order details we need to customer identity. Do you want to login? "
                            }
                        ]
                    };
                }



                const data = await orderList(getCustomerId(), cursor, getStorefrontUrl());
                console.log("Order List Fetched: ", data?.status, "Messsage: ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }
                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const html = getOrdersListHtml(data.data);
                    const resource = createUIResource({
                        uri: `ui://shopify/Customer/${getCustomerId()}`,
                        content: {
                            type: "rawHtml",
                            htmlString: html
                        },
                        encoding: "text",
                        mimeType: "text/html",
                    });
                    return {
                        content: [resource],
                    };
                }
                return {
                    content: [{ type: "text", text: data.data.result[0].message }]
                };
            } catch (error) {
                console.error("Error in ORDER_LIST tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while fetching order list."
                        }
                    ]
                };
            }
        }
    );

    // accept refund 
    server.tool(
        TOOLS.ACCEPT_REFUND,
        TOOLS.ACCEPT_REFUND_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            reason: z.string().default("Refund Accept"),
        },
        async (arg) => {
            try {
                let { orderNameOrId, reason } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId });
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ]
                    };
                }
                const data = await acceptRefund(mainOId, reason);
                console.log("Accept Refund - ", data?.status, "Accept Refund Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ]
                    };
                }

                if (data?.status >= 500 && data?.status <= 600) {
                    console.log("message ->", data.statusText);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.statusText
                            }
                        ]
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const orderData = await getOrderDetails(mainOId, getStorefrontUrl());
                    console.log("Order Fetched -", orderData.status, "Message - ", orderData.data.message ? orderData.data.message ? orderData.data.message : orderData.status : orderData?.data?.result[0]?.message);
                    // console.log(orderData);
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        console.log("message ->", orderData.data.message);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if (orderData?.status >= 500 && orderData?.status <= 600) {
                        console.log("message ->", orderData.statusText);
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: orderData.data.message
                                }
                            ]
                        };
                    }
                    if ((orderData?.status === 200 || orderData.status === 201) && !(orderData.data.message == 'Not available')) {
                        const html = getOrderDetailsBuild(orderData.data.result);
                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${mainOId}`,
                            content: {
                                type: "rawHtml",
                                htmlString: html
                            },
                            encoding: "text",
                            mimeType: "text/html",
                        });
                        return {
                            content: [resource],
                        };
                    }
                }

                return {
                    content: [{ type: "text", text: data.data.result[0].message }]
                };
            } catch (error) {
                console.error("Error in ACCEPT_REFUND tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while processing refund."
                        }
                    ]
                };
            }
        }
    );
}
