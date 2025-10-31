import crypto from "crypto";

class SSEManager {
  constructor() {
    this.clients = new Map(); // conversationId -> res
  }

  addClient(res, conversationId, newConversation) {
    // const conversationId = conversationId;
    this.clients.set(conversationId, res);

    res.write(`event: session\n`);
    res.write(`data: ${JSON.stringify({ conversationId })}\n\n`);

    const hb = setInterval(() => {
      try { res.write(`event: ping\ndata: {}\n\n`); } catch {}
    }, 25000);

    res.on("close", () => {
      clearInterval(hb);
      this.clients.delete(conversationId);
    });
    return conversationId;
  }

  send(conversationId, event, payload) {
    const res = this.clients.get(conversationId);
    if (!res) return false;
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
    return true;
  }
}

export const sseManager = new SSEManager();
