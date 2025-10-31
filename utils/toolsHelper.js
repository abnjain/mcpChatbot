import { AppSettings, Partner } from "../models/model.js";
import { partnerDetails, searchOrderDetails } from "../services/ae.api.js";
// import { setPartnerDetailsGlobal } from "../store/partnerDetailsStore.js";
// import { getStorefrontUrl } from "../store/requestStore.js";
// import { setShopGlobal } from "../store/shopStore.js";

export function saveDetailsInHistory(details) {
    if (!details) {
        return "No Details found"
    }
    let shippingAddress = { ...details.shippingAddress };
    shippingAddress.country = shippingAddress.countryCode;
    let lastOrderDetails = {
        refundedAmount: details.refundAmount,
        totalPaidAmount: details.totalPaidAmount,
        lineItems: details.lineItems
            .filter(item => item.currentQuantity !== 0)  // Filter out items where currentQuantity is 0
            .map(item => ({ // Then map the remaining items
                id: item.id,
                quantity: item.quantity,
                currentQuantity: item.currentQuantity,
                title: item.title,
                variant: {
                    id: item.variant?.id ? item.variant.id : null,
                    title: item.variant?.title ? item.variant.title : null
                }
            })),
        orderNumber: details.orderNumber,
        currencyCode: details.currencyCode,
        totalOutstanding: {
            amount: details.totalOutstanding.amount
        },
        shippingAddress: shippingAddress,
        customerId: details.customerId,
        orderId: details.orderId
    };

    lastOrderDetails = cleanObject(lastOrderDetails)

    return {
        lastOrderDetails
    };
}

// export function saveCartDetailsInHistory(details) {
//     if (!details || !details.cart) {
//         return "No Cart Details found";
//     }

//     const cart = details;

//     // Extract shop domain from checkout_url
//     const shopUrl = cart.checkout_url
//         ? new URL(cart.checkout_url).origin.replace("https://", "")
//         : null;

//     // Map through cart lines
//     const lineItems = (cart.lines || []).map(line => ({
//         id: line.id,
//         quantity: line.quantity,
//         totalAmount: line.cost?.total_amount?.amount || null,
//         subtotalAmount: line.cost?.subtotal_amount?.amount || null,
//         currency: line.cost?.total_amount?.currency || null,
//         merchandiseId: line.merchandise?.id || null,
//         productTitle: line.merchandise?.product?.title || null,
//         variantTitle: line.merchandise?.title || null,
//         productId: line.merchandise?.product?.id || null
//     }));

//     const lastCartDetails = {
//         cart_id: cart.id,
//         createdAt: cart.created_at,
//         updatedAt: cart.updated_at,
//         shopUrl: shopUrl,
//         checkoutUrl: cart.checkout_url,
//         totalQuantity: cart.total_quantity || 0,
//         currency: cart.cost?.total_amount?.currency || "USD",
//         subtotalAmount: cart.cost?.subtotal_amount?.amount || "0.00",
//         totalAmount: cart.cost?.total_amount?.amount || "0.00",
//         buyer: {
//             email: cart.buyer_identity?.email || null,
//             countryCode: cart.buyer_identity?.country_code || null
//         },
//         discounts: cart.discounts || {},
//         giftCards: cart.gift_cards || [],
//         lineItems
//     };

//     return {
//         lastCartDetails: cleanObject(lastCartDetails)
//     };
// }

