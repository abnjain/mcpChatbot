// import { config } from "dotenv";
// import { getStorefrontUrl, getClientId } from "../store/requestStore.js";

function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function tryParse(input) {
  if (input == null) return {};

  // If string, try parsing
  if (typeof input === "string") {
    try {
      return JSON.parse(input);
    } catch {
      return {};
    }
  }

  // If RPC envelope (result.content[0].text is JSON string)
  if (input?.result?.content && Array.isArray(input.result.content)) {
    const first = input.result.content[0];
    if (first?.text && typeof first.text === "string") {
      try {
        return JSON.parse(first.text);
      } catch {
        return {};
        // fallthrough
      }
    }
  }

  // If already an object, return as-is
  return input;
}

function fmtMoney(amount, currency) {
  const a = (amount == null ? "" : String(amount));
  const c = (currency == null ? "" : String(currency));
  return `${esc(a)} ${esc(c)}`.trim();
}

// shipping popup html builder
export function getShippingPopupHtml({ orderNameOrId = null, orderId = null, orderName = null, deliveryProfiles = null, variants = null, shippingOptions = null, mainOId = null, customerId = null, productVariantId = null, calculatedLineItemId = null, quantity = null, oldQuantity = null, result = null, address1 = null, address2 = null, city = null, country = null, firstName = null, lastName = null, phone = null, province = null, provinceCode = null, zip = null, selectedMethod = null } = {}) {
  return `
<div id="shipping-popup" style="padding:1rem;font-family:system-ui,sans-serif;color:#333;">
  <h3 style="font-size:1.4rem;font-weight:600;margin-bottom:1rem;color:#111;">Choose Shipping Method</h3>

  <div style="margin-bottom:1rem;">
    ${variants?.map(variant => `
        <div style="margin-bottom:0.75rem; display:flex; gap:12px; align-items:center;">
          <img src="${variant.image}" alt="${variant.title}" style="width:50px;height:50px;border-radius:6px;object-fit:cover;border:1px solid #ddd;" />
          <div>
            <div style="font-size:1rem;font-weight:500;color:#222;">${variant.title}</div>
            <div style="font-size:0.9rem;color:#666;">Variant: ${variant.variantTitle}</div>
            <div style="font-size:0.9rem;color:#666;">Quantity: ${variant.quantity}</div>
          </div>
        </div>
      `).join("")
    }
  </div>

  <div style="margin-top:1rem; border-top:1px solid #eee; padding-top:1rem;">
    <h4 style="font-size:1.1rem;font-weight:600;margin-bottom:0.75rem;color:#111;">Available Shipping Rates</h4>
    <div style="display:flex;flex-direction:column;gap:8px;">
      ${shippingOptions?.map((method, index) => `
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 10px;border:1px solid #ddd;border-radius:6px;">
            <input type="radio" name="shipping-method" value="${index}" style="cursor:pointer;" />
            <div>
              <div style="font-size:1rem;font-weight:500;color:#222;">${method.name}</div>
              <div style="font-size:0.9rem;color:#555;">
                ${method.price > 0 ? method.price + " " + method.currency : "Free"} 
                ${method.discount ? "<span style='color:#4caf50;font-weight:600;'>(Discounted)</span>" : ""}
              </div>
            </div>
          </label>
        `).join("")
    }
    </div>
  </div>

  <div style="margin-top: 1.5rem; display:flex; gap:12px; justify-content:center;">
    <button
      class="apply-shipping-yes"
      data-order-id="${mainOId}"
      data-customer-id="${customerId}"
      data-product-variant-id="${productVariantId}"
      data-calculated-line-item-id="${calculatedLineItemId}"
      data-quantity="${quantity}"
      data-old-quantity="${oldQuantity}"
      data-address1="${address1}"
      data-address2="${address2}"
      data-city="${city}"
      data-country="${country}"
      data-first-name="${firstName}"
      data-last-name="${lastName}"
      data-phone="${phone}"
      data-province="${province}"
      data-province-code="${provinceCode}"
      data-zip="${zip}"
      style="cursor:pointer; background:#4caf50; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-size:14px;"
    >Confirm Shipping</button>

    <button
      class="apply-shipping-no"
      style="cursor:pointer; background:#f44336; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-size:14px;"
    >Cancel</button>
  </div>

  <script>
    // Handle Confirm
    document.querySelector(".apply-shipping-yes").addEventListener("click", () => {
      const selected = document.querySelector("input[name='shipping-method']:checked");
      if (!selected) {
        alert("Please select a shipping method.");
        return;
      }

      const index = selected.value; // ✅ already set as radio value
      const chosenMethod = ${JSON.stringify(shippingOptions)}[index];
      const result = ${JSON.stringify(result)};
      const deliveryProfiles = ${JSON.stringify(deliveryProfiles)};
      const orderNameOrId = document.querySelector(".apply-shipping-yes").getAttribute("data-order-id");
      const customerId = document.querySelector(".apply-shipping-yes").getAttribute("data-customer-id");
      const productVariantId = document.querySelector(".apply-shipping-yes").getAttribute("data-product-variant-id");
      const calculatedLineItemId = document.querySelector(".apply-shipping-yes").getAttribute("data-calculated-line-item-id");
      const quantity = document.querySelector(".apply-shipping-yes").getAttribute("data-quantity");
      const oldQuantity = document.querySelector(".apply-shipping-yes").getAttribute("data-old-quantity");
      const address1 = document.querySelector(".apply-shipping-yes").getAttribute("data-address1");
      const address2 = document.querySelector(".apply-shipping-yes").getAttribute("data-address2");
      const city = document.querySelector(".apply-shipping-yes").getAttribute("data-city");
      const country = document.querySelector(".apply-shipping-yes").getAttribute("data-country");
      const firstName = document.querySelector(".apply-shipping-yes").getAttribute("data-first-name");
      const lastName = document.querySelector(".apply-shipping-yes").getAttribute("data-last-name");
      const phone = document.querySelector(".apply-shipping-yes").getAttribute("data-phone");
      const province = document.querySelector(".apply-shipping-yes").getAttribute("data-province");
      const provinceCode = document.querySelector(".apply-shipping-yes").getAttribute("data-province-code");
      const zip = document.querySelector(".apply-shipping-yes").getAttribute("data-zip");
      window.parent.postMessage(
        {
          type: "tool",
          payload: {
            toolName: "apply-shipping",
            params: { chosenMethod, orderNameOrId, customerId, productVariantId, calculatedLineItemId, quantity, oldQuantity, deliveryProfiles, result, index, address1, address2, city, country, firstName, lastName, phone, province, provinceCode, zip }
          }
        },
        "*"
      );

      document.getElementById("shipping-popup").remove();
    });

    // Handle Cancel
    document.querySelector(".apply-shipping-no").addEventListener("click", () => {
      window.parent.postMessage(
        { type: "tool", payload: { toolName: "cancel-shipping", params: {} } },
        "*"
      );
      document.getElementById("shipping-popup").remove();
    });
  </script>
</div>
  `;
}

