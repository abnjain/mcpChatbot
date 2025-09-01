import { config } from 'dotenv';
import { AppMokeOrders, OrderEditingHistory } from '../models/model.js';

config();


export async function insights() {
    const orders = await AppMokeOrders.find({ shopName: process.env.SHOP_NAME }).toArray();
    let orderdb = []
    for (const order of orders) {
        orderdb.push(order.chunk);
    }
    const edits = await OrderEditingHistory.find({ myshopify_domain: process.env.SHOP_NAME }).toArray();

    let editsdb = []
    for (const edit of edits) {
        editsdb.push(edit.chunk);
    }
    if (!Array.isArray(orders) || !Array.isArray(edits)) {
        throw new Error("Database query did not return an array");
    }

    const prompt = `
    You are AI assistent who have to give insights of the data
    I will give me my data like orders and edits in which orders related data is given you have
    to analysis this data and give me 3 insights.
    example:-'
    "your snowboard sales is getting down- you should manage price or manage description" 
    "Your sales are up 18% this week compared to last — what drove this growth?",
    "30% of abandoned carts are for items over $100 — should we add a payment installment option?",
    "You’re at 20% stock for your top-selling product — restock soon?",
    "Paid ads are driving more mobile visitors — is the mobile store checkout optimized?",
    "Refund requests have increased by 8% — what’s causing the spike?"
    '
    How to do:-
    I will provide you data you have to analysis the data
     Identify Key Metrics
     Build “Insight Rules like:- if sales_this_week < sales_last_week * 0.9: insights.append("Sales dropped by over 10% compared to last week.")
    Format & Prioritize Insights
    Display
    give insights in one line after summerize like:-
    "You’re at 20% stock for your top-selling product — restock soon?"
    Dataset
    ${JSON.stringify(orderdb)}
    ${JSON.stringify(editsdb)}

    `;

    return prompt;
}

// const fun = async ()=>{
// const pro=await insights()
// console.log(pro)
// const result= await ai.models.generateContent({
//         model: 'gemini-2.0-flash',
//             contents: pro.contents,
//     })

//     const response = result.text;

//     console.log("\n🔹 Gemini AI Response:\n", response);
// }
// fun();