import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { toCalculatedLineItemId, toOrderId } from "../utils/ids.js";
import Button from "./ui/Button";
import ToggleIcon from "./ui/ToggleIcon.jsx";
import ThinkingDotsLoader from "./ui/ThinkingLoader.jsx";
import ChatMessage, { hasHTML } from "./ChatMessage.jsx";
import ToolPanel from "./ToolPanel.jsx";
import ToolSelector from "./ToolSelector";
import { handleInputOrEvent } from "../utils/handlers.js";

/* ------------------- Config ------------------- */
const BACKEND_URL = "http://localhost:3000";
// In production, replace `null` with a proper DOM element reference (e.g., document.querySelector('[data-customer-id]'))
const attribute = null;

export const config = {
  customerId:
    attribute?.getAttribute("data-customer-id") ??
    "gid://shopify/Customer/8045690618011",
  customerEmail:
    attribute?.getAttribute("data-customer-email") ??
    "nofeh62488@misehub.com",
    customerName:  attribute?.getAttribute("data-customer-name") ??
    "tes User",
  cart_id:
    attribute?.getAttribute("data-cart-id") ??
    "",
  storefrontUrl:
    attribute?.getAttribute("data-shop-domain") ??
    "antim-fulwere-dev-2-0.myshopify.com",
};

/* ------------------- Helpers ------------------- */
const createUserMessage = (conversationId, text, extra = {}) => ({
  id: conversationId,
  role: "user",
  text,
  ...extra,
});

const createAssistantMessage = (conversationId, data = {}) => ({
  id: conversationId,
  role: data.role,
  text: data.text ?? "",
  toolName: data.toolName ?? null,
  toolData: data.toolData ?? null,
  ...data,
});

