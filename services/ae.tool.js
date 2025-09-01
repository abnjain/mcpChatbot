import axios from "axios"

// const staticApiKey = "ae_aca4b3757c735ef5402a94994c9ef999dab7ad212018aebebce7b7ca88719dbb" || process.env.STATIC_API_KEY
const staticApiKey = "ae_mohit-singh-dev_5f2bd70bf8577e19d28e" || process.env.STATIC_API_KEY
const shop = "mohit-singh-dev.myshopify.com" || process.env.SHOP
const lang = "en"
const extension = "IndividualEditOrderItems"
const BASE_URL = "https://account-editor-stage.fly.dev" || process.env.BASE_URL
const BASIC_URL = "https://customer-account-builder.fly.dev" || process.env.BASIC_URL


export function normalizeUrl(url) {
    if (typeof url !== "string") return "";

    // Ensure protocol
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    // Remove trailing slash (but keep root slash in http:// or https://)
    return url.replace(/\/+$/, "");
}

export async function shopCatalog(query, context, storefrontUrl) {
    try {
        console.log("Fucntions log ", query, context, storefrontUrl);

        const data = {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "search_shop_catalog",
                arguments: {
                    query: query
                        ? `${query}`
                        : "Give me the top 5 new additions of the shop catalog at the store with product listings, categories, and pricing.",

                    context: query
                        ? context
                            ? `The user is interested in exploring the shop catalog for "${query}". Provide structured, user-friendly product listings, including categories, prices, descriptions, and any relevant offers. Additional context: ${context}`
                            : `The user is interested in exploring the shop catalog for "${query}". Provide structured, user-friendly product listings, including categories, prices, descriptions, and any relevant offers.`
                        : context
                            ? `Additional Context: ${context}`
                            : `The user is requesting to see the shop catalog. Provide structured, user-friendly product listings, including categories, prices, descriptions, and any relevant offers.`
                }
            }
        }
        const response = await axios.post(`${normalizeUrl(storefrontUrl)}/api/mcp`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        if (response.data?.error) throw new Error(response.data.error.message, " \n ", response.data.error.data);
        let json = await response.data;
        // console.log("--------------- response :", response.data.result.content[0].text);
        json = JSON.parse(json.result.content[0].text);
        // console.log(response.config);
        console.log(json.products[0].variants);
        return json;
    } catch (err) {
        console.error("Error contacting remote MCP server:", err);
        return "Error Contacting Store or completing request.";
    }
}

export async function shopPolicies(query, context, storefrontUrl) {
    try {
        console.log("Fucntions log ", query, context, storefrontUrl);
        const data = {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "search_shop_policies_and_faqs",
                arguments: {
                    query: query
                        ? query
                        : "Provide the complete shop policies and FAQs, including return/refund policies, shipping details, payment methods, warranties, and customer support information.",

                    context: query
                        ? context
                            ? `The user wants to review the shop policies and FAQs for "${query}". Please organize the information clearly with sections such as returns, refunds, shipping, payments, warranties, and support. Additional context: ${context}`
                            : `The user wants to review the shop policies and FAQs for "${query}". Please organize the information clearly with sections such as returns, refunds, shipping, payments, warranties, and support.`
                        : context
                            ? `Additional context: ${context}`
                            : `The user wants to review the shop policies and FAQs. Please organize the information clearly with sections such as returns, refunds, shipping, payments, warranties, and support.`
                }
            }
        }
        const response = await axios.post(`${normalizeUrl(storefrontUrl)}/api/mcp`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            });
        let json = await response.data;
        if (response.data?.error) return new Error(response.data.error.message, " \n ", response.data.error.data);
        console.log(json.result.content[0].text);
        json = JSON.parse(json.result.content[0].text);
        // console.log("--------------- response :", json);
        return json;
    } catch (err) {
        console.error("Error contacting remote MCP server:", err);
        return "Error Contacting Store or completing request.";
    }
}

export async function cartDetails(storefrontUrl, cartId) {
    try {
        console.log("Fucntions log ", storefrontUrl, cartId);
        const data = {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "get_cart",
                arguments: {
                    cart_id: cartId
                }

            }
        };
        const response = await axios.post(`${normalizeUrl(storefrontUrl)}/api/mcp`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        // console.log(response.data);

        return response.data;
    } catch (error) {
        console.log('Catch error in cartDetails :', error);
        return "Error Contacting Store or completing request.";
    }
}

