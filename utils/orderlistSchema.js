import { z } from "zod";

export const DeliveryMethodEnum = z.enum([
    "shipping",
    "pick-up",
    "retail",
    "local",
    "pickup-point",
    "none",
    "shipping not required",
    "express international",

]);

export const OrderStatusEnum = z.enum([
    "paid",
    "pending",
    "authorized",
    "partially_paid",
    "partially_refunded",
    "refunded",
    "voided",
    "expired",
    "unshipped",
    "shipped",
    "fulfilled",
    "partial",
    "scheduled",
    "on_hold",
    "unfulfilled",
    "request_declined",
    "return_requested",
    "in_progress",
    "inspection_complete",
    "returned",
    "return_failed",
    "no_return",
    "open",
    "closed",
    "cancelled",
    "not_closed",
]);