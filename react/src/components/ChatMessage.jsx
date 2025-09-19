import React, { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* ------------------ Helpers ------------------ */
const safeParseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};
 
export const hasHTML = (text = "") => /<\/?[a-z][\s\S]*>/i.test(text); 

const normalizeMessage = (msg, isHistory = false) => {
  let safeText = "";

  if (typeof msg?.text === "string") {
    safeText = msg.text;
  } else if (Array.isArray(msg?.content)) {
    const firstItem = msg.content.find((c) => typeof c.text === "string");
    safeText = firstItem?.text ?? "";
  } else {
    safeText = "";
  }

if (msg.role === "assistant"){
  if(msg?.content?.[0]?.toolUse){
    msg.role = "tool";
  }
}

  if (msg.role === "tool") {
    if (isHistory) return { ...msg, role: "tool", text: "" };
    return { ...msg, role: "tool", toolName: msg.name, text: safeText };
  }

  if (msg.role === "assistant") return { ...msg, role: "model", text: safeText };
  if (msg.role === "user") return { ...msg, role: "user", text: safeText };

  return { ...msg, text: safeText };
};

/* ------------------ Component ------------------ */
const ChatMessage = ({ msg, isActive, activeMessageIndex, onSelect, onRetry, isHistory = false }) => {
  if (!msg) return null;

  const innerText = msg.text?.trim() || "";
  const innerHTML = msg.innerTextHTML?.trim?.() || "";
  const normalizedMsg = normalizeMessage(msg, isHistory);
  const parsed = useMemo(() => safeParseJson(normalizedMsg?.text ?? ""), [normalizedMsg?.text]);
  const isToolPayload = typeof parsed !== "string" && normalizedMsg.role !== "user";

  if (isHistory && normalizedMsg.role === "model" && (!normalizedMsg.text && !innerHTML)) return null;

  // 🛑 Error bubble
  if (normalizedMsg.isError) {
    return (
      <div
        className="chat-message error-bubble"
        style={{
          background: "#fdecea",
          color: "#b71c1c",
          border: "1px solid #f5c6cb",
          borderRadius: "12px",
          padding: "0.5rem 1rem",
          margin: "0.5rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          fontSize: "0.9rem",
        }}
      >
        <div>{normalizedMsg.text}</div>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              background: "transparent",
              color: "#2f2e5eff",
              border: "1px solid #2f2e5eff",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: "bold",
              padding: "0.5rem 0.8rem",
            }}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // 🛠 Tool responses
  if (normalizedMsg.role === "tool") {
    if (isHistory && hasHTML(normalizedMsg.text)) {

      return (
        <div
          className="chat-message tool"
          style={{
            background: "#f3f4f6",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            padding: "0.75rem 1rem",
            margin: "0.5rem 0",
            fontSize: "0.9rem",
            color: "#374151",
          }}
        >
          <div style={{ fontWeight: "bold" }}>🛠 {msg.name || "Tool Response"}</div>
          <div className="msg-text">Tap to view details</div>
        </div>
      );
    }

    return (
      <div
        className="chat-message tool"
        style={{
          background: "#f3f4f6",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          padding: "0.75rem 1rem",
          margin: "0.5rem 0",
          fontSize: "0.9rem",
          color: "#374151",
          whiteSpace: "nowrap",
          // overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            msg.role = "assistant";
            onSelect?.(msg);
          }}
          style={{
            fontWeight: "bold",
            color: "#090b11ff",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
            🛠 {msg.name || "Tool Response"}
          </div>
        </a>
        <div>{normalizedMsg.text}</div>
      </div>
    );
  }

  // 🔧 Tool Payload bubble
  if (isToolPayload) {
    return (
      <div
        className={`chat-message ${normalizedMsg.role}${isActive ? " selected" : " "}`}
        style={{
          padding: normalizedMsg.toolName ? "1.5rem" : "",
          cursor: normalizedMsg.toolName ? "pointer" : "",
          whiteSpace:"pre-wrap",
          // overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()}
        aria-label={msg?.toolName ? `Open details for ${normalizedMsg.toolName}` : "Open details"}
      >
        <div className="msg-text">Tap to view details</div>
        {normalizedMsg.toolName && <div className="msg-chip">{normalizedMsg.toolName}</div>}
      </div>
    );
  }

  // 💬 Normal message bubble (single line)
  return (
    <div
      className={`chat-message ${normalizedMsg.role}`}
      style={{
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
        fontSize: "1rem",
      }}
    >
      {normalizedMsg?.text === "Your order has been canceled" ? activeMessageIndex = false : isActive}
        <Markdown remarkPlugins={[remarkGfm]}>{normalizedMsg?.text}</Markdown>
    </div>
  );
};

export default ChatMessage;
 