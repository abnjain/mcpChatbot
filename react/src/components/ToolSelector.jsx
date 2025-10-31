import React from "react";
import { config } from "../config/variables.js"
const quickTools = [
  { name: "orders_list_ae", text: "🧾 Get a list of orders", label: "📦 Order List", },
  // { name: "search_shop_policies_and_faqs", text: "📝 Find shop policies and FAQs", label: "📜 Policies & FAQs", },
  { name: "search_shop_products", text: "👜 Find shop products", label: "🛍️ Products", },
  { name: "get_support_details_ae", text: "🎟️ Get a list of all my support tickets", label: "📋 Ticket List", },
  { name: "create_chatbot_ticket_ae", text: `🎫 Create Ticket of the customer ${config.customerId}`, label: "🎫 Create Ticket", },
];

function ToolSelector({ onToolSelect }) {
  return (
    <div
      style={{
        padding: "24px",
        background: "linear-gradient(145deg, #ffffff, #f1f3f5)",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#1f2937",
          letterSpacing: "-0.025em",
        }}
      >
        💬 Get Started with Your Chat!
      </h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "24px",
          color: "#4b5563",
          fontSize: "1rem",
          lineHeight: "1.5",
        }}
      >
        Pick a query below or type your question to dive in!
      </p>
      <div style={{ display: "grid", gap: "12px" }}>
        {quickTools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => onToolSelect(tool.name, tool)}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "#ffffff",
              color: "#1f2937",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)";
            }}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ToolSelector;