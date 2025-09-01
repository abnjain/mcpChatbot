import crypto from "crypto";

class SSEManager {
  constructor() {
    this.clients = new Map(); // clientId -> res
  }

  addClient(res) {
    const clientId = crypto.randomUUID();
    this.clients.set(clientId, res);

    res.write(`event: session\n`);
    res.write(`data: ${JSON.stringify({ clientId })}\n\n`);

    const hb = setInterval(() => {
      try { res.write(`event: ping\ndata: {}\n\n`); } catch {}
    }, 25000);

    res.on("close", () => {
      clearInterval(hb);
      this.clients.delete(clientId);
    });

    return clientId;
  }

  send(clientId, event, payload) {
    const res = this.clients.get(clientId);
    if (!res) return false;
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
    return true;
  }
}

export const sseManager = new SSEManager();
