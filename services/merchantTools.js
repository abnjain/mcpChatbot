import z from "zod"
import { MongoClient } from 'mongodb';
import { insights } from './insights.js'
import { TOOLS } from "../constant/constant.js";
import { awsBedrockClient } from "../index.js";
import { AppMokeOrders, OrderEditingHistory } from '../models/model.js';
import { getDateRange } from './Date_range.js'
import { GoogleGenAI } from "@google/genai";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const GEMINI_API_KEY = "AIzaSyCbPLeeLBXSjcE0Zaxyx0urwmzchs3JiwA";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL_NAME;
const MONGO_URI = process.env.DB_URL;

let end = new Date(); // current time
let start = new Date();
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
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
    return dot / (normA * normB);
}

let count = 0
async function editAgent(query, vectorDb) {
    try {
        let response = "", queryEmbedding = "";
        console.log(EMBEDDING_MODEL, '--------------------------------embedding model');

        if (EMBEDDING_MODEL === 'gemini-embedding-001') {
            // Get embedding for query using Gemini
            // response = await ai.models.embedContent({
            //     model: 'gemini-embedding-001',
            //     contents: query,
            //     outputDimensionality: 768
            // });
            // queryEmbedding = response.embeddings;
        } else if (EMBEDDING_MODEL === 'qllama/bge-small-en-v1.5') {
            // response = await ollamaInst.embeddings({
            //     model: EMBEDDING_MODEL,
            //     prompt: query
            // });
            // queryEmbedding = response.embedding;
        } else if (EMBEDDING_MODEL === 'amazon.titan-embed-text-v1') {
            const input = {
                body: JSON.stringify({ inputText: query }),
                contentType: "application/json",
                accept: "application/json",
                modelId: EMBEDDING_MODEL,
            };
            const command = new InvokeModelCommand(input);
            const response = await awsBedrockClient.send(command);
            const responseBody = JSON.parse(new TextDecoder().decode(response.body));
            console.log("Tokens count for embedding query :", responseBody.inputTextTokenCount);

            const embedding = responseBody.embedding;
            queryEmbedding = embedding;
        }


        const similarities = vectorDb
            .filter(doc =>
                doc.embedding && Array.isArray(doc.embedding) &&
                doc.chunk && typeof doc.chunk === 'string'
            )
            .map(doc => ({
                chunk: doc.chunk,
                similarity: cosineSimilarity(queryEmbedding, doc.embedding, "edit", count)
                // keep `count` if it's defined in your scope
            }));

        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            // .slice(0, 5) // uncomment if you want only top N
            .map(doc => doc.chunk)
            .join('\n');
    } catch (error) {
        console.log("catch error in editAgent :", error);
    }
}

// gemini
async function revenueAgent(query, vectorDb) {
    try {
        let response = ""
        let queryEmbedding = ""
        if (EMBEDDING_MODEL === 'gemini-embedding-001') {
            // Get embedding for query using Gemini
            // response = await ai.models.embedContent({
            //     model: 'gemini-embedding-001',
            //     contents: query,
            //     outputDimensionality: 768
            // });
            // queryEmbedding = response.embeddings;
        }
        else if (EMBEDDING_MODEL === 'qllama/bge-small-en-v1.5') {
            // response = await ollamaInst.embeddings({
            //     model: EMBEDDING_MODEL,
            //     prompt: query
            // });
            // queryEmbedding = response.embedding;
        }
        console.log("-------------before rev vectorDb");

        const similarities = vectorDb
            .filter(doc =>
                doc.embedding && Array.isArray(doc.embedding) &&
                doc.chunk && typeof doc.chunk === 'string'
            )
            .map(doc => ({
                chunk: doc.chunk,
                similarity: cosineSimilarity(queryEmbedding, doc.embedding, "rev")
            }));

        console.log("-------------after rev vectorDb");
        console.log("similarities in revenueAgent");

        return similarities
            .sort((a, b) => b.similarity - a.similarity)
            // .slice(0, 5) // uncomment if you want top-N
            .map(doc => doc.chunk)
            .join('\n');

    }
    catch (error) {
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
export function registerMerchantTools(server) {

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
                console.log("date_range...", date_range.from, date_range.to, start, end);
                if (date_range) {
                    start = new Date(date_range.from);
                    end = new Date(date_range.to);
                }
                // start=date_range.from;
                // end=date_range.to;
                // console.log("today...", start, end);
                // const orders = await AppMokeOrders.find({ shopName: process.env.SHOP_NAME, createdAt: { $gte: end, $lte: start } }).toArray();
                // const edits = await OrderEditingHistory.find({ myshopify_domain: process.env.SHOP_NAME, createdAt: { $gte: end, $lte: start } }).toArray();

                const orders = await AppMokeOrders.find({ shopName: process.env.SHOP_NAME, createdAt: { $gte: start, $lte: end } }).toArray();
                const edits = await OrderEditingHistory.find({ myshopify_domain: process.env.SHOP_NAME, createdAt: { $gte: start, $lte: end } }).toArray();


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

    // insight tool
    server.tool(
        TOOLS.INSIGHTS,
        TOOLS.INSIGHTS_DESCRIPTION,
        async (arg) => {
            try {
                const { inputQuery } = arg;
                const data = await insights({ inputQuery })
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

}
