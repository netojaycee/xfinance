import z from "zod";
import { customerTypeOptions, paymentTermsOptions } from "./data";

// Simpler schema: avoid union/transform and keep creditLimit as an optional number
export const customerSchema = z.object({
  customerType: z.enum(customerTypeOptions),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  paymentTerms: z.enum(paymentTermsOptions).optional(),
  creditLimit: z.number().optional(),
  notes: z.string().optional(),
});

// --- Invoice Schema ---
export const lineItemSchema = z.object({
  description: z.string().min(1, "Required"),
  quantity: z.number().min(1),
  rate: z.number().min(0),
});
export const invoiceSchema = z.object({
  customer: z.string().min(1, "Required"),
  invoiceNumber: z.string().min(1, "Required"),
  invoiceDate: z.date(),
  dueDate: z.date(),
  paymentTerms: z.string().min(1, "Required"),
  currency: z.string().min(1, "Required"),
  lineItems: z.array(lineItemSchema).min(1, "At least one item"),
  notes: z.string().optional(),
});