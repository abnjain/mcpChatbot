import z from "zod"
import { addProduct, editQuantity, removeProduct, editAddress, applyDiscount, cancelOrderAE, orderList, acceptRefund, shopPolicies, shopCatalog, cartDetails, addCartItems, updateCartItems, searchOrderDetails, partnerDetails, getRetentionOffer, addRetentionOffer, createChatbotTicket, replyChatbotTicket, getSupportDetails } from "./ae.api.js"
import { TOOLS } from "../constant/constant.js";
import { createUIResource } from '@mcp-ui/server';
import { getOrderDetailsBuild, getCartBuild, getFaqPoliciesBuild, getOrdersListHtml, loginButtonBuild, getDiscountPopupHtml, getShippingPopupHtml, shopCatalogBuild, getSmartCancellationHtml, getCancellationSettingsHtml, getSupportDetailsHtml } from "./htmlBuilder.js";
// import { getCustomerId, getCustomerEmail, getCartId, getIsExternal, getIsMerchant } from "../store/requestStore.js"
import { config } from "../config/config.js";
import { globalOrderId } from "../utils/utils.js";
import { saveDetailsInHistory, partnerDetailsHelper, saveCartDetailsInHistory } from "../utils/toolsHelper.js";
import { configSchema } from "../utils/configSchema.js";
import { AppSettings } from "../models/model.js";
import { DeliveryMethodEnum, OrderStatusEnum } from "../utils/orderlistSchema.js";

let activeTools = new Set();

export function setActiveTools(toolNames = []) {
    activeTools = new Set(toolNames);
    console.log("Active tools updated:", [...activeTools]);
}

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

function registerActiveTool(server, name, description, schema, handler) {
    if (!activeTools.has(name)) {
        // console.log(`Tool "${name}" is inactive and not registered.`);
        return;
    } else {
        server.tool(name, description, schema, handler);
        console.log(`Registered active tool: "${name}"`);
    }
}

