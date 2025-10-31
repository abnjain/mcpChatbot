import { UIResourceRenderer } from "@mcp-ui/client";
import { toOrderId } from "../utils/ids";
import { actionHandlers } from "../utils/handlers";
import { config } from "../config/variables.js";

/* ---------------- Utilities ---------------- */
function safeParseJson(value) {
  if (typeof value !== "string") return value;
  try {
    const parsed = JSON.parse(value);
    if (parsed && (typeof parsed === "object" || Array.isArray(parsed))) {
      return parsed;
    }
  } catch {
    // not JSON → return original
  }
  return value;
}


/* ---------------- Component ---------------- */
export default function ToolPanel({ message, handleSubmit, setActiveMessageIndex }) {
  const { toolName, toolData, text } = message || {};
  // console.log("my cart id is...........", text);
  const mcpResource = safeParseJson(text) ?? "";
  // console.log("my cart id is...........", mcpResource);
  const cartid = mcpResource?.content?.[0].resource.uri;
  if (toolName == "add_cart_item_ae") {
    console.log("my cart id is...........", cartid.replace("ui://", ""));
    config.cart_id = cartid.replace("ui://", "");
  }
  const maybeResource = mcpResource?.content?.[0];

  // Special message type
  if (toolName === "Special Message - x7B9qL2mVp") {
    return <p>{toolData?.message ?? "No message"}</p>;
  }

  // Check if message is UI Resource
  const isUIResource =
    maybeResource?.type === "resource" &&
    maybeResource?.resource?.uri?.startsWith("ui://");

  if (isUIResource) {
    return (
      <UIResourceRenderer
        resource={maybeResource.resource}
        onUIAction={(result) => {
          const { type, payload } = result;
          const handler = actionHandlers[payload?.toolName];
          if (type === "tool" && handler) {
            handler({ params: payload.params, payload, handleSubmit, setActiveMessageIndex });
          } else if (type === "link" && handler) {
            handler({ params: payload.params, payload, handleSubmit });
          }
        }}
      />
    );
  }

  return <div className="tool-empty">No details available.</div>;
}
