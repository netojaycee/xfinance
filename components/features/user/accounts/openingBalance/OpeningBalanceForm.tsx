"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSessionStore } from "@/lib/store/session";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Calendar, Loader2 } from "lucide-react";
import { useSetOpeningBalances } from "@/lib/api/hooks/useAccounts";
import { Account } from "@/lib/api/hooks/types/accountsTypes";

// Zod schema for Opening Balance
const openingBalanceAccountSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  accountType: z.string(),
  debit: z.coerce.number().default(0),
  credit: z.coerce.number().default(0),
});

const openingBalanceSchema = z.object({
  openingDate: z.string().min(1, "Opening balance date is required"),
  accounts: z
    .array(openingBalanceAccountSchema)
    .min(1, "At least one account is required"),
});

type OpeningBalanceFormData = z.infer<typeof openingBalanceSchema>;

interface OpeningBalanceFormProps {
  accounts?: Account[];
  onSuccess?: () => void;
}

// Mock data for accounts
const mockAccounts = [
  { id: "1", name: "Cash and Cash Equivalents", type: "Asset" },
  { id: "2", name: "Accounts Receivable", type: "Asset" },
  { id: "3", name: "Accounts Payable", type: "Liability" },
  { id: "4", name: "Revenue - Product Sales", type: "Revenue" },
  { id: "5", name: "Cost of Goods Sold", type: "Expense" },
];

export default function OpeningBalanceForm({
  accounts = [],
  onSuccess,
}: OpeningBalanceFormProps) {
  const { entity, user } = useSessionStore();
  const setOpeningBalances = useSetOpeningBalances();

  const form = useForm<OpeningBalanceFormData>({
    resolver: zodResolver(openingBalanceSchema) as any,
    defaultValues: {
      openingDate: new Date().toISOString().split("T")[0],
      accounts: [{ accountId: "", accountType: "", debit: 0, credit: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "accounts",
  });

  // Watch for account changes to update account type
  const watchAccounts = form.watch("accounts");
  const totalDebits = watchAccounts.reduce(
    (sum, acc) => sum + (acc.debit || 0),
    0,
  );
  const totalCredits = watchAccounts.reduce(
    (sum, acc) => sum + (acc.credit || 0),
    0,
  );
  const difference = totalDebits - totalCredits;

  const onSubmit = async (values: OpeningBalanceFormData) => {
    try {
      const payload = {
        entityId: entity.entityId || "",
        lines: values.accounts.map((account) => ({
          accountId: account.accountId,
          debit: Math.round((account.debit || 0) * 100),
          credit: Math.round((account.credit || 0) * 100),
        })),
      };

      await setOpeningBalances.mutateAsync(payload);
    } catch (error) {
      // error handled below
    }
  };

  useEffect(() => {
    if (setOpeningBalances.isSuccess) {
      toast.success("Opening balances saved successfully");
      if (onSuccess) onSuccess();
    }
    if (setOpeningBalances.isError) {
      toast.error(
        setOpeningBalances.error?.message || "Failed to save opening balances",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpeningBalances.isSuccess, setOpeningBalances.isError]);

  const handleAddAccount = () => {
    append({ accountId: "", accountType: "", debit: 0, credit: 0 });
  };

  const getAccountType = (accountId: string) => {
    const account = mockAccounts.find((acc) => acc.id === accountId);
    return account?.type || "";
  };

  const handleAccountChange = (index: number, accountId: string) => {
    const accountType = getAccountType(accountId);
    form.setValue(`accounts.${index}.accountId`, accountId);
    form.setValue(`accounts.${index}.accountType`, accountType);
  };

  return (
    <div className="w-full space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Opening Balances
        </h2>
        <p className="text-sm text-gray-600">
          Set initial account balances for system setup
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Opening Balance Date */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <FormField
              control={form.control}
              name="openingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">
                    Opening Balance Date
                  </FormLabel>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <FormControl>
                        <input
                          type="date"
                          className="flex-1 bg-transparent border-0 outline-none text-gray-900"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => {
                        form.setValue(
                          "openingDate",
                          new Date().toISOString().split("T")[0],
                        );
                      }}
                    >
                      Set Date
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Account Opening Balances */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
              Account Opening Balances
            </h3>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 rounded-lg font-semibold text-sm text-gray-700">
              <div className="col-span-4">Account</div>
              <div className="col-span-3">Account Type</div>
              <div className="col-span-2 text-right">Debit</div>
              <div className="col-span-2 text-right">Credit</div>
              <div className="col-span-1"></div>
            </div>

            {/* Account Rows */}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2 md:space-y-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {/* Account Select */}
                    <div className="md:col-span-4">
                      <FormField
                        control={form.control}
                        name={`accounts.${index}.accountId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs md:text-sm text-gray-600 md:hidden">
                              Account
                            </FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value) =>
                                handleAccountChange(index, value)
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="w-full rounded-lg border-gray-300">
                                  <SelectValue placeholder="Select account" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockAccounts.map((account) => (
                                  <SelectItem
                                    key={account.id}
                                    value={account.id}
                                  >
                                    {account.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Account Type (Display Only) */}
                    <div className="md:col-span-3">
                      <FormLabel className="text-xs md:text-sm text-gray-600 md:hidden">
                        Account Type
                      </FormLabel>
                      <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700">
                        {watchAccounts[index]?.accountType || "—"}
                      </div>
                    </div>

                    {/* Debit Input */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name={`accounts.${index}.debit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs md:text-sm text-gray-600 md:hidden">
                              Debit
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="rounded-lg border-gray-300 text-right"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Credit Input */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name={`accounts.${index}.credit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs md:text-sm text-gray-600 md:hidden">
                              Credit
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="rounded-lg border-gray-300 text-right"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Delete Button */}
                    <div className="md:col-span-1 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100 text-red-600"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Another Account Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-lg border-dashed border-gray-300 py-6 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={handleAddAccount}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Account
            </Button>
          </div>

          {/* Totals Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Debits</span>
              <span className="font-medium text-gray-900">
                ₦{totalDebits.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <span className="text-gray-700">Total Credits</span>
              <span className="font-medium text-gray-900">
                ₦{totalCredits.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-3">
              <span className="text-gray-700 font-semibold">Difference</span>
              <span
                className={`font-semibold text-lg ${difference === 0 ? "text-green-600" : "text-orange-600"}`}
              >
                ₦{difference.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button variant="outline" className="rounded-lg" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              disabled={setOpeningBalances.isPending}
            >
              {setOpeningBalances.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Opening Balances</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
