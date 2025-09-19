import { GoogleGenAI } from "@google/genai";


async function main() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DATABASE);
    const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY });

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: 'What is the meaning of life?',
    });

    console.log(response.embeddings);
}

main();