// discount popup html builder
export function getDiscountPopupHtml({ orderNameOrId = null, orderId = null, orderName = null, discountToken = null, mainOId = null, customerId = null, productVariantId = null, calculatedLineItemId = null, quantity = null, oldQuantity = null, selectedMethod = null } = {}) {
  // Extract safe message

  const discountChange = discountToken ? tryParse(discountToken) : null;
  return `
<div id="discount-popup" style="padding:1rem;font-family:system-ui,sans-serif;color:#333;">
  <h3 style="font-size:1.4rem;font-weight:600;margin-bottom:1rem;color:#111;">Price Change! Do You want to apply?</h3>
  <p style="font-size:1rem;color:#555;line-height:1.4;">
    ${discountChange.message}
  </p>
  <div style="margin-top: 1rem; display:flex; gap:12px; justify-content:center;">
    <button
      class="apply-discount-yes"
      data-order-id="${mainOId}"
      data-customer-id="${customerId}"
      data-product-variant-id="${productVariantId}"
      data-calculated-line-item-id="${calculatedLineItemId}"
      data-quantity="${quantity}"
      data-old-quantity="${oldQuantity}"
      data-selected-method="${true}"
      style="cursor:pointer; background:#4caf50; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-size:14px;"
    >Yes, Apply</button>

    <button
      class="apply-discount-no"
      data-order-id="${mainOId}"
      data-customer-id="${customerId}"
      data-product-variant-id="${productVariantId}"
      data-calculated-line-item-id="${calculatedLineItemId}"
      data-quantity="${quantity}"
      data-old-quantity="${oldQuantity}"
      data-selected-method="${false}"
      style="cursor:pointer; background:#f44336; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-size:14px;"
    >No, Cancel</button>
  </div>

  <script>
    // Attach event listeners after DOM is rendered
    document.querySelectorAll(".apply-discount-yes").forEach((btn) => {
      btn.addEventListener("click", () => {
          const apply = "true";
          const orderNameOrId= btn.getAttribute("data-order-id");
          const customerId= btn.getAttribute("data-customer-id");
          const productVariantId= btn.getAttribute("data-product-variant-id");
          const calculatedLineItemId= btn.getAttribute("data-calculated-line-item-id");
          const quantity= btn.getAttribute("data-quantity");
          const oldQuantity= btn.getAttribute("data-old-quantity");
          const selectedMethod= {
              discountChange: btn.getAttribute("data-selected-method")
          };
        

        window.parent.postMessage(
          { type: "tool", 
            payload: { 
            toolName: "apply-discount-true",  
            params: { apply, orderNameOrId, customerId , productVariantId , calculatedLineItemId , quantity , oldQuantity, selectedMethod} 
            } 
          },
          "*"
        );

        // Remove popup
        document.getElementById("discount-popup").remove();
      });
    });
    document.querySelectorAll(".apply-discount-no").forEach((btn) => {
      btn.addEventListener("click", () => {
          const apply = btn.getAttribute("data-apply") === "false";
          const orderNameOrId= btn.getAttribute("data-order-id");
          const customerId= btn.getAttribute("data-customer-id");
          const productVariantId= btn.getAttribute("data-product-variant-id");
          const calculatedLineItemId= btn.getAttribute("data-calculated-line-item-id");
          const quantity= btn.getAttribute("data-quantity");
          const oldQuantity= btn.getAttribute("data-old-quantity");
          const selectedMethod= {
              discountChange: btn.getAttribute("data-selected-method")
          };
        

        window.parent.postMessage(
          { type: "tool", 
            payload: { 
            toolName: "apply-discount-false",  
            params: { apply, orderNameOrId, customerId , productVariantId , calculatedLineItemId , quantity , oldQuantity, selectedMethod} 
            } 
          },
          "*"
        );

        // Remove popup
        document.getElementById("discount-popup").remove();
      });
    });
  </script>
</div>
  `;
}

