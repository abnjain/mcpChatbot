import dotenv from "dotenv"
dotenv.config();

export const config = {
    staticApiKey: process.env.STATIC_API_KEY,
    shop: process.env.SHOP_NAME,
    lang: process.env.LANG,
    baseUrl: process.env.BASE_URL,
    embeddingModel: process.env.EMBEDDING_MODEL_NAME,
    dbUrl: process.env.DB_URL

}