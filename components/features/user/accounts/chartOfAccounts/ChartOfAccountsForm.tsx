"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertCircle } from "lucide-react";
import { ChartOfAccountsFormData, chartOfAccountsSchema } from "./utils/schema";

// Zod schema for Chart of Accounts

interface ChartOfAccountsFormProps {
  account?: Partial<ChartOfAccountsFormData> & { id?: string };
  isEditMode?: boolean;
  onSuccess?: () => void;
}

const accountTypeOptions = [
  "Asset",
  "Liability",
  "Equity",
  "Revenue",
  "Expense",
];

const primaryCategoryOptions: { [key: string]: string[] } = {
  Asset: ["Current Assets", "Fixed Assets", "Intangible Assets"],
  Liability: ["Current Liabilities", "Long-term Liabilities"],
  Equity: ["Owner's Equity", "Retained Earnings"],
  Revenue: ["Operating Revenue", "Non-operating Revenue"],
  Expense: ["Operating Expenses", "Non-operating Expenses"],
};

export default function ChartOfAccountsForm({
  account,
  isEditMode = false,
  onSuccess,
}: ChartOfAccountsFormProps) {
  const form = useForm<ChartOfAccountsFormData>({
    resolver: zodResolver(chartOfAccountsSchema),
    defaultValues: {
      accountType: account?.accountType || "",
      accountCode: account?.accountCode || "",
      accountName: account?.accountName || "",
      primaryCategory: account?.primaryCategory || "",
      subcategory: account?.subcategory || "",
      description: account?.description || "",
      status: account?.status || "Active",
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        accountType: account?.accountType || "",
        accountCode: account?.accountCode || "",
        accountName: account?.accountName || "",
        primaryCategory: account?.primaryCategory || "",
        subcategory: account?.subcategory || "",
        description: account?.description || "",
        status: account?.status || "Active",
      });
    }
  }, [account]);

  const onSubmit = async (values: ChartOfAccountsFormData) => {
    try {
      console.log("Chart of Accounts submitted:", values);
      toast.success(
        `Account ${isEditMode ? "updated" : "created"} successfully`,
      );
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to save account");
    }
  };

  const selectedAccountType = form.watch("accountType");
  const subcategoryOptions = selectedAccountType
    ? primaryCategoryOptions[selectedAccountType] || []
    : [];

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Account Type Section */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">☰</span>
                    <FormLabel className="text-base font-semibold text-gray-900">
                      Account Type <span className="text-red-500">*</span>
                    </FormLabel>
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-lg border-gray-300">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accountTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <p className="text-xs text-gray-600 mt-1">
                    Individual account for transactions
                  </p>
                </FormItem>
              )}
            />
          </div>

          {/* Account Code and Account Name Section */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="accountCode"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔢</span>
                      <FormLabel className="text-base font-semibold text-gray-900">
                        Account Code <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="e.g., 1110"
                        className="rounded-lg border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-600 mt-1">
                      Unique numeric code for the account
                    </p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">=</span>
                      <FormLabel className="text-base font-semibold text-gray-900">
                        Account Name <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="e.g., Cash and Cash Equivalent"
                        className="rounded-lg border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-600 mt-1">
                      Descriptive name for the account
                    </p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Category Section */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="primaryCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-900">
                      Primary Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-lg border-gray-300">
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedAccountType &&
                          subcategoryOptions.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-gray-900">
                      Subcategory
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                      >
                        <SelectTrigger className="w-full rounded-lg border-gray-300">
                          <SelectValue placeholder="Select subcategory..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {subcategoryOptions.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the purpose and usage of this account..."
                      className="rounded-lg border-gray-300 min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-600 mt-1">
                    Optional: Add notes about when to use this account and what
                    it tracks
                  </p>
                </FormItem>
              )}
            />
          </div>

          {/* Status Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Status</p>
                <p className="text-sm text-gray-600">
                  Active accounts can be used in transactions
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                Active
              </Badge>
            </div>
          </div>

          {/* Master Chart of Accounts Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-2">
                  Master Chart of Accounts Guidelines
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Account codes should follow your organization's numbering
                    convention
                  </li>
                  <li>
                    • Categories group related accounts (1000s = Assets, 2000s =
                    Liabilities, etc.)
                  </li>
                  <li>
                    • Child accounts will inherit properties from their parent
                    account
                  </li>
                  <li>
                    • You can map entity-specific accounts to this master
                    account later
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between w-full gap-3 border-t pt-4">
              <p className="text-xs text-gray-600">
                <span className="text-red-500">*</span> Required fields
              </p>{" "}
              
                       <div className="flex flex-wrap gap-3 items-center">

            <Button variant="outline" className="rounded-lg" type="button">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {isEditMode ? (
                  <>
                    <span>Update Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button> </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
