// ../config/config.js

// Grab the element with your attributes
const attribute = document.getElementById("ae-theme-starter") ?? null;

export const config = {
  customerId:
    attribute?.getAttribute("data-customer-id") ??
    "gid://shopify/Customer/8155008827547",

  customerEmail:
    attribute?.getAttribute("data-customer-email") ??
    "manishsingh2@itgeeks.com",

  cartId:
    attribute?.getAttribute("data-cart-id") ??
    "",

  storefrontUrl:
    attribute?.getAttribute("data-shop-domain") ??
    "antim-fulwere-dev-2-0.myshopify.com",

  // Uncomment if you want to globalize orderId
  // orderId: attribute?.getAttribute("data-order-id") ?? "5783274291355",
};
