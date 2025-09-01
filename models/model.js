import { getDB } from "../db/db.js"
const db = getDB();

export const EmailNotification = db.collection('emailnotifications');
export const EmailNotificationHistory = db.collection('emailnotificationhistories');
export const ShopifySession = db.collection('shopify_sessions')
export const Partner = db.collection('partners')
export const Plan = db.collection('plans');
export const ReversOrders = db.collection('reversorders');
export const AppSettings = db.collection("appsettings")
export const Notifications = db.collection("notifications")
export const DefaultNotifications = db.collection("defaultnotifications")
export const OrderEditingHistory = db.collection("ordereditinghistories")
export const PredictionSessions = db.collection("predictionsessions")
export const CollectedAmount = db.collection("collectedamounts")
export const Analytics = db.collection("analytics")
export const PagePreviewing = db.collection("pagepreviewings")
export const AppMokeOrders = db.collection("appmockorders")
export const PostDiscounts = db.collection("postdiscounts")
export const AIChatHistory = db.collection("aichathistories")