/* ------------------- Component ------------------- */
function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [conversationId, setConversationId] = useState(
    localStorage.getItem("conversationId") ?? null
  );
  const [isNewConversation, setIsNewConversation] = useState(false);
  const [cartId, setCartId] = useState(config.cart_id);
  const [inputValue, setInputValue] = useState("");
  const [activeMessageIndex, setActiveMessageIndex] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  const responseRef = useRef(null);

  const activeMessage = useMemo(() => {
    if (activeMessageIndex == null) return null;
    return conversation[activeMessageIndex] || null;
  }, [conversation, activeMessageIndex]);

  /* -------- Initialize Conversation ID -------- */
  useEffect(() => {
    if (!conversationId) {
      const newId = uuidv4();
      localStorage.setItem("conversationId", newId);
      setConversationId(newId);
    }
  }, [conversationId]);

  /* -------- SSE Connection -------- */
  useEffect(() => {
    if (!conversationId) return;

    const es = new EventSource(
      `${BACKEND_URL}/ui-sse?connectionData=${encodeURIComponent(
        JSON.stringify({
          conversationId,
          clientId: config.customerId,
          newConversation: isNewConversation,
        })
      )}`
    );

    es.addEventListener("session", () => {
      console.log("Session Established with conversationId:", conversationId);
      setIsNewConversation(false);
    });

    let isThinkingMode = false;
    let buffer = "";

    es.addEventListener("message", (e) => {
      try {
        let data;
        try {
          data = JSON.parse(e.data);
        } catch {
          data = { role: "assistant", text: e.data };
        }
        if (data.role === "user") return;

        setConversation((prev) => {
          let incomingText = "";

          if (data.text) {
            incomingText = data.text;
          } else if (data.contentBlockStart?.start?.toolUse) {
            incomingText = `[TOOL CALL: ${data.contentBlockStart.start.toolUse.name}]`;
          } else if (data.contentBlockDelta?.delta?.toolResult) {
            incomingText = `[TOOL RESULT: ${JSON.stringify(
              data.contentBlockDelta.delta.toolResult
            )}]`;
          }

          if (!isThinkingMode && /^<\s*thinking/i.test(incomingText)) {
            isThinkingMode = true;
            buffer += incomingText;
            setIsSending(true);
            return prev;
          }

          if (isThinkingMode) {
            buffer += incomingText;
            if (/<\s*\/\s*thinking\s*>/i.test(buffer)) {
              isThinkingMode = false;
              buffer = "";
              setIsSending(false);
            }
            return prev;
          }

          if (
            !data.toolName ||
            data.toolName === "storefront_database_ae" ||
            data.toolName === "insights_ae"
          ) {
            if (
              prev.length > 0 &&
              (prev[prev.length - 1].role === "assistant" ||
                prev[prev.length - 1].role === "model")
            ) {
              const updatedLast = {
                ...prev[prev.length - 1],
                text: `${prev[prev.length - 1].text || ""}${incomingText}`,
              };
              return [...prev.slice(0, -1), updatedLast];
            }
            return [
              ...prev,
              createAssistantMessage(conversationId, {
                ...data,
                text: incomingText,
              }),
            ];
          } else {
            return [...prev, createAssistantMessage(conversationId, data)];
          }
        });
      } catch (error) {
        console.error("Malformed SSE message:", error, e.data);
      }
    });

    es.addEventListener("history", (e) => {
      try {
        const parsedHistory = JSON.parse(e.data);
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        } else {
          console.warn("History SSE payload is not an array:", parsedHistory);
          setHistory([]);
        }
      } catch (err) {
        console.error("Failed to parse history SSE:", err, e.data);
        setHistory([]);
      }
    });

    return () => es.close();
  }, [conversationId, isNewConversation]);

  /* -------- Auto-scroll -------- */
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [conversation]);

  /* -------- Handlers -------- */
  const toggleChat = useCallback(() => setChatOpen((v) => !v), []);

  const isUIResourceMessage = (msg) => {
    if (!msg) return false;

    if (typeof msg.text === "string") {
      try {
        const parsed = JSON.parse(msg.text);
        const maybeResource = parsed?.content?.[0];
        if (
          maybeResource?.type === "resource" &&
          maybeResource?.resource?.uri?.startsWith("ui://")
        ) {
          return true;
        }
      } catch (err) {
        console.log("Error parsing msg.text:", err.message);
      }
    }

    if (msg.toolData?.content?.[0]?.resource?.uri?.startsWith("ui://")) {
      console.log("🔎 Found UI resource in toolData:", msg.toolData);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!conversation.length) return;
    const lastMsg = conversation[conversation.length - 1];
    if (
      (lastMsg.role === "assistant" || lastMsg.role === "model") &&
      isUIResourceMessage(lastMsg)
    ) {
      setActiveMessageIndex(conversation.length - 1);
    }
  }, [conversation]);

  const handleToolClick = async (toolMsg) => {
    try {
      let userText = "";
      if (toolMsg.content[0].toolUse) {
        const input = toolMsg.content[0].toolUse.input;
        setIsSending(true);
        if (input.orderNameOrId) {
          userText = `Give order details of orderId ${toOrderId(
            input.orderNameOrId
          )}`;
        } else if (input.cursor === "") {
          userText = "Give me order list.";
        } else if (input.query) {
          userText = "Give me " + JSON.stringify(input.query);
        }
      } else {
        const input =
          toolMsg.content?.[0]?.input ?? toolMsg.content?.[0]?.text ?? "";
        userText = `${toolMsg.name} ${JSON.stringify(input)}`;
      }

      await sendToBackend({ userText });
    } catch (err) {
      console.error("Tool click failed:", err);
      setConversation((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          text: `⚠️ Failed to fetch tool details: ${err.message}`,
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleNewConversation = () => {
    const newId = uuidv4();
    setConversationId(newId);
    setIsNewConversation(true);
    setConversation([]);
    localStorage.setItem("conversationId", newId);
    localStorage.setItem("isNewConversation", "true");
    setSelectedTool(null);
    setChatOpen(true);
    setActiveMessageIndex(null);
    // window.location.reload();
  };

  const handleSelectMessage = useCallback(
    (index) => setActiveMessageIndex((prev) => (prev === index ? null : index)),
    []
  );

  /* ------------------- Shared Sender ------------------- */
  const sendToBackend = useCallback(
    async ({ userText, botText }) => {
      if (isSending || !conversationId) return;

      if (userText) {
        const userMsg = createUserMessage(conversationId, userText);
        setConversation((prev) => [...prev, userMsg]);
      }
      setInputValue("");
      setActiveMessageIndex(null);
      setIsSending(true);

      try {
        const res = await fetch(`${BACKEND_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            isExternal: "false",
            isMerchant: "false",
          },
          body: JSON.stringify({
            clientId: config.customerId,
            message: botText ? botText : userText,
            conversationId,
            config: { ...config, cart_id: config.cart_id },
          }),
        });

        if (!res.ok) throw new Error(`Request failed with status: ${res.status}`);
      } catch (err) {
        console.error("Send to backend failed:", err);
        setConversation((prev) => [
          ...prev,
          createAssistantMessage(conversationId, {
            role: "assistant",
            text: `⚠️ Sorry, I couldn’t send that. Error: ${err.message}`,
            isError: true,
          }),
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [conversationId, isSending, cartId]
  );

  const sendMessage = useCallback(
    ({ userText, botText }) => sendToBackend({ userText, botText }),
    [sendToBackend]
  );

  const handleSubmit = useCallback(
    (inputOrEvent) => {
      if (inputOrEvent?.preventDefault) inputOrEvent.preventDefault();
      if (isSending || !conversationId) return;

      const { userText, botText } = handleInputOrEvent(
        inputOrEvent,
        config,
        cartId,
        conversationId,
        isSending,
        inputValue
      );
      sendMessage({ userText, botText });
      if (userText && !selectedTool) setSelectedTool("direct-chat");
    },
    [conversationId, inputValue, isSending, cartId, sendMessage, selectedTool]
  );

  const handleRetry = async (failedMsg) => {
    console.log("Retrying message:", failedMsg);

    const lastUserMsg = conversation
      .slice()
      .reverse()
      .find((msg) => msg.role === "user");

    if (!lastUserMsg) {
      console.warn("No user message found to retry");
      setConversation((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          text: "⚠️ No previous user message found to retry.",
          isError: true,
        },
      ]);
      return;
    }

    console.log("Retrying last user message:", lastUserMsg);
    await sendMessage({ userText: lastUserMsg.text });
  };

  /* -------- Render -------- */
  return (
    <div id="chatbot-form">
      {chatOpen && (
        <div className={`chat-container${activeMessage ? " expanded" : ""}`}>
          <div className="chat-sections">
            <div className="chat-left">
              <div className="chat-header-container">
                <div className="chatbot-header">
                  <div className="chatbot-title">AI CHATBOT</div>
                  <button
                    className="chatbot-close"
                    onClick={toggleChat}
                    aria-label="Close chatbot"
                  >
                    ✕
                  </button>
                </div>

                <div id="chatbot-response-container" ref={responseRef}>
                  {/* ToolSelector for Landing State */}
                  {!selectedTool && history.length === 0 && (
                    <div className="landing-tool-selector">
                      <ToolSelector
                        onToolSelect={(toolName, tool) => {
                          handleSubmit({
                            type: "tool-selected",
                            formattedMessage: `${tool.text}`,
                            params: { toolName, tool },
                          });
                          setSelectedTool(toolName);
                        }}
                      />
                    </div>
                  )}

                  {/* History Messages */}
                  {Array.isArray(history) &&
                    history.map((msg, i) => (
                      <ChatMessage
                        key={`history-${i}`}
                        msg={msg}
                        isActive={false}
                        isHistory={true}
                        onSelect={
                          msg.role === "assistant"
                            ? () => handleToolClick(msg)
                            : () => handleSelectMessage(i)
                        }
                      />
                    ))}

                  {/* New Conversation Messages */}
                  {conversation.map((msg, i) => (
                    <ChatMessage
                      key={`conv-${msg.id}-${i}`}
                      msg={msg}
                      isActive={i === activeMessageIndex}
                      onSelect={() => msg.toolName && handleSelectMessage(i)}
                      onRetry={msg.isError ? () => handleRetry(msg) : undefined}
                    />
                  ))}

                  {/* Loader */}
                  {isSending && (
                    <div
                      className="chat-message model"
                      style={{ padding: "revert" }}
                    >
                      <ThinkingDotsLoader />
                    </div>
                  )}
                </div>
              </div>

              {/* Unified Input Form */}
              <form className="input-row" onSubmit={handleSubmit}>
                <input
                  id="chatbot-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Got questions? Ask me anything..."
                  aria-label="Type your message"
                  autoComplete="off"
                />
                <div className="gradient-border button-wrapper">
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={isSending}
                    style={{
                      backgroundColor: isSending ? "#ccc" : "",
                      color: isSending ? "#666" : "",
                      cursor: isSending ? "not-allowed" : "pointer",
                    }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>

            {/* Chat Right */}
            {activeMessageIndex !== null && (
              <div className="chat-right">
                <div className="chat-right-details">
                  <ToolPanel
                    setActiveMessageIndex={setActiveMessageIndex}
                    message={activeMessage}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle + New Conversation */}
      <div style={{ display: "flex" }}>
        <Button onClick={handleNewConversation}>New Conversation</Button>
        <ToggleIcon chatOpen={chatOpen} toggleChat={toggleChat} />
      </div>
    </div>
  );
}

export default Chatbot;