export function saveCartDetailsInHistory(details) {
    if (!details || !details.cart) {
        return "No Cart Details found";
    }

    const cart = details;

    // Extract shop domain from checkout_url
    const shopUrl = cart.checkout_url
        ? new URL(cart.checkout_url).origin.replace("https://", "")
        : null;

    // Map through cart lines
    const lineItems = (cart.lines || []).map(line => ({
        id: line.id,
        quantity: line.quantity,
        totalAmount: line.cost?.total_amount?.amount || null,
        subtotalAmount: line.cost?.subtotal_amount?.amount || null,
        currency: line.cost?.total_amount?.currency || null,
        merchandiseId: line.merchandise?.id || null,
        productTitle: line.merchandise?.product?.title || null,
        variantTitle: line.merchandise?.title || null,
        productId: line.merchandise?.product?.id || null
    }));

    const lastCartDetails = {
        cart_id: cart.id,
        createdAt: cart.created_at,
        updatedAt: cart.updated_at,
        shopUrl: shopUrl,
        checkoutUrl: cart.checkout_url,
        totalQuantity: cart.total_quantity || 0,
        currency: cart.cost?.total_amount?.currency || "USD",
        subtotalAmount: cart.cost?.subtotal_amount?.amount || "0.00",
        totalAmount: cart.cost?.total_amount?.amount || "0.00",
        buyer: {
            email: cart.buyer_identity?.email || null,
            countryCode: cart.buyer_identity?.country_code || null
        },
        discounts: cart.discounts || {},
        giftCards: cart.gift_cards || [],
        lineItems
    };

    return {
        lastCartDetails: cleanObject(lastCartDetails)
    };
}

export async function partnerDetailsHelper(storefrontUrl, needs = {}) {
    try {
        // const storefrontUrl = getStorefrontUrl()
        const response = await Partner.findOne({ myshopify_domain: storefrontUrl });
        return response;
        // // console.log(response, "================================dfosjf;odsofi");
        // const pDets = response
        // // Create a result object to store requested properties
        // const result = {};

        // // Iterate over the needs object and extract matching properties from pDets
        // for (const key of Object.keys(needs)) {
        //     if (needs[key] && pDets.hasOwnProperty(key)) {
        //         result[key] = pDets[key];
        //     } else if (needs[key]) {
        //         console.warn(`Property ${key} not found in pDets`);
        //         result[key] = null; // Or handle missing properties differently
        //     }
        // }

        // // If no requested properties were found, return null or throw an error
        // if (Object.keys(result).length === 0) {
        //     console.warn("No requested properties found in pDets");
        //     return null; // Or return pDets as a fallback
        // }

        // return result;
    } catch (error) {
        console.error("Error in partnerDetailsHelper:", error);
        return error.message;
    }
}

// Not in Use
export async function orderDetails(orderNameOrId) {
    try {
        const orderData = await searchOrderDetails(orderNameOrId, config);
        // console.log(orderData.data)
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

            const lastOrderDetails = saveDetailsInHistory(orderData.data.result);

            return {
                content: [resource],
                lastOrderDetails
            };
        }
    } catch (error) {
        console.log("Fetching Order Details Error: ", error);
        return error.message
    }
}

export function cleanObject(obj) {
    if (Array.isArray(obj)) {
        return obj
            .map(cleanObject)               // clean each element
            .filter(item => !!item);        // remove falsy elements
    } else if (obj && typeof obj === "object") {
        return Object.entries(obj)
            .reduce((acc, [key, value]) => {
                const cleanedValue = cleanObject(value); // recursive clean
                if (cleanedValue || cleanedValue === 0) { // keep 0 explicitly
                    acc[key] = cleanedValue;
                }
                return acc;
            }, {});
    } else {
        return obj;
    }
}

export async function appSettingsHelper(needs = {}, pId) {
    try {
        const response = await AppSettings.findOne({ partnerId: pId });
        // console.log(response, "================================dfosjf;odsofi");
        const pDets = response;
        if (!needs || Object.keys(needs).length === 0) {
            return pDets;
        }

        // Create a result object to store requested properties
        const result = {};

        // Iterate over the needs object and extract matching properties from pDets
        for (const key of Object.keys(needs)) {
            if (needs[key] && pDets.hasOwnProperty(key)) {
                result[key] = pDets[key];
            } else if (needs[key]) {
                console.warn(`Property ${key} not found in pDets`);
                result[key] = null; // Or handle missing properties differently
            }
        }

        // If no requested properties were found, return null or throw an error
        if (Object.keys(result).length === 0) {
            console.warn("No requested properties found in pDets");
            return null; // Or return pDets as a fallback
        }

        return result;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}