// order details html builder
export function getOrderDetailsBuild(data, config) {
    const { storefrontUrl, partnerDetails } = config;
  // Safeguard: if no data, return placeholder
  if (!data) {
    return `<div style="padding:1rem;font-size:1rem;font-family:Arial,sans-serif;">No order data available.</div>`;
  }
  const disallowEdits = data?.timeExceedDetails?.customerDisallowEdits === true;
  const fulfillment = (data.fulfillmentStatus || "Unknown").trim();
  const isCancelled = !!data.cancelledAt;

  let statusText = fulfillment;
  let statusStyle =
    "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#eeeeee;color:#333333;";

  if (isCancelled) {
    statusText = "Cancelled";
    statusStyle =
      "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#ffcccc;color:#990000;";
  } else {
    if (fulfillment.toLowerCase() === "fulfilled") {
      statusStyle =
        "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#e6ffe8;color:#009900;";
    } else if (fulfillment.toLowerCase() === "unfulfilled") {
      statusStyle =
        "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#ffe8e8;color:#cc0000;";
    }
  }

  // Helper to escape HTML (if `esc` is not defined, define a fallback)
  const esc = (str) => {
    if (str == null) return "";
    return String(str).replace(/[&<>"']/g, (s) => {
      const map = { "&": "&amp;", "<": "<", ">": ">", '"': "&quot;", "'": "&#39;" };
      return map[s];
    });
  };

  const header = `
<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #d1d1d1;padding-bottom:0.5rem;margin-bottom:0.75rem;">
  <h3 style="font-size:1.25rem;margin:0;">Order ${esc(data.orderNumber || "")}</h3>
  <span style="${statusStyle}">${esc(statusText)}</span>
</div>
`;

  const customer = `
<div>
  <p style="margin:0.25rem 0;font-size:1rem;"><b>Customer:</b> ${esc(data.shippingAddress?.name || "N/A")}</p>
  <p style="margin:0.25rem 0;font-size:1rem;"><b>Email:</b> ${esc(data.customerEmail || "N/A")}</p>
  <p style="margin:0.25rem 0;font-size:1rem;"><b>Ship To:</b> 
    ${[
      data.shippingAddress?.address1,
      data.shippingAddress?.city,
      data.shippingAddress?.provinceCode,
      data.shippingAddress?.countryCode,
      data.shippingAddress?.zip
    ].filter(Boolean).join(", ") || "N/A"}
  </p>
</div>
`;

  const totals = `
<div>
  <p style="margin:0.25rem 0;font-size:1rem;"><b>Total Paid:</b> ${esc(data.currencyCode || "")} ${esc((data.allTimePaidAmount || "0.00").toString())}</p>
  <p style="margin:0.25rem 0;font-size:1rem;"><b>Outstanding:</b> ${esc(data.currencyCode || "")} ${esc((data.totalOutstanding?.amount || "0.00").toString())}</p>
  ${disallowEdits ? `
  <p style="margin:5px 0px;padding:5px 0px;text-align:center;border-radius:50px;background:#f0f0f0;color:#999;font-size:0.875rem;">
    The order can no longer be edited
  </p>` : ""}
</div>
`;
  const validLineItems = (Array.isArray(data.lineItems) ? data.lineItems : [])
    .filter(item => (item.currentQuantity ?? item.quantity) > 0);

  const totalLineItems = validLineItems.length;

  let itemsHTML = "";
  if (Array.isArray(data.lineItems) && data.lineItems.length) {
    itemsHTML = data.lineItems
      .map((item) => {
        if ((item.currentQuantity ?? item.quantity) <= 0) return ""; // Skip zero-quantity items

        const qty = Number(item.currentQuantity ?? item.quantity) || 0;
        const disableSub = disallowEdits || qty <= 1;
        const disableRemove = disallowEdits || totalLineItems <= 1;
        const imgSrc = item?.image?.url ? esc(item.image.url) : "";

        return `
<div style="display:flex;align-items:flex-start;gap:0.75rem;border-bottom:1px solid #d1d1d1;padding:0.625rem 0;">
  <img src="${imgSrc}" alt="${esc(item.title || "")}" style="width:4rem;height:4rem;border-radius:0.5rem;object-fit:cover;" />
  
  <div style="flex:1; position:relative;">
    <h4 style="margin:0 0 0.25rem;font-size:1rem;">${esc(item.title || "")}</h4>
    <p style="font-size:0.875rem;color:#777;margin:0 0 0.375rem;">${esc(item.variant?.title || "")}</p>

    <div style="display:flex;align-items:center;gap:0.5rem;margin:0.5rem 0;">
      <p style="margin:0.125rem 0;font-size:0.875rem;"><b>Qty:</b> ${esc(qty.toString())}</p>

      <!-- - button -->
      <button 
        class="sub-quantity"
        data-lineitem-id="${esc(item.id)}"
        data-product-title="${esc(item.title)}"
        data-variant-id="${esc(item.variant?.id || "")}"
        data-variant-title="${esc(item.variant?.title || "")}"
        data-price="${esc(item.variant?.price || "0.00")}"
        data-current-quantity="${esc(qty.toString())}"
        data-currency="${esc(data.currencyCode || "")}"
        data-order-id="${esc(data.orderNumber || "")}"
        data-customer-id="${esc(data.customerId || "")}"
        data-order-no="${esc(data.orderNumber || "")}"
        ${disableSub ? "disabled" : ""}
        style="padding:0.25rem 0.5rem;font-size:0.875rem;border:1px solid #ccc;border-radius:4px;background:#f9f9f9;cursor:${disableSub ? "not-allowed" : "pointer"};">
        -
      </button>

      <!-- + button -->
      <button 
        class="add-quantity"
        data-lineitem-id="${esc(item.id)}"
        data-product-title="${esc(item.title)}"
        data-variant-id="${esc(item.variant?.id || "")}"
        data-variant-title="${esc(item.variant?.title || "")}"
        data-price="${esc(item.variant?.price || "0.00")}"
        data-current-quantity="${esc(qty.toString())}"
        data-currency="${esc(data.currencyCode || "")}"
        data-order-id="${esc(data.orderNumber || "")}"
        data-customer-id="${esc(data.customerId || "")}"
        data-order-no="${esc(data.orderNumber || "")}"
        ${disallowEdits ? "disabled" : ""}
        style="padding:0.25rem 0.5rem;font-size:0.875rem;border:1px solid #ccc;border-radius:4px;background:#f9f9f9;cursor:${disallowEdits ? "not-allowed" : "pointer"};">
        +
      </button>
    </div>

    <p style="margin:0.125rem 0;font-size:0.875rem;"><b>Price:</b> ${esc(data.currencyCode || "")} ${esc(item.variant?.price || "0.00")}</p>

    <!-- ❌ Remove button -->
    <button 
      class="remove-item"
      data-lineitem-id="${esc(item.id)}"
      data-item-title="${esc(item.title)}"
      data-variant-id="${esc(item.variant?.id || "")}"
      data-variant-title="${esc(item.variant?.title || "")}"
      data-order-id="${esc(data.orderNumber || "")}"
      data-customer-id="${esc(data.customerId || "")}"
      data-order-no="${esc(data.orderNumber || "")}"
      data-selected-method="${esc(data.selectedMethod || "")}"
      data-order="${esc(data.orderNameOrId || "")}"
      ${disableRemove ? "disabled" : ""}
      style="position:absolute;top:50%;right:0;transform:translateY(-50%);padding:0.25rem 0.5rem;font-size:1.5rem;border:none;background:transparent;color:${disableRemove ? "#999" : "#cc0000"};cursor:${disableRemove ? "not-allowed" : "pointer"};">
      ✕
    </button>
  </div>
</div>
`;
      })
      .filter(Boolean) // Remove empty strings
      .join("");
  }

  const outstandingAmount = parseFloat(data.totalOutstanding?.amount || 0);
  const totalAmount = parseFloat(data.totalPaidAmount)
  const hasRefund = outstandingAmount < 0;

  const btnFamily = `
<div style="margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;">

  <!-- Cancel Order -->
  <button 
    id="cancel-order-btn"
    data-order-id="${esc(data.orderNumber || "")}"
    data-currency="${esc(data.currencyCode || "")}"
    data-refunded-amount="${esc((data.refundAmount || "").toString())}"
    data-refund="${esc(String(data.refund || false))}"
    data-restock="${esc(String(data.restock || false))}"
    data-staff-note="${esc(data.staffNote)}"
    data-total-amount="${esc(totalAmount.toString())}"
    data-customer-id="${esc(data.customerId || "")}"
    data-order-no="${esc(data.orderNumber || "")}"
    ${disallowEdits ? "disabled" : ""}
    style="padding:0.5rem 1rem;font-size:1rem;border:1px solid #ff4d4d;border-radius:0.5rem;background:${disallowEdits ? "#f0f0f0" : "#ff4d4d"};color:#fff;cursor:${disallowEdits ? "not-allowed" : "pointer"};">
    Cancel Order
  </button>

  <!-- Complete Payment -->
  ${data.paymentUrl && outstandingAmount > 0
      ? `<button 
          id="complete-payment-btn"
          data-payment-url="${esc(data.paymentUrl)}"
          style="padding:0.5rem 1rem;font-size:1rem;border:1px solid #4caf50;border-radius:0.5rem;background:${disallowEdits ? "#f0f0f0" : "#4caf50"};color:#fff;cursor:${disallowEdits ? "not-allowed" : "pointer"};">
          Complete Payment
        </button>`
      : ""
    }

  <!-- Accept Refund -->
  <button 
    id="${hasRefund ? "accept-refund-btn" : ""}"
    data-order-id="${esc(data.orderNumber || "")}"
    data-reason="${esc(data.reason || "Accept Refund")}"
    data-customer-id="${esc(data.customerId || "")}"
    data-order-no="${esc(data.orderNumber || "")}"
    ${disallowEdits || !hasRefund ? "disabled" : ""}
    style="padding:0.5rem 1rem;font-size:1rem;border:1px solid #2196f3;border-radius:0.5rem;background:${disallowEdits || !hasRefund ? "#f0f0f0" : "#2196f3"};color:#fff;cursor:${disallowEdits || !hasRefund ? "not-allowed" : "pointer"};">
    Accept Refund
  </button>

</div>
`;

  return `
<div style="padding:1rem;font-size:1rem;min-height:500px;font-family:Arial,sans-serif;">
  ${header}
  ${customer}
  ${totals}
  <div>
    <h4 style="font-size:1.125rem;margin-bottom:0.625rem;border-bottom:1px solid #e0e0e0;padding-bottom:0.25rem;">Items</h4>
    ${itemsHTML || "<p>No items found.</p>"}
  </div>
  ${btnFamily}

  <script>
    (function() {
      const disallowEdits = ${disallowEdits};

      if (disallowEdits) return;

      // Helper to safely get attribute
      const getAttr = (el, attr) => el.getAttribute(attr) || "";

      // Quantity Subtract
      document.querySelectorAll(".sub-quantity").forEach(btn => {
        btn.addEventListener("click", () => {
          window.parent.postMessage({
            type: "tool",
            payload: {
              toolName: "sub-quantity",
              params: {
                lineItemId: getAttr(btn, "data-lineitem-id"),
                productTitle: getAttr(btn, "data-product-title"),
                variantId: getAttr(btn, "data-variant-id"),
                variantTitle: getAttr(btn, "data-variant-title"),
                price: getAttr(btn, "data-price"),
                currency: getAttr(btn, "data-currency"),
                currentQuantity: getAttr(btn, "data-current-quantity"),
                orderNameOrId: getAttr(btn, "data-order-id"),
                customerId: getAttr(btn, "data-customer-id"),
                orderNo: getAttr(btn, "data-order-no")
              }
            }
          }, "*");
        });
      });

      // Quantity Add
      document.querySelectorAll(".add-quantity").forEach(btn => {
        btn.addEventListener("click", () => {
          window.parent.postMessage({
            type: "tool",
            payload: {
              toolName: "add-quantity",
              params: {
                lineItemId: getAttr(btn, "data-lineitem-id"),
                productTitle: getAttr(btn, "data-product-title"),
                variantId: getAttr(btn, "data-variant-id"),
                variantTitle: getAttr(btn, "data-variant-title"),
                price: getAttr(btn, "data-price"),
                currency: getAttr(btn, "data-currency"),
                currentQuantity: getAttr(btn, "data-current-quantity"),
                orderNameOrId: getAttr(btn, "data-order-id"),
                customerId: getAttr(btn, "data-customer-id"),
                orderNo: getAttr(btn, "data-order-no")
              }
            }
          }, "*");
        });
      });

      // Cancel Order
      const cancelBtn = document.getElementById("cancel-order-btn");
      if (cancelBtn && !cancelBtn.disabled) {
        cancelBtn.addEventListener("click", () => {
          window.parent.postMessage({
            type: "tool",
            payload: {
              toolName: "cancel-order",
              params: {
                orderNameOrId: getAttr(cancelBtn, "data-order-id"),
                currencyCode: getAttr(cancelBtn, "data-currency"),
                refundedAmount: getAttr(cancelBtn, "data-refunded-amount"),
                refund: getAttr(cancelBtn, "data-refund") === "true",
                restock: getAttr(cancelBtn, "data-restock") === "true",
                staffNote: getAttr(cancelBtn, "data-staff-note"),
                totalAmount: getAttr(cancelBtn, "data-total-amount"),
                customerId: getAttr(cancelBtn, "data-customer-id"),
                orderNo: getAttr(cancelBtn, "data-order-no")
              }
            }
          }, "*");
        });
      }

      // Complete Payment
      const completePaymentBtn = document.getElementById("complete-payment-btn");
      if (completePaymentBtn && !completePaymentBtn.disabled) {
        const returnUrl = "${storefrontUrl}";
        completePaymentBtn.addEventListener("click", () => {
          window.parent.postMessage({
            type: "link",
            payload: {
              toolName: "ordercompleteurl",
              params: {
                orderCompUrl: getAttr(completePaymentBtn, "data-payment-url"),
                returnUrl
              }
            }
          }, "*");
        });
      }

      // Accept Refund
      const refundBtn = document.getElementById("accept-refund-btn");
      if (refundBtn && !refundBtn.disabled) {
        refundBtn.addEventListener("click", () => {
          window.parent.postMessage({
            type: "tool",
            payload: {
              toolName: "accept-refund",
              params: {
                orderNameOrId: getAttr(refundBtn, "data-order-id"),
                reason: getAttr(refundBtn, "data-reason"),
                customerId: getAttr(refundBtn, "data-customer-id"),
                orderNo: getAttr(refundBtn, "data-order-no")
              }
            }
          }, "*");
        });
      }

      // Remove Item
      document.querySelectorAll(".remove-item").forEach(btn => {
        if (btn.disabled) return;
        btn.addEventListener("click", () => {
          window.parent.postMessage({
            type: "tool",
            payload: {
              toolName: "remove-item",
              params: {
                productTitle: getAttr(btn, "data-item-title"),
                lineItemId: getAttr(btn, "data-lineitem-id"),
                variantId: getAttr(btn, "data-variant-id"),
                variantTitle: getAttr(btn, "data-variant-title"),
                orderNameOrId: getAttr(btn, "data-order-id"),
                customerId: getAttr(btn, "data-customer-id"),
                orderNo: getAttr(btn, "data-order-no"),
                selectedMethod: getAttr(btn, "data-selected-method")
              }
            }
          }, "*");
        });
      });
    })();
  </script>
</div>
`;
}

