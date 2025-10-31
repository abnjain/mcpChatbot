
// export function getOrderDetails(data) {
//     let text;
// try {
//   text = typeof data.text === "string" ? JSON.parse(data.text) : data.text;
// } catch {
//   text = data.text || {};
// }
//   const div = document.createElement("div");
//   // console.log(text);
  
//   div.className = "tool";
//   div.innerHTML = `
//     <h4>Order Details</h4>
//     <p><b>Order ID:</b> ${data.orderId || "N/A"}</p>
//     <p><b>Status:</b> ${data.status || "Unknown"}</p>
//   `;
//   return div;
// }

export function searchShopCatalog(data) {
  data = JSON.parse(data);
  console.log(data);

  let div;

  if (data.products && data.products.length > 0) {
    div = document.createElement("div");
    div.className = "tool";
    div.innerHTML = `
      <h4>Shop Catalog Results</h4>
      <ul>
        ${(data.products || []).map(item => `<li>${item.title}</li>`).join("")}
      </ul>
    `;
  } else {
    div = document.createElement("div");
    div.className = `message ${data.role}`;
    div.textContent = data.message || "No products found.";
  }
  return div;
}

export function customerSupport(data) {
  const div = document.createElement("div");
  div.className = "tool";
  div.innerHTML = `
    <h4>Customer Support</h4>
    <p>${data.message || "How can I assist you?"}</p>
  `;
  return div;
}

export function insights(data) {
  const div = document.createElement("div");
  div.className = "tool-card insights";
  div.innerHTML = `
    <h4>📊 Insights</h4>
    <div class="insight-content">${data.text || "No insights available."}</div>
  `;
  return div;
}