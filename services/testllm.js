import { MongoClient } from 'mongodb';
// import ollama from 'ollama';
import readlineSync from 'readline-sync';
import { GoogleGenAI } from '@google/genai';

// const EMBEDDING_MODEL = 'qllama/bge-small-en-v1.5';
const GEMINI_API_KEY = "AIzaSyCbPLeeLBXSjcE0Zaxyx0urwmzchs3JiwA";
const MONGO_URI = 'mongodb+srv://hello:Heyynewone@shopme.bc3r9.mongodb.net/';
const DATABASE = 'mongorag';
const COLLECTION_ORDERS = 'rag_collection';
const COLLECTION_EDITS = 'ordereditinghistories';

async function main() {
    const client = new MongoClient(MONGO_URI);
    const history = [];
    await client.connect();
    const db = client.db(DATABASE);
    // const collection = db.collection(DATABASE);

 //   const vectorDb = await collection.find({ shopName: "manish-singh-qa.myshopify.com" }).toArray();

  const orders = await db.collection(COLLECTION_ORDERS).findAll({ }).toArray();
//   const edits = await db.collection(COLLECTION_EDITS).findAll({ partnerId: "685d3fece8167cd6fe80d46b"}).toArray();

//   685d3fece8167cd6fe80d46b
    console.log("total data in orders db...", orders.length);
    
    console.log("total data in db edits...", edits.length);
    const genaiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    //   const model = genaiClient.models({ model: "gemini-2.0-flash" });

    let inputQuery = readlineSync.question("Ask me a question (type 'exit' to quit): ");

    while (inputQuery !== "exit") {
        const start = Date.now();
        // const retrieved = await retrieve(inputQuery, vectorDb);
       
        const {revenueContext,  editContext } = await getContextForQuery(inputQuery,orders,  edits);

        // const context = retrieved.map(item => item.chunk).join('\n');

        const prompt = `
You are an AI assistant helping an e-commerce store optimize its product performance.

User Query:
${inputQuery}


Use the context below if the query requires data lookup or product insights:
first read user query is it asking about data so do below if not from database then give normal reply
read the user query and answer after analysis the data
(
--- Context: Orders Revenue ---
${revenueContext.slice(0,20)}

--- Context: Order Edits ---
you get data in from of sql query you have convert it in meaningful text
Give final results only with some details. Don't generate code.
    )
`;

// const prompt=`No need to find in all database, 
// classify the database according to user query and then search accroding to ${inputQuery} find the ans from this database ${revenueContext.slice(0,10)}. `

        // const result = await genaiClient.models.generateContent({
        //     model: 'gemini-2.0-flash',
        //     contents: prompt,
        // });
        // const response = result.text;

        // console.log("\n🔹 Gemini AI Response:\n", response);



const result = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content:prompt  }],
})
  console.log("\n🔹 Gemini AI Response1:\n", result.message.content);
      const response = result.message.content;

        console.log("\n🔹 Gemini AI Response:\n", response);

        history.push(`User: ${inputQuery}`);
        history.push(`AI: ${response}`);

        const end = Date.now();
        console.log("\n🕒 Time taken:", (end - start) / 1000, "seconds");
        console.log("\n📜 Recent History:");
        // console.log(history.slice(-3).join('\n'));

        inputQuery = readlineSync.question("\nAsk me a question (or type 'exit'): ");
    }

    await client.close();
}

main().catch(console.error);