// search shop html builder
export function shopCatalogBuild({ data, type = "order" }) {
  const products = data?.products || [];

  if (products.length === 0) {
    return `<p style="text-align:center;font-size:1rem;color:#888;">No products found.</p>`;
  }
  // Decide button label, class, and toolName based on type
  const btnLabel = type === "cart" ? "Add To Cart 🛒" : "Add To Order 🛍️";
  const btnClass = type === "cart" ? "add-to-cart" : "add-to-order";
  const toolName = type === "cart" ? "addToCart" : "addToOrder";
  return `
<div style="padding:1rem;font-family:system-ui,sans-serif;color:#333;">
  <h3 style="font-size:1.4rem;font-weight:600;margin-bottom:1rem;color:#111;">
    Shop Catalog Results
  </h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1.2rem;">
    ${products
      .map(
        (p) => `
        <div style="background:#fff;border:1px solid #ddd;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow 0.3s ease;">
      
    <div>
        <img src="${esc(p.image_url || "./shopify.svg")}" alt="${esc(
          p.title
        )}" style="width:100%;height:200px;object-fit:cover;" />
      </div>
      <div style="padding:0.8rem 1rem;">
        <h4 style="font-size:1rem;font-weight:600;margin:0 0 0.4rem;color:#222;">
          ${esc(p.title)}
        </h4>
        ${p.description
            ? `<p style="font-size:0.85rem;color:#666;margin:0 0 0.6rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;">${esc(
              p.description
            )}</p>`
            : ""
          }
        <p style="font-weight:500;color:#0070f3;margin:0 0 0.6rem;">
          ${esc(p.price_range.min)} - ${esc(p.price_range.max)} ${esc(
            p.price_range.currency
          )}
        </p>
        ${p.variants?.length
            ? `<ul style="list-style:none;padding:0;margin:0;font-size:0.85rem;border-top:1px solid #eee;padding-top:0.5rem;">
      ${p.variants
              .map(
                (v) => `
              <li style="display:flex;justify-content:space-between;padding:0.2rem 0;color:#555;align-items:center;">
                <span>${esc(v.title)}</span>
                <span>${esc(v.price)} ${esc(v.currency)}</span>
                <span>${esc(v.sku)}</span>
                <span>
                  <button
                    class="${btnClass}"
                    data-main-id="${type === "cart" ? esc(data?.id) : esc(data?.orderNumber)}"
                    data-product-id="${esc(p?.product_id)}"
                    data-product-title="${esc(p?.title)}"
                    data-variant-id="${esc(v?.variant_id)}"
                    data-variant-title="${esc(v?.title)}"
                    data-price="${esc(v?.price)}"
                    data-currency="${esc(v?.currency)}"
                    data-image-url="${esc(v?.image_url)}"
                    style="cursor:pointer;padding:0.3rem 0.6rem;border:1px solid #0070f3;background:#0070f3;color:#fff;border-radius:4px;font-size:0.8rem;"
                  >${btnLabel}</button>
                </span>
              </li>`
              )
              .join("")}
          </ul>`
            : `<p style="
  font-size:0.85rem;
  font-weight:500;
  color:#c62828;
  background:#fdecea;
  padding:0.3rem 0.8rem;
  border-radius:999px;
  margin:0.5rem 0 0;
  display:inline-block;
">
  Out of Stock
</p>`
          }
      </div>
    </div>`
      )
      .join("")}
  </div>

  <script>
    // Attach event listeners after DOM is rendered
    document.querySelectorAll(".${btnClass}").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mainId = btn.getAttribute("data-main-id");
        const productId = btn.getAttribute("data-product-id");
        const productTitle = btn.getAttribute("data-product-title");
        const variantId = btn.getAttribute("data-variant-id");
        const variantTitle = btn.getAttribute("data-variant-title");
        const dataPrice = btn.getAttribute("data-price");
        const dataCurrency = btn.getAttribute("data-currency");
        const imgUrl  = btn.getAttribute("data-image-url");

        window.parent.postMessage(
          {
            type: "tool",
            payload: {
              toolName: "${toolName}",
              params: { mainId, productId, productTitle, variantId, variantTitle, dataPrice, dataCurrency, imgUrl }
            }
          },
          "*"
        );
      });
    });
  </script>
</div>`;
}

