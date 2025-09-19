export function toCalculatedLineItemId(gid) {
  if (typeof gid !== "string") {
    gid = (gid ?? "").toString();
    gid = gid.replaceAll("LineItem", "CalculatedLineItem");
    // console.log("Replaced gid:", gid);
    return gid
  }

  if (gid.includes("LineItem") && !gid.includes("CalculatedLineItem")) {
    gid = gid.replaceAll("LineItem", "CalculatedLineItem");
    // console.log("Replaced gid:", gid);
    return gid
  }

  return gid; // already converted or invalid
}

export function toOrderId(gid) {
  if (typeof gid !== "string") {
    console.warn("⚠️ extractIdNumber expected string, got:", gid);
    return null;
  }

  const parts = gid.split("/");
  return parts[parts.length - 1] || null;
}