export async function createCart(storefrontUrl) {
    try {
        console.log("Creating cart for storefront:", storefrontUrl);
        const data = {
            query: `
              mutation {
                cartCreate {
                  cart {
                    id
                    checkoutUrl
                  }
                }
              }
            `
        };
        console.log("Creating cart with data:", data, storefrontUrl);

        const response = await axios.post(
            `${normalizeUrl(storefrontUrl)}/api/2025-07/graphql.json`, // adjust API version if needed
            data.query,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN
                }
            }
        );

        const cartId = response.data.data.cartCreate.cart.id;
        console.log("New cart created:", cartId);
        return cartId;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw new Error("Failed to create a new cart.");
    }
}

export async function updateCartDetails(storefrontUrl, cartId, lines) {
    console.log("Fucntions log ", storefrontUrl, cartId, lines);
    try {
        if (!cartId) {
            return res.status(401).json({message: "Login to a valid account to access cart details.", redirectUrl:"/account/login", isAuthenticated: false});
        };
        const data = {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "update_cart",
                arguments: {
                    cartId: cartId,
                    lines: lines
                }
            }
        };
        // console.log("data ----------------------------- ", data);
        console.log(normalizeUrl(storefrontUrl));

        const response = await axios.post(`${normalizeUrl(storefrontUrl)}/api/mcp`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        // console.log("res ---------------------- ", JSON.stringify(response?.data?.result.content[0] ?? null));
        // console.log("res ---------------------- ", response?.data?.result.content?.[0].text ?? null);

        return response?.data;
    } catch (error) {
        console.log('Catch error in cartDetails :', error);
        return "Error Contacting Store or completing request.";
    }
}

