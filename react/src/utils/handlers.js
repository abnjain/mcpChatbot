import { toCalculatedLineItemId, toOrderId } from "./ids";

/* ---------------- UI Handlers ---------------- */
export const actionHandlers = {

  "apply-discount-true": ({ params, payload, handleSubmit }) => {
    const { orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod } = params;

    const formattedMessage = "🏷️ Apply discount changes to my current order.";

    handleSubmit({
      ...payload,
      formattedMessage,
      type: "apply-discount-true",
    });
  },

  "apply-discount-false": ({ params, payload, handleSubmit, activeMessageIndex, setActiveMessageIndex }) => {
    setActiveMessageIndex(null)
  },

  "apply-shipping": ({ params, payload, handleSubmit }) => {
    const { orderId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, chosenMethod, deliveryProfiles, result, index } = params;

    const formattedMessage = `🚚 Apply shipping method "${chosenMethod.name}" to my order.`;

    handleSubmit({
      ...payload,
      formattedMessage,
      type: "apply-shipping",
    });
  },

  "cancel-shipping": ({ params, payload, handleSubmit, activeMessageIndex, setActiveMessageIndex }) => {
    console.log("Shipping selection cancelled", params);

    setActiveMessageIndex(null);
  },


  addToOrder: ({ params, payload, handleSubmit }) => {
    const { productId, productTitle, variantId, variantTitle, imgUrl } = params;
    const message = `📦 "Add ${productTitle}" (${variantTitle}) to my order`;
    handleSubmit({
      ...payload,
      merchandise_id: variantId,
      formattedMessage: message,
      type: "addToOrder",
    });
  },

  loginurl: ({ params }) => {
    const { redirectLink } = params;
    console.log(params, "redirectLink------");

    // CSP safe: new tab open karo
    const link = document.createElement("a");
    link.href = redirectLink;
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  addToCart: ({ params, payload, handleSubmit }) => {
    const { productTitle, variantTitle, dataPrice, dataCurrency, variantId } = params;
    const message = `🛒 "Add ${productTitle}" (${variantTitle}) to my cart. Price: ${dataPrice}${dataCurrency}`;
    handleSubmit({
      ...payload,
      merchandise_id: variantId,
      formattedMessage: message,
      type: "addToCart",
    });
  },

  "add-quantity": ({ params, payload, handleSubmit }) => {
    const { lineItemid, productTitle, variantId, variantTitle, price, currency, currentQuantity, orderId, customerId, orderNo } = params;
    const message = `🧺 Make Order Edit of "${productTitle}" (${variantTitle}) in my order. Price: ${price}  ${currency} as quantity ${Number(currentQuantity) + 1} in my order id ${toOrderId(orderNo)}`;
    handleSubmit({
      ...payload,
      merchandise_id: variantId,
      formattedMessage: message,
      type: "add-quantity",
    });
  },

  "sub-quantity": ({ params, payload, handleSubmit }) => {
    const { lineItemid, productTitle, variantId, variantTitle, price, currency, currentQuantity, orderId, customerId, orderNo } = params;
    const message = `🧺 Make Order Edit of "${productTitle}" (${variantTitle}) in my order. Price: ${price} ${currency} as quantity ${Number(currentQuantity) - 1} in my order id ${toOrderId(orderNo)}`;
    handleSubmit({
      ...payload,
      merchandise_id: variantId,
      formattedMessage: message,
      type: "sub-quantity",
    });
  },

  "cancel-order": ({ params, payload, handleSubmit }) => {
    const { orderId, customerId, currencyCode, refundedAmount, refund, restock, staffNote, totalAmount, orderNo } = params;
    const message = `🚫 Cancel my order of order ${orderNo}`
    handleSubmit({
      ...payload,
      formattedMessage: message,
      type: "cancel-order"
    })
  },

  ordercompleteurl: ({ params }) => {
    const { orderCompUrl } = params;
    const link = document.createElement("a");
    link.href = orderCompUrl;
    link.rel = "noopener noreferrer";
    link.target = "_blank"
    link.click();
  },

  "remove-item": ({ params, payload, handleSubmit }) => {
    const { lineItemId, variantId, variantTitle, orderId, customerId, orderNo, selectedMethod, productTitle } = params;
    console.log(productTitle, "vfdfs", variantTitle);

    const message = `❌ Remove ${productTitle} (${variantTitle}) from my order number ${toOrderId(orderNo)}`;
    handleSubmit({
      ...payload,
      formattedMessage: message,
      type: "remove-item",
    });
  },

  "accept-refund": ({ params, payload, handleSubmit }) => {
    const { orderId, reason, customerId, orderNo } = params;
    const message = `✅ Accept refund of my order number ${toOrderId(orderNo)}`;
    handleSubmit({
      ...payload,
      formattedMessage: message,
      type: "accept-refund",
    });
  },

  "add-cart-quantity": ({ params, payload, handleSubmit }) => {
    const { productTitle, variantId, variantTitle, dataPrice, dataCurrency, currentQuantity } = params;
    const message = `🛒 Make the Edit in my cart of "${productTitle}" (${variantTitle}) in my cart. Price: ${dataPrice}${dataCurrency} as quantity ${Number(currentQuantity) + 1}`;
    handleSubmit({
      ...payload,
      merchandise_id: variantId,
      formattedMessage: message,
      type: "add-cart-quantity",
    });
  },

  "sub-cart-quantity": ({ params, payload, handleSubmit }) => {
    const { productTitle, variantId, variantTitle, dataPrice, dataCurrency, currentQuantity } = params;
    const message = `🛒 Make the Edit in my cart of "${productTitle}" (${variantTitle}) in my cart. Price: ${dataPrice}${dataCurrency} as quantity ${Number(currentQuantity) - 1}`;
    handleSubmit({
      ...payload,
      merchandise_id: variantId,
      formattedMessage: message,
      type: "sub-cart-quantity",
    });
  },

  checkout: ({ params }) => {
    const { checkoutUrl } = params;
    const link = document.createElement("a");
    link.href = checkoutUrl;
    link.rel = "noopener noreferrer";
    link.click();
  },

  "get-order-details": ({ params, payload, handleSubmit }) => {
    const { orderId, orderNo } = params;
    const message = `📦 Show me details of order ${orderNo || toOrderId(orderId)}`;
    handleSubmit({
      ...payload,
      formattedMessage: message,
      type: "get-order-details",
    });
  },
};

/* ---------------- Submit Handlers ---------------- */
export function handleInputOrEvent(inputOrEvent, config, cartId, conversationId, isSending, inputValue) {
  let userText = "";
  let botText = "";

  if (inputOrEvent && typeof inputOrEvent.preventDefault === "function") {
    // 📝 Normal text input
    const e = inputOrEvent;
    e.preventDefault();

    if (!inputValue.trim() || !config?.customerId || isSending || !conversationId) {
      return { userText, botText };
    }

    userText = inputValue;
    botText = inputValue;
  }

  else if (inputOrEvent && typeof inputOrEvent === "object") {
    const { type, params, formattedMessage } = inputOrEvent;

    switch (type) {
      case "addToOrder": {
        userText = formattedMessage;
        botText = `Add product to my order as variant ${params.variantId} as quantity 1 in my order and my customerId is ${config.customerId}`;
        break;
      }

      case "addToCart": {
        const add_lines = {
          product_variant_id: params.variantId,
          quantity: 1,
        };
        userText = formattedMessage;
        botText = `Add product to my cart as variant ${JSON.stringify(add_lines)} in my cart ${config.cart_id ? config.cart_id : ""}`;
        break;
      }

      case "apply-discount-true": {
        const { orderNameOrId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, selectedMethod } = params;
        userText = formattedMessage;
        botText = `In my order edit product with calculated line item ${calculatedLineItemId} to ${quantity} (was ${oldQuantity}) in my order in order ${orderNameOrId} the product variant is ${productVariantId} where The selected method has a discountChange value of ${selectedMethod?.discountChange === "true" ? true : false} for customer ${customerId}`;
        break;
      }

      case "apply-shipping": {
        const { orderNameOrId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, chosenMethod, deliveryProfiles, result, index, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip } = params;
        console.log(params, "--------------------jipjip");
        
        const value = `${deliveryProfiles}__${index}___<end>_${chosenMethod.name}/${chosenMethod.price}`;
        userText = formattedMessage;
        if (calculatedLineItemId == "undefined" || calculatedLineItemId == "null") {
          if(productVariantId == "undefined" || productVariantId == "null") {
            botText = `In my order edit address with Shipping address: ${firstName} ${lastName}, ${address1}, ${address2 ? address2 + ', ' : ''}${city}, ${province} (${provinceCode}), ${country}, ${zip}. 
              Phone: ${phone}. where The selected method of ${JSON.stringify({ selectedMethod: { [deliveryProfiles]: value } })} in the order ${orderNameOrId} for customer ${customerId}`;
          } else {
            botText = `Add product to my order as variant ${productVariantId} as quantity ${quantity} in my order and my customerId is ${customerId} where The selected method of ${JSON.stringify({ selectedMethod: { [deliveryProfiles]: value } })} in the order ${orderNameOrId}`;
          }
        } else {
          if ((quantity == "undefined" || quantity == "null") && (oldQuantity == "undefined" || oldQuantity == "null")) {
            botText = `In my order remove product with calculated line item ${calculatedLineItemId} in order ${orderNameOrId} the product variant is ${productVariantId} where selected method is ${JSON.stringify({ selectedMethod: { [deliveryProfiles]: value } })} for customer ${customerId}`;
          } else {
          botText = `In my order edit product with calculated line item ${calculatedLineItemId} to ${quantity} (was ${oldQuantity}) in my order in order ${orderNameOrId} the product variant is ${productVariantId} where The selected method of ${JSON.stringify({ selectedMethod: { [deliveryProfiles]: value } })} for customer ${customerId}`; 
        }
        }
        break;
      }

      case "add-quantity": {
        params.lineItemid = toCalculatedLineItemId(params.lineItemId);
        params.orderNameOrId = toOrderId(params.orderNameOrId);
        userText = formattedMessage;
        botText = `In my order Edit the quantity of variant ${params.variantId} within calculated line item ${params.lineItemid} to ${Number(params.currentQuantity) + 1} (was ${Number(params.currentQuantity)}) in my order ${params.orderNameOrId} also my customer ${config.customerId} and the selected method is ${params.selectedMethod ? params.selectedMethod : null}`;
        break;
      }

      case "sub-quantity": {
        params.lineItemid = toCalculatedLineItemId(params.lineItemId);
        params.orderNameOrId = toOrderId(params.orderNameOrId);
        userText = formattedMessage;
        botText = `In my order Edit the quantity of variant ${params.variantId} within calculated line item ${params.lineItemid} to ${Number(params.currentQuantity) - 1} (was ${Number(params.currentQuantity)}) in my order ${params.orderNameOrId} also my customer ${config.customerId} and the selected method is ${params.selectedMethod ? params.selectedMethod : null}`;
        break;
      }

      case "remove-item": {
        params.lineItemId = toCalculatedLineItemId(params.lineItemId);
        params.orderId = toOrderId(params.orderId);
        userText = formattedMessage;
        botText = `In my order remove product with calculated line item ${params.lineItemId} in order ${params.orderId} the product variant is ${params.variantId} where selected method is ${params.selectedMethod ? params.selectedMethod : null} for customer ${config.customerId}`;
        break;
      }

      case "cancel-order": {
        params.orderId = toOrderId(params.orderId);
        userText = formattedMessage;
        botText = `Cancel my order within order ${params.orderId} where my currency code is ${params.currencyCode}, the refunded amount is ${params.totalAmount > 0 ? params.totalAmount : "0"} refund is ${params.refund}, restock is ${params.restock}, the staffNote is ${params.staffNote} and the total amount is ${params.totalAmount} for customer ${config.customerId}`;
        break;
      }

      case "accept-refund": {
        params.orderId = toOrderId(params.orderId);
        userText = formattedMessage;
        botText = `Accept refund of my orderId ${params.orderId} and the reason ${params.reason}`;
        break;
      }

      case "add-cart-quantity": {
        params.productId = toCalculatedLineItemId(params.productId);
        userText = formattedMessage;
        botText = `In my cart edit quantity of variant ${params.variantId} within cart calculated line item ${params.cartLineId} to ${Number(params.currentQuantity) + 1} (was ${params.currentQuantity}) in my cartId ${cartId}`;
        break;
      }

      case "sub-cart-quantity": {
        params.productId = toCalculatedLineItemId(params.productId);
        userText = formattedMessage;
        botText = `In my cart edit quantity of variant ${params.variantId} within cart calculated line item ${params.cartLineId} to ${Number(params.currentQuantity) - 1} (was ${params.currentQuantity}) in my cartId ${cartId}`;
        break;
      }

      case "get-order-details": {
        params.orderId = toOrderId(params.orderId);
        userText = formattedMessage;
        botText = `Give me order details of this order ${params.orderId}`;
        break;
      }

      default: {
        userText = formattedMessage || "";
        botText = formattedMessage || "";
        break;
      }
    }

    // 📝 Always prefer the formatted user-facing message for display
    if (formattedMessage) {
      userText = formattedMessage;
    }
  }

  return { userText, botText };
}
