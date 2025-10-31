// // requestStore.js
// import { jwtDecode } from "jwt-decode";

// let bodyData = {
//   clientId: null,
//   message: null,
//   conversationId: null,
//   customerId: null,
//   customerEmail: null,
//   cartId: null,
//   storefrontUrl: null,
//   fontFamily: null
// };

// let headersData = {
//   isMerchant: null,
//   isExternal: null,
//   shopToken: null,
//   storefrontUrl: null
// }

// let queryData = {
//   clientId: null,
//   conversationId: null,
//   storefrontUrl: null
// }

// export function setRequestGlobal(data) {
//   if (data?.body) {
//     let body = data.body;
//     // console.log("body --------------------", body.config.fontFamily);  
//     bodyData = {
//       clientId: body.clientId ?? null,
//       message: body.message ?? null,
//       conversationId: body.conversationId ?? null,
//       customerId: body.config?.customerId ?? null,
//       customerEmail: body.config?.customerEmail ?? null,
//       cartId: body.config?.cart_id ?? null,
//       storefrontUrl: body.config?.storefrontUrl ?? null,
//       fontFamily: body.config?.fontFamily ?? null,
//     };
//   }

//   if (data.headers) {
//     let head = data.headers;

//     const token = head.authorization && head.authorization.split(' ')[1];
//     const decoded = token ? jwtDecode(token) : null

//     if (head?.["isexternal"] || head?.["ismerchant"]) {
//       headersData = {
//         isMerchant: head?.["ismerchant"] ? JSON.parse(head["ismerchant"]) : false,
//         isExternal: head?.["isexternal"] ? JSON.parse(head["isexternal"]) : false,
//         shopToken: token ? token : null,
//         storefrontUrl: decoded?.dest ? decoded?.dest : head.storefrontUrl,
//       };
//     }
//     // console.log("head --------------------", headersData); 
//   }

//   if (data?.query?.connectionData) {
//     const connectionData = data.query.connectionData;

//     // Only parse if it's a string
//     if (typeof connectionData === "string") {
//       try {
//         const parsed = JSON.parse(connectionData);

//         // Optional: validate structure
//         if (parsed && typeof parsed === "object") {
//           queryData = {
//             storefrontUrl: parsed.storefrontUrl ?? undefined,
//             customerId: parsed.customerId ?? undefined,
//             conversationId: parsed.conversationId ?? undefined,
//           };
//         }
//       } catch (error) {
//         console.error("Failed to parse connectionData JSON:", error);
//         // Optionally: fallback or notify
//       }
//     } else {
//       console.warn("connectionData is not a string:", connectionData);
//     }
//   }
// }

// // Export independent variables for direct import
// export function getClientId() { return bodyData.clientId; }
// export function getMessage() { return bodyData.message; }
// // export function getConversationId() { return bodyData.conversationId; }
// // export function getCustomerId() { return bodyData.customerId; }
// // export function getCustomerEmail() { return bodyData.customerEmail; }
// // export function getCartId() { return bodyData.cartId; }
// export function getFontFamily() { return bodyData.fontFamily; }

// export function getIsMerchant() { return headersData.isMerchant; }
// export function getIsExternal() { return headersData.isExternal; }
// export function getShopToken() { return headersData.shopToken; }

// export function getStorefrontUrl() {
//   const url = headersData.storefrontUrl ? headersData.storefrontUrl : bodyData.storefrontUrl ? bodyData.storefrontUrl : queryData.storefrontUrl
//   return url;
// }  