'use strict';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { GoogleGenAI } from '@google/genai';
import { registerTools } from './services/tools.js';
import { registerPrompts } from './services/prompts.js';
import { Ollama } from 'ollama';
import { dirname } from 'path'; import './db/db.js';
import { geminiChat } from './AIModels/Gemini/index.js';
import { ollamaChat } from './AIModels/Ollama/index.js';
import { sseManager } from './utils/sseManager.js';
import { createMCPSessionManager } from './utils/mcpSessionManager.js';

dotenv.config();

/* ---------- Chat controller (Gemini + MCP client) ---------- */
// const ollama = new Ollama({ host: process.env.OLLAMA_URL || 'http://localhost:11434' });
const ollama = new Ollama({ host:  process.env.OLLAMA_URL });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PORT = process.env.PORT || 3000;
const MCP_URL = `http://localhost:${PORT}/sse`;

/* ---------- Express ---------- */
const app = express();
app.use(cors({ origin: true, credentials: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ---------- MCP Server (tools live here) ---------- */
const mcpServer = new McpServer({ name: 'web-client', version: '1.0.0' });
registerTools(mcpServer);
registerPrompts(mcpServer);
// console.log(mcpServer);

// Keep track of active SSE transports for MCP
const transports = {}; // sessionId -> SSEServerTransport

// MCP SSE stream (SDK controls the frames; don't write to res yourself)
app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;

  res.on('close', () => {
    delete transports[transport.sessionId];
  });

  await mcpServer.connect(transport);
});

// MCP JSON-RPC post back. Must pass RAW body.
app.post('/messages', async (req, res) => {
  console.log("req.readable:", req.readable); // should be true here
  console.log("req.readable:", req.query); // should be true here
  const { sessionId } = req.query;
  const transport = transports[sessionId];
  if (!transport) return res.status(400).send('No transport found for sessionId');
  await transport.handlePostMessage(req, res);
});

app.get('/ui-sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseManager.addClient(res);
});

export const mcpSessionManager = createMCPSessionManager(MCP_URL);
export const ollamaInst = ollama;
app.post('/chat', express.json(), async (req, res) => {
  if (process.env.RUNNING_MODEL === "ollama") {
    console.log("-----------------------------------------Running for ollama model....");
    req.isExternal=false
    ollamaChat(req, res, ollama);
  } else {
    console.log("-----------------------------------------Running for gemini model....");
    req.isExternal=false
    geminiChat(req, res, ai);
  }
});

app.post('/requests', express.json(), async (req, res) => {
  if (process.env.RUNNING_MODEL === "ollama") {
    console.log("-----------------------------------------Running for ollama model....");
    req.isExternal=true
    ollamaChat(req, res, ollama);
  } else {
    console.log("-----------------------------------------Running for gemini model....");
    req.isExternal=true
    geminiChat(req, res, ai);
  }
});

// https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
// ----------------------------------------------------------
app.post('/requests', express.json(), async (req, res) => {
  if (process.env.RUNNING_MODEL === "ollama") {
    console.log("-----------------------------------------Running for ollama model....");
    ollamaChat(req, res, ollama);
  } else {
    console.log("-----------------------------------------Running for gemini model....");
    geminiChat(req, res, ai);
  }
});

// ----------------------------------------------------------

/* ---------- Static client (built React app) ---------- */
const clientDist = path.join(__dirname, './public');
app.use(express.static(clientDist));
app.use('/{*any}', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`MCP SSE:       http://localhost:${PORT}/sse`);
  console.log(`UI SSE:        http://localhost:${PORT}/ui-sse`);
});
