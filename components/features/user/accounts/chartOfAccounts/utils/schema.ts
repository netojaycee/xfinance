import z from "zod";

export const chartOfAccountsSchema = z.object({
  accountType: z.string().min(1, "Account type is required"),
  accountCode: z.string().min(1, "Account code is required"),
  accountName: z.string().min(1, "Account name is required"),
  primaryCategory: z.string().min(1, "Primary category is required"),
  subcategory: z.string().optional(),
  description: z.string().optional(),
  status: z.string().default("Active"),
});


export type ChartOfAccountsFormData = z.infer<typeof chartOfAccountsSchema>;
