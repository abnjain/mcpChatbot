'use strict';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { GoogleGenAI } from '@google/genai';
import { registerCustomerTools, setActiveTools } from './services/customerTools.js';
import { Ollama } from 'ollama';
import { dirname } from 'path'; import './db/db.js';
// import { geminiChat } from './AIModels/Gemini/index.js';
// import { ollamaChat } from './AIModels/Ollama/index.js';
import { sseManager } from './utils/sseManager.js';
import { createMCPSessionManager } from './utils/mcpSessionManager.js';
import { AIChatHistory } from './models/model.js';
import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { bedrockChat } from './AIModels/AWS/index.js';
import { registerMerchantTools } from './services/merchantTools.js';
import "./config/config.js"
// import { getIsExternal, getShopToken, getStorefrontUrl, setRequestGlobal } from './store/requestStore.js';
import { appSettingsHelper, partnerDetailsHelper } from './utils/toolsHelper.js';
import { getUserDetails } from './utils/userDetailsHelper.js';
// import { getCustomerDetails, setUserGlobal } from './store/userDetailsStore.js';
import { getConversation, startConversation } from './services/store.data.js';
import { v4 as uuidv4 } from 'uuid';
import { extractRequestConfig } from './utils/extractRequestConfig.js';
// import { normalizeToolNames } from './utils/utils.js';
dotenv.config();

const AwsBedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION, credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BEDROCK_SECRET_KEY,
  }
});


/* ---------- Chat controller (Gemini + MCP client) ---------- */
const ollama = new Ollama({ host: process.env.OLLAMA_URL });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PORT = process.env.PORT || 3000;
const MCP_URL = `http://localhost:${PORT}/sse`;

