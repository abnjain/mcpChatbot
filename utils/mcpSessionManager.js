import { Client as McpClient } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

class MCPSessionManager {
  constructor(mcpUrl) {
    this.sessions = new Map(); // clientId -> { mcp, ready, tools, chat }
    this.mcpUrl = mcpUrl;
  }

  async ensureSession(conversationId) {
    let s = this.sessions.get(conversationId);
    if (s?.ready) {
      await s.ready;
      return s;
    }

    // console.log("[MCP] creating new session for", conversationId);
    const mcp = new McpClient({ name: "web-client", version: "1.0.0" , resetTimeoutOnProgress: true,  timeout: 300000,       timeoutMs: 300000, });
    const transport = new SSEClientTransport(new URL(this.mcpUrl));
    
    const ready = mcp.connect(transport)
      .then(() => console.log(`[MCP] connected for ${conversationId}`))
      .catch(err => {
        console.error(`[MCP] error for ${conversationId}`, err);
        this.sessions.delete(conversationId);
        throw err;
      });

    s = { mcp, ready, tools: null, chat: [] };
    this.sessions.set(conversationId, s);
    await ready;

    return s;
  }

  clearSession(conversationId) {
    this.sessions.delete(conversationId);
  }
}

export function createMCPSessionManager(mcpUrl) {
  return new MCPSessionManager(mcpUrl);
}
