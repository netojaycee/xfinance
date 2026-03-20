import { z } from "zod";

export const projectFormSchema = z.object({
  code: z.string().min(1, "Project code is required"),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  customerId: z.string().min(1, "Customer is required"),
  status: z.enum(["Planning", "In Progress", "Completed", "On Hold"]).refine((val) => val, {
    message: "Please select a valid status",
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budgetRevenue: z.number().positive("Budget revenue must be greater than 0"),
  budgetCost: z.number().positive("Budget cost must be greater than 0"),
  manager: z.string().min(1, "Project manager is required"),
  isActive: z.boolean(),
});

export type ProjectFormInputs = z.infer<typeof projectFormSchema>;
