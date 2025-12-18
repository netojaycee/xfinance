"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Calendar, CreditCard, FileText } from "lucide-react";
import { format } from "date-fns";

// Dummy data for select fields
const invoiceOptions = [
  { label: "INV-2025-1248", value: "INV-2025-1248" },
  { label: "INV-2025-1247", value: "INV-2025-1247" },
];
const paymentMethodOptions = [
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Cash", value: "cash" },
  { label: "Card", value: "card" },
];
const depositToOptions = [
  { label: "Main Account", value: "main_account" },
  { label: "Savings Account", value: "savings_account" },
];

const paymentSchema = z.object({
  invoice: z.string().min(1, "Invoice is required"),
  paymentDate: z.date(),
  amount: z.number().min(0.01, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  depositTo: z.string().min(1, "Deposit account is required"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentReceivedForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      invoice: "",
      paymentDate: new Date(),
      amount: 0,
      paymentMethod: "",
      depositTo: "",
      reference: "",
      notes: "",
    },
  });

  const paymentAmount = form.watch("amount") || 0;

  const onSubmit = async (values: PaymentFormData) => {
    setSubmitting(true);
    // ...API logic here...
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* --- Select Invoice --- */}
          <div className="rounded-xl bg-linear-to-b from-blue-100 to-white p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Select Invoice
            </h4>
            <FormField
              control={form.control}
              name="invoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select invoice to record payment" />
                      </SelectTrigger>
                      <SelectContent>
                        {invoiceOptions.map((inv) => (
                          <SelectItem key={inv.value} value={inv.value}>
                            {inv.label}
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

          {/* --- Payment Details --- */}
          <div className="rounded-xl border border-green-200 bg-linear-to-b from-green-50 to-white p-4">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payment Date <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={format(field.value, "yyyy-MM-dd")}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Amount <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="$ 0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payment Method <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethodOptions.map((pm) => (
                            <SelectItem key={pm.value} value={pm.value}>
                              {pm.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depositTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Deposit To <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account to deposit payment" />
                        </SelectTrigger>
                        <SelectContent>
                          {depositToOptions.map((d) => (
                            <SelectItem key={d.value} value={d.value}>
                              {d.label}
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
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Reference / Transaction Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Check #1234, Transaction ID, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* --- Additional Notes --- */}
          <div className="rounded-xl border border-purple-200 bg-linear-to-b from-purple-50 to-white p-4">
            <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Additional Notes
            </h4>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes about this payment..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-3 flex items-center justify-between bg-white rounded-lg px-3 py-2 border text-base">
              <span>Payment Amount:</span>
              <span className="font-bold">
                $
                {paymentAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* --- Actions --- */}
          <div className="flex justify-end gap-2 border-t pt-4 pb-3">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-white flex items-center gap-2 px-6"
              disabled={submitting}
            >
              <CreditCard className="w-4 h-4" />
              {submitting ? "Please wait..." : "Record Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