// Export a function to register all tools
export function registerCustomerTools(server) {

    // Clear old tools before re-registering
    // server.clearTools?.(); // ✅ if SDK supports, otherwise keep your own logic

    // login tool button
    // registerActiveTool(
    //     server,
    // server.tool(
    //     TOOLS.LOGIN,
    //     TOOLS.LOGIN_DESCRIPTION,
    //     {},
    //     async (arg) => {
    //         const html = loginButtonBuild();
    //         const resource = createUIResource({
    //             uri: `ui://shopify/products/123123`,
    //             content: {
    //                 type: "rawHtml",
    //                 htmlString: html
    //             },
    //             encoding: "text",
    //             mimeType: "text/html",
    //         });
    //         // console.log(resource);
    //         console.log("Fetched Product List");
    //         return {
    //             content: [resource],
    //         };
    //     }
    // );

    // find products list for cart
    // registerActiveTool(
    //     server,
    server.tool(
        TOOLS.SEARCH_SHOP_CATALOG,
        TOOLS.SEARCH_SHOP_CATALOG_DESCRIPTION,
        {
            query: z.string(),
            context: z.string().optional(),
            config: configSchema,
        },
        async (arg) => {
            const { query, context, config } = arg
            const isExternal = config.IsExternal;
            try {
                const data = await shopCatalog(query, context, config);
                if (data?.products <= 0) {
                    console.log("No Products Fetched");
                    return {
                        content: [{ type: "text", text: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help." }],
                        rawText: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help."
                    }
                };
                console.log("------------------------------------ data", data);
                if (!isExternal) {
                    const html = shopCatalogBuild({ data, type: "cart" });
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
                    return {
                        content: [{
                            type: "text",
                            text: !data ? "No products found currently." : "Please select any product for add in your cart."
                        }, !data ? null : resource],
                    };
                } else {
                    return {
                        rawText: !data ? "No products found currently." : "Please select any product for add in your cart.",
                        rawData: !data ? null : JSON.stringify(data)
                    }
                }

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ],
                    rawText: "Failed to contact the remote MCP server."
                };
            }
        }
    );

    // find products list for order
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.SEARCH_SHOP_CATALOG_ORDER,
        TOOLS.SEARCH_SHOP_CATALOG_DESCRIPTION_ORDER,
        {
            orderNameOrId: z.string(),
            query: z.string(),
            context: z.string().optional(),
            config: configSchema,
        },
        async (arg) => {
            const { query, context, orderNameOrId, config } = arg
            const isExternal = config.IsExternal;
            try {
                const { id, details } = await globalOrderId({ id: orderNameOrId, config });
                const { lastOrderDetails } = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const data = await shopCatalog(query, context, config);
                // console.log(data);
                if (data?.products <= 0) {
                    console.log("No Products Fetched");
                    return {
                        content: [{ type: "text", text: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help." }],
                        rawText: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help.",
                        lastOrderDetails
                    }
                };
                if (!isExternal) {
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
                            text: "Please select any product to add in your order."
                        }, resource],
                        lastOrderDetails
                    };
                } else {
                    return {
                        rawData: JSON.stringify(data),
                        rawText: "Please select any product to add in your order.",
                        lastOrderDetails
                    }
                }

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ],
                    rawText: "Failed to contact the remote MCP server."
                };
            }
        }
    );

    // faqs and shop policies
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.SHOP_POLICIES,
        TOOLS.SHOP_POLICIES_DESCRIPTION,
        {
            query: z.string().optional(),
            context: z.string().optional(),
            config: configSchema,
        },
        async (arg) => {
            const { query, context, config } = arg;
            const isExternal = config.IsExternal;
            try {
                // Send MCP-formatted request to external MCP server
                const data = await shopPolicies(query, context, config);
                if (data?.length <= 0 || typeof (data) === "string") {
                    console.log("No Policies Found");
                    return {
                        content: [{ type: "text", text: "No Such FAQ or policy currently found.Please Visit Shop to see more enhanced Queries and FAQs" }],
                        rawText: "No Such FAQ or policy currently found.Please Visit Shop to see more enhanced Queries and FAQs"
                    }
                };
                if (!isExternal) {
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
                    return {
                        content: [resource]
                    };
                } else {
                    return {
                        // rawText: "What else do you want to know",
                        rawData: JSON.stringify(data)
                    }
                }
            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ],
                    rawText: "Failed to contact the remote MCP server."
                };
            }
        }
    );

    // cart details from shopify
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.GET_CART,
        TOOLS.GET_CART_DESCRIPTION,
        {
            cart_id: z.string().optional(),
            config: configSchema,
        },
        async (arg) => {
            let { cart_id, config } = arg;
            const isExternal = config.IsExternal;
            try {
                cart_id = cart_id ? cart_id : config.cart_id;
                let data = null;
                if (!cart_id) {
                    console.log("No Cart Fetched");
                    return {
                        content: [
                            { text: "No Products Found Currently in your cart. Do you want to search or browse product?", type: "text", }

                        ],
                        rawText: "No Products Found Currently in your cart. Do you want to search or browse product?"
                    }
                } else {
                    // Send MCP-formatted request to external MCP server
                    data = await cartDetails(config, cart_id);
                    console.log(data);
                    
                    const cartDetail = data?.result?.isError ? "No Details Found!" : JSON.parse(data.result.content[0].text);
                    const { lastCartDetails } = saveCartDetailsInHistory(cartDetail.cart);
                    if (data?.result?.isError) {
                        console.log("No Cart Fetched");
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: "No Products Found Currently in your cart. Do you want to search or browse product?",
                                }

                            ],
                            rawText: "No Products Found Currently in your cart. Do you want to search or browse product?",
                        }
                    }

                    const { html, cart } = getCartBuild(data);
                    if (!isExternal) {
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
                        data = tryParse(data);
                        console.log("Cart Fetching errors - ", data?.errors);
                        return {
                            content: data?.result?.isError ? "No Details Found!" : [resource],
                            lastCartDetails,
                        };

                    } else {
                        data = tryParse(data);
                        return {
                            rawText: "Here's the cart details want to add more products?",
                            rawData: data?.result?.isError ? "No Details Found!" : JSON.stringify(data),
                            lastCartDetails,
                        }
                    }
                };
            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ],
                    rawText: "Failed to contact the remote MCP server."
                };
            }
        }
    );

    // add cart item in cart from shopify
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.ADD_CART_ITEM_AE,
        TOOLS.ADD_CART_ITEM_AE_DESCRIPTION,
        {
            cart_id: z.string().optional(),
            add_items: z.array(z.object({
                product_variant_id: z.string(),
                quantity: z.number()
            })),
            config: configSchema,
        },
        async (arg) => {
            let { add_items, cart_id, config } = arg;
            const isExternal = config.IsExternal;
            try {
                cart_id = cart_id ? cart_id : config.cart_id;
                const data = await addCartItems(config, cart_id, config.customerEmail, add_items);
                console.log('------addCartItems response---', data)
                const cartDetail = JSON.parse(data);
                const { lastCartDetails } = saveCartDetailsInHistory(cartDetail.cart);
                // if (data?.products.length >= 0) {
                //     console.log("No Product Added");
                //     return { content: [{ text: "No Products Added Currently in your cart" }] }
                // };
                const { html, cart } = getCartBuild(data);
                if (!isExternal) {
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
                    // Return the content exactly as received from remote MCP
                    return {
                        content: [resource],
                        lastCartDetails,
                    };
                } else {
                    return {
                        rawText: "What other products you want to add",
                        rawData: JSON.stringify(data),
                        lastCartDetails
                    }
                }

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ],
                    rawText: "Failed to contact the remote MCP server."
                };
            }
        }
    );

    // update cart item in cart from shopify
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.UPDATE_CART_ITEM_AE,
        TOOLS.UPDATE_CART_ITEM_AE_DESCRIPTION,
        {
            cart_id: z.string().optional(),
            update_items: z.array(z.object({
                id: z.string(),
                product_variant_id: z.string(),
                quantity: z.number()
            })),
            config: configSchema,
        },
        async (arg) => {
            let { update_items, cart_id, config } = arg;
            const isExternal = config.IsExternal;
            try {
                cart_id = cart_id ? cart_id : config.cart_id;
                const data = await updateCartItems(config, cart_id, config.customerEmail, update_items);
                const cartDetail = JSON.parse(data.result.content[0].text);
                const { lastCartDetails } = saveCartDetailsInHistory(cartDetail.cart);
                const text = JSON.parse(data?.result?.content?.[0]?.text)
                // console.log(text);
                if (text.errors.length > 0) {
                    console.log(text.errors);
                    return {
                        content: [{ type: "text", text: JSON.stringify(text.errors[0].message) }],
                        rawText: JSON.stringify(text.errors[0].message)
                    }
                };
                const { html, cart } = getCartBuild(data);
                if (!isExternal) {
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
                    // Return the content exactly as received from remote MCP
                    return {
                        content: [resource],
                        lastCartDetails,
                    };
                } else {
                    return {
                        rawText: "Anything else you want to add or update",
                        rawData: JSON.stringify(data),
                        lastCartDetails,
                    }
                }

            } catch (err) {
                console.error("Error contacting remote MCP server:", err);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to contact the remote MCP server."
                        }
                    ],
                    rawText: "Failed to contact the remote MCP server."
                };
            }
        }
    );

    // add numbers
    // registerActiveTool(
    server.tool(
        //     server,
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
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.ORDER_DETAILS,
        TOOLS.ORDER_DETAILS_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, config } = arg;
            const isExternal = config.IsExternal;
            try {
                const orderData = await searchOrderDetails(orderNameOrId, config);
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
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const customerId = config.customerId;
                if (!(customerId === orderData?.data?.result?.customerId)) {
                    console.log("Order Id----> ", orderData?.data?.result?.orderNumber, "CustomerId", customerId, orderData?.data?.result?.customerId);
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Can't Find the Order!! Please try again with another order id."
                            }
                        ],
                        rawText: "Can't Find the Order!! Please try again with another order id."
                    };
                }

                // Step 3: Handle errors
                if (orderData?.status >= 400 && orderData?.status <= 500) {
                    return {
                        content: [{ type: "text", text: orderData.data?.message || "Client error." }],
                        rawText: orderData.data?.message || "Client error."
                    };
                }

                if (orderData?.status >= 500) {
                    return {
                        content: [{ type: "text", text: orderData.data?.message || "Server error." }],
                        rawText: orderData.data?.message || "Server error."
                    };
                }

                const { lastOrderDetails } = saveDetailsInHistory(orderData.data.result);

                // Step 4: Success
                if ((orderData?.status === 200 || orderData?.status === 201) && orderData.data?.result && orderData.data?.message !== "Not available") {
                    if (!isExternal) {
                        const html = getOrderDetailsBuild(orderData.data.result, config);
                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${orderNameOrId}`,
                            content: { type: "rawHtml", htmlString: html },
                            encoding: "text",
                            mimeType: "text/html",
                        });

                        return {
                            content: [resource],
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawData: JSON.stringify(orderData.data.result),
                            rawText: "Do you want to make the edit in the order?",
                            lastOrderDetails
                        }
                    }
                }

                // Step 5: Unexpected fallback
                return {
                    content: [{ type: "text", text: orderData?.data?.message || "Unknown response." }],
                    rawText: orderData?.data?.message || "Unknown response."
                };

            } catch (error) {
                console.error("Error fetching order details:", error);
                return {
                    content: [{ type: "text", text: "Failed to fetch order details." }],
                    rawText: "Failed to fetch order details."
                };
            }
        }
    );

    // add product in order
    // registerActiveTool(
    server.tool(
        //     server,
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
            ]),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, productVariantId, quantity, selectedMethod, config } = arg;
            const isExternal = config.IsExternal;
            try {

                const { id, details, orderName } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;
                const customerId = config.customerId;
                if (!(customerId === details.customerId)) {
                    console.log("Order Id----> ", details.orderNumber, "CustomerId", customerId, details.customerId);
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Can't Find the Order!! Please try again with another order id."
                            }
                        ],
                        rawText: "Can't Find the Order!! Please try again with another order id."
                    };
                }
                // get all lineItems with this variantId
                const matchingLineItems = details?.lineItems?.filter(
                    item => item.variant?.id === productVariantId
                ) ?? [];

                // check their quantities
                const allZero = matchingLineItems.length > 0 && matchingLineItems.every(item => item.currentQuantity === 0);
                if (matchingLineItems.length > 0 && !allZero) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "This Product is already exist in your order you can increase or decrease the quantity. Either choose another product."
                            }
                        ],
                        rawText: "This Product is already exist in your order you can increase or decrease the quantity. Either choose another product.",
                        lastOrderDetails
                    };
                }

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const data = await addProduct(mainOId, config.customerId, productVariantId, quantity, selectedMethod, config)
                console.log("Added Product -", data.status, "Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    if (!isExternal) {
                        const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId: orderName, customerId: config.customerId, productVariantId, quantity, result: datas.result });
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
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawText: null,
                            rawData: JSON.stringify(datas.result),
                            lastOrderDetails
                        }
                    }
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange?.message) || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    if (!isExternal) {
                        const html = getDiscountPopupHtml({ discountToken, mainOId: orderName, customerId: config.customerId, productVariantId, quantity, selectedMethod });
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
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawData: data?.data?.result[0],
                            rawText: null,
                            lastOrderDetails
                        }
                    }
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available' || data.data.message == 'shipping false')) {
                    const orderData = await searchOrderDetails(orderNameOrId, config);
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
                            ],
                            rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                        };
                    }

                    // Step 3: Handle errors
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Client error." }],
                            rawText: orderData.data?.message || "Client error."
                        };
                    }

                    if (orderData?.status >= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Server error." }],
                            rawText: orderData.data?.message || "Server error."
                        };
                    }

                    const { lastOrderDetails } = saveDetailsInHistory(orderData.data.result);

                    // Step 4: Success
                    if ((orderData?.status === 200 || orderData?.status === 201) && orderData.data?.result && orderData.data?.message !== "Not available") {
                        if (!isExternal) {
                            const html = getOrderDetailsBuild(orderData.data.result, config);
                            const resource = createUIResource({
                                uri: `ui://shopify/Order/${orderNameOrId}`,
                                content: { type: "rawHtml", htmlString: html },
                                encoding: "text",
                                mimeType: "text/html",
                            });

                            return {
                                content: [resource],
                                lastOrderDetails
                            };
                        } else {
                            return {
                                rawData: JSON.stringify(orderData.data.result),
                                rawText: "Product Added in the order. Any other edit in the order you want to make?",
                                lastOrderDetails
                            }
                        }
                    }
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: data.data.result?.[0]?.message
                        }
                    ],
                    rawText: data.data.result?.[0]?.message
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
    // registerActiveTool(
    server.tool(
        //     server,
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
            ]),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, productVariantId, calculatedLineItemId, selectedMethod, config } = arg;
            const isExternal = config.IsExternal;
            try {

                const { id, details, orderName } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const customerId = config.customerId;
                if (!(customerId === details.customerId)) {
                    console.log("Order Id----> ", details.orderNumber, "CustomerId", customerId, details.customerId);
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Can't Find the Order!! Please try again with another order id."
                            }
                        ],
                        rawText: "Can't Find the Order!! Please try again with another order id."
                    };
                }
                const data = await removeProduct(mainOId, config.customerId, productVariantId, calculatedLineItemId, selectedMethod, config)
                console.log("Remove Product - ", data?.status, "Remove Product Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                if (data?.status >= 400 && data?.status <= 500 || data.data.message === "The order cannot be edited.") {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    if (!isExternal) {
                        const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId: orderName, customerId: config.customerId, productVariantId, calculatedLineItemId, result: datas.result });
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
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawData: JSON.stringify(datas.result),
                            rawText: null,
                            lastOrderDetails
                        }
                    }
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange?.message) || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    if (!isExternal) {
                        const html = getDiscountPopupHtml({ discountToken, mainOId: orderName, customerId: config.customerId, productVariantId, calculatedLineItemId, selectedMethod });
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
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawText: null,
                            rawData: data?.data?.result[0],
                            lastOrderDetails
                        }
                    }
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const orderData = await searchOrderDetails(orderNameOrId, config);
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
                            ],
                            rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                        };
                    }

                    // Step 3: Handle errors
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Client error." }],
                            rawText: orderData.data?.message || "Client error."
                        };
                    }

                    if (orderData?.status >= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Server error." }],
                            rawText: orderData.data?.message || "Server error."
                        };
                    }

                    const { lastOrderDetails } = saveDetailsInHistory(orderData.data.result);

                    // Step 4: Success
                    if ((orderData?.status === 200 || orderData?.status === 201) && orderData.data?.result && orderData.data?.message !== "Not available") {
                        if (!isExternal) {
                            const html = getOrderDetailsBuild(orderData.data.result, config);
                            const resource = createUIResource({
                                uri: `ui://shopify/Order/${orderNameOrId}`,
                                content: { type: "rawHtml", htmlString: html },
                                encoding: "text",
                                mimeType: "text/html",
                            });

                            return {
                                content: [resource],
                                lastOrderDetails
                            };
                        } else {
                            return {
                                rawData: JSON.stringify(orderData.data.result),
                                rawText: "The product has been removed successfully!! Would you like to update the order?",
                                lastOrderDetails
                            }
                        }
                    }
                }
                return {
                    content: [
                        {
                            type: "text",
                            text: data.data.result?.[0].message
                        }
                    ],
                    rawText: data.data.result?.[0].message
                };
            } catch (error) {
                console.error("Error in REMOVE_PRODUCT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while removing product."
                        }
                    ],
                    rawText: "Error occurred while removing product."
                };
            }
        }
    )

    // edit quantity
    // registerActiveTool(
    server.tool(
        //     server,
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
            ]),
            shippingOptions: z.object({
                name: z.string().optional(),
                price: z.number().optional(),
                currency: z.string().optional(),
                discount: z.boolean().optional(),
                type: z.string().optional(),
                defaultPrice: z.number().optional(),
            }).optional(),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod, shippingOptions, config } = arg;
            const isExternal = config.IsExternal;
            try {

                const { id, details, orderName } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const customerId = config.customerId;
                if (!(customerId === details.customerId)) {
                    console.log("Order Id----> ", details.orderNumber, "CustomerId", customerId, details.customerId);
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Can't Find the Order!! Please try again with another order id."
                            }
                        ],
                        rawText: "Can't Find the Order!! Please try again with another order id."
                    };
                }
                const data = await editQuantity(mainOId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod, config)
                console.log("Order Edit - ", data?.status, "Order Edit Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const shippingOptions = datas.result[0].shippingOptions
                    // const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    let result = [deliveryProfiles, shippingOptions]
                    if (!isExternal) {
                        const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId: orderName, customerId: customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, result: datas.result });
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
                            // content: [{
                            //     type: "text",
                            //     text: `Available Shipping Options:
                            //     ${shippingOptions.map((opt, i) => `${i + 1}. ${opt.name} - ${opt.price}`).join("\n")}
                            //     Please select one option by number or name.`,
                            //     deliveryProfiles
                            // }],
                            content: [resource],
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawText: null,
                            rawData: JSON.stringify(datas.result),
                            lastOrderDetails
                        }
                    }
                }

                if ((data?.status === 200 || data.status === 201) && (data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange?.message) || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.') {
                    let discountToken = data?.data?.result[0]?.discountChange
                    if (!isExternal) {
                        const html = getDiscountPopupHtml({ discountToken, mainOId: orderName, customerId: customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod });
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
                            // content: [
                            //     {
                            //         type: "text",
                            //         text: discountToken.message
                            //     },
                            //     {
                            //         type: "text",
                            //         text: "Do you want to apply the discount? (yes/no)"
                            //     }
                            // ]
                            content: [resource],
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawData: data?.data?.result[0],
                            // rawText: "Do you want to apply the discount? (yes/no)",
                            rawText: null,
                            lastOrderDetails
                        };
                    }
                }

                if ((data?.status === 200 || data.status === 201) && !["Not available", "This order can no longer be edited."].includes(data?.data?.message)) {
                    const orderData = await searchOrderDetails(orderNameOrId, config);
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
                            ],
                            rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                        };
                    }

                    // Step 3: Handle errors
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Client error." }],
                            rawText: orderData.data?.message || "Client error."
                        };
                    }

                    if (orderData?.status >= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Server error." }],
                            rawText: orderData.data?.message || "Server error."
                        };
                    }

                    const { lastOrderDetails } = saveDetailsInHistory(orderData.data.result);

                    // Step 4: Success
                    if ((orderData?.status === 200 || orderData?.status === 201) && orderData.data?.result && orderData.data?.message !== "Not available") {
                        if (!isExternal) {
                            const html = getOrderDetailsBuild(orderData.data.result, config);
                            const resource = createUIResource({
                                uri: `ui://shopify/Order/${orderNameOrId}`,
                                content: { type: "rawHtml", htmlString: html },
                                encoding: "text",
                                mimeType: "text/html",
                            });

                            return {
                                content: [resource],
                                lastOrderDetails
                            };
                        } else {
                            return {
                                rawData: JSON.stringify(orderData.data.result),
                                rawText: "The edit was successful! Do you want to make any additional changes to the order?",
                                lastOrderDetails
                            }
                        }
                    }
                }

                return {
                    content: [{ type: "text", text: data?.data?.message }],
                    rawText: data?.data?.message
                };
            } catch (error) {
                console.error("Error in EDIT_PRODUCT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while editing product."
                        }
                    ],
                    rawText: "Error occurred while editing product."
                };
            }
        }
    )

    // edit address (working right now but required to work on different which is not implemented right now)
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.EDIT_ADDRESS,
        TOOLS.EDIT_ADDRESS_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            address1: z.string(),
            address2: z.string().optional(),
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
            ]),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod, config } = arg;
            const isExternal = config.IsExternal;
            try {

                const { id, details, orderName } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const data = await editAddress(mainOId, config.customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod, config)

                console.log("Edit Address - ", data?.status, "Edit Address Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                // console.log("Address Edit Data - ", data.data);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && data?.data?.message?.trim() == 'Shipping rates matched and grouped by delivery profile.') {
                    let datas = data?.data
                    const deliveryProfiles = datas.result[0].deliveryProfileId
                    const variants = datas.result[0].variants
                    const shippingOptions = datas.result[0].shippingOptions
                    if (!isExternal) {
                        const html = getShippingPopupHtml({ deliveryProfiles, variants, shippingOptions, mainOId: orderName, customerId: config.customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, result: datas.result });
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
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawText: null,
                            rawData: JSON.stringify(datas.result),
                            lastOrderDetails
                        }
                    }
                }

                if ((data?.status === 200 || data.status === 201) && ((data?.data?.message?.trim() == 'shipping false' && data?.data?.result[0]?.discountChange?.message) || data?.data?.message?.trim() == 'Shipping method or price has changed. Please reselect your shipping option.')) {
                    let discountToken = data?.data?.result[0]?.discountChange
                    if (!isExternal) {
                        const html = getDiscountPopupHtml({ discountToken, mainOId: orderName, customerId: config.customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod });
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
                            lastOrderDetails
                        };
                    } else {
                        return {
                            rawText: null,
                            rawData: data?.data?.result[0],
                            lastOrderDetails
                        }
                    }
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: data?.data?.result[0]?.message || data?.data.message
                        }
                    ],
                    rawText: data?.data?.result[0]?.message || data?.data.message,
                    lastOrderDetails
                };
            } catch (error) {
                console.error("Error in EDIT_ADDRESS tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while editing address."
                        }
                    ],
                    rawText: "Error occurred while editing address."
                };
            }
        }
    )

    // apply discount 
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.APPLY_DISCOUNT,
        TOOLS.APPLY_DISCOUNT_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            discountCode: z.string(),
            isChecking: z.boolean().optional().default(false),
            removeOldDiscount: z.boolean().optional().default(false),
            config: configSchema,
        },
        async (arg) => {
            try {
                let { orderNameOrId, discountCode, isChecking, removeOldDiscount, config } = arg;

                const { id, details } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const data = await applyDiscount(mainOId, config.customerId, discountCode, isChecking, removeOldDiscount, config)
                const discountDetails = data?.data?.result?.discountDetails;
                console.log("Apply Discount - ", data?.status, "Apply Discount Message - ", data.data.message ? data.data.message ? data.data.message : data.status : discountDetails?.[discountDetails.length - 1].summary);
                if (data?.status >= 400 && data?.status <= 500 || data.data.message === "The order cannot be edited.") {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: discountDetails?.[discountDetails.length - 1]?.summary || "Discount applied successfully."
                        }
                    ],
                    rawText: discountDetails?.[discountDetails.length - 1]?.summary || "Discount applied successfully.",
                    lastOrderDetails
                };
            } catch (error) {
                console.error("Error in APPLY_DISCOUNT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while applying discount."
                        }
                    ],
                    rawText: "Error occurred while applying discount."
                };
            }
        }
    )

    // cancel order
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.CANCEL_ORDER,
        TOOLS.CANCEL_ORDER_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            currencyCode: z.string(),
            refund: z.boolean().default(false),
            restock: z.boolean().default(false),
            staffNote: z.string().default(""),
            totalAmount: z.string(),
            customerRefundedAmount: z.number().optional(),
            selectedOffer: z.string().default(null).optional(),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, currencyCode, customerRefundedAmount, refund, restock, staffNote, totalAmount, selectedOffer, config } = arg;
            const isExternal = config.IsExternal;
            try {
                // Ensure customerRefundedAmount defaults to totalAmount if not provided
                if (customerRefundedAmount === undefined || customerRefundedAmount === null) {
                    customerRefundedAmount = Number(totalAmount);
                }
                const { id, details, orderName } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }

                let offerData, offersAvailable, hasPendingPayment;
                // 🔹 Step 1: Try to get Smart Cancellation Offers
                if (!(selectedOffer || selectedOffer === "null" || selectedOffer === "undefined" || selectedOffer === "false") && selectedOffer !== false) {
                    const offerResponse = await getRetentionOffer(mainOId, config);
                    offerData = offerResponse?.data;
                    offersAvailable = offerData?.result?.length > 0 || offerData?.message === "Available Offers";
                    hasPendingPayment = offerData?.message === "You have a pending payment. Please clear it to view offers.";
                }
                // Handle pending payment message
                if (hasPendingPayment) {
                    return {
                        content: [{ type: "text", text: offerData.message }],
                        rawText: offerData.message,
                        lastOrderDetails
                    };
                }

                // 🔹 Step 2: If offers are available and no offer was selected → show Smart Offers
                if (!(selectedOffer || selectedOffer === "null" || selectedOffer === "undefined" || selectedOffer === "false") && selectedOffer !== false && offersAvailable) {
                    if (!isExternal) {
                        const html = getSmartCancellationHtml(offerData, { orderNameOrId: orderName, currencyCode, customerId: config.customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount, orderNumber: orderName });

                        const resource = createUIResource({
                            uri: `ui://shopify/Customer/${config.customerId}`,
                            content: { type: "rawHtml", htmlString: html },
                            encoding: "text",
                            mimeType: "text/html"
                        });

                        return { content: [resource] };
                    } else {
                        return {
                            rawText: null,
                            rawData: JSON.stringify(offerData.result),
                            lastOrderDetails
                        };
                    }
                }

                const appSettings = await AppSettings.findOne({ myshopify_domain: config.storefrontUrl });
                const smartCancellation = appSettings?.smartCancellation;
                // 🔹 Step 3: Check for cancellation settings (only if no offers OR user skipped offers)
                // let settingsEnabled;
                // const cancelOrder = getPartnerSmartCancellation()
                const settingsEnabled = smartCancellation?.isOn;
                // if (!isExternal) {
                //     const { cancelOrder } = await partnerDetailsHelper({ cancelOrder: true });
                //     settingsEnabled = cancelOrder?.isOn;
                // } else {
                //     const { cancelOrder } = partnerDetails();
                //     settingsEnabled = cancelOrder?.isOn;
                // }

                if (settingsEnabled && !staffNote) {
                    const cancelOrder = appSettings?.cancelOrder;
                    // Show cancellation settings page before API call
                    if (!isExternal) {
                        const html = getCancellationSettingsHtml(cancelOrder, { mainOId, orderNameOrId: orderName, currencyCode, customerId: config.customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount, orderNo: details.orderNumber });

                        const resource = createUIResource({
                            uri: `ui://shopify/Order/${orderNameOrId}`,
                            content: { type: "rawHtml", htmlString: html },
                            encoding: "text",
                            mimeType: "text/html"
                        });

                        return { content: [resource] };
                    } else {
                        return { rawData: JSON.stringify(cancelOrder) };
                    }
                }

                // 🔹 Step 4: Finally, call Cancel API (after offers/settings logic)
                const data = await cancelOrderAE(mainOId, currencyCode, config.customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount, config);

                const message = data?.data?.message || data?.data?.result?.[0]?.message || data?.statusText || "Order cancelled successfully.";

                // Handle API error responses
                if (data?.status >= 400 && data?.status < 600) {
                    return {
                        content: [{ type: "text", text: message }],
                        rawText: message
                    };
                }
                // let data = null
                // data === null ? data = await getRetentionOffer(mainOId) : data = null
                // if (((selectedOffer == null || undefined) && (data?.data?.result?.length > 0 || data?.data?.message === "Available Offers")) || data?.data?.message === "You have a pending payment. Please clear it to view offers.") {
                //     if (data?.data?.message === "You have a pending payment. Please clear it to view offers.") {
                //         return {
                //             content: [
                //                 {
                //                     type: "text",
                //                     text: data.data.message
                //                 }
                //             ],
                //             rawText: data.data.message,
                //             lastOrderDetails
                //         }
                //     }
                //     if (!isExternal) {
                //         //  html builder
                //         const html = getSmartCancellationHtml(data.data, { orderNameOrId: orderName, currencyCode, customerId: getCustomerId(), customerRefundedAmount, refund, restock, staffNote, totalAmount, orderNumber: orderName })
                //         const resource = createUIResource({
                //             uri: `ui://shopify/Customer/${getCustomerId()}`,
                //             content: {
                //                 type: "rawHtml",
                //                 htmlString: html
                //             },
                //             encoding: "text",
                //             mimeType: "text/html",
                //         });
                //         return {
                //             content: [resource],
                //         };
                //     } else {
                //         return {
                //             rawText: null,
                //             rawData: JSON.stringify(data.data.result),
                //             lastOrderDetails
                //         }
                //     }

                // } else {
                //     const { cancelOrder } = await partnerDetailsHelper({ cancelOrder: true })
                //     if (cancelOrder.isOn && !staffNote) {
                //         if (!isExternal) {
                //             const html = getCancellationSettingsHtml(getPartnerCancelOrder(), { mainOId, orderNameOrId: orderName, currencyCode, customerId: getCustomerId(), customerRefundedAmount, refund, restock, staffNote, totalAmount, orderNo: details.orderNumber })
                //             const resource = createUIResource({
                //                 uri: `ui://shopify/Order/${orderNameOrId}`,
                //                 content: {
                //                     type: "rawHtml",
                //                     htmlString: html
                //                 },
                //                 encoding: "text",
                //                 mimeType: "text/html",
                //             });
                //             return {
                //                 content: [resource],
                //             };
                //         } else {
                //             return {
                //                 rawData: JSON.stringify(getPartnerCancelOrder())
                //             }
                //         }
                //     }
                //     data = await cancelOrderAE(mainOId, currencyCode, getCustomerId(), customerRefundedAmount, refund, restock, staffNote, totalAmount);
                //     console.log("Cancel Order - ", data?.status, "Cancel Order Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                //     if (data?.status >= 400 && data?.status <= 500) {
                //         console.log("message ->", data.data.message);
                //         return {
                //             content: [
                //                 {
                //                     type: "text",
                //                     text: data.data.message
                //                 }
                //             ],
                //             rawText: data.data.message
                //         };
                //     }

                //     if (data?.status >= 500 && data?.status <= 600) {
                //         console.log("message ->", data.statusText);
                //         return {
                //             content: [
                //                 {
                //                     type: "text",
                //                     text: data.statusText
                //                 }
                //             ],
                //             rawText: data.statusText
                //         };
                //     }
                // }

                return {
                    content: [
                        {
                            type: "text",
                            text: message
                        }
                    ],
                    rawText: data.data.message,
                    lastOrderDetails
                }
            } catch (error) {
                console.error("Error in CANCEL_ORDER tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while canceling order."
                        }
                    ],
                    rawText: "Error occurred while canceling order."
                };
            }
        }
    );

    // add smart cancellation offer
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.ADD_CANCEL_OFFER,
        TOOLS.ADD_CANCEL_OFFER_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            type: z.enum(["percentageDiscount", "giftCard", "storeCredit", "giftItems", "discountCode", "freeShipping"]),
            value: z.union([
                z.string(),
                z.number(),
                z.boolean(),
                z.object({ // Added to support freeShipping object structure
                    id: z.string(),
                    title: z.string(),
                    images: z.array(
                        z.object({
                            id: z.string(),
                            altText: z.string().optional(),
                            originalSrc: z.string()
                        })
                    )
                }),
                z.object({
                    id: z.string(),
                    altText: z.string().optional(),
                    originalSrc: z.string()
                })
            ]),
            offerId: z.string(),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, type, value, offerId, config } = arg;
            const isExternal = config.IsExternal;
            try {
                const { id, details, orderName } = await globalOrderId({ id: orderNameOrId, config });
                // const lastOrderDetails = saveDetailsInHistory(details);
                orderNameOrId = id;
                const customerId = config.customerId;
                if (!(customerId === details.customerId)) {
                    console.log("Order Id----> ", details.orderNumber, "CustomerId", customerId, details.customerId);
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Can't Find the Order!! Please try again with another order id."
                            }
                        ],
                        rawText: "Can't Find the Order!! Please try again with another order id."
                    };
                }
                const data = await addRetentionOffer(orderNameOrId, type, value, offerId, config);
                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && (data?.data?.message?.trim() == 'Your discount code is ready. We have sent it to your email.' || data?.data?.message?.trim() == 'A gift card is sent to your email.' || data?.data?.message?.trim() == 'Store credits are added to your account.' || data?.data?.message?.trim() == 'A discount has been successfully applied to your current order.' || data?.data?.message?.trim() == 'Express shipping applied. We will ship this order faster at no cost.')) {
                    let datas = data?.data

                    return {
                        content: [{
                            type: "text",
                            text: datas.message
                        }],
                        rawText: datas.message
                    };
                }

                // if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available' || data.data.message == 'shipping false')) {
                //     const orderData = await searchOrderDetails(orderNameOrId, getStorefrontUrl());
                //     console.log("Search Order Resp -", orderData.status, "Message -", orderData.data?.message || orderData.status || orderData?.data?.result?.[0]?.message);
                //     const orderGid = orderData?.data?.result?.orderId;
                //     orderNameOrId = orderGid?.split("/").pop();

                //     if (!orderData || orderData.status !== 200 || !orderData.data?.result) {
                //         return {
                //             content: [
                //                 {
                //                     type: "text",
                //                     text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                //                 }
                //             ],
                //             rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                //         };
                //     }

                //     // Step 3: Handle errors
                //     if (orderData?.status >= 400 && orderData?.status <= 500) {
                //         return {
                //             content: [{ type: "text", text: orderData.data?.message || "Client error." }],
                //             rawText: orderData.data?.message || "Client error."
                //         };
                //     }

                //     if (orderData?.status >= 500) {
                //         return {
                //             content: [{ type: "text", text: orderData.data?.message || "Server error." }],
                //             rawText: orderData.data?.message || "Server error."
                //         };
                //     }

                //     const { lastOrderDetails } = saveDetailsInHistory(orderData.data.result);

                //     // Step 4: Success
                //     if ((orderData?.status === 200 || orderData?.status === 201) && orderData.data?.result && orderData.data?.message !== "Not available") {
                //         if (!isExternal) {
                //             const html = getOrderDetailsBuild(orderData.data.result);
                //             const resource = createUIResource({
                //                 uri: `ui://shopify/Order/${orderNameOrId}`,
                //                 content: { type: "rawHtml", htmlString: html },
                //                 encoding: "text",
                //                 mimeType: "text/html",
                //             });

                //             return {
                //                 content: [resource],
                //                 lastOrderDetails
                //             };
                //         } else {
                //             return {
                //                 rawData: JSON.stringify(orderData.data.result),
                //                 rawText: "Offer Applied on the order!! Any other changes?",
                //                 lastOrderDetails
                //             }
                //         }
                //     }
                // }

                return {
                    content: [
                        {
                            type: "text",
                            text: data?.data?.message || "Offerssssssssssssss"
                        }
                    ],
                    rawText: data?.data?.message || "Offerssssssssssssss"
                }
            } catch (error) {
                console.error("Error in ADD_SMART_CANCEL_ORDER tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while canceling order."
                        }
                    ],
                    rawText: "Error occurred while canceling order."
                };
            }
        }
    );

    // order list
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.ORDER_LIST,
        TOOLS.ORDER_LIST_DESCRIPTION,
        {
            cursor: z.string().default("").optional(),
            created_at: z.string().default("").optional(),
            updated_at: z.string().default("").optional(),
            delivery_method: DeliveryMethodEnum.optional(),
            orderstatus: z.union([
                OrderStatusEnum,
                z.array(OrderStatusEnum),
                z.string()
            ]).optional(),

            tag: z.string().default("").optional(),
            config: configSchema,
        },
        async (arg) => {
            const { cursor, config, created_at,
                updated_at,
                delivery_method,
                orderstatus,
                tag, } = arg;
            const isExternal = config.IsExternal;
            const customerId = config.customerId;

            try {
                if (customerId == null || customerId == "" || customerId == "GuestId") {
                    console.log("message ->", "Customer not login");
                    return {
                        content: [
                            {
                                type: "text",
                                text: "For get order details we need to customer identity. Do you want to login? "
                            }
                        ],
                        rawText: "For get order details we need to customer identity. Do you want to login? "
                    };
                }

                const data = await orderList(customerId, cursor, config, created_at,
                    updated_at,
                    delivery_method,
                    orderstatus,
                    tag);
                console.log("Order List Fetched: ", data?.status, "Messsage: ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);
                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }
                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    if (!isExternal) {
                        const html = getOrdersListHtml(data.data);
                        const resource = createUIResource({
                            uri: `ui://shopify/Customer/${customerId}`,
                            content: {
                                type: "rawHtml",
                                htmlString: html
                            },
                            encoding: "text",
                            mimeType: "text/html",
                        });
                        return {
                            content: data.data.result === null || data.data.result.orders.length <= 0 ? created_at || updated_at || delivery_method || orderstatus || tag ? [{ type: "text", text: "No orders Made Yet for this filter!!" }] : [{ type: "text", text: "No orders Made Yet!!" }] : [resource],
                        };
                    } else {
                        return {
                            rawData: JSON.stringify(data.data.result),
                            rawText: data.data.result === null || data.data.result.orders.length <= 0 ? created_at || updated_at || delivery_method || orderstatus || tag ? "No orders Made Yet for this filter!!" : "No orders Made Yet!!" : "Here You Got Your Orders!! You can select any of the order to view complete details."
                        }
                    }
                }
                return {
                    content: [{ type: "text", text: data.data.result[0].message }],
                    rawText: data.data.result[0].message
                };
            } catch (error) {
                console.error("Error in ORDER_LIST tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while fetching order list."
                        }
                    ],
                    rawText: "Error occurred while fetching order list."
                };
            }
        }
    );

    // accept refund 
    // registerActiveTool(
    server.tool(
        //     server,
        TOOLS.ACCEPT_REFUND,
        TOOLS.ACCEPT_REFUND_DESCRIPTION,
        {
            orderNameOrId: z.string(),
            reason: z.string().default("Refund Accept"),
            config: configSchema,
        },
        async (arg) => {
            let { orderNameOrId, reason, config } = arg;
            const isExternal = config.IsExternal;
            try {

                const { id, details } = await globalOrderId({ id: orderNameOrId, config });
                const lastOrderDetails = saveDetailsInHistory(details);
                const mainOId = id;

                if (!mainOId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                            }
                        ],
                        rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                    };
                }
                const customerId = config.customerId;
                if (!(customerId === details.customerId)) {
                    console.log("Order Id----> ", details.orderNumber, "CustomerId", customerId, details.customerId);
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Can't Find the Order!! Please try again with another order id."
                            }
                        ],
                        rawText: "Can't Find the Order!! Please try again with another order id."
                    };
                }
                const data = await acceptRefund(mainOId, reason, config);
                console.log("Accept Refund - ", data?.status, "Accept Refund Message - ", data.data.message ? data.data.message ? data.data.message : data.status : data?.data?.result[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const orderData = await searchOrderDetails(orderNameOrId, config);
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
                            ],
                            rawText: "Sorry, I couldn’t identify which order you mean. Can you provide the order number or ID?"
                        };
                    }

                    // Step 3: Handle errors
                    if (orderData?.status >= 400 && orderData?.status <= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Client error." }],
                            rawText: orderData.data?.message || "Client error."
                        };
                    }

                    if (orderData?.status >= 500) {
                        return {
                            content: [{ type: "text", text: orderData.data?.message || "Server error." }],
                            rawText: orderData.data?.message || "Server error."
                        };
                    }

                    const { lastOrderDetails } = saveDetailsInHistory(orderData.data.result);

                    // Step 4: Success
                    if ((orderData?.status === 200 || orderData?.status === 201) && orderData.data?.result && orderData.data?.message !== "Not available") {
                        if (!isExternal) {
                            const html = getOrderDetailsBuild(orderData.data.result, config);
                            const resource = createUIResource({
                                uri: `ui://shopify/Order/${orderNameOrId}`,
                                content: { type: "rawHtml", htmlString: html },
                                encoding: "text",
                                mimeType: "text/html",
                            });

                            return {
                                content: [resource],
                                lastOrderDetails
                            };
                        } else {
                            return {
                                rawData: JSON.stringify(orderData.data.result),
                                rawText: "Refund Applied to the order!! Any other changes you want to make?",
                                lastOrderDetails
                            }
                        }
                    }
                }

                return {
                    content: [{ type: "text", text: data.data.result[0].message }],
                    rawText: data.data.result[0].message
                };
            } catch (error) {
                console.error("Error in ACCEPT_REFUND tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while processing refund."
                        }
                    ],
                    rawText: "Error occurred while processing refund."
                };
            }
        }
    );

    // create ticket
    server.tool(
        TOOLS.CREATE_CHATBOT_TICKET,
        TOOLS.CREATE_CHATBOT_TICKET_DESCRIPTION,
        {
            customerId: z.string().optional(),
            message: z.string(),
            page: z.number().default(1),
            limit: z.number().default(10),
            config: configSchema,
        },
        async (arg) => {
            let { customerId, title, type, message, orderNameOrId, country, customerEmail, page, limit, config } = arg;
            const isExternal = config.IsExternal;
            try {
                customerId = customerId ? customerId : config.customerId

                const data = await createChatbotTicket({ country, customerEmail, customerId, title, type, message, orderNumber: null, orderId: null, config })

                console.log("Customer support - ", data?.status, "Customer Support Message - ", data.data.message ? data.data.message ? data?.data?.message : data?.status : data?.data?.result?.[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                // console.log("data is ---", data.data);

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const ticket = await getSupportDetails({ page, limit, customerId, ticketId: data.data.result._id, config })

                    // console.log("ticket---->", ticket.data)
                    if (ticket?.data?.result?._id.length > 0) {
                        if (!isExternal) {
                            const html = getSupportDetailsHtml(ticket.data.result);
                            const resource = createUIResource({
                                uri: `ui://shopify/Customer/${customerId}`,
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
                        } else {
                            return {
                                rawText: null,
                                rawData: JSON.stringify(ticket.data.result)
                            }
                        }
                    }
                    else {
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: "No ticket found currently"
                                }
                            ],
                            rawText: "No ticket found currently"
                        }
                    }
                }

                return {
                    content: [{ type: "text", text: data.data.result[0].message }],
                    rawText: data.data.result[0].message
                };
            } catch (error) {
                console.error("Error in CREATE_CHATBOT_TICKET tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while processing customer support request."
                        }
                    ],
                    rawText: "Error occurred while processing customer support request."
                };
            }
        }
    );

    // reply chatbot ticket
    server.tool(
        TOOLS.REPLY_CHATBOT_TICKET,
        TOOLS.REPLY_CHATBOT_TICKET_DESCRIPTION,
        {
            ticketId: z.string(),
            message: z.string(),
            senderType: z.string().default("Customer"),
            senderId: z.string().optional(),
            page: z.number().default(1),
            limit: z.number().default(10),
            config: configSchema,
        },
        async (arg) => {
            let { ticketId, message, senderType, senderId, page, limit, customerId, config } = arg;
            const isExternal = config.IsExternal;
            try {
                senderId = customerId ? customerId : config.customerId
                if (!ticketId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Please provide a valid ticket ID to proceed with customer support."
                            }
                        ],
                        rawText: "Please provide a valid ticket ID to proceed with customer support."
                    };
                }

                // console.log("ticketid--->",ticketId,message,senderType, senderId )
                const data = await replyChatbotTicket({ ticketId, message, senderType, senderId, config })
                console.log("Customer support - ", data?.status, "Customer Support Message - ", data?.data?.message ? data?.data?.message ? data?.data?.message : data?.status : data?.data?.result?.[0]?.message);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    const ticket = await getSupportDetails({ page, limit, customerId: null, ticketId: ticketId, config })
                    if (ticket?.data?.result?._id.length > 0 || ticket?.data?.result?.ticketId?.length) {
                        if (!isExternal) {
                            const html = getSupportDetailsHtml(ticket.data.result);
                            const resource = createUIResource({
                                uri: `ui://shopify/Customer/${config.customerId}`,
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
                        } else {
                            return {
                                rawText: null,
                                rawData: JSON.stringify(ticket.data.result)
                            }
                        }
                    }
                    else {
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: "Invaild ticketID"
                                }
                            ]
                        }
                    }
                }

                return {
                    content: [{ type: "text", text: data.data.result[0].message }],
                    rawText: data.data.result[0].message
                };
            } catch (error) {
                console.error("Error in REPLY_CHATBOT_TICKET tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while processing customer support request."
                        }
                    ],
                    rawText: "Error occurred while processing customer support request."
                };
            }
        }
    );

    // ticket details  
    server.tool(
        TOOLS.GET_SUPPORT_DETAILS,
        TOOLS.GET_SUPPORT_DETAILS_DESCRIPTION,
        {
            customerId: z.string().optional(),
            ticketId: z.string().optional(),
            page: z.number().default(1),
            limit: z.number().default(10),
            config: configSchema,
        },
        async (arg) => {
            let { customerId, ticketId, page, limit, config } = arg;
            const isExternal = config.IsExternal;
            try {
                customerId = customerId ? customerId : config.customerId

                if (!customerId && !ticketId) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Please provide a valid ticket Id to proceed with customer support."
                            }
                        ],
                        rawText: "Please provide a valid ticket Id to proceed with customer support."
                    };
                }

                if (customerId && ticketId) {
                    customerId = null
                }

                const data = await getSupportDetails({ page, limit, customerId, ticketId, config })
                console.log("Customer support Details status - ", data?.status, "Customer Support Details Message - ", data?.data?.message ? data?.data?.message ? data?.data?.message : data?.status : data?.data?.result?.[0]?.message ? data?.data?.result?.[0]?.message : data.data);

                if (data?.status >= 400 && data?.status <= 500) {
                    console.log("message ->", data.data.message);
                    return {
                        content: [
                            {
                                type: "text",
                                text: data.data.message
                            }
                        ],
                        rawText: data.data.message
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
                        ],
                        rawText: data.statusText
                    };
                }

                if ((data?.status === 200 || data.status === 201) && !(data.data.message == 'Not available')) {
                    // console.log("data",data);
                    if (!isExternal) {
                        const html = getSupportDetailsHtml(data?.data?.result);
                        const resource = createUIResource({
                            uri: `ui://shopify/Customer/${customerId}`,
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
                    } else {
                        return {
                            rawText: null,
                            rawData: JSON.stringify(data.data.result)
                        }
                    }

                }

                return {
                    content: [{ type: "text", text: data.data.result?.[0].message }],
                    rawText: data.data.result?.[0].message
                };
            } catch (error) {
                console.error("Error in CUSTOMER_SUPPORT tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while processing customer support request."
                        }
                    ],
                    rawText: "Error occurred while processing customer support request."
                };
            }
        }
    );
}