export async function getOrderDetails(orderId) {
    console.log("Fucntions log ", orderId, shop);
    try {
        const response = await axios.post(`${BASIC_URL}/api/chatbot/order-details?shop=${shop}&orderId=${orderId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        );
        console.log("Response from getOrderDetails:", response.data.result.lineItems);

        return response.data
    } catch (error) {
        console.log('Catch error in getOrderDetails :', error)
        return error
    }
}

// add product gid://shopify/ProductVariant/46350554988710 to the order with quantity 2 from 3 

// remove product gid://shopify/ProductVariant/46350554988710 with calculatedLineItemId gid://shopify/CalculatedLineItemId/14748425158822 from the order

// edit quantity of gid://shopify/ProductVariant/46350554988710 with calculatedLineItemId gid://shopify/CalculatedLineItemId/14748425158822 from 2 to 5

// apply discount on my order the code is 20shipping

// accept refund on my order because of defective item

export async function addProduct(orderId, customerId, productVariantId, quantity) {
    console.log("Fucntions log ", orderId, customerId, productVariantId, quantity);
    try {
        // console.log("hit", orderId, "q",query, context);
        const data = [
            {
                productVariantId,
                quantity,
                customerId,
                selectedMethod: null
            }
        ];
        const response = await axios.post(`${BASE_URL}/api/extension/edit/add-item?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.config);

        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function removeProduct(orderId, customerId, productVariantId, calculatedLineItemId) {
    console.log("Fucntions log ", orderId, customerId, productVariantId, calculatedLineItemId);
    try {
        // console.log("hit", orderId, "q",query, context);
        const data = {
            calculatedLineItemId,
            customerId,
            productVariantId,
            selectedMethod: null
        }
        const response = await axios.post(`${BASE_URL}/api/extension/edit/remove-item?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function editQuantity(orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity) {
    console.log("Fucntions log ", orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity);
    try {
        // console.log("hit", orderId, "q",query, context);
        const data = [{
            calculatedLineItemId,
            quantity,
            oldQuantity,
            customerId,
            productVariantId,
            selectedMethod: null
        }]

        const response = await axios.post(`${BASE_URL}/api/extension/edit/edit-item?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function editAddress(orderId, customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip) {
    console.log("Fucntions log ", orderId, customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip);

    const shippingLines = [{
        id: "gid://shopify/ShippingLine/5099757797542",
        originalPriceSet: {
            presentmentMoney: {
                amount: "0.0",
                currencyCode: "USD"
            }
        },
        presentmentMoney: {
            amount: "0.0",
            currencyCode: "USD"
        },
        amount: "0.0",
        title: "Economy"
    }];

    try {
        const data = {
            address1,
            address2,
            city,
            country,
            customerId,    // gid id
            firstName,
            lastName,
            phone,
            province,
            provinceCode,
            selectedMethod: null,
            zip,
        }

        const response = await axios.post(`${BASE_URL}/api/extension/address/check-shipping-address?orderId=${orderId}&language=${lang}&extensionName=${extensionDelivery}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data);

        if (response?.data?.result && response?.data?.result.length > 0) {
            const defaultSelectedMethods = {};
            response.data.result.forEach((group) => {
                const profileId = group.deliveryProfileId;
                if (group.shippingOptions.length > 0) {
                    let matchedIndex = 0; // default to 0 if no match found
                    if (shippingLines.length > 0) {
                        group.shippingOptions.forEach((option, index) => {
                            const optionTitle = option.name;
                            const optionPrice = parseFloat(option.price).toFixed(2); // Normalize to 2 decimal places
                            const matched = shippingLines.some((shippingLine) => {
                                const shippingTitle = shippingLine?.title;
                                const shippingPrice = parseFloat(
                                    shippingLine?.originalPriceSet?.presentmentMoney?.amount
                                ).toFixed(2); // Normalize
                                return (
                                    shippingTitle === optionTitle && shippingPrice === optionPrice
                                );
                            });
                            if (matched && matchedIndex === 0) {
                                matchedIndex = index;
                            }
                        });
                    }
                    const selectedOption = group.shippingOptions[matchedIndex];
                    const value = `${profileId}__${matchedIndex}_<end>_${selectedOption.name}/${selectedOption.price}`;
                    defaultSelectedMethods[profileId] = value;
                }
            });
            //   console.log(defaultSelectedMethods);
            data.selectedMethod = defaultSelectedMethods;
            const response2 = await axios.post(`https://account-editor-stage.fly.dev/api/extension/address/check-shipping-address?orderId=${orderId}&language=${lang}&extensionName=${extensionDelivery}&shop=${shop}&apiKey=${staticApiKey}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            return response2.data;
        }
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function applyDiscount(orderId, discountCode, isChecking, removeOldDiscount) {
    console.log("Fucntions log ", orderId, discountCode, isChecking, removeOldDiscount);
    try {
        const data = {
            discountCode,
            // discountCode: "20shipping",
            isChecking,
            removeOldDiscount
        }

        const response = await axios.post(`${BASE_URL}/api/extension/discount/apply-discount?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function productList(orderId, discountCode, isChecking, removeOldDiscount) {
    console.log("Fucntions log ", orderId, discountCode, isChecking, removeOldDiscount);
    try {
        const data = {
            discountCode,
            // discountCode: "20shipping",
            isChecking,
            removeOldDiscount
        }

        const response = await axios.post(`${BASE_URL}/api/extension/discount/apply-discount?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function cancelOrder(orderId, currencyCode, customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount) {
    console.log("Fucntions log ", orderId, currencyCode, customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount);
    try {
        const data = {
            // currencyCode: "USD",
            currencyCode,
            customerId,
            // customerId: "gid://shopify/Customer/8811884937382",
            customerRefundedAmount,
            // customerRefundedAmount: 154.08,
            // refund: true,
            refund,
            restock,
            // restock: false,
            staffNote,
            // staffNote: "Shipping cost too high",
            // totalAmount: "154.08"
            totalAmount

        }

        const response = await axios.post(`${BASE_URL}/api/extension/cancellation/cancel?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function orderList(customerId, type, cursor) {
    console.log("Fucntions log ", customerId, type, cursor);
    try {
        const data = {
            customerId,
            // customerId: "gid://shopify/Customer/8811884937382",
            type,
            cursor
        }

        const response = await axios.get(`${BASE_URL}/api/extension/fullpage/order-lists?language=${lang}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function acceptRefund(orderId, reason) {
    console.log("Fucntions log ", orderId, reason);
    try {
        console.log(orderId, reason);

        const data = {
            reason
        }
        const response = await axios.post(`${BASE_URL}/api/extension/refund/accept?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${staticApiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}


// getOrderDetails("6070613082181")