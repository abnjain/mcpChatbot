// ../config/config.js

// In production, replace `null` with a proper DOM element reference (e.g., document.querySelector('[data-customer-id]'))
const attribute = null;

export const config = {
  customerId:
    attribute?.getAttribute("data-customer-id") ??
    "gid://shopify/Customer/7810688778395",
  customerEmail:
    attribute?.getAttribute("data-customer-email") ??
    "nileshtiwari@itgeeks.com",
  customerName: attribute?.getAttribute("data-customer-name") ??
    "tes User",
  cart_id:
    attribute?.getAttribute("data-cart-id") ??
    null,
  storefrontUrl:
    attribute?.getAttribute("data-shop-domain") ??
    "antim-fulwere-dev.myshopify.com",
};
