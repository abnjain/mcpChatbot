import { z } from "zod";

// --- PartnerDetails Schema ---
const partnerDetailsSchema = z.object({
  _id: z.union([z.string(), z.instanceof(Object)]).nullable().optional(),
  apiKey: z.string().nullable().optional(),
});

// --- Full Config Schema ---
export const configSchema = z.object({
  customerId: z.string().nullable().optional(),
  customerEmail: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
  cart_id: z.string().nullable().optional(),
  storefrontUrl: z.string().nullable().optional(),
  partnerDetails: partnerDetailsSchema.nullable().optional(),
});