// cart details html builder
export function getCartBuild(datas) {
  const data = tryParse(datas) || {};
  // console.log("--------------- ", data);
  // console.log("--------------- ", data.lines);

  const instructions = data.instructions || "";
  const cart = data.cart || {};


  const buyer = cart.buyer_identity || {};
  const lines = Array.isArray(cart.lines) ? cart.lines : [];

  // Totals
  const totalAmount = cart.cost?.total_amount?.amount ?? "";
  const totalCurrency = cart.cost?.total_amount?.currency ?? "";
  const subtotalAmount = cart.cost?.subtotal_amount?.amount ?? "";
  const subtotalCurrency = cart.cost?.subtotal_amount?.currency ?? totalCurrency;
  const totalQty = cart.total_quantity ?? 0;

  // Build line items
  const itemsHTML = lines.length
    ? lines.map((line) => {

      const qty = line.quantity ?? 0;
      const id = line.id;
      const variantId = line.merchandise.id
      const variantTitle = line.merchandise?.title || "Default";
      const productTitle = line.merchandise?.product?.title || "";
      const lineAmt = line.cost?.total_amount?.amount ?? "";
      const lineCur = line.cost?.total_amount?.currency ?? "";
      // const lineImg = line
      const lineQuantity = line.quantity
      return `
            <div style="display:flex;align-items:flex-start;gap:0.75rem;border-bottom:1px solid #e5e5e5;padding:0.625rem 0;">
              <div style="flex:1;">
                <div style="font-size:1rem;font-weight:600;margin:0 0 0.25rem;color:#222;">${esc(productTitle)}</div>
                <div style="font-size:0.875rem;color:#666;margin:0 0 0.25rem;">${esc(variantTitle)}</div>
                <div style="font-size:0.875rem;margin:0.125rem 0;">
                  <div>
                    <b>Qty:</b> ${esc(qty)}
                     <!-- - button -->
                      <button 
                        class="sub-cart-quantity"

                        data-cart-line-id="${esc(id)}"
                        data-product-title="${esc(productTitle)}"
                        data-variant-id="${esc(variantId)}"
                        data-variant-title="${esc(variantTitle)}"
                        data-price="${esc(lineAmt)}"
                        data-currentQuantity="${esc(lineQuantity)}"
                        data-currency="${esc(lineCur)}"
                        style="padding:0.25rem 0.5rem;font-size:0.875rem;border:1px solid #ccc;border-radius:4px;background:#f9f9f9;cursor:pointer;">
                        -
                      </button>

                      <!-- + button -->
                      <button 
                        class="add-cart-quantity"
                        data-cart-line-id="${esc(id)}"
                        data-product-title="${esc(productTitle)}"
                        data-variant-id="${esc(variantId)}"
                        data-variant-title="${esc(variantTitle)}"
                        data-price="${esc(lineAmt)}"
                        data-currentQuantity="${esc(lineQuantity)}"
                        data-currency="${esc(lineCur)}"
                        style="padding:0.25rem 0.5rem;font-size:0.875rem;border:1px solid #ccc;border-radius:4px;background:#f9f9f9;cursor:pointer;">
                        +
                      </button>
                  </div>  
                </div>
              </div>
              <div style="text-align:right;min-width:7rem;">
                <div style="font-size:0.95rem;font-weight:600;margin:0.125rem 0;">${fmtMoney(lineAmt, lineCur)}</div>
              </div>
            </div>
          `;
    }).join("")
    : `<p style="margin:0;font-size:0.95rem;color:#777;">Cart is empty.</p>`;

  // Buyer info
  const buyerHTML = `
      <div style="margin-top:0.5rem;">
        ${buyer.email
      ? `<div style="font-size:0.95rem;margin:0.125rem 0;">
             <b>Email:</b> ${esc(buyer.email)}
           </div>`
      : ""
    }
        <div style="font-size:0.95rem;margin:0.125rem 0;"><b>Country:</b> ${esc(buyer.country_code || "—")}</div>
      </div>
    `;

  // Checkout link/button
  const checkoutURL = cart.checkout_url || "";
  const checkoutHTML = checkoutURL
    ? `<a href="${esc(checkoutURL)}" class="checkoutUrl" data-checkout-url="${esc(checkoutURL)}" style="display:inline-block;margin-top:0.75rem;padding:0.6rem 1rem;border-radius:0.5rem;text-decoration:none;background:#111;color:#fff;font-weight:600;">Proceed to Checkout</a>`
    : `<span style="display:inline-block;margin-top:0.75rem;padding:0.6rem 1rem;border-radius:0.5rem;background:#aaa;color:#fff;">Checkout Unavailable</span>`;

  // Status pill (derived from having delivery options etc. — not provided here; keep simple)
  const statusPill = `<span style="padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.8rem;font-weight:bold;background:#eee;color:#333;">Cart</span>`;

  // Wrap everything
  const html = `
      <div style="padding:1rem;font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;color:#333;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e5e5e5;padding-bottom:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:1.25rem;margin:0;">Your Cart (${esc(totalQty)})</h3>
          ${statusPill}
        </div>

        <div style="margin-bottom:1rem;">
          <div style="font-size:1.05rem;font-weight:600;margin:0 0 0.4rem;color:#111;">Customer Details</div>
          ${buyerHTML}
        </div>

        <div>
          <div style="font-size:1.05rem;font-weight:600;margin:0 0 0.4rem;color:#111;">Items</div>
          ${itemsHTML}
        </div>

        <div style="margin-top:1rem;border-top:1px solid #eee;padding-top:0.75rem;display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:0.95rem;color:#555;">
            <div style="margin:0.125rem 0;"><b>Subtotal:</b> ${fmtMoney(subtotalAmount, subtotalCurrency)}</div>
            <div style="margin:0.125rem 0;"><b>Total:</b> ${fmtMoney(totalAmount, totalCurrency)}</div>
          </div>
          <div>
            ${checkoutHTML}
          </div>
        </div>
        <script>
  // Attach event listeners after DOM is rendered
  document.querySelectorAll(".checkoutUrl").forEach((btn) => {
    btn.addEventListener("click", () => {
      const checkoutUrl = btn.getAttribute("data-checkout-url");
 
      window.parent.postMessage(
        {
          type: "link",
          payload: {
            toolName: "checkout",
            params: { checkoutUrl }
          }
        },
        "*"
      );
    });
  });
  // Minus button
  document.querySelectorAll(".sub-cart-quantity").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cartLineId = btn.getAttribute("data-cart-line-id");
      const productTitle = btn.getAttribute("data-product-title");
      const variantId = btn.getAttribute("data-variant-id");
      const variantTitle = btn.getAttribute("data-variant-title");
      const dataPrice = btn.getAttribute("data-price");
      const dataCurrency = btn.getAttribute("data-currency");
      const currentQuantity = btn.getAttribute("data-currentQuantity");

      window.parent.postMessage(
        {
          type: "tool",
          payload: {
            toolName: "sub-cart-quantity",
            params: { cartLineId, productTitle, variantId, variantTitle, dataPrice, dataCurrency, currentQuantity }
          }
        },
        "*"
      );
    });
  });

  // Plus button
  document.querySelectorAll(".add-cart-quantity").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cartLineId = btn.getAttribute("data-cart-line-id");
      const productTitle = btn.getAttribute("data-product-title");
      const variantId = btn.getAttribute("data-variant-id");
      const variantTitle = btn.getAttribute("data-variant-title");
      const dataPrice = btn.getAttribute("data-price");
      const dataCurrency = btn.getAttribute("data-currency");
      const currentQuantity = btn.getAttribute("data-currentQuantity");

      window.parent.postMessage(
        {
          type: "tool",
          payload: {
            toolName: "add-cart-quantity",
            params: { cartLineId, productTitle, variantId, variantTitle, dataPrice, dataCurrency, currentQuantity }
          }
        },
        "*"
      );
    });
  });
</script>
      </div>
    `;

  return { html, cart };
}

// faq html builder
export function getFaqPoliciesBuild(input) {
  const parsed = tryParse(input) || {};
  // flexibly accept either an array (faqs) or object with faqs/policies
  const faqs = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.faqs) ? parsed.faqs : (parsed?.faqsList || []));
  const policies = Array.isArray(parsed.policies) ? parsed.policies : [];

  // fallback if the top-level array-style object is nested under some other key
  const finalFaqs = faqs || [];

  // build FAQ items (use details/summary for collapsible behavior w/o JS)
  const faqItemsHTML = finalFaqs.length
    ? finalFaqs.map((it, idx) => {
      const q = esc(it?.question ?? `Question ${idx + 1}`);
      const a = esc(it?.answer ?? "");
      return `
<details style="border:1px solid #eee;border-radius:8px;padding:0.5rem 0;margin:0.5rem 0;background:#fff;">
<summary style="cursor:pointer;font-weight:600;font-size:1rem;padding:0.5rem 1rem;list-style:none;">
              ${q}
</summary>
<div style="padding:0.5rem 1rem;border-top:1px solid #f0f0f0;font-size:0.95rem;color:#333;line-height:1.45;">
              ${a}
</div>
</details>
        `;
    }).join("")
    : `<p style="margin:0;font-size:0.95rem;color:#666;">No FAQs found.</p>`;

  // build policies HTML (if provided) — allow simple text or url
  const policiesHTML = policies.length
    ? policies.map((p) => {
      const title = esc(p.title || "Policy");
      if (p.url) {
        return `<div style="margin:0.5rem 0;font-size:0.95rem;">
<a href="${esc(p.url)}" style="color:#0070f3;text-decoration:none;font-weight:600;">${title}</a>
</div>`;
      } else {
        const body = esc(p.body || "");
        return `<div style="margin:0.5rem 0;">
<div style="font-weight:700;font-size:0.98rem;margin-bottom:0.25rem;">${title}</div>
<div style="font-size:0.95rem;color:#444;line-height:1.4;">${body}</div>
</div>`;
      }
    }).join("")
    : `<p style="margin:0;font-size:0.95rem;color:#666;">No policy items available.</p>`;

  // final wrapper
  const html = `
<div style="padding:1rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#222;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<h2 style="font-size:1.25rem;margin:0;font-weight:700;color:#111;">FAQ & Policies</h2>
</div>
 
      <section aria-label="Frequently asked questions" style="margin-bottom:1rem;">
<div style="font-size:1.05rem;font-weight:700;margin-bottom:0.5rem;color:#111;">Frequently Asked Questions</div>
<div>
          ${faqItemsHTML}
</div>
</section>
 
      <section aria-label="Policies" style="margin-top:0.75rem;">
<div style="font-size:1.05rem;font-weight:700;margin-bottom:0.5rem;color:#111;">Policies</div>
<div style="background:#fafafa;border:1px solid #f0f0f0;padding:0.75rem;border-radius:8px;">
          ${policiesHTML}
</div>
</section>
</div>
  `;

  return html;
}

