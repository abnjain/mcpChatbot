import z from "zod"
import { addProduct, editQuantity, getOrderDetails, removeProduct, editAddress, applyDiscount, cancelOrder, orderList, acceptRefund, shopPolicies, shopCatalog, cartDetails, updateCartDetails } from "./ae.tool.js"
import { MongoClient } from 'mongodb';
import { insights } from './insights.js'
import { TOOLS } from "../constant/constant.js";
import { createUIResource } from '@mcp-ui/server';
import { ollamaInst } from "../index.js";
import { getOrderDetailsBuild, searchShopCatalogBuild, getCartBuild, getAddProductOrderAEBuild, getFaqPoliciesBuild } from "./htmlBuilder.js";
import { AppMokeOrders, OrderEditingHistory } from '../models/model.js';
import { getDateRange } from './Date_range.js'

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL;
const MONGO_URI = process.env.DB_URL;
// const globalStorefrontUrl = 'shop-chat-agent-674.myshopify.com';

let globalStorefrontUrl = '';
let globalCartId = '';
let globalOrderId = '';
let globalCustomerId = '';
let globalProductVariantId = '';
let globalProductId = '';
let globalCalculatedLineItemId = '';

const end = new Date(); // current time
const start = new Date();
start.setDate(start.getDate() - 30); // go back 30 days
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

async function cosineSimilarity(a, b, val) {
    // console.log("------------------------b",count)

    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    console.log("------------------------val", val)
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
    return dot / (normA * normB);
}

let count = 0
async function editAgent(query, vectorDb) {
    try {
        const { embedding: queryEmbedding } = await ollamaInst.embeddings({
            model: EMBEDDING_MODEL,
            prompt: query
        });
        console.log("-------------after edit  vectorDb", vectorDb.length);

        const similarities = vectorDb
            .filter(doc =>
                doc.embedding && Array.isArray(doc.embedding) &&
                doc.chunk && typeof doc.chunk === 'string'
            )
            .map(doc => ({


                chunk: doc.chunk,
                similarity: cosineSimilarity(queryEmbedding, doc.embedding, "edit", count)

            }));
        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            // .slice(0, 5)
            .map(doc => doc.chunk)
            .join('\n');
    } catch (error) {
        console.log("catch error in editAgent :", error);
    }
}

async function revenueAgent(query, vectorDb) {
    try {
        const { embedding: queryEmbedding } = await ollamaInst.embeddings({
            model: EMBEDDING_MODEL,
            prompt: query
        });

        console.log("-------------before  rev vectorDb");
        const similarities = vectorDb
            .filter(doc =>
                doc.embedding && Array.isArray(doc.embedding) &&
                doc.chunk && typeof doc.chunk === 'string'
            )
            .map(doc => ({
                chunk: doc.chunk,
                similarity: cosineSimilarity(queryEmbedding, doc.embedding, "rev")
            }));

        console.log("-------------after  rev vectorDb", vectorDb.length);
        console.log("similarities in revenueAgent");

        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            // .slice(0, 5)
            .map(doc => doc.chunk)
            .join('\n');

    } catch (error) {
        console.log("catch error in revenueAgent :", error);
    }
}

