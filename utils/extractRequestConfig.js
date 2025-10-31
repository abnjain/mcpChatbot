import { jwtDecode } from "jwt-decode";

export const extractRequestConfig = (req) => {
  const config = req.body?.config || {};

  // Handle headers
  if (req.headers) {
    const head = req.headers;
    const token = head.authorization && head.authorization.split(" ")[1];
    const decoded = token ? jwtDecode(token) : null;

    if (head["isexternal"] || head["ismerchant"]) {
      config.isExternal = head["isexternal"]
        ? JSON.parse(head["isexternal"])
        : false;

      config.isMerchant = head["ismerchant"]
        ? JSON.parse(head["ismerchant"])
        : false;

      config.shopToken = token || null;

      // Set storefront URL only if not already provided
      config.storefrontUrl =
        config.storefrontUrl ||
        decoded?.dest ||
        head.storefronturl ||
        head.storefrontUrl ||
        null;
    }
  }

  // Handle query connectionData
  const connectionData = req?.query?.connectionData;
  if (connectionData) {
    if (typeof connectionData === "string") {
      try {
        const parsed = JSON.parse(connectionData);
        if (parsed && typeof parsed === "object") {
          config.storefrontUrl =
            config.storefrontUrl || parsed.storefrontUrl || undefined;
          config.customerId =
            config.customerId || parsed.customerId || undefined;
          config.conversationId =
            config.conversationId || parsed.conversationId || undefined;
        }
      } catch (err) {
        console.error("Failed to parse connectionData JSON:", err);
      }
    } else {
      console.warn("connectionData is not a string:", connectionData);
    }
  }

  return config;
};
