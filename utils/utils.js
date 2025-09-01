
// export const sendToUi = async (clientId, event, payload) => {
//     console.log("sendToUi ", "c ", clientId, "e ", event, "p ", payload);
//     const res = uiStreams.get(clientId);
//     if (!res) return false;
//     res.write(`event: ${event}\n`);
//     res.write(`data: ${JSON.stringify(payload)}\n\n`);
//     return true;
// }

// export const ensureMcpSession = async (clientId) => {
//     let s = sessions.get(clientId);
//     if (s?.ready) {
//         await s.ready;
//         return s;
//     }
//     console.log("ensureMcpSession step1", clientId);
//     const mcp = new McpClient({ name: 'web-client', version: '1.0.0' });
//     const transport = new SSEClientTransport(new URL(MCP_URL));
//     console.log("ensureMcpSession step2", clientId);
//     const ready = mcp.connect(transport)
//         .then(() => console.log(`[MCP] connected for ${clientId}`))
//         .catch(err => {
//             console.log("ensureMcpSession step3", err);
//             sessions.delete(clientId);
//             throw err;
//         });

//     s = { mcp, ready, tools: null, chat: [] };
//     sessions.set(clientId, s);
//     await ready;
//     console.log("ensureMcpSession step5",);
//     return s;
// }