async function getContextForQuery(query, revenueDb, editDb) {

    const [revenueContext, editContext] = await Promise.all([
        revenueAgent(query, revenueDb),
        editAgent(query, editDb)
    ]);


    return {
        revenueContext,
        editContext
    };
}
// Export a function to register all tools
export function registerTools(server) {

    // rag tool
    server.tool(
        TOOLS.STORE_FRONT_DATABASE,
        TOOLS.STORE_FRONT_DATABASE_DESCRIPTION,
        {
            inputQuery: z.string()
        },
        async (arg) => {
            try {
                const { inputQuery } = arg;

                const client = new MongoClient(MONGO_URI);

                await client.connect();

                const date_range = await getDateRange(inputQuery);
                console.log("date_range...", date_range);
                console.log("today...", start, end);
                // const orders = await AppMokeOrders.find({ shopName: process.env.SHOP_NAME, createdAt: { $gte: end, $lte: start } }).toArray();
                // const edits = await OrderEditingHistory.find({ myshopify_domain: process.env.SHOP_NAME, createdAt: { $gte: end, $lte: start } }).toArray();

                const orders = await AppMokeOrders.find({ shopName: process.env.SHOP_NAME, createdAt: "2025-08-06T10:19:03.860Z" }).toArray();
                const edits = await OrderEditingHistory.find({ myshopify_domain: process.env.SHOP_NAME, createAT }).toArray();

                console.log(orders, '------------------------------------------orders');

                console.log(edits, '------------------------------------------edits');



                if (!Array.isArray(orders) || !Array.isArray(edits)) {
                    throw new Error("Database query did not return an array");
                }

                console.log("total data in orders db...", orders.length);

                console.log("total data in db edits...", edits.length);

                console.log("get data")
                const { revenueContext, editContext } = await getContextForQuery(inputQuery, orders, edits);

                const prompt = `
                    You are an AI assistant helping an e-commerce store optimize its product performance.
    
                    User Query:
                    ${inputQuery}
    
    
                    Use the context below if the query requires data lookup or product insights:
                    first read user query is it asking about data so do below if not from database then give normal reply
                    read the user query and answer after analysis the data
                    (
                    --- Context: Orders Revenue ---
                    ${revenueContext}
    
                    --- Context: Order Edits ---
                    ${editContext}
                    you get data in from of sql query you have convert it in meaningful text
                    Give final results only with some details. Don't generate code.
                        )
                `;
                console.log("------------------------------------- dfdsfds", prompt);

                return {
                    content: [
                        {
                            type: "text",
                            text: prompt
                        }
                    ]
                };
            } catch (error) {
                console.error("Error in STORE_FRONT_DATABASE tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to retrieve data from the database.`
                        }
                    ]
                };
            }
        }
    )

    // find products list
    server.tool(
        TOOLS.SEARCH_SHOP_CATALOG,
        TOOLS.SEARCH_SHOP_CATALOG_DESCRIPTION,
        {
            query: z.string(),
            context: z.string().optional(),
            storefrontUrl: z.string().default(globalStorefrontUrl)
        },
        async (arg) => {
            let storefrontUrl = globalStorefrontUrl ? globalStorefrontUrl : arg.storefrontUrl;
            globalStorefrontUrl = storefrontUrl;
            const { query, context } = arg
            try {
                // console.log("Prompted for search catalog: ", query, context, globalStorefrontUrl);
                // Send MCP-formatted request to external MCP server
                const data = await shopCatalog(query, context, globalStorefrontUrl);

                console.log(data);
                
                if (data?.products?.length <= 0) return {content: [{type: "text", text: "The product details for this store are not currently listed in the available information. For further assistance, please visit the store's official website or use products available there. If you have any other questions about products or services, I am here to help."}]};
                const html = searchShopCatalogBuild(data);
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

                return {
                    content: [resource],
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
            storefrontUrl: z.string().default(globalStorefrontUrl)
        },
        async (arg) => {
            let storefrontUrl = globalStorefrontUrl ? globalStorefrontUrl : arg.storefrontUrl;
            globalStorefrontUrl = storefrontUrl;
            const { query, context } = arg;
            try {
                // Send MCP-formatted request to external MCP server
                const data = await shopPolicies(query, context, globalStorefrontUrl);
                if (data?.length <= 0 || typeof(data) === "string") return {content: [{ type:"text", text: "No Such FAQ or policy currently found.Please Visit Shop to see more enhanced Queries and FAQs"}]};
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
        {
            storefrontUrl: z.string().default(globalStorefrontUrl),
            cartId: z.string().optional().default(null)
        },
        async (arg) => {
            let storefrontUrl = globalStorefrontUrl ? globalStorefrontUrl : arg.storefrontUrl;
            globalStorefrontUrl = storefrontUrl;
            let cartId = globalCartId ? globalCartId : arg.cartId;
            globalCartId = cartId;
            try {
                // console.log("Prompted for cart details: ", globalStorefrontUrl, cartId);
                // If no cartId, create a new cart first
                // console.log(/^gid:\/\/shopify\/Cart\/[A-Za-z0-9_-]+$/.test(cartId));
                if (!/^gid:\/\/shopify\/Cart\/[A-Za-z0-9_-]+(\?.+)?$/.test(cartId)) {
                    cartId = await createCart(storefrontUrl, cartId);
                    console.log("New cart created with ID: ", cartId);
                }
                // Send MCP-formatted request to external MCP server
                // const cartId2 = "gid://shopify/Cart/hWN2EhsIWjBk0zioBQoTxbym?key=23625e4037a148ecafafd9246c70c12e"
                const data = await cartDetails(globalStorefrontUrl, cartId);
                console.log(data.cart);
                
                // Return the content exactly as received from remote MCP
                if (data.isAuthenticated) return {
                    content: [
                        {
                            type: "text",
                            text: data
                        }
                    ]
                };
                
                if (data?.products?.length <= 0) return {content: [{text: "No Products Found Currently in your cart"}]};
                const html = getCartBuild(data); 
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
                // console.log(data);

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

    // update cart lines from shopify
    server.tool(
        TOOLS.UPDATE_CART,
        TOOLS.UPDATE_CART_DESCRIPTION,
        {
            storefrontUrl: z.string().default(globalStorefrontUrl),
            cartId: z.string(),
            lines: z.array(z.object({
                merchandise_id: z.string(),
                quantity: z.number()
            }))
        },
        async (arg) => {
            let storefrontUrl = globalStorefrontUrl ? globalStorefrontUrl : arg.storefrontUrl;
            globalStorefrontUrl = storefrontUrl;
            const { cartId, lines } = arg;
            console.log("Updating cart:", cartId, lines, globalStorefrontUrl);

            try {
                const data = await updateCartDetails(globalStorefrontUrl, cartId, lines);

                // if (data?.products.length >= 0) return {content: [{text: "No Products Added Currently in your cart"}]};
                const html = getCartBuild(data);
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
                console.log(`Tool ${TOOLS.ADD_NUMBERS} calling...`);
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

    // order details
    server.tool(
        TOOLS.ORDER_DETAILS,
        TOOLS.ORDER_DETAILS_DESCRIPTION,
        {
            orderId: z.string(),
        },
        async (arg) => {
            try {
                const { orderId } = arg;
                const orderData = await getOrderDetails(orderId);

                // console.log(orderData);
                const html = getOrderDetailsBuild(orderData.result);
                // console.log("------------------------------------ html",html);

                const resource = createUIResource({
                    uri: `ui://shopify/order/${orderId}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });
                // console.log(resource);

                return {
                    content: [resource],
                };
            } catch (error) {
                console.error("Error fetching order details:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to fetch order details."
                        }
                    ]
                };
            }
        }
    );

    // add product
    server.tool(
        TOOLS.ADD_PRODUCT,
        TOOLS.ADD_PRODUCT_DESCRIPTION,
        {
            query: z.string().optional(),
            context: z.string().optional(),
            orderId: z.string(),
            customerId: z.string(),
            productVariantId: z.string(),
            quantity: z.number()
        },
        async (arg) => {
            try {
                const { orderId, customerId, productVariantId, quantity } = arg;
                const data = await addProduct(orderId, customerId, productVariantId, quantity)
                console.log(data);
                const html = getAddProductOrderAEBuild(data);
                const firstId = data?.[0]?.id;
                const resource = createUIResource({
                    uri: `ui://shopify/order/${orderId}/add-product/${firstId}`,
                    content: {
                        type: "rawHtml",
                        htmlString: html
                    },
                    encoding: "text",
                    mimeType: "text/html",
                });

                return {
                    content: [resource]
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
            query: z.string().optional(),
            context: z.string().optional(),
            orderId: z.string(),
            customerId: z.string(),
            productVariantId: z.string(),
            calculatedLineItemId: z.string()
        },
        async (arg) => {
            try {
                const { orderId, customerId, productVariantId, calculatedLineItemId } = arg;
                const data = await removeProduct(orderId, customerId, productVariantId, calculatedLineItemId)
                console.log(data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
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
            query: z.string().optional(),
            context: z.string().optional(),
            orderId: z.string(),
            calculatedLineItemId: z.string(),
            quantity: z.number(),
            oldQuantity: z.number(),
            customerId: z.string(),
            productVariantId: z.string()
        },
        async (arg) => {
            try {
                const { orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity } = arg;
                const data = await editQuantity(orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity)
                console.log(data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
                        }
                    ]
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
            query: z.string().optional(),
            context: z.string().optional(),
            customerId: z.string(),
            address1: z.string(),
            address2: z.string(),
            orderId: z.string(),
            city: z.string(),
            country: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            phone: z.string(),
            province: z.string(),
            provinceCode: z.string(),
            zip: z.string()
        },
        async (arg) => {
            try {
                const { orderId, customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip } = arg;
                const data = await editAddress(orderId, customerId, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip)
                console.log(data.data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
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
            query: z.string().optional(),
            context: z.string().optional(),
            orderId: z.string(),
            discountCode: z.string(),
            isChecking: z.boolean().default(false),
            removeOldDiscount: z.boolean().default(false)
        },
        async (arg) => {
            try {
                const { orderId, customerId, discountCode, isChecking, removeOldDiscount } = arg;
                const data = await applyDiscount(orderId, customerId, discountCode, isChecking, removeOldDiscount)
                console.log(data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
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
            query: z.string().optional(),
            context: z.string().optional(),
            orderId: z.string(),
            currencyCode: z.string(),
            customerId: z.string(),
            customerRefundedAmount: z.number().min(0).optional(),
            refund: z.boolean().default(false),
            restock: z.boolean().default(false),
            staffNote: z.string().max(500).optional(),
            totalAmount: z.string()
        },
        async (arg) => {
            try {
                const { orderId, currencyCode, customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount } = arg;
                const data = await cancelOrder(orderId, currencyCode, customerId, customerRefundedAmount, refund, restock, staffNote, totalAmount);
                console.log(data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
                        }
                    ]
                };
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

    // order list (not working because of token requirement in headers)
    server.tool(
        TOOLS.ORDER_LIST,
        TOOLS.ORDER_LIST_DESCRIPTION,
        {
            query: z.string().optional(),
            context: z.string().optional().default(""),
            customerId: z.string(),
            type: z.string().default("").optional(),
            cursor: z.string().default("").optional()
        },
        async (arg) => {
            try {
                const { customerId, type, cursor } = arg;
                const data = await orderList(customerId, type, cursor);
                console.log(data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
                        }
                    ]
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
            query: z.string().optional().default(""),
            context: z.string().optional().default(""),
            orderId: z.number(),
            reason: z.string().default("Refund Accept"),
        },
        async (arg) => {
            try {
                const { orderId, reason } = arg;
                const data = await acceptRefund(orderId, reason);
                console.log(data);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(data, null, 2)
                        }
                    ]
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

    // insight tool
    server.tool(
        TOOLS.INSIGHTS,
        TOOLS.INSIGHTS_DESCRIPTION,
        async (arg) => {
            try {
                const data = await insights()
                // console.log(data)

                return {
                    content: [
                        {
                            type: "text",
                            text: data
                        }
                    ]
                }
            } catch (error) {
                console.error("Error in INSIGHTS tool:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error occurred while fetching insights."
                        }
                    ]
                };
            }
        }
    )

}
