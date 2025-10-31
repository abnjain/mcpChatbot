// // src/utils/shopStore.js

// let shopData = {
//     _id: null,
//     shopJson: {
//         address1: null,
//         address2: null,
//         checkout_api_supported: null,
//         city: null,
//         country: null,
//         country_code: null,
//         country_name: null,
//         county_taxes: null,
//         created_at: null,
//         currency: null,
//         customer_email: null,
//         domain: null,
//         eligible_for_card_reader_giveaway: null,
//         eligible_for_payments: null,
//         email: null,
//         enabled_presentment_currencies: [],
//         finances: null,
//         force_ssl: null,
//         google_apps_domain: null,
//         google_apps_login_enabled: null,
//         has_discounts: null,
//         has_gift_cards: null,
//         has_storefront: null,
//         iana_timezone: null,
//         id: null,
//         latitude: null,
//         longitude: null,
//         marketing_sms_consent_enabled_at_checkout: null,
//         money_format: null,
//         money_in_emails_format: null,
//         money_with_currency_format: null,
//         money_with_currency_in_emails_format: null,
//         multi_location_enabled: null,
//         myshopify_domain: null,
//         name: null,
//         password_enabled: null,
//         phone: null,
//         plan_display_name: null,
//         plan_name: null,
//         pre_launch_enabled: null,
//         primary_locale: null,
//         primary_location_id: null,
//         province: null,
//         province_code: null,
//         requires_extra_payments_agreement: null,
//         setup_required: null,
//         shop_owner: null,
//         source: null,
//         tax_shipping: null,
//         taxes_included: null,
//         timezone: null,
//         transactional_sms_disabled: null,
//         updated_at: null,
//         weight_unit: null,
//         zip: null,
//         auto_configure_tax_inclusivity: null,
//     },
//     myshopify_domain: null,
//     subscribeId: null,
//     interval: null,
//     chargeId: null,
//     amount: null,
//     isStarted: null,
//     planName: null,
//     hidingFeatures: [],
//     planId: null,
//     orderEditCredit: null,
//     notificationCredit: null,
//     planStatus: null,
//     isBlock: null,
//     createdAt: null,
//     updatedAt: null,
//     __v: null,
//     apiKey: null,
//     additionalAmount: null,
//     addressSuggestionCredit: null,
//     addressValidationCredit: null,
//     appUsageLineItemId: null,
//     planEndDate: null,
//     planStartDate: null,
//     isPromotional: null,
//     trialStartDate: null,
//     installationDate: null,
//     isFreePlan: null,
//     usedDays: null,
//     isInstall: null,
// };

// export function setShopGlobal(data) {
//     if (!data || typeof data !== "object") return;

//     // Deep merge shopJson
//     if (data.shopJson && typeof data.shopJson === "object") {
//         Object.assign(shopData.shopJson, data.shopJson);
//         delete data.shopJson; // avoid double assign
//     }

//     // Merge top-level fields
//     Object.assign(shopData, data);
// }

// export function getShopId() { return shopData._id; }
// export function getShopDomain() { return shopData.shopJson.domain; }
// export function getMyshopifyDomain() { return shopData.myshopify_domain || shopData.shopJson.myshopify_domain; }
// export function getShopName() { return shopData.shopJson.name; }
// export function getShopOwner() { return shopData.shopJson.shop_owner; }
// export function getShopEmail() { return shopData.shopJson.email; }
// export function getShopCurrency() { return shopData.shopJson.currency; }
// export function getShopTimezone() { return shopData.shopJson.timezone; }
// export function getPlanName() { return shopData.planName; }
// export function getIsFreePlan() { return shopData.isFreePlan; }
// export function getPlanEndDate() { return shopData.planEndDate; }
// export function getPlanStartDate() { return shopData.planStartDate; }
// export function getUsedDays() { return shopData.usedDays; }
// export function getApiKey() { return shopData.apiKey; }
// export function getOrderEditCredit() { return shopData.orderEditCredit; }
// export function getNotificationCredit() { return shopData.notificationCredit; }
// export function getAddressValidationCredit() { return shopData.addressValidationCredit; }
// export function getAddressSuggestionCredit() { return shopData.addressSuggestionCredit; }
// export function getAppUsageLineItemId() { return shopData.appUsageLineItemId; }
// export function getIsInstall() { return shopData.isInstall; }
// export function getIsStarted() { return shopData.isStarted; }

// export function getShopDetails() {
//     return { ...shopData }; // return a copy to prevent direct mutation
// }