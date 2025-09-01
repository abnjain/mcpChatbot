function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function tryParse(objOrStr) {
  // Accept object or JSON string
  if (objOrStr == null) return {};
  if (typeof objOrStr === "string") {
    try { return JSON.parse(objOrStr); } catch { return {}; }
  }
  // If it's the outer JSON-RPC envelope, drill into result.content[0].text (itself JSON)
  if (objOrStr && objOrStr.result && Array.isArray(objOrStr.result.content)) {
    const first = objOrStr.result.content[0];
    if (first && typeof first.text === "string") {
      try { return JSON.parse(first.text); } catch { /* fallthrough */ }
    }
  }
  return objOrStr;
}

function tryParse2(input) {
  if (input == null) return {};
  if (typeof input === "string") {
    try { return JSON.parse(input); } catch { /* fallthrough */ }
  }
  // If it's an RPC envelope like earlier examples, try to get inner text
  if (input && input.result && Array.isArray(input.result.content)) {
    const first = input.result.content[0];
    if (first && typeof first.text === "string") {
      try { return JSON.parse(first.text); } catch { /* fallthrough */ }
    }
  }
  return input;
}

function fmtMoney(amount, currency) {
  const a = (amount == null ? "" : String(amount));
  const c = (currency == null ? "" : String(currency));
  return `${esc(a)} ${esc(c)}`.trim();
}

export function getOrderDetailsBuild(data) {
  const fulfillment = (data.fulfillmentStatus || "Unknown");
  let statusStyle =
    "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#eeeeee;color:#333333;";
  if (fulfillment.toLowerCase() === "fulfilled") {
    statusStyle =
      "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#e6ffe8;color:#009900;";
  } else if (fulfillment.toLowerCase() === "unfulfilled") {
    statusStyle =
      "padding:0.25rem 0.625rem;border-radius:0.5rem;font-size:0.875rem;font-weight:bold;text-transform:capitalize;background:#ffe8e8;color:#cc0000;";
  }

  const header = `
<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #d1d1d1;padding-bottom:0.5rem;margin-bottom:0.75rem;">
<h3 style="font-size:1.25rem;margin:0;">Order ${esc(data.orderNumber || "")}</h3>
<span style="${statusStyle}">${esc(fulfillment)}</span>
</div>
  `;

  const customer = `
<div>
<p style="margin:0.25rem 0;font-size:1rem;"><b>Customer:</b> ${esc(data.shippingAddress?.name || "N/A")}</p>
<p style="margin:0.25rem 0;font-size:1rem;"><b>Email:</b> ${esc(data.buyer_identity.email || "N/A")}</p>
<p style="margin:0.25rem 0;font-size:1rem;"><b>Ship To:</b> 
        ${esc(data.shippingAddress?.address1 || "")},
        ${esc(data.shippingAddress?.city || "")},
        ${esc(data.shippingAddress?.provinceCode || "")},
        ${esc(data.shippingAddress?.countryCode || "")},
        ${esc(data.shippingAddress?.zip || "")}
</p>
</div>
  `;

  const totals = `
<div>
<p style="margin:0.25rem 0;font-size:1rem;"><b>Total Paid:</b> ${esc(data.currencyCode || "")} ${esc(data.totalPaidAmount || "0.00")}</p>
<p style="margin:0.25rem 0;font-size:1rem;"><b>Outstanding:</b> ${esc(data.currencyCode || "")} ${esc(data.totalOutstanding?.amount || "0.00")}</p>
</div>
  `;

  let itemsHTML = "";
  if (Array.isArray(data.lineItems) && data.lineItems.length) {
    itemsHTML = data.lineItems
      .map((item) => {
        if (item.currentQuantity === 0) return ''; // Skip items with quantity 0
        const imgSrc = item?.image?.url ? esc(item.image.url) : "";
        return `
<div style="display:flex;align-items:flex-start;gap:0.75rem;border-bottom:1px solid #d1d1d1;padding:0.625rem 0;">
<img src="${imgSrc}" alt="${esc(item.title || "")}" style="width:4rem;height:4rem;border-radius:0.5rem;object-fit:cover;" />
<div style="flex:1;">
<h4 style="margin:0 0 0.25rem;font-size:1rem;">${esc(item.title || "")}</h4>
<p style="font-size:0.875rem;color:#777;margin:0 0 0.375rem;">${esc(item.variant?.title || "")}</p>
<p style="margin:0.125rem 0;font-size:0.875rem;"><b>Qty:</b> ${esc(item.currentQuantity ?? "")}</p>
<p style="margin:0.125rem 0;font-size:0.875rem;"><b>Price:</b> ${esc(data.currencyCode || "")} ${esc(item.variant?.price || "0.00")}</p>
<p style="margin:0.125rem 0;font-size:0.875rem;"><b>Total:</b> ${esc(data.currencyCode || "")} ${esc(item.originalTotalSet?.presentmentMoney?.amount || "0.00")}</p>
</div>
</div>
        `;
      })
      .join("");
  }

  return `
<div style="padding:1rem;font-size:1rem;min-height:500px;font-family:Arial,sans-serif;">
      ${header}
      ${customer}
      ${totals}
<div>
<h4 style="font-size:1.125rem;margin-bottom:0.625rem;border-bottom:1px solid #e0e0e0;padding-bottom:0.25rem;">Items</h4>
        ${itemsHTML || "<p>No items found.</p>"}
</div>
</div>
  `;
}

