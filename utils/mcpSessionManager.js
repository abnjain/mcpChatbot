import { Client as McpClient } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

class MCPSessionManager {
  constructor(mcpUrl) {
    this.sessions = new Map(); // clientId -> { mcp, ready, tools, chat }
    this.mcpUrl = mcpUrl;
  }

  async ensureSession(clientId) {
    let s = this.sessions.get(clientId);
    if (s?.ready) {
      await s.ready;
      return s; 
    }

    console.log("[MCP] creating new session for", clientId);
    const mcp = new McpClient({ name: "web-client", version: "1.0.0" });
    const transport = new SSEClientTransport(new URL(this.mcpUrl));

    const ready = mcp.connect(transport)
      .then(() => console.log(`[MCP] connected for ${clientId}`))
      .catch(err => {
        console.error(`[MCP] error for ${clientId}`, err);
        this.sessions.delete(clientId);
        throw err;
      });

    s = { mcp, ready, tools: null, chat: [] };
    this.sessions.set(clientId, s);
    await ready;

    return s;
  }

  clearSession(clientId) {
    this.sessions.delete(clientId);
  }
}

export function createMCPSessionManager(mcpUrl) {
  return new MCPSessionManager(mcpUrl);
}
