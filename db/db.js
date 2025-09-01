import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let db;
export const connectDB = async () => {
    try {
        const dataBaseUrl = process.env.DB_URL || "mongodb://localhost:27017/";
        const dataBaseName = process.env.DB_NAME || "account-editor";
        console.log('process.env.DB_URL--', dataBaseUrl);
        const client = new MongoClient(dataBaseUrl);
        await client.connect();
        console.log('process.env.DB_NAME', dataBaseName);
        db = client.db(dataBaseName);
        console.log("MongoDB Connected Successfully For DB URL :", `${dataBaseUrl}${dataBaseName}`);
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

await connectDB()
export const getDB = () => db;

