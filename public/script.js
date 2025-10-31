import { getOrderDetails, searchShopCatalog, customerSupport, insights } from "./toolsScript.js";
import './ui-resource-renderer.wc.js';

const BACKEND_URL = "http://localhost:3000";
// const BACKEND_URL = "https://ollamaserver.fly.dev";

const config = {
  // storefrontUrl: "https://shop-chat-agent-674.myshopify.com/",
  storefrontUrl: "antim-fulwere-dev-2-0.myshopify.com",
  // orderId: ["6227676856486"],
  // orderId: ["6236791832742"], 
  orderId: ["5761157333147"],
  // orderId: ["6075575369797"],
  // orderId ? orderId : null,
  cart_Id: "gid://shopify/Cart/hWN1OpEDODuwkXZaDigBJd0E?key=3e208c9612602e22441529fbfefc3f82", // cartID for shop-chat-agent-674 storefront
  lines: [
    {
      merchandise_id: "gid://shopify/ProductVariant/46351298298022",
      // id: "gid://shopify/ProductVariant/46338034827430",
      quantity: 1
    }
  ],
  customerId: 'gid://shopify/Customer/8155008827547'
}
let clientId = null;
let status = "disconnected";

const messagesEl = document.getElementById("messagesBg");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

const toolComponentMap = {
  get_order_details_ae: getOrderDetails,
  search_shop_catalog: searchShopCatalog,
  "Special Message - x7B9qL2mVp": customerSupport,
  insights_ae: insights,
};

// Helper to render tool components with props
function renderToolComponent(toolName, data) {
  const toolComponent = toolComponentMap[toolName];
  console.log("🔧 Rendering tool:", toolName, "→", toolComponent ? "found" : "missing");
  return toolComponent ? toolComponent(data) : null;
}

// Append message to chat
function push(role, text, toolName = null) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${role}`;

  try {
    // Try to parse the text as JSON (it might be a resource payload)
    const parsed = JSON.parse(text);

    if (
      parsed?.content &&
      Array.isArray(parsed.content) &&
      parsed.content[0]?.resource
    ) {
      const renderer = document.createElement("ui-resource-renderer");
      renderer.resource = parsed.content[0].resource;
      msgDiv.appendChild(renderer);
    }
    else {
      // Not a resource object → just show as plain text
      msgDiv.textContent = text;
    }
  } catch (e) {
    // Not JSON → treat as plain text
    msgDiv.textContent = text;
  }

  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}


// SSE connection
const es = new EventSource(`${BACKEND_URL}/ui-sse?conversationId=${conversationId}&newConversation=${newConversation}&clientId=${clientId}`);
es.addEventListener("session", (e) => {
  const data = JSON.parse(e.data);
  // console.log(data);

  clientId = data.conversationId;
  status = "connected";
  console.log("session established:", clientId);
});
es.addEventListener("history", (e) => {
  const history = JSON.parse(e.data);
  console.log("Received history:", history);
  // maybe replay old messages in UI
});
es.addEventListener("message", (e) => {
  // console.log("message:", e.data);
  const { role, text, toolName, msg } = JSON.parse(e.data);
  console.log(msg);

  // const data = JSON.parse(text)
  role !== "user" ? push(role || "system", text || "", toolName) : null;
});
es.onerror = () => {
  status = "error";
  console.error("SSE connection error");
};

// Send message
async function sendMessage() {
  const msg = inputEl.value.trim();
  if (!msg || !clientId) return;
  push("user", msg);
  inputEl.value = "";

  try {
    await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "isExternal":false
       },
      body: JSON.stringify({ clientId, message: msg, config }),
    });
  } catch (err) {
    push("system", "Failed to send message.");
  }
}

sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});