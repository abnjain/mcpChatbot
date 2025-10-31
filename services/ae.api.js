import axios from "axios"
import { config } from "../config/config.js";

const lang = config.lang
const BASE_URL = "https://account-editor-stage.fly.dev" || config.baseUrl
// const BASE_URL = "https://his-hits-statement-periods.trycloudflare.com" || config.baseUrl


export function normalizeUrl(url) {
    if (typeof url !== "string") return "";

    // Ensure protocol
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    // Remove trailing slash (but keep root slash in http:// or https://)
    return url.replace(/\/+$/, "");
}

export async function shopCatalog(query, context, config) {
    try {
        const { storefrontUrl, partnerDetails } = config;
        console.log("Fucntions log shopCatalog", query, context, storefrontUrl);

        const data = {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "search_shop_catalog",
                arguments: {
                    query: query
                        ? `${query}`
                        : "",

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
        return json;
    } catch (err) {
        console.error("Error contacting remote MCP server:", err);
        return "Error Contacting Store or completing request.";
    }
}

export async function shopPolicies(query, context, config) {
    try {
        const { storefrontUrl, partnerDetails } = config;
        console.log("Fucntions log shopPolicies", query, context, storefrontUrl);
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
        // console.log(json.result.content[0].text);
        json = JSON.parse(json.result.content[0].text);
        // console.log("--------------- response :", json);
        return json;
    } catch (err) {
        console.error("Error contacting remote MCP server:", err);
        return "Error Contacting Store or completing request.";
    }
}

export async function cartDetails(config, cart_id) {
    try {
        const { storefrontUrl, partnerDetails } = config;
        if (cart_id === null || cart_id === "null" || cart_id === "undefined" || cart_id === undefined) cart_id = "";
        console.log("Fucntions log cartDetails", storefrontUrl, cart_id);
        const data = {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "get_cart",
                arguments: {
                    cart_id: cart_id
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
        // console.log("%%%%%%", response.data.result.content);

        return response.data;
    } catch (error) {
        console.log('Catch error in cartDetails :', error);
        return "Error Contacting Store or completing request.";
    }
}

export async function addCartItems(config, cart_id, email, add_items) {
    const { storefrontUrl, partnerDetails } = config;
    if (cart_id === null || cart_id === "null" || cart_id === "undefined" || cart_id === undefined) cart_id = "";
    console.log("Fucntions log addCartItems", storefrontUrl, cart_id, email, add_items);
    try {
        // if (!cart_id) {
        //     return res.status(401).json({ message: "Login to a valid account to access cart details.", redirectUrl: "/account/login", isAuthenticated: false });
        // };
        const data = email == "GuestEmail" || !email ? {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "update_cart",
                arguments: {
                    cart_id,
                    add_items
                }
            }
        } : {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "update_cart",
                arguments: {
                    cart_id,
                    buyer_identity: {
                        email
                    },
                    add_items
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
        // console.log("res ---------------------- ", JSON.stringify(response?.data ?? null));
        // console.log("res ---------------------- ", response?.data?.result?.content?.[0].text ?? null);

        return response?.data?.result?.content?.[0].text;
    } catch (error) {
        console.log('Catch error in cartDetails :', error);
        return "Error Contacting Store or completing request.";
    }
}

export async function updateCartItems(config, cart_id, email, update_items) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log updateCartItems", storefrontUrl, cart_id, email, update_items);
    try {
        const data = email == "GuestEmail" || !email ? {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "update_cart",
                arguments: {
                    cart_id,
                    update_items
                }
            }
        } : {
            jsonrpc: "2.0",
            method: "tools/call",
            id: 1,
            params: {
                name: "update_cart",
                arguments: {
                    cart_id,
                    buyer_identity: {
                        email
                    },
                    update_items
                }
            }
        };
        // console.log("data ----------------------------- ", data);
        // console.log(normalizeUrl(storefrontUrl));

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

// export async function getOrderDetails(orderNameOrId, storefrontUrl) {
//     console.log("Fucntions log getOrderDetails", orderNameOrId, storefrontUrl);
//     try {
//         const apiKey = getApiKey();
//         const response = await axios.get(`${BASE_URL}/api/extension/order/chat-bot/details?orderId=${orderNameOrId}&shop=${storefrontUrl}&apiKey=${apiKey}`,
//             {},
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         // console.log("Response from getOrderDetails:", response);

//         return response
//     } catch (error) {
//         console.log('Catch error in getOrderDetails -----> ', error.config.url + "\n" + error.config.data + "\n" + error)
//         return error.response
//     }
// }

export async function searchOrderDetails(orderNameOrId, config) {
    const { storefrontUrl, partnerDetails } = config;

    console.log("Fucntions log searchOrderDetails", orderNameOrId, storefrontUrl);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = {
            "query": orderNameOrId
        }
        const response = await axios.post(`${BASE_URL}/api/extension/order/chat-bot/details-search?shop=${storefrontUrl}&apiKey=${apiKey}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        );
        // console.log("Response from searchOrderDetails:", response);

        return response
    } catch (error) {
        console.log('Catch error in searchOrderDetails -----> ', error.config?.url + "\n" + error.config.data + "\n", error)
        return error.response
    }
}

export async function addProduct(orderId, customerId, productVariantId, quantity, selectedMethod, config) {
    const { storefrontUrl, partnerDetails } = config;
    const formattedMethod = selectedMethod ? selectedMethod?.profileId === "discountChange" ? { discountChange: selectedMethod?.method } : { [selectedMethod.profileId]: selectedMethod.method } : null
    console.log("Fucntions log ", orderId, customerId, productVariantId, quantity, formattedMethod);
    try {
        const apiKey = partnerDetails?.apiKey;
        // console.log("hit", orderId, "q",query, context);
        const data = [
            {
                productVariantId,
                quantity,
                customerId,
                selectedMethod: formattedMethod
            }
        ];
        const response = await axios.post(`${BASE_URL}/api/extension/edit/add-item?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        // console.log(response);
        return response
    } catch (error) {
        console.log("Catch error in add product -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

export async function removeProduct(orderId, customerId, productVariantId, calculatedLineItemId, selectedMethod, config) {
    const { storefrontUrl, partnerDetails } = config;
    const formattedMethod = selectedMethod ? selectedMethod?.profileId === "discountChange" ? { discountChange: selectedMethod?.method } : { [selectedMethod.profileId]: selectedMethod.method } : null
    calculatedLineItemId = calculatedLineItemId?.replace("/LineItem/", "/CalculatedLineItem/")
    console.log("Fucntions log ", orderId, customerId, productVariantId, calculatedLineItemId, formattedMethod);
    try {
        const apiKey = partnerDetails?.apiKey;
        // console.log("hit", orderId, "q",query, context);
        const data = {
            calculatedLineItemId,
            customerId,
            productVariantId,
            selectedMethod: formattedMethod
        }
        const response = await axios.post(`${BASE_URL}/api/extension/edit/remove-item?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in removeProduct -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

export async function editQuantity(orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod, config) {
    const { storefrontUrl, partnerDetails } = config;
    const formattedMethod = selectedMethod ? selectedMethod?.profileId === "discountChange" ? { discountChange: selectedMethod?.method } : { [selectedMethod.profileId]: selectedMethod.method } : null
    calculatedLineItemId = calculatedLineItemId?.replace("/LineItem/", "/CalculatedLineItem/")
    console.log("Fucntions log editQuantity", orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, formattedMethod);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = [{
            calculatedLineItemId,
            quantity,
            oldQuantity,
            customerId,
            productVariantId,
            selectedMethod: formattedMethod
        }]

        const response = await axios.post(`${BASE_URL}/api/extension/edit/edit-item?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in editQuantity -----> ", error.config.url + "\n" + error.config.data + "\n", error)
        return error.response
    }
}

export async function editAddress(orderId, customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, selectedMethod, config) {
    const { storefrontUrl, partnerDetails } = config;
    const formattedMethod = selectedMethod ? selectedMethod?.profileId === "discountChange" ? { discountChange: selectedMethod?.method } : { [selectedMethod.profileId]: selectedMethod.method } : null
    console.log("Fucntions log ", orderId, customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip, formattedMethod);

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
        const apiKey = partnerDetails?.apiKey;
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
            selectedMethod: formattedMethod,
            zip,
        }

        const response = await axios.post(`${BASE_URL}/api/extension/address/check-shipping-address?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        // if (response?.data?.result && response?.data?.result.length > 0) {
        //     console.log(response.data.result, '----------------------------------------- 455');

        // //     const defaultSelectedMethods = {};
        // //    response.data.result.forEach((group) => {
        // //         const profileId = group.deliveryProfileId;
        // //         if (group.shippingOptions.length > 0) {
        // //             let matchedIndex = 0; // default to 0 if no match found
        // //             if (shippingLines.length > 0) {
        // //                 group.shippingOptions.forEach((option, index) => {
        // //                     const optionTitle = option.name;
        // //                     const optionPrice = parseFloat(option.price).toFixed(2); // Normalize to 2 decimal places
        // //                     const matched = shippingLines.some((shippingLine) => {
        // //                         const shippingTitle = shippingLine?.title;
        // //                         const shippingPrice = parseFloat(
        // //                             shippingLine?.originalPriceSet?.presentmentMoney?.amount
        // //                         ).toFixed(2); // Normalize
        // //                         return (
        // //                             shippingTitle === optionTitle && shippingPrice === optionPrice
        // //                         );
        // //                     });
        // //                     if (matched && matchedIndex === 0) {
        // //                         matchedIndex = index;
        // //                     }
        // //                 });
        // //             }
        // //             const selectedOption = group.shippingOptions[matchedIndex];
        // //             const value = `${profileId}__${matchedIndex}_<end>_${selectedOption.name}/${selectedOption.price}`;
        // //             defaultSelectedMethods[profileId] = value;
        // //         }
        // //     });

        //     // data.selectedMethod = defaultSelectedMethods;


        //     const response2 = await axios.post(`https://account-editor-stage.fly.dev/api/extension/address/check-shipping-address?orderId=${orderId}&language=${lang}&extensionName=${extensionDelivery}&shop=${shop}&apiKey=${apiKey}`,
        //         data,
        //         {
        //             headers: {
        //                 "Content-Type": "application/json"
        //             }
        //         }
        //     );
        //     return response2;
        // }
        return response
    } catch (error) {
        console.log("Catch error in editAddress -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }

}

export async function applyDiscount(orderId, customerId, discountCode, isChecking, removeOldDiscount, config) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log applyDiscount", orderId, customerId, discountCode, isChecking, removeOldDiscount);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = {
            discountCode,
            // discountCode: "20shipping",
            isChecking: isChecking ?? false,
            removeOldDiscount: removeOldDiscount ?? false
        }

        const response = await axios.post(`${BASE_URL}/api/extension/discount/apply-discount?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in applyDiscount -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

// Not in use
// export async function productList(orderId, discountCode, isChecking, removeOldDiscount) {
//     console.log("Fucntions log ", orderId, discountCode, isChecking, removeOldDiscount);
//     try {
//         const apiKey = getApiKey();
//         const data = {
//             discountCode,
//             // discountCode: "20shipping",
//             isChecking,
//             removeOldDiscount
//         }

//         const response = await axios.post(`${BASE_URL}/api/extension/discount/apply-discount?orderId=${orderId}&language=${lang}&shop=${shop}&apiKey=${apiKey}`,
//             data,
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         return response.data
//     } catch (error) {
//         console.log("Catch error in productList -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
//         return error
//     }
// }

export async function cancelOrderAE(orderId, currencyCode, customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount, config) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log ", orderId, currencyCode, customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = {
            currencyCode,
            customerId,
            customerRefundedAmount,
            refund,
            restock,
            staffNote,
            totalAmount
        }

        const response = await axios.post(`${BASE_URL}/api/extension/cancellation/cancel?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in cancelOrder -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error
    }
}

export async function getRetentionOffer(orderId, config) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log getRetentionOffer", orderId);
    try {
        const apiKey = partnerDetails?.apiKey;
        const response = await axios.post(`${BASE_URL}/api/extension/smart-cancellation/get-offers?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        // if (response.data.message === "You have a pending payment. Please clear it to view offers.") {
        //     return response
        // } else 
        return response
    } catch (error) {
        console.log("Catch error in getRetentionOffer -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

export async function addRetentionOffer(orderId, type, value, offerId, config) {
    const { storefrontUrl, partnerDetails } = config;
    if (type === "freeShipping") value = true
    console.log("Fucntions log addRetentionOffer", orderId, type, value, offerId);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = {
            type,
            value,
            offerId
        }
        const response = await axios.post(`${BASE_URL}/api/extension/smart-cancellation/add-offer?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in addRetentionOffer -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

export async function orderList(customerId, cursor, config, created_at,
    updated_at,
    delivery_method,
    // financial_status,
    // fulfillment_status,
    // return_status,
    orderstatus,
    tag,) {
    console.log("Fucntions log ", customerId, cursor);
    try {
        const { storefrontUrl, partnerDetails } = config;
        const apiKey = partnerDetails?.apiKey;
        const data = {
            customerId,
            created_at,
            updated_at,
            delivery_method,
            // financial_status,
            // fulfillment_status,
            // return_status,
            status: orderstatus,
            tag,
            // customerId: "gid://shopify/Customer/8811884937382",
            cursor: ""
        }
  console.log(data, "list ruquest data-------------------");

        const response = await axios.post(`${BASE_URL}/api/extension/order/list?shop=${storefrontUrl}&language=${lang}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data, "list data-------------------");

        return response
    } catch (error) {
        console.log("Catch error in orderList -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

export async function acceptRefund(orderId, reason, config) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log ", orderId, reason);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = {
            reason
        }
        const response = await axios.post(`${BASE_URL}/api/extension/refund/accept?orderId=${orderId}&language=${lang}&shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in acceptRefund -----> ", error.config.url + "\n" + error.config.data + "\n" + error)
        return error.response
    }
}

export async function createChatbotTicket({
    country, customerEmail, customerId, title, type, message, orderNumber, orderId, config
} = {}) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log ", country, customerEmail, customerId, title, type, message, orderNumber, orderId);
    try {
        const apiKey = partnerDetails?.apiKey;
        const data = {
            customerId, message
        };

        const response = await axios.post(
            `${BASE_URL}/api/extension/support/create?shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response;
    } catch (error) {
        console.log(
            "Catch error in createChatbotTicket -----> ",
            error.config?.url + "\n" + JSON.stringify(error.config?.data) + "\n" + error
        );
        return error.response;
    }
}

export async function replyChatbotTicket({ ticketId, message, senderType, senderId, config } = {}) {
    try {
        const { storefrontUrl, partnerDetails } = config;
        const apiKey = partnerDetails?.apiKey;
        const data = {
            ticketId,
            message,
            senderType,
            senderId
        };

        const response = await axios.post(
            `${BASE_URL}/api/extension/support/reply?shop=${storefrontUrl}&apiKey=${apiKey}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        // console.log("response---->",response);

        return response;
    } catch (error) {
        console.log("Catch error in replyChatbotTicket -----> ", error.config.url + "\n" + error.config.data + "\n", error);
        return error.response;
    }
}

export async function getSupportDetails({ page = 1, limit = 1, customerId = null, ticketId = null, config } = {}) {
    const { storefrontUrl, partnerDetails } = config;
    console.log("Fucntions log ", page, limit, customerId, ticketId);
    try {
        const apiKey = partnerDetails?.apiKey;
        let data;
        let response = null
        if (ticketId) {
            data = {
                ticketId,
                page,
                limit,
            };

            response = await axios.post(
                `${BASE_URL}/api/extension/support/details?shop=${storefrontUrl}&apiKey=${apiKey}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        else if (customerId) {
            data = {
                page,
                limit,
                customerId
            };
            response = await axios.post(
                `${BASE_URL}/api/extension/support/list?shop=${storefrontUrl}&apiKey=${apiKey}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } else {
            throw new Error("Either customerId or ticketId is required");
        }

        return response;
    } catch (error) {
        console.log("Catch error in getSupportDetails -----> ", error.config.url + "\n" + error.config.data + "\n", error);
        return error.response;
    }
}

export async function partnerDetails(storefrontUrl) {
    // console.log("Fucntions log partnerDets");
    try {
        const response = await axios.get(`${BASE_URL}/api/store/settings?shop=${storefrontUrl}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response
    } catch (error) {
        console.log("Catch error in partnerDetails -----> ", error.config.url + "\n" + error.config.data + "\n", error)
        return error.response
    }
}