export function searchShopCatalogBuild(data) {
  // console.log("------------------ fndc",typeof(data.products), typeof(data));
  const products = data?.products || [];

  if (products.length === 0) {
    return `<p style="text-align:center;font-size:1rem;color:#888;">No products found.</p>`;
  }

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
<img src="${esc(p.image_url || "./shopify.svg")}" alt="${esc(p.title)}" style="width:100%;height:200px;object-fit:cover;" />
</div>
<div style="padding:0.8rem 1rem;">
<h4 style="font-size:1rem;font-weight:600;margin:0 0 0.4rem;color:#222;">
                    ${esc(p.title)}
</h4>
                  ${p.description
            ? `<p style="font-size:0.85rem;color:#666;margin:0 0 0.6rem;">${esc(p.description)}</p>`
            : ""
          }
<p style="font-weight:500;color:#0070f3;margin:0 0 0.6rem;">
                    ${esc(p.price_range.min)} - ${esc(p.price_range.max)} ${esc(p.price_range.currency)}
</p>
                  ${p.variants?.length
            ? `<ul style="list-style:none;padding:0;margin:0;font-size:0.85rem;border-top:1px solid #eee;padding-top:0.5rem;">
                          ${p.variants
              .map(
                (v, idx) => `
      <li style="display:flex;justify-content:space-between;padding:0.2rem 0;color:#555;">
        <span>${esc(v.title)}</span>
        <span>${esc(v.price)} ${esc(v.currency)}</span>
        <span>${esc(v.sku)}</span>
        <span>
    <button
        class="add-to-cart"
            data-product-id="${esc(p?.product_id)}"
            data-product-title="${esc(p?.title)}"
            data-variant-id="${esc(v?.variant_id)}"
            data-variant-title="${esc(v?.title)}"
            data-price="${esc(v?.price)}"
            data-currency="${esc(v?.currency)}"
            data-image-url="${esc(v?.image_url)}"
        style="cursor:pointer;"
    >Add 🛒</button>
</span>
      </li>
    `
              )
              .join("")}
</ul>`
            : ""
          }
</div>

</div>
            `
      )
      .join("")}
</div>
<script>
  // Attach event listeners after DOM is rendered
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
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
            toolName: "addToCart",
            params: { productId, productTitle , variantId , variantTitle , dataPrice , dataCurrency , imgUrl}
          }
        },
        "*"
      );
    });
  });
</script>
</div>
  `;
}