/* ---------- Express ---------- */
const app = express();
app.use(cors({ origin: true, credentials: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Keep track of active SSE transports for MCP
const customerTransports = {};
// const merchantTransports = {};

// MCP SSE stream (SDK controls the frames; don't write to res yourself)
app.get('/customer-sse', async (req, res) => {
  const customerMcpServer = new McpServer({ name: 'customer-server', version: '1.0.0' });

  registerCustomerTools(customerMcpServer);

  const transport = new SSEServerTransport('/customer-messages', res);
  customerTransports[transport.sessionId] = transport;

  res.on('close', () => {
    delete customerTransports[transport.sessionId];
  });

  await customerMcpServer.connect(transport);
});

// app.get('/merchant-sse', async (req, res) => {
//   const transport = new SSEServerTransport('/merchant-messages', res);
//   merchantTransports[transport.sessionId] = transport;

//   res.on('close', () => {
//     delete merchantTransports[transport.sessionId];
//   });

//   // await merchantMcpServer.connect(transport);
//   await customerMcpServer.connect(transport);
// });

// MCP JSON-RPC post back. Must pass RAW body.
app.post('/customer-messages', async (req, res) => {
  // console.log("req.readable:", req.readable);
  // console.log("req.readable:", req.query);
  const { sessionId } = req.query;
  const transport = customerTransports[sessionId];
  if (!transport) return res.status(400).send('No transport found for sessionId');
  await transport.handlePostMessage(req, res);
});

// app.post('/merchant-messages', async (req, res) => {
//   // console.log("req.readable:", req.readable);
//   // console.log("req.readable:", req.query);
//   const { sessionId } = req.query;
//   const transport = merchantTransports[sessionId];
//   if (!transport) return res.status(400).send('No transport found for sessionId');
//   await transport.handlePostMessage(req, res);
// });

// UI-SSE Connection for Event Stream
app.get('/ui-sse', async (req, res) => {
  // console.log("req.query.connectionData..", req.query.connectionData)
  const connectionData = req.query.connectionData ? JSON.parse(req.query.connectionData) : null;
  // setRequestGlobal(req)
  const { conversationId, newConversation, clientId, storefrontUrl } = connectionData ?? {};

  try {
    // Check if conversation exists in DB
    let history = null;
    if (!newConversation) {
      const conversation = await AIChatHistory.findOne({ conversationId });
      if (clientId === conversation?.clientId) history = conversation.messages
      // console.log("--------- history ", history);      
    };

    // ✅ If found → create SSE connection
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();
    const partner = await partnerDetailsHelper(storefrontUrl); // One Call to set the partner detials for each PartnerDetails
    const pId = partner._id;
    let result = await appSettingsHelper({ integrations: true }, pId)
    let aiChatBot = result.integrations.aiChatBot
    aiChatBot = aiChatBot?.isOn === true ? aiChatBot : null
    // if (!pId) { return res.status(404).json({ message: "No Partner Account Found" }) };
    // setPartnerDetailsGlobal(partner);
    sseManager.addClient(res, conversationId);
    // ✅ Send history as an SSE event
    // if (history) {    
    sseManager.send(conversationId, "partnerAppSetting", aiChatBot)
    sseManager.send(conversationId, "history", history);
    // res.write(`event: history\n`);
    // res.write(`data: ${JSON.stringify(history)}\n\n`);
    // }
    // console.error("success ");
  } catch (err) {
    console.error("Error checking conversationId: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const customerMcpSessionManage = createMCPSessionManager(`http://localhost:${PORT}/customer-sse`);
// export const merchantMcpSessionManager = createMCPSessionManager(`http://localhost:${PORT}/merchant-sse`);
// export const ollamaInst = ollama;
export const awsBedrockClient = AwsBedrockClient;

// app.post("/validate-connection", express.json(), async (req, res) => {
//   try {
//     let { conversationId, clientId, newConversation, storefrontUrl } = req.body
//     // setRequestGlobal(req);
//     const config = extractRequestConfig(req);
//     req.body.config = config;
//     if (!config.shopToken && config.isExternal) { return res.status(403).json({ message: "No shop Token found" }) }
//     if (!storefrontUrl) { return res.status(403).json({ message: "No shop found" }) }
//     const partner = await partnerDetailsHelper(storefrontUrl); // One Call to set the partner detials for each PartnerDetails
//     const pId = partner.partnerId;
//     if (!pId) { return res.status(404).json({ message: "No Partner Account Found" }) };
//     // setPartnerDetailsGlobal(partner);
//     const userDetails = await getUserDetails({ customerId: clientId, shop: storefrontUrl });
//     setUserGlobal(userDetails);
//     let history = null;
//     // if (newConversation && conversationId) {
//     //   const conversation = await startConversation({ clientId, conversationId });
//     //   if (conversation) history = conversation.messages
//     // } else if (newConversation) {
//     //   conversationId = conversationId ? conversationId : uuidv4()
//     //   const conversation = await startConversation({ clientId, conversationId });
//     //   if (conversation) history = conversation.messages
//     // } else {
//     conversationId = conversationId ? conversationId : uuidv4()
//     const conversation = await getConversation({ clientId, conversationId });
//     if (conversation) history = conversation.messages
//     // }

//     res.status(200).json({ ok: true, clientId, conversationId, message: "User Validated and Request Fetched.", userDetails: getCustomerDetails(), storefrontUrl: getStorefrontUrl(), partner, history })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ ok: false, message: "Can't Validate User", error: error.message })
//   }
// })

app.post('/chat', express.json(), async (req, res) => {
  try {
    const config = extractRequestConfig(req);
    req.body.config = config;
    // setRequestGlobal(req);
    if (!config.shopToken && config.isExternal) { return res.status(403).json({ message: "No shop Token found" }) }
    // if (process.env.RUNNING_MODEL === "ollama") {
    //   console.log("-----------------------------------------Running for ollama model....");
    //   ollamaChat(req, res, ollama);
    // } else if (process.env.RUNNING_MODEL === "awsbedrock") {
    //   console.log("-----------------------------------------Running for awsbedrock model....", process.env.BEDROCK_MODEL_ID);
    // req.isExternal = false
    bedrockChat(req, res);
    // } else {
    //   console.log("-----------------------------------------Running for gemini model....");
    //   geminiChat(req, res, ai);
    // }
  } catch (error) {
    console.error(error);
    return res.json(500).json({ ok: false, message: "Chat Error", error: error.message })
  }
});

/* ---------- Static client (built React app) ---------- */
const clientDist = path.join(__dirname, '/react/dist');
app.use(express.static(clientDist));
app.use('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '/react/dist', 'index.html'));
  // res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`MCP SSE:       http://localhost:${PORT}/sse`);
  console.log(`UI SSE:        http://localhost:${PORT}/ui-sse`);
});
