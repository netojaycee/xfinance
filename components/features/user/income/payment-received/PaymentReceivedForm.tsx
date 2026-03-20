"use client";

import React, { useEffect, useState } from "react";
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
import { Calendar, CreditCard, FileText } from "lucide-react";
import { format } from "date-fns";
import {
  useCreatePaymentReceived,
  useUpdatePaymentReceived,
  useInvoices,
} from "@/lib/api/hooks/useSales";
import { useAccounts } from "@/lib/api/hooks/useAccounts";
import { paymentReceivedSchema, PaymentReceivedFormData } from "./utils/schema";

export const paymentMethodOptions = [
  { label: "Bank Transfer", value: "Bank_Transfer" },
  { label: "Cash", value: "Cash" },
  { label: "Card", value: "Card" },
  { label: "Mobile Money", value: "Mobile_Money" },
  { label: "Check", value: "Check" },
];

const paymentStatusOptions = [
  { label: "Paid", value: "Paid" },
  { label: "Partial", value: "Partial" },
  { label: "Pending", value: "Pending" },
];

interface PaymentReceivedFormProps {
  payment?: Partial<PaymentReceivedFormData> & { id?: string };
  isEditMode?: boolean;
  invoiceId?: string;
}

export default function PaymentReceivedForm({
  payment,
  isEditMode = false,
  invoiceId,
}: PaymentReceivedFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { data: invoicesData, isLoading: invoicesLoading } = useInvoices({
    status: "Sent",
  });
  const { data: accountsData, isLoading: accountsLoading } = useAccounts({
    subCategory: "Cash and Cash Equivalents",
  });
  const createPayment = useCreatePaymentReceived();
  const updatePayment = useUpdatePaymentReceived();
  const invoices = invoicesData?.invoices || [];

  const cashAccounts = (accountsData?.data as any) || [];

  const form = useForm<PaymentReceivedFormData>({
    resolver: zodResolver(paymentReceivedSchema),
    defaultValues: {
      invoiceId: invoiceId || payment?.invoiceId || "",
      amount: payment?.amount || 0,
      paidAt: payment?.paidAt ? new Date(payment.paidAt) : new Date(),
      paymentMethod: payment?.paymentMethod || "",
      depositTo: payment?.depositTo || "",
      reference: payment?.reference || "",
      note: payment?.note || "",
      // status: payment?.status || "Paid",
    },
  });

  const paymentAmount = form.watch("amount") || 0;

  const onSubmit = async (values: PaymentReceivedFormData) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        paidAt: values.paidAt.toISOString(),
      };

      if (isEditMode && payment?.id) {
        await updatePayment.mutateAsync({
          id: payment.id,
          data: payload,
        });
        // toast.success("Payment updated successfully");
      } else {
        await createPayment.mutateAsync(payload);
        // toast.success("Payment recorded successfully");
      }

      // onSuccess?.();
    } catch (error: any) {
      // toast.error(error?.message || "Failed to record payment");
    } finally {
      setSubmitting(false);
    }
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
              name="invoiceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Invoice <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="w-full"
                        disabled={invoiceId ? true : invoicesLoading}
                      >
                        <SelectValue placeholder="Select invoice to record payment" />
                      </SelectTrigger>
                      <SelectContent>
                        {invoices.length > 0 ? (
                          invoices.map((inv) => (
                            <SelectItem
                              key={inv.id}
                              value={inv.id}
                              disabled={!!(invoiceId && invoiceId !== inv.id)}
                            >
                              {inv.invoiceNumber} - {inv?.customer?.name} (₦
                              {inv.total.toLocaleString()})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-invoices">
                            No invoices found
                          </SelectItem>
                        )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="paidAt"
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
                        placeholder="₦ 0.00"
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
                        <SelectTrigger className="w-full" disabled={accountsLoading}>
                          <SelectValue placeholder="Select cash account" />
                        </SelectTrigger>
                        <SelectContent>
                          {cashAccounts.length > 0 ? (
                            cashAccounts.map((account: any) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.name} ({account.code})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-accounts" disabled>
                              No cash accounts found
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Payment Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentStatusOptions.map((ps) => (
                            <SelectItem key={ps.value} value={ps.value}>
                              {ps.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
        
            </div>
                  <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Reference / Transaction Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., TRF-2026-001, Check #1234, Transaction ID, etc."
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
              name="note"
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
                ₦
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
              {submitting
                ? "Please wait..."
                : isEditMode
                  ? "Update Payment"
                  : "Record Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
