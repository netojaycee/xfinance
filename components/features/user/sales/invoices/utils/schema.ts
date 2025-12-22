import z from "zod";


export const lineItemSchema = z.object({
  description: z.string().min(1, "Required"),
  quantity: z.number().min(1),
  rate: z.number().min(0),
});
export const invoiceSchema = z.object({
  customerId: z.string().min(1, "Required"),
  // invoiceNumber: z.string().min(1, "Required"),
  invoiceDate: z.date(),
  dueDate: z.date(),
  paymentTerms: z.string().min(1, "Required"),
  currency: z.string().min(1, "Required"),
  lineItems: z.array(lineItemSchema).min(1, "At least one item"),
  notes: z.string().optional(),
});