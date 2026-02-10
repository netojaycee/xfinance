"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCreateInvoice, useUpdateInvoice } from "@/lib/api/hooks/useSales";
import { toast } from "sonner";
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
import { Calendar, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { paymentTermsOptions } from "../customers/utils/data";
import { useCustomers } from "@/lib/api/hooks/useSales";
import { invoiceSchema } from "./utils/schema";

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  invoice?: Partial<InvoiceFormData> & { id?: string };
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export default function InvoiceForm({
  invoice,
  isEditMode = false,
  onSuccess,
}: InvoiceFormProps) {
  const [invoiceStatus, setInvoiceStatus] = useState<"Draft" | "Paid">("Draft");
  const { data, isLoading: customersLoading } = useCustomers();
  const createInvoice = useCreateInvoice();
  const updateInvoice = useUpdateInvoice();

  const customers = data?.customers || [];

  // console.log("Fetched customers for invoice form:", invoice); // Debug log to check fetched customers

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: invoice?.customerId || "",
      invoiceDate: invoice?.invoiceDate
        ? new Date(invoice.invoiceDate)
        : new Date(),
      dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : new Date(),
      paymentTerms: invoice?.paymentTerms || "",
      currency: invoice?.currency || "USD",
      lineItems: invoice?.lineItems || [
        { description: "", quantity: 1, rate: 0 },
      ],
      notes: invoice?.notes || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  // Calculate subtotal, tax, total
  const subtotal = form
    .watch("lineItems")
    .reduce((sum, item) => sum + (item.quantity || 0) * (item.rate || 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    if (invoice) {
      form.reset({
        customerId: invoice?.customerId || "",
        invoiceDate: invoice?.invoiceDate
          ? new Date(invoice.invoiceDate)
          : new Date(),
        dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : new Date(),
        paymentTerms: invoice?.paymentTerms || "",
        currency: invoice?.currency || "USD",
        lineItems: invoice?.lineItems || [
          { description: "", quantity: 1, rate: 0 },
        ],
        notes: invoice?.notes || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  const onSubmit = async (values: InvoiceFormData) => {
    try {
      // Transform lineItems to array of strings (e.g., description or JSON string)
      const items = values.lineItems.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item),
      );
      // Calculate total as integer
      const subtotal = values.lineItems.reduce(
        (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
        0,
      );
      const tax = subtotal * 0.1;
      const total = Math.round(subtotal + tax);
      const payload: any = {
        ...values,
        items,
        total,
        status: invoiceStatus,
      };
      delete payload.lineItems;
      if (isEditMode && invoice?.id) {
        await updateInvoice.mutateAsync({ id: invoice.id, data: payload });
      } else {
        await createInvoice.mutateAsync(payload);
      }
    } catch (error) {
      // error handled below
    }
  };

  useEffect(() => {
    if (createInvoice.isSuccess || updateInvoice.isSuccess) {
      toast.success("Invoice saved successfully");
      if (onSuccess) onSuccess();
    }
    if (createInvoice.isError) {
      toast.error(createInvoice.error?.message || "Failed to create invoice");
    }
    if (updateInvoice.isError) {
      toast.error(updateInvoice.error?.message || "Failed to update invoice");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createInvoice.isSuccess,
    createInvoice.isError,
    updateInvoice.isSuccess,
    updateInvoice.isError,
  ]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* --- Invoice Details --- */}
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Invoice Details
            </h4>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={customersLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              customersLoading
                                ? "Loading customers..."
                                : "Select customer"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(customers) && customers.length > 0 ? (
                            customers.map((c: any) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-customers" disabled>
                              No customers found
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="invoiceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Date *</FormLabel>
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
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date *</FormLabel>
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
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Terms</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentTermsOptions.map((pt) => (
                            <SelectItem key={pt} value={pt}>
                              {pt}
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
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="NGN">NGN (₦)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* --- Line Items --- */}
          <div className="rounded-lg border p-4 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-green-900 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Line Items *
              </h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ description: "", quantity: 1, rate: 0 })
                }
              >
                <Plus className="w-4 h-4" /> Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {fields.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 bg-white rounded-xl p-2 shadow-sm"
                >
                  <div className="flex justify-between w-full items-center">
                    <p className="">Item {idx}</p>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(idx)}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-[4fr_1fr_1fr_2fr] gap-2 w-full items-center">
                    <Controller
                      control={form.control}
                      name={`lineItems.${idx}.description`}
                      render={({ field }) => (
                        <Input
                          placeholder="Description"
                          {...field}
                          // className="flex-1"
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name={`lineItems.${idx}.quantity`}
                      render={({ field }) => (
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          // className="w-16"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name={`lineItems.${idx}.rate`}
                      render={({ field }) => (
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          // className="w-24"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          prefix="$"
                        />
                      )}
                    />
                    <span className=" text-right font-semibold rounded-xl bg-gray-200 h-9 flex items-center justify-center">
                      {form.watch(`currency`) === "NGN"
                        ? "₦"
                        : form.watch(`currency`) === "GBP"
                          ? "£"
                          : "$"}
                      {(
                        (form.watch(`lineItems.${idx}.quantity`) || 0) *
                        (form.watch(`lineItems.${idx}.rate`) || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Subtotal, Tax, Total */}
            <div className="mt-2 flex flex-col gap-1 text-sm bg-white rounded-xl p-3">
              <div className="flex justify-between items-center">
                <p className="text-base font-normal">Subtotal:</p>
                <span className="font-semibold">
                  {form.watch("currency") === "NGN"
                    ? "₦"
                    : form.watch("currency") === "GBP"
                      ? "£"
                      : "$"}
                  {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base font-normal">Tax (10%):</p>
                <span className="font-semibold">
                  {form.watch("currency") === "NGN"
                    ? "₦"
                    : form.watch("currency") === "GBP"
                      ? "£"
                      : "$"}
                  {tax.toLocaleString()}
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <p className="text-base font-normal">Total:</p>
                <span className="text-xl text-primary font-semibold">
                  {form.watch("currency") === "NGN"
                    ? "₦"
                    : form.watch("currency") === "GBP"
                      ? "£"
                      : "$"}
                  {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* --- Additional Information --- */}
          <div className="rounded-lg border p-4 bg-purple-50">
            <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Additional Information
            </h4>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes or payment instructions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* --- Actions --- */}
          <div className="flex justify-end gap-2 border-t pt-1 pb-3">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              disabled={createInvoice.isPending || updateInvoice.isPending}
              onClick={(e) => {
                e.preventDefault();
                setInvoiceStatus("Draft");
                form.handleSubmit(onSubmit)();
              }}
            >
              {createInvoice.isPending || updateInvoice.isPending
                ? "Please wait..."
                : "Save as Draft"}
            </Button>
            <Button
              type="submit"
              disabled={createInvoice.isPending || updateInvoice.isPending}
              onClick={(e) => {
                e.preventDefault();
                setInvoiceStatus("Paid");
                form.handleSubmit(onSubmit)();
              }}
            >
              {createInvoice.isPending || updateInvoice.isPending
                ? "Please wait..."
                : isEditMode
                  ? "Update Invoice"
                  : "Create Invoice"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
