import { TOOLS } from "../constant/constant.js";
import { searchOrderDetails } from "../services/ae.api.js";
// import { getStorefrontUrl } from "../store/requestStore.js";
import { cleanObject } from "./toolsHelper.js";

// type can be id or gid
export async function globalOrderId({ id = null, type = "id", config }) {
  try {
    const orderNameOrId = id?.id || id;
    let details = null;
    let orderName = null;
    if (type === "id") {
      const orderData = await searchOrderDetails(orderNameOrId, config);
      const orderGid = orderData?.data?.result?.orderId || null;
      // id = orderGid?.split( "/").pop();
      id = orderGid?.split("/").pop();
      orderName = orderData?.data?.result?.orderNumber
      details = orderData?.data?.result || null;
      details = cleanObject(details);
    } else if (type === "gid") {
      const orderData = await searchOrderDetails(orderNameOrId, config);
      // const orderGid = orderData?.data?.result?.orderId || null;
      const orderGid = orderData?.data?.result?.orderId || null;
      id = orderGid
      orderName = orderData?.data?.result?.orderNumber
      details = orderData?.data?.result || null;
      details = cleanObject(details);
    }
    return { id, details, orderName };
  } catch (error) {
    console.log("Global Order Id Error: ", error);
    return error.message
  }
}

export function idConverter({ id = null, type = "id" }) {
  if (type === "id" && id?.split("/")) {
    id = id?.split("/").pop();
  }
  return { id };
}

export function normalizeToolNames(toolNames = []) {
  return toolNames
    .map((name) => {
      // Case 1: if it's like "TOOLS.LOGIN"
      if (name.startsWith("TOOLS.")) {
        const key = name.replace("TOOLS.", "");
        return TOOLS[key] || null;
      }

      // Case 2: if it's like "LOGIN"
      if (TOOLS[name]) {
        return TOOLS[name];
      }

      // Case 3: if it's already the value (like "search_shop_catalog_cart")
      if (Object.values(TOOLS).includes(name)) {
        return name;
      }

      console.warn(`Unknown tool name: ${name}`);
      return null;
    })
    .filter(Boolean); // remove nulls
}