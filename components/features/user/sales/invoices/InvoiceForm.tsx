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
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import { format } from "date-fns";
import { paymentTermsOptions } from "../customers/utils/data";
import { useCustomers } from "@/lib/api/hooks/useSales";
import { useItems } from "@/lib/api/hooks/useProducts";
import { invoiceSchema } from "./utils/schema";
import { ItemSelector } from "./ItemSelector";
import type { ItemsResponse } from "@/lib/api/hooks/types/productsTypes";

type InvoiceFormData = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  invoice?: Partial<InvoiceFormData> & { id?: string };
  isEditMode?: boolean;
  defaultCustomerId?: string;
  disabledCustomerSelect?: boolean;
}

export default function InvoiceForm({
  invoice,
  isEditMode = false,
  defaultCustomerId,
  disabledCustomerSelect,
}: InvoiceFormProps) {
  const [invoiceStatus, setInvoiceStatus] = useState<"Draft" | "Sent">(
    (invoice as any)?.status || "Draft",
  );
  const { data, isLoading: customersLoading } = useCustomers();
  const itemsQuery = useItems() as {
    data?: ItemsResponse;
    isLoading: boolean;
  };
  const createInvoice = useCreateInvoice();
  const updateInvoice = useUpdateInvoice();

  const customers = data?.customers || [];
  const items = itemsQuery.data?.items || [];
  const itemsLoading = itemsQuery.isLoading;

  console.log("Fetched customers for invoice form:", invoice, items); // Debug log to check fetched customers

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customerId: invoice?.customerId || defaultCustomerId || "",
      invoiceDate: invoice?.invoiceDate
        ? new Date(invoice.invoiceDate)
        : new Date(),
      dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : new Date(),
      paymentTerms: invoice?.paymentTerms || "",
      currency: invoice?.currency || "USD",
      // initialize empty; we'll replace with server items on mount to avoid duplicates
      lineItems: invoice?.lineItems || [],
      notes: invoice?.notes || "",
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const [removedItemIds, setRemovedItemIds] = useState<string[]>([]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const handleRemove = (index: number) => {
    const item = form.getValues(`lineItems.${index}` as any);
    // Prefer server invoice-line id stored on the value as `invoiceItemId`.
    const invoiceLineId =
      (item && ((item as any).invoiceItemId || (item as any).id)) || null;
    if (invoiceLineId) {
      setRemovedItemIds((prev) => [...prev, invoiceLineId]);
    }
    remove(index);
  };

  const openConfirm = (index: number) => {
    const item = form.getValues(`lineItems.${index}` as any);
    // If item exists on server (has id) show confirmation modal
    if (item && ((item as any).invoiceItemId || (item as any).id)) {
      setConfirmIndex(index);
      setConfirmOpen(true);
    } else {
      // new item, remove immediately
      handleRemove(index);
    }
  };

  // Calculate subtotal, tax, total
  const subtotal = form
    .watch("lineItems")
    .reduce((sum, item) => sum + (item.quantity || 0) * (item.rate || 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Calculate if all items are selected
  const maxItemsSelected = form.watch("lineItems").length >= items.length;

  useEffect(() => {
    if (invoice) {
      // Reset non-array fields
      form.reset({
        customerId: invoice?.customerId || "",
        invoiceDate: invoice?.invoiceDate
          ? new Date(invoice.invoiceDate)
          : new Date(),
        dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : new Date(),
        paymentTerms: invoice?.paymentTerms || "",
        currency: invoice?.currency || "USD",
        lineItems: [],
        notes: invoice?.notes || "",
      });

      // Replace field array with server items to avoid double entries
      // NOTE: useFieldArray reserves `id` for internal keys, so store server
      // invoice-line id under `invoiceItemId` to preserve it in form values.
      const mapped = (invoice as any)?.invoiceItem
        ? (invoice as any).invoiceItem.map((ii: any) => ({
            invoiceItemId: ii.id,
            itemId: ii.itemId,
            rate: ii.rate,
            quantity: ii.quantity,
          }))
        : invoice?.lineItems || [{ itemId: "", quantity: 1, rate: 0 }];
      replace(mapped as any[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

  const onSubmit = async (
    values: InvoiceFormData,
    statusOverride?: "Draft" | "Sent",
  ) => {
    try {
      // Determine status (prefer explicit override to avoid setState race)
      const status = statusOverride ?? invoiceStatus;

      // Prevent submitting invoice with no items
      const itemsCount = Array.isArray(values.lineItems)
        ? values.lineItems.length
        : 0;
      if (itemsCount === 0) {
        toast.error("Invoice must have at least one line item");
        return;
      }

      if (isEditMode && invoice?.id) {
        // Edit: include id for existing items, omit for new
        const items = values.lineItems.map((li: any) => {
          const out: any = {
            itemId: li.itemId,
            rate: Number(li.rate) || 0,
            quantity: Number(li.quantity) || 0,
          };
          if (li.invoiceItemId) out.id = li.invoiceItemId;
          return out;
        });
        const payload: any = {
          customerId: values.customerId,
          invoiceDate:
            values.invoiceDate instanceof Date
              ? values.invoiceDate.toISOString()
              : String(values.invoiceDate),
          dueDate:
            values.dueDate instanceof Date
              ? values.dueDate.toISOString()
              : String(values.dueDate),
          paymentTerms: values.paymentTerms,
          currency: values.currency,
          items,
          notes: values.notes,
          status: status === "Draft" ? "Draft" : "Sent",
        };
        await updateInvoice.mutateAsync({ id: invoice.id, data: payload });
      } else {
        // Create: no id in items
        const items = values.lineItems.map((li) => ({
          itemId: li.itemId,
          rate: Number(li.rate) || 0,
          quantity: Number(li.quantity) || 0,
        }));
        const payload: any = {
          customerId: values.customerId,
          invoiceDate:
            values.invoiceDate instanceof Date
              ? values.invoiceDate.toISOString()
              : String(values.invoiceDate),
          dueDate:
            values.dueDate instanceof Date
              ? values.dueDate.toISOString()
              : String(values.dueDate),
          paymentTerms: values.paymentTerms,
          currency: values.currency,
          items,
          notes: values.notes,
          status: status === "Draft" ? "Draft" : "Sent",
        };
        await createInvoice.mutateAsync(payload);
      }
    } catch (error) {
      // error handled below
    }
  };

  // useEffect(() => {
  //   if (createInvoice.isSuccess || updateInvoice.isSuccess) {
  //     toast.success("Invoice saved successfully");
  //     if (onSuccess) onSuccess();
  //   }
  //   if (createInvoice.isError) {
  //     toast.error(createInvoice.error?.message || "Failed to create invoice");
  //   }
  //   if (updateInvoice.isError) {
  //     toast.error(updateInvoice.error?.message || "Failed to update invoice");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   createInvoice.isSuccess,
  //   createInvoice.isError,
  //   updateInvoice.isSuccess,
  //   updateInvoice.isError,
  // ]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((v) => onSubmit(v))}
          className="space-y-4"
        >
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
                        disabled={customersLoading || disabledCustomerSelect}
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
                              <SelectItem
                                key={c.id}
                                value={c.id}
                                disabled={!!isEditMode}
                              >
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
              {!maxItemsSelected && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ itemId: "", quantity: 1, rate: 0 })}
                >
                  <Plus className="w-4 h-4" /> Add Item
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {/* Header Row */}
              <div className="grid grid-cols-[4fr_1fr_1fr_2fr] gap-2 w-full px-2 py-2 text-sm font-semibold text-gray-700 border-b">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="text-center">Rate</span>
                {/* <span className="text-right">Total</span> */}
              </div>
              {fields.map((item, idx) => {
                // All selected except the current one
                const selectedIds = form
                  .watch("lineItems")
                  .map((li: any) => li.itemId)
                  .filter((id: string, i: number) => i !== idx);
                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 bg-white rounded-xl p-2 shadow-sm"
                  >
                    <div className="flex justify-between w-full items-center">
                      <p className="">Item {idx + 1}</p>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openConfirm(idx)}
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-[3fr_1.5fr_1.5fr] gap-2 w-full items-center">
                      <Controller
                        control={form.control}
                        name={`lineItems.${idx}.itemId`}
                        render={({ field }) => (
                          <ItemSelector
                            items={items}
                            isLoading={itemsLoading}
                            value={field.value}
                            onChange={(val) => {
                              field.onChange(val);
                              const selectedItem = items.find(
                                (i: any) => i.id === val,
                              );
                              if (selectedItem) {
                                form.setValue(
                                  `lineItems.${idx}.rate`,
                                  Number(selectedItem.sellingPrice) || 0,
                                );
                                // Optional: if you had a description field
                                // form.setValue(`lineItems.${idx}.description`, selectedItem.description || "");
                              }
                            }}
                            placeholder="Select item..."
                            disabledIds={selectedIds}
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            prefix="$"
                            disabled={true}
                          />
                        )}
                      />
                      {/* <span className=" text-right font-semibold rounded-xl bg-gray-200 h-9 flex items-center justify-center">
                        {form.watch(`currency`) === "NGN"
                          ? "₦"
                          : form.watch(`currency`) === "GBP"
                            ? "£"
                            : "$"}
                        {(
                          (form.watch(`lineItems.${idx}.quantity`) || 0) *
                          (form.watch(`lineItems.${idx}.rate`) || 0)
                        ).toLocaleString()}
                      </span> */}
                    </div>
                  </div>
                );
              })}
              {/* Confirmation modal for removing existing items */}
              <CustomModal
                open={confirmOpen}
                onOpenChange={(open) => setConfirmOpen(open)}
                title="Remove item"
                description="Are you sure you want to remove this item from the invoice?"
                module={MODULES.SALES}
              >
                <div className="p-4">
                  <p className="mb-4">
                    This will remove the item from the invoice. This action can
                    be undone by adding the item again.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setConfirmOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (confirmIndex !== null) {
                          handleRemove(confirmIndex);
                        }
                        setConfirmIndex(null);
                        setConfirmOpen(false);
                      }}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CustomModal>
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
              Cancel{" "}
            </Button>{" "}
            {(isEditMode && (invoice as any).status === "Draft") ||
              (!isEditMode && (
                <Button
                  type="submit"
                  variant="outline"
                  disabled={createInvoice.isPending || updateInvoice.isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    setInvoiceStatus("Draft");
                    form.handleSubmit((v) => onSubmit(v, "Draft"))();
                  }}
                >
                  {createInvoice.isPending || updateInvoice.isPending
                    ? "Please wait..."
                    : "Save as Draft"}
                </Button>
              ))}
            <Button
              type="submit"
              disabled={createInvoice.isPending || updateInvoice.isPending}
              onClick={(e) => {
                e.preventDefault();
                setInvoiceStatus("Sent");
                form.handleSubmit((v) => onSubmit(v, "Sent"))();
              }}
            >
              {" "}
              {createInvoice.isPending || updateInvoice.isPending
                ? "Please wait..."
                : isEditMode
                  ? "Update Invoice"
                  : "Create Invoice"}{" "}
            </Button>{" "}
          </div>{" "}
        </form>{" "}
      </Form>{" "}
    </div>
  );
}
