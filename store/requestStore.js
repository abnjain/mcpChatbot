// requestStore.js
let requestBody = null;
let requestData = {
  clientId: null,
  message: null,
  conversationId: null,
  customerId: null,
  customerEmail: null,
  cartId: null,
  storefrontUrl: null,
  orderId: null,
};

export function setRequestBody(body) {
  // console.log("body --------------------", body.message);  
  requestData = {
    clientId: body.clientId ?? null,
    message: body.message ?? null,
    conversationId: body.conversationId ?? null,
    customerId: body.config?.customerId ?? null,
    customerEmail: body.config?.customerEmail ?? null,
    cartId: body.config?.cart_id ?? null,
    storefrontUrl: body.config?.storefrontUrl ?? null,
    orderId: body.config?.orderId ?? null,
  };
}

export function getRequestBody() {
  //  console.log("Flattened Request Data -----------", requestData);
  return requestData;
}

// 🔹 Export independent variables for direct import
export function getClientId() { return requestData.clientId; }
export function getMessage() { return requestData.message; }
export function getConversationId() { return requestData.conversationId; }
export function getCustomerId() { return requestData.customerId; }
export function getCustomerEmail() { return requestData.customerEmail; }
export function getCartId() { return requestData.cartId; }
export function getStorefrontUrl() { return requestData.storefrontUrl; }
export function getOrderId() { return requestData.orderId; }
