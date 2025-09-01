import { GoogleGenAI } from '@google/genai';

// ✅ API key set karo (env me rakho)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY  });
const GEMINI_MODEL = process.env.GEMINI_MODEL ;

export async function getDateRange(userInput) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const prompt = `
You are a date range parser. The user provides natural language input describing a date range, such as "aaj se 5 din pahle", "last 20 days", "May 2025 se June 2025", or "before 25 days". 
Your task is to convert the input into a JSON object with "from" and "to" dates in ISO format (YYYY-MM-DD). 
- If you got nothing then by default set the "from" date to 7 days before today and the "to" date to today.
- Today's date is ${today}.
- For phrases like "before X days", interpret it as a range from X days before today to ${today}.
- For phrases like "last X days", interpret it as a range from X days before today to ${today}.
- For explicit ranges like "May 2025 se June 2025", use the first day of the start month and the last day of the end month unless specified otherwise.
- Always return a valid JSON object with "from" and "to" fields, and no other fields.
- Do not include any explanations or extra text, only the JSON object.
- If the input is ambiguous, assume a reasonable default (e.g., for a single month like "May 2025", use the entire month).
- if user set range after today or you get data for future dates, return an in json (sorry i can't fetch data after today).
User input: "${userInput}"
`;

  try {
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    // Extract response text
    let res = resp.candidates[0].content.parts[0].text.trim();

    // Handle cases where response may or may not be wrapped in ```json
    const match = res.match(/```json([\s\S]*?)```/);
    if (match) {
      res = match[1].trim();
    }

    // Parse the response as JSON
    return JSON.parse(res);
  } catch (error) {
    console.error("Error parsing date range:", error.message);
    throw new Error("Failed to parse date range");
  }
}

// ----------------- Example -----------------
// const input1 = "give me today revinue";
// const input2 = "may 2025 to june 2025";

// getDateRange(input1).then(res => console.log("➡️ Input1:", res)).catch(err => console.error(err));
// getDateRange(input2).then(res => console.log("➡️ Input2:", res)).catch(err => console.error(err));