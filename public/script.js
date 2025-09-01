import { getOrderDetails, searchShopCatalog, customerSupport, insights } from "./toolsScript.js";
import './ui-resource-renderer.wc.js';

const BACKEND_URL = "http://localhost:3000";
// const BACKEND_URL = "https://ollamaserver.fly.dev";

const config = {
  // storefrontUrl: "https://shop-chat-agent-674.myshopify.com/",
  storefrontUrl: "mohit-singh-dev.myshopify.com",
  // win
  // ow.location.hostname
  //   : null,
  // orderId: ["6227676856486"],
  // orderId: ["6236791832742"], 
  orderId: ["6257778720934"], 
  // orderId: ["6075575369797"],
  // orderId ? orderId : null,
  // cart_Id: "gid://shopify/Cart/hWN1OpEDODuwkXZaDigBJd0E?key=3e208c9612602e22441529fbfefc3f82", // cartID for shop-chat-agent-674 storefront
  cart_Id: "gid://shopify/Cart/hWN2MVld2ppsWdkpEoBBOXcv?key=6b39077797903a111d5a1f00adcd87f4", // cartID for mohit-singh-dev storefront
  lines: [
    {
      merchandise_id: "gid://shopify/ProductVariant/46351298298022",
      quantity: 1
    }
  ],
  customerId: 'gid://shopify/Customer/8811884937382'
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
const es = new EventSource(`${BACKEND_URL}/ui-sse`);
es.addEventListener("session", (e) => {
  const data = JSON.parse(e.data);
  clientId = data.clientId;
  status = "connected";
  console.log("session established:", clientId);
});
es.addEventListener("message", (e) => {
  // console.log("message:", e.data);
  const { role, text, toolName } = JSON.parse(e.data);
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
      headers: { "Content-Type": "application/json" },
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