export function getCartBuild(datas) {
  const data = tryParse(datas) || {};
  console.log("--------------- ", data);
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
      const variantTitle = line.merchandise?.title || "Default";
      const productTitle = line.merchandise?.product?.title || "";
      const lineAmt = line.cost?.total_amount?.amount ?? "";
      const lineCur = line.cost?.total_amount?.currency ?? "";
      return `
            <div style="display:flex;align-items:flex-start;gap:0.75rem;border-bottom:1px solid #e5e5e5;padding:0.625rem 0;">
              <div style="flex:1;">
                <div style="font-size:1rem;font-weight:600;margin:0 0 0.25rem;color:#222;">${esc(productTitle)}</div>
                <div style="font-size:0.875rem;color:#666;margin:0 0 0.25rem;">${esc(variantTitle)}</div>
                <div style="font-size:0.875rem;margin:0.125rem 0;"><b>Qty:</b> ${esc(qty)}</div>
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
        ${buyer.email ? '<div style="font-size:0.95rem;margin:0.125rem 0;"><b>Email:</b> ${esc(buyer.email || "—")}</div>' : ""}
        <div style="font-size:0.95rem;margin:0.125rem 0;"><b>Country:</b> ${esc(buyer.country_code || "—")}</div>
      </div>
    `;

  // Checkout link/button
  const checkoutURL = cart.checkout_url || "";
  const checkoutHTML = checkoutURL
    ? `<a href="${esc(checkoutURL)}" class="checkout" data-checkout-url="${esc(checkoutURL)}" style="display:inline-block;margin-top:0.75rem;padding:0.6rem 1rem;border-radius:0.5rem;text-decoration:none;background:#111;color:#fff;font-weight:600;">Proceed to Checkout</a>`
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
</script>
      </div>
    `;

  return html;
}

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

export function getAddProductOrderAEBuild(input) {
  const data = tryParse2(input) || {};
  const status = typeof data.status === "boolean" ? data.status : null;
  const results = Array.isArray(data.result) ? data.result : [];

  // ✅ Gather messages from result[]
  const messages = results
    .map(r => (typeof r.message === "string" ? r.message : ""))
    .filter(Boolean);

  // status badge
  const statusBadge = (status === true)
    ? `<span style="padding:0.25rem 0.6rem;border-radius:999px;background:#e6ffed;color:#007a2f;font-weight:700;font-size:0.88rem;">Success</span>`
    : (status === false)
      ? `<span style="padding:0.25rem 0.6rem;border-radius:999px;background:#ffecec;color:#c20b0b;font-weight:700;font-size:0.88rem;">Failed</span>`
      : `<span style="padding:0.25rem 0.6rem;border-radius:999px;background:#f0f0f0;color:#333;font-weight:700;font-size:0.88rem;">Status</span>`;

  // Main HTML
  const html = `
<div style="padding:1rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#222;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
    ${statusBadge}
  </div>

  <div style="margin-bottom:0.75rem;">
    <div style="font-weight:700;font-size:0.98rem;margin-bottom:0.25rem;color:#111;">Messages</div>
    <div style="background:#fafafa;border:1px solid #f0f0f0;padding:0.6rem;border-radius:8px;font-size:0.95rem;color:#333;white-space:pre-wrap;">
      ${messages.length ? messages.map(m => esc(m)).join("<br/>") : "No messages"}
    </div>
  </div>
</div>`;

  return html;
}


//   // Expose for CJS, ESM, or browser
//   if (typeof module !== "undefined" && module.exports) {
//     module.exports = { getCartTool };
//   }
//   if (typeof window !== "undefined") {
//     window.getCartTool = getCartTool;
//   }
//   // Avoid ESM export to keep single-file compatibility in CJS environments.
// }