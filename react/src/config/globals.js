// ../config/globals.js
import { config } from "./variables.js";

// These are app-level globals, *not per-event params*
export const globals = {
  cartId: config.cartId,
  conversationId: null,   // will be set dynamically
  conversation: [],   // will be set dynamically
  isNewConversation: true, // toggled when starting new convo
  isSending: false,       // toggled while sending
  inputValue: "",         // last input text
  history: [],    // ✅ added
  chatOpen: false, // ✅ if you want this global too
  activeMessageIndex: null,
  activeMessage: null,
};

export function setGlobal(key, value) {
  if (globals.hasOwnProperty(key)) {
    globals[key] = value;
  } else {
    console.warn(`⚠️ Attempted to set unknown global: ${key}`);
  }
}

export function bindInputSync(inputSelector) {
  const el = document.querySelector(inputSelector);
  if (!el) {
    console.warn(`⚠️ Input element "${inputSelector}" not found`);
    return;
  }
  el.addEventListener("input", (e) => {
    globals.inputValue = e.target.value;
  });
}