// order list builder
export function getOrdersListHtml(data) {
  if (!data || !data.result || !data.result.orders || !data.result.orders.length) {
    return '<div style="font-family: Arial, sans-serif; padding: 15px; color: red;">No orders found.</div>';
  }

  return (
    data.result.orders
      .map(orderWrapper => {
        const order = orderWrapper.node;
        const createdDate = new Date(order.createdAt).toLocaleDateString();
        const currency = order.presentmentCurrencyCode || "USD";
        const statusColor = order.displayFinancialStatus === "FULFILLED"
          ? "#4caf50"
          : order.cancelledAt
            ? "#ff4d4d"
            : "#ff9800";

        // ✅ filter out items with 0 quantity
        const items =
          order.lineItems?.edges?.filter(edge => edge.node.currentQuantity > 0) || [];

        return `
<div 
  class="order-card"
  data-order-id="${order.name}"
  data-order-name="${order.name}"
  style="
    border:1px solid #ddd;
    border-radius:10px;
    padding:15px;
    margin:12px auto;
    max-width:650px;
    font-family:Arial, sans-serif;
    background:#fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.05);
    cursor:pointer;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
  onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'"
>
  <!-- Header -->
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
    <h2 style="margin:0; font-size:18px; color:#333;">${order.name}</h2>
    <span style="padding:4px 10px; border-radius:20px; font-size:12px; font-weight:bold; background:${statusColor}; color:#fff;">
      ${order.cancelledAt ? "Cancelled" : order.displayFinancialStatus || "Pending"}
    </span>
  </div>

  <!-- Meta -->
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Placed:</b> ${createdDate}</p>
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Status:</b> ${order.displayFulfillmentStatus || "Unknown"}</p>
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Total:</b> ${currency} ${order.totalPriceSet?.presentmentMoney?.amount || "0.00"}</p>
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Outstanding:</b> ${currency} ${order.totalOutstandingSet?.presentmentMoney?.amount || "0.00"}</p>

  <!-- Small preview of items -->
  ${items.length
            ? `
    <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:8px;">
      ${items
              .slice(0, 2) // show only first 2
              .map(itemWrapper => {
                const item = itemWrapper.node;
                return `
          <div style="display:flex; align-items:center; gap:6px; border:1px solid #eee; border-radius:6px; padding:6px 8px; flex:1; min-width:120px;">
            ${item.image?.url ? `<img src="${item.image.url}" alt="item" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"/>` : ""}
            <div style="flex:1;">
              <p style="margin:0; font-size:13px; font-weight:500; color:#333;">${item.title || "Product"}</p>
              <p style="margin:0; font-size:12px; color:#555;">Qty: ${item.currentQuantity}</p>
            </div>
          </div>
          `;
              })
              .join("")}
      ${items.length > 2
              ? `<span style="font-size:12px; color:#999; align-self:center;">+${items.length - 2} more</span>`
              : ""
            }
    </div>`
            : `<p style="margin:8px 0; font-size:13px; color:#999;">No items found</p>`
          }
</div>
        `;
      })
      .join("") +
    `
<script>
  // Attach click listener to order cards
  document.querySelectorAll(".order-card").forEach(card => {
    card.addEventListener("click", () => {
      const orderId = card.getAttribute("data-order-id");
      const orderNo = card.getAttribute("data-order-name");
      window.parent.postMessage(
        {
          type: "tool",
          payload: {
            toolName: "get-order-details",
            params: { orderId, orderNo }
          }
        },
        "*"
      );
    });
  });
</script>
  `
  );
}

// login button and clicks html builder
export function loginButtonBuild() {
  return `
<div style="padding:1rem;font-family:system-ui,sans-serif;color:#333;">
  <h1>Shopify OAuth Button</h1>
  <button id="authBtn">Authenticate with Shopify</button>

  <script>
    function generateCodeVerifier(length = 128) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    async function generateCodeChallenge(verifier) {
      const encoder = new TextEncoder();
      const data = encoder.encode(verifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\\+/g, '-')
        .replace(/\\//g, '_')
        .replace(/=+$/, '');
    }

    async function generateState() {
      const timestamp = Date.now().toString();
      const randomString = Math.random().toString(36).substring(2);
      return timestamp + randomString;
    }

    (function(){
      const btn = document.getElementById('authBtn');
      if(!btn) return;

      btn.addEventListener('click', async () => {
        const SHOPIFY_CLIENT_ID = "7f3d0a49-0f38-4c32-926d-bac61f9a23d2"; 
        const state = await generateState();

        const authorizationRequestUrl = new URL(
          "https://shopify.com/authentication/67707699395/oauth/authorize"
        );
        authorizationRequestUrl.searchParams.append('scope', 'openid email customer-account-api:full');
        authorizationRequestUrl.searchParams.append('client_id', SHOPIFY_CLIENT_ID);
        authorizationRequestUrl.searchParams.append('response_type', 'code');
        authorizationRequestUrl.searchParams.append('redirect_uri', "https://account-editor.fly.dev/auth/callback?source=core%22");
        authorizationRequestUrl.searchParams.append('state', state);

        const verifier = generateCodeVerifier();
        const challenge = await generateCodeChallenge(verifier);
        authorizationRequestUrl.searchParams.append('code_challenge', challenge);
        authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256');

        const finalUrl = authorizationRequestUrl.toString();
        console.log("authorizationRequestUrl", finalUrl);


 
        window.parent.postMessage(
          {
            type: "link",
            payload: {
              toolName: "loginurl",
              params: { redirectLink: finalUrl }
            }
          },
          "*"
        );
      });
    })();
  </script>
</div>
  `;
}

// smart cancellation html builder
export function getSmartCancellationHtml(data, { orderNameOrId = null, currencyCode = null, customerId = null, customerRefundedAmount = null, refund = null, restock = null, staffNote = null, totalAmount = null, orderNumber }) {

  // Header explaining the offers as an alternative to cancellation
  const header = `
    <div style="font-family: Arial, sans-serif; padding: 15px; text-align: center; background: #f5f5f5; border-radius: 10px; margin: 12px auto; max-width: 650px;">
      <h1 style="font-size: 20px; color: #333; margin: 0;">Explore These Offers Instead of Cancelling Your Order</h1>
      <p style="font-size: 14px; color: #666; margin: 8px 0;">Take advantage of these exclusive offers as an alternative to cancelling your order. Choose an offer below or cancel if you prefer.</p>
    </div>
  `;

  const offersHtml = data.result
    .map(offer => {
      const { type, value, offerId } = offer;
      const statusColor = type === "percentageDiscount" ? "#4caf50" :
        type === "giftCard" ? "#2196f3" :
          type === "storeCredit" ? "#ff9800" :
            type === "giftItems" ? "#9c27b0" :
              type === "discountCode" ? "#673ab7" : "#666"; // Default color for unknown types

      // Handle different offer types for value display
      let valueDisplay = "";
      let valueAttribute = "";
      if (type === "giftItems") {
        const items = value || [];
        valueDisplay = items.length
          ? items
            .map(item => {
              const productHeader = `
          <div class="gift-product-block" style="margin-bottom:12px; width:100%;">
            <p style="margin:0 0 6px 0; font-weight:600; font-size:14px; color:#222;">
              ${item.title}
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
        `;
              const productImages = (item.images || [])
                .map(img => {
                  const imgData = {
                    productId: item.id,
                    productTitle: item.title,
                    image: img, // single selected image object
                  };
                  return `
              <div 
                class="gift-item-card"
                data-offer-id="${offerId}"
                data-offer-type="giftItems"
                data-value='${JSON.stringify(imgData)}'
                style="display:flex; align-items:center; gap:6px; border:1px solid #eee; border-radius:6px; padding:6px 8px; cursor:pointer; min-width:180px;"
              >
                <img src="${img.originalSrc}" alt="${img.altText || item.title}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"/>
                <div style="flex:1;">
                  <p style="margin:0; font-size:12px; font-weight:500; color:#333;">${img.altText || "Variant"}</p>
                </div>
              </div>
            `;
                })
                .join("");
              const productFooter = `</div></div>`;
              return productHeader + productImages + productFooter;
            })
            .join("")
          : "No gift items specified";

        valueAttribute = ""; // don’t stringify the full array anymore
      } else if (type === "percentageDiscount") {
        valueDisplay = `${value}% Off`;
        valueAttribute = value;
      } else if (type === "giftCard") {
        valueDisplay = `${currencyCode || "$"}${value} Gift Card`;
        valueAttribute = value;
      } else if (type === "storeCredit") {
        valueDisplay = `${currencyCode || "$"}${value} Store Credit`;
        valueAttribute = value;
      } else if (type === "discountCode") {
        valueDisplay = `Discount Code: ${value}`;
        valueAttribute = value;
      } else if (type === "freeShipping") {
        valueDisplay = value ? "Free Shipping Available" : "No Free Shipping";
        valueAttribute = value;
      } else {
        valueDisplay = value || "N/A";
        valueAttribute = value;
      }

      return `
<div 
  class="offer-card"
  data-offer-id="${offerId}"
  data-order-id="${data.order?.id || orderNameOrId || ''}"
  data-order-no="${data.order?.name || orderNameOrId || ''}"
  data-offer-type="${type}"
  data-value="${encodeURIComponent(valueAttribute)}"
  style="
    border:1px solid #ddd;
    border-radius:10px;
    padding:15px;
    margin:12px auto;
    max-width:650px;
    font-family:Arial, sans-serif;
    background:#fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.05);
    cursor:pointer;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
  onmouseout="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.05)'"
>
  <!-- Header -->
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
    <h2 style="margin:0; font-size:18px; color:#333;">${type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}</h2>
    <span style="padding:4px 10px; border-radius:20px; font-size:12px; font-weight:bold; background:${statusColor}; color:#fff;">
      Offer
    </span>
  </div>

  <!-- Meta -->
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Value:</b> ${valueDisplay}</p>
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Offer ID:</b> ${offerId}</p>

  <!-- Preview of gift items (if applicable) -->
  ${type === "giftItems" && valueDisplay !== "No gift items specified"
          ? `
    <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:8px;">
      ${valueDisplay}
    </div>`
          : ""}
</div>
      `;
    })
    .join("");

  const footer = `
    <!-- Cancel Order Instead Link -->
    <div style="margin-top:10px; text-align: center;">
      <a 
        class="cancel-order-link"
        data-order-id="${data.order?.id || orderNameOrId || ''}"
        data-order-no="${orderNumber || orderNameOrId || ''}"
        href="javascript:void(0);"
        style="
          font-size: 13px;
          color: #ff4d4d;
          text-decoration: underline;
          cursor: pointer;
        "
      >Cancel Order Instead</a>
    </div>
  `;

  return `
    ${header}
    ${offersHtml}
    ${footer}
    <script>
      // Attach click listener to offer cards
      document.querySelectorAll(".offer-card").forEach(card => {
        card.addEventListener("click", (event) => {
          const offerId = card.getAttribute("data-offer-id");
          const orderId = card.getAttribute("data-order-id");
          const orderNo = card.getAttribute("data-order-no");
          const offerType = card.getAttribute("data-offer-type");
          const value = decodeURIComponent(card.getAttribute("data-value"));
          window.parent.postMessage(
            {
              type: "tool",
              payload: {
                toolName: "add-offer-details",
                params: { 
                  offerId, 
                  orderId, 
                  orderNo,
                  value,
                  selectedOffer: { 
                    type: offerType, 
                    value: offerType === "giftItems" ? JSON.parse(value) : value,
                    offerId 
                  },
                  orderNameOrId: "${orderNameOrId || ''}",
                  currencyCode: "${currencyCode || ''}",
                  customerId: "${customerId || ''}",
                  customerRefundedAmount: ${customerRefundedAmount || null},
                  refund: ${refund || false},
                  restock: ${restock || false},
                  staffNote: "${staffNote || ''}",
                  totalAmount: "${totalAmount || ''}"
                }
              }
            },
            "*"
          );
        });
      });

      // Attach click listener to gift item cards individually
document.querySelectorAll(".gift-item-card").forEach(item => {
  item.addEventListener("click", () => {
    const offerId = item.getAttribute("data-offer-id");
    const offerType = item.getAttribute("data-offer-type");
    const value = JSON.parse(item.getAttribute("data-value")); // <-- already a single image object

    window.parent.postMessage(
      {
        type: "tool",
        payload: {
          toolName: "add-offer-details",
          params: { 
            offerId,
            orderId: "${data.order?.id || orderNameOrId || ''}",
            orderNo: "${data.order?.name || orderNameOrId || ''}",
            selectedOffer: { 
              type: offerType,
              value, // ✅ this is now just the single image object
              offerId 
            },
            orderNameOrId: "${orderNameOrId || ''}",
            currencyCode: "${currencyCode || ''}",
            customerId: "${customerId || ''}",
            customerRefundedAmount: ${customerRefundedAmount || null},
            refund: ${refund || false},
            restock: ${restock || false},
            staffNote: "${staffNote || ''}",
            totalAmount: "${totalAmount || ''}"
          }
        }
      },
      "*"
    );
  });
});

      // Attach click listener to cancel order link
      document.querySelectorAll(".cancel-order-link").forEach(link => {
        link.addEventListener("click", () => {
          const orderId = link.getAttribute("data-order-id");
          const orderNo = link.getAttribute("data-order-no");
          window.parent.postMessage(
            {
              type: "tool",
              payload: {
                toolName: "cancel-order",
                params: { 
                  orderId, 
                  orderNo,
                  orderNameOrId: "${orderNameOrId || ''}",
                  currencyCode: "${currencyCode || ''}",
                  customerId: "${customerId || ''}",
                  customerRefundedAmount: ${customerRefundedAmount || null},
                  refund: ${refund || false},
                  restock: ${restock || false},
                  staffNote: "${staffNote || ''}",
                  totalAmount: "${totalAmount || ''}",
                  selectedOffer: null
                }
              }
            },
            "*"
          );
        });
      });
    </script>
  `;
}

// cancellation settings html builder
export function getCancellationSettingsHtml(data, { orderNameOrId = null, mainOId = null, currencyCode = null, customerId = null, customerRefundedAmount = null, refund = null, restock = null, staffNote = null, totalAmount = null, orderNo = null }) {
  // Dropdown reasons
  const reasonOptions = [
    `<option value="" disabled selected>Select an option</option>`,
    ...(data.reason || []).map(r => `<option value="${r.key}">${r.desc}</option>`)
  ].join("");

  // Restocking fees display
  let restockingHtml = "";
  const totalPaid = parseFloat(totalAmount) || 0;

  if (data.restockingFees?.isOn) {
    let restockAmount = 0;
    let restockDescription = "";

    switch (data.restockingFees.type) {
      case "percentage":
        restockAmount = (totalPaid * data.restockingFees.value) / 100;
        restockDescription = `${data.restockingFees.value}% of total paid`;
        break;
      case "fixed":
        restockAmount = parseFloat(data.restockingFees.value);
        restockDescription = `Fixed fee`;
        break;
      case "shippingtaxes":
        restockAmount = 0;
        restockDescription = `Shipping taxes applied on refund`;
        break;
      default:
        restockAmount = 0;
        restockDescription = "No fee";
    }

    const upcomingRefund = data.restockingFees.type !== "shippingtaxes"
      ? totalPaid - restockAmount
      : "-";

    restockingHtml = `
    <div style="margin:10px 0; padding:10px; border:1px solid #eee; border-radius:6px; background:#fafafa;">
      <h3 style="margin:0 0 6px 0; font-size:15px; color:#333;">Restocking Fees Breakdown</h3>
      <table style="width:100%; font-size:13px; color:#555; border-collapse: collapse;">
        <tr>
          <td style="padding:4px 0;">Total Paid:</td>
          <td style="padding:4px 0; text-align:right;">$${totalPaid.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;">Restocking Fee (${restockDescription}):</td>
          <td style="padding:4px 0; text-align:right;">${data.restockingFees.type === "shippingtaxes" ? restockDescription : "- $" + restockAmount.toFixed(2)}</td>
        </tr>
        ${data.restockingFees.message ? `<tr><td colspan="2" style="padding:4px 0; color:#777;">${data.restockingFees.message}</td></tr>` : ""}
        <tr>
          <td style="padding:4px 0; font-weight:bold;">Upcoming Refund:</td>
          <td style="padding:4px 0; text-align:right; font-weight:bold;">${upcomingRefund === "-" ? "-" : "$" + upcomingRefund.toFixed(2)}</td>
        </tr>
      </table>
    </div>
  `;
  }

  // Credit message
  let creditMessage = "";
  switch (data.credit) {
    case "originalPayment":
      creditMessage = "Refunds will be sent back to the original payment method you used.";
      break;
    case "storeCredit":
      creditMessage = "You’ll receive store credit equal to your refund amount, which you can use on future purchases.";
      break;
    case "flowAction":
      creditMessage = "Clicking 'Confirm' will create a cancellation request for this order, which will then be reviewed.";
      break;
    default:
      creditMessage = "No credit option specified.";
  }

  return `
<div class="cancellation-interactive-card" style="
  border:1px solid #ddd;
  border-radius:10px;
  padding:15px;
  margin:12px auto;
  max-width:650px;
  font-family:Arial, sans-serif;
  background:#fff;
  box-shadow:0 2px 8px rgba(0,0,0,0.05);
">
  <!-- Header -->
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <h2 style="margin:0; font-size:18px; color:#333;">Cancel Order</h2>
    <span style="padding:4px 10px; border-radius:20px; font-size:12px; font-weight:bold; background:${data.isOn ? "#4caf50" : "#ff4d4d"}; color:#fff;">
      ${data.isOn ? "Enabled" : "Disabled"}
    </span>
  </div>

  <!-- Reason dropdown -->
  <label style="font-size:14px; color:#333; font-weight:600;">Reason for Cancellation</label>
  <select id="cancel-reason-select" style="margin-top:6px; width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
    ${reasonOptions}
  </select>

  ${restockingHtml}

  <div style="margin-top:12px; font-size:14px; color:#555;">
    <b>Refund Method:</b><br/>
    ${creditMessage}
  </div>

  <!-- Confirm button -->
  <div style="margin-top:16px; text-align:right;">
    <button id="confirm-cancel-btn" style="background:#ff4d4d; color:#fff; padding:8px 16px; border:none; border-radius:6px; font-size:14px; cursor:pointer;">
      Confirm
    </button>
  </div>
</div>

<script>
  document.getElementById("confirm-cancel-btn").addEventListener("click", () => {
    const reasonSelect = document.getElementById("cancel-reason-select");
    const selectedReasonText = reasonSelect.options[reasonSelect.selectedIndex].text;
    const selectedReason = reasonSelect.value;
    if (!selectedReason) {
      reasonSelect.focus();
      return; // stop execution
    }

    const totalPaid = parseFloat(${totalAmount});
    let customerRefundedAmount = totalPaid;

    if (${JSON.stringify(data.restockingFees)}?.isOn) {
      const fees = ${JSON.stringify(data.restockingFees)};
      switch (fees.type) {
        case "percentage":
          customerRefundedAmount = totalPaid - (totalPaid * fees.value / 100);
          break;
        case "fixed":
          customerRefundedAmount = totalPaid - fees.value;
          break;
        case "shippingtaxes":
          customerRefundedAmount = totalPaid; // or "-" if you want no value
          break;
        default:
          customerRefundedAmount = totalPaid;
      }
    }

    const restockEnabled = ${data.restockingFees.isOn}; 
      
    window.parent.postMessage(
      {
        type: "tool",
        payload: {
          toolName: "cancel-order",
          params: {
            reason: selectedReason,
            restockingFees: ${JSON.stringify(data.restockingFees)},
            credit: "${data.credit}",
            orderNameOrId: "${orderNameOrId}",
            currencyCode: "${currencyCode}",
            customerId: "${customerId}",
            customerRefundedAmount: customerRefundedAmount.toFixed(2),
            refund: !restockEnabled,
            restock: restockEnabled,
            staffNote: selectedReasonText,
            totalAmount: ${totalAmount},
            orderNo: "${orderNo}"
          }
        }
      },
      "*"
    );
  });
</script>
  `;
}

export function getSupportDetailsHtml(data) {
  // ✅ Case 1: Single Ticket (ticketId basis)
  if (data.ticketId && data.messages) {
    const ticket = data;
    return `
<div 
  class="ticket-card"
  data-ticket-id="${ticket.ticketId}"
  style="
    border:1px solid #ddd;
    border-radius:10px;
    padding:15px;
    margin:12px auto;
    max-width:650px;
    font-family:Arial, sans-serif;
    background:#fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.05);
  "
>
  <!-- Header -->
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
    <h2 style="margin:0; font-size:18px; color:#333;">${ticket.title}</h2>
    <span style="padding:4px 10px; border-radius:20px; font-size:12px; font-weight:bold; background:${ticket.status === "Open" ? "#4caf50" : "#ff9800"}; color:#fff;">
      ${ticket.status}
    </span>
  </div>

  <!-- Meta -->
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Ticket ID:</b> ${ticket.ticketId}</p>
  <p style="margin:4px 0; font-size:14px; color:#666;"><b>Customer:</b> ${ticket.customerName}</p>
  <!-- Messages -->
  <div style="margin-top:10px;">
    ${ticket.messages
        .map(msg => {
          return `
        <div style="border:1px solid #eee; border-radius:6px; padding:8px 10px; margin:6px 0;">
          <p style="margin:0; font-size:13px; color:#333;"><b>${msg.sender}:</b> ${msg.message}</p>
          <p style="margin:2px 0 0 0; font-size:11px; color:#777;">${new Date(msg.timestamp).toLocaleString()}</p>
        </div>
      `;
        })
        .join("")}
  </div>

  <!-- Reply UI -->
${ticket.status === "Open"
        ? `
    <button class="reply-btn" style="margin-top:12px; padding:6px 12px; border:none; border-radius:6px; background:#007bff; color:#fff; cursor:pointer;">
      Reply
    </button>
    <div class="reply-panel" style="display:none; margin-top:10px;">
      <textarea 
        class="reply-message" 
        placeholder="Type your reply..." 
        style="width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; min-height:50px; resize:none; overflow:hidden;"
      ></textarea>
      <button class="submit-reply" style="margin-top:6px; padding:6px 12px; border:none; border-radius:6px; background:#28a745; color:#fff; cursor:pointer;">
        Submit
      </button>
    </div>
  `
        : ""
      }

<script>
  // Toggle reply panel at bottom
  document.querySelectorAll(".reply-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".ticket-card");
      const panel = card.querySelector(".reply-panel");
      panel.style.display = panel.style.display === "none" ? "block" : "none";

      if (panel.style.display === "block") {
        // Scroll to bottom when reply opens
        setTimeout(() => {
          panel.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
      }
    });
  });

  // Auto-grow textarea
  document.querySelectorAll(".reply-message").forEach(textarea => {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto"; // reset
      textarea.style.height = textarea.scrollHeight + "px"; // expand
    });
  });

  // Handle submit
  document.querySelectorAll(".submit-reply").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".ticket-card");
      const ticketId = card.getAttribute("data-ticket-id");
      const textarea = card.querySelector(".reply-message");
      const reply_message = textarea.value.trim();

      if (!reply_message) {
        alert("Please enter a message before submitting.");
        return;
      }

      window.parent.postMessage(
        {
          type: "tool",
          payload: {
            toolName: "reply-chatbot-message",
            params: { ticketId, reply_message }
          }
        },
        "*"
      );

      textarea.value = "";
      textarea.style.height = "auto"; // reset height after submit
    });
  });
</script>

    `;
  }

  // ✅ Case 2: Customer with multiple tickets (customerId basis)
  if (Array.isArray(data.tickets) && data.tickets.length) {
    return (
      data.tickets
        .map(ticket => {
          return `
<div 
  class="ticket-list-card"
  data-ticket-no="${ticket.ticketId}"
  data-ticket-id="${ticket._id}"
  style="
    border:1px solid #ddd;
    border-radius:10px;
    padding:15px;
    margin:12px auto;
    max-width:650px;
    font-family:Arial, sans-serif;
    background:#fff;
    box-shadow:0 2px 8px rgba(0,0,0,0.05);
    cursor:pointer;
  "
>
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
    <h2 style="margin:0; font-size:16px; color:#333;">${ticket.title}</h2>
    <span style="padding:3px 8px; border-radius:20px; font-size:12px; font-weight:bold; background:${ticket.status === "Open" ? "#4caf50" : "#ff9800"}; color:#fff;">
      ${ticket.status}
    </span>
  </div>

  <p style="margin:4px 0; font-size:13px; color:#666;"><b>Ticket ID:</b> ${ticket.ticketId}</p>
  <p style="margin:4px 0; font-size:13px; color:#666;"><b>Order:</b> ${ticket.orderTitle || "N/A"}</p>
  <p style="margin:4px 0; font-size:13px; color:#666;"><b>Messages:</b> ${ticket.messages?.length || 0}</p>
</div>
          `;
        })
        .join("") +
      `
<script>
  // Attach click listener to open ticket details
  document.querySelectorAll(".ticket-list-card").forEach(card => {
    card.addEventListener("click", () => {
      const ticketNo = card.getAttribute("data-ticket-no");
      const ticketId = card.getAttribute("data-ticket-id");
      window.parent.postMessage(
        {
          type: "tool",
          payload: {
            toolName: "get-ticket-details",
            params: { ticketId, ticketNo }
          }
        },
        "*"
      );
    });
  });
</script>
      `
    );
  }
}
