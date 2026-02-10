"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().min(1, "Description is required"),
  monthlyPrice: z.string().min(1, "Monthly price is required"),
  annualPrice: z.string().min(1, "Annual price is required"),
  maxUsers: z.string().min(1, "Max users is required"),
  maxEntities: z.string().min(1, "Max entities is required"),
  // Core Modules
  coreAccounting: z.boolean(),
  coreBanking: z.boolean(),
  coreInvoicing: z.boolean(),
  coreExpense: z.boolean(),
  coreRevenue: z.boolean(),
  coreSales: z.boolean(),
  corePurchase: z.boolean(),
  coreInventory: z.boolean(),
  corePos: z.boolean(),
  // Advanced Features
  advBudgeting: z.boolean(),
  advConsolidation: z.boolean(),
  advReporting: z.boolean(),
  advMultiCurrency: z.boolean(),
  // Platform Features
  apiAccess: z.boolean(),
  customFields: z.boolean(),
  workflows: z.boolean(),
  approvals: z.boolean(),
});

type PlanFormData = z.infer<typeof planSchema>;

interface CreatePlanFormDummyProps {
  plan?: Partial<PlanFormData> & { id?: string };
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export function CreatePlanForm({
  plan,
  isEditMode = false,
  onSuccess,
}: CreatePlanFormDummyProps) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planSchema) as any,
    defaultValues: {
      name: plan?.name || "",
      description: plan?.description || "",
      monthlyPrice: (plan?.monthlyPrice || 49).toString() as any,
      annualPrice: (plan?.annualPrice || 499).toString() as any,
      maxUsers: (plan?.maxUsers || 5).toString() as any,
      maxEntities: (plan?.maxEntities || 1).toString() as any,
      coreAccounting: plan?.coreAccounting ?? true,
      coreBanking: plan?.coreBanking ?? true,
      coreInvoicing: plan?.coreInvoicing ?? true,
      coreExpense: plan?.coreExpense ?? true,
      coreRevenue: plan?.coreRevenue ?? false,
      coreSales: plan?.coreSales ?? false,
      corePurchase: plan?.corePurchase ?? false,
      coreInventory: plan?.coreInventory ?? false,
      corePos: plan?.corePos ?? false,
      advBudgeting: plan?.advBudgeting ?? false,
      advConsolidation: plan?.advConsolidation ?? false,
      advReporting: plan?.advReporting ?? false,
      advMultiCurrency: plan?.advMultiCurrency ?? false,
      apiAccess: plan?.apiAccess ?? false,
      customFields: plan?.customFields ?? false,
      workflows: plan?.workflows ?? false,
      approvals: plan?.approvals ?? false,
    },
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan?.name || "",
        description: plan?.description || "",
        monthlyPrice: (plan?.monthlyPrice || 49).toString() as any,
        annualPrice: (plan?.annualPrice || 499).toString() as any,
        maxUsers: (plan?.maxUsers || 5).toString() as any,
        maxEntities: (plan?.maxEntities || 1).toString() as any,
        coreAccounting: plan?.coreAccounting ?? true,
        coreBanking: plan?.coreBanking ?? true,
        coreInvoicing: plan?.coreInvoicing ?? true,
        coreExpense: plan?.coreExpense ?? true,
        coreRevenue: plan?.coreRevenue ?? false,
        coreSales: plan?.coreSales ?? false,
        corePurchase: plan?.corePurchase ?? false,
        coreInventory: plan?.coreInventory ?? false,
        corePos: plan?.corePos ?? false,
        advBudgeting: plan?.advBudgeting ?? false,
        advConsolidation: plan?.advConsolidation ?? false,
        advReporting: plan?.advReporting ?? false,
        advMultiCurrency: plan?.advMultiCurrency ?? false,
        apiAccess: plan?.apiAccess ?? false,
        customFields: plan?.customFields ?? false,
        workflows: plan?.workflows ?? false,
        approvals: plan?.approvals ?? false,
      } as PlanFormData);
    }
  }, [plan, form]);

  const onSubmit = async (values: PlanFormData) => {
    try {
      setLoading(true);
      // Convert string prices and quantities to numbers
      const payload = {
        ...values,
        monthlyPrice: parseFloat(values.monthlyPrice),
        annualPrice: parseFloat(values.annualPrice),
        maxUsers: parseInt(values.maxUsers, 10),
        maxEntities: parseInt(values.maxEntities, 10),
      };
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Plan ${isEditMode ? "updated" : "created"} successfully`);
      onSuccess?.();
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? "update" : "create"} plan`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Plan Name & Description */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-4">Plan Name</h6>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="e.g., Professional, Enterprise"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Brief description of this plan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-green-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-4">Pricing</h6>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Monthly Price (USD)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="49"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">
                      Annual Price (USD)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="499"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Usage Limits */}
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-4">Usage Limits</h6>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxUsers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Maximum Users</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 5, 25 or leave empty"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxEntities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Maximum Entities</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 1, 3 or leave empty"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Included Modules - Core */}
          <div className="bg-purple-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-4">Included Modules</h6>
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-700">
                  Core Modules
                </p>
                <div className="space-y-2">
                  {[
                    {
                      field: "coreAccounting",
                      label: "Accounting & General Ledger",
                    },
                    { field: "coreBanking", label: "Banking & Reconciliation" },
                    { field: "coreInvoicing", label: "Invoicing & Billing" },
                    { field: "coreExpense", label: "Expense Management" },
                    { field: "coreRevenue", label: "Revenue & Procurement" },
                    { field: "coreSales", label: "Sales Management" },
                    { field: "corePurchase", label: "Purchase Management" },
                    { field: "coreInventory", label: "Inventory Management" },
                    { field: "corePos", label: "Point of Sale (POS)" },
                  ].map(({ field, label }) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof PlanFormData}
                      render={({ field: fieldProps }) => (
                        <FormItem className="flex items-center justify-between space-y-0">
                          <FormLabel className="text-sm">{label}</FormLabel>
                          <FormControl>
                            <Switch
                              checked={fieldProps.value as boolean}
                              onCheckedChange={fieldProps.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="bg-indigo-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-4">Advanced Features</h6>
            <div className="space-y-2">
              {[
                { field: "advBudgeting", label: "Budgeting & Forecasting" },
                {
                  field: "advConsolidation",
                  label: "Multi-Entity Consolidation",
                },
                {
                  field: "advReporting",
                  label: "Advanced Reporting & Analytics",
                },
                { field: "advMultiCurrency", label: "Multi-Currency Support" },
              ].map(({ field, label }) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof PlanFormData}
                  render={({ field: fieldProps }) => (
                    <FormItem className="flex items-center justify-between space-y-0">
                      <FormLabel className="text-sm">{label}</FormLabel>
                      <FormControl>
                        <Switch
                          checked={fieldProps.value as boolean}
                          onCheckedChange={fieldProps.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Platform Features */}
          <div className="bg-orange-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-4">Platform Features</h6>
            <div className="space-y-2">
              {[
                { field: "apiAccess", label: "API Access & Integrations" },
                { field: "customFields", label: "Custom Fields & Forms" },
                { field: "workflows", label: "Automated Workflows" },
                { field: "approvals", label: "Approval Workflows" },
              ].map(({ field, label }) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof PlanFormData}
                  render={({ field: fieldProps }) => (
                    <FormItem className="flex items-center justify-between space-y-0">
                      <FormLabel className="text-sm">{label}</FormLabel>
                      <FormControl>
                        <Switch
                          checked={fieldProps.value as boolean}
                          onCheckedChange={fieldProps.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-6">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading
                ? "Please wait..."
                : isEditMode
                  ? "Update Plan"
                  : "Create Plan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
