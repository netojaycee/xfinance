"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FileText, Layers, UploadCloud, Plus, Trash2 } from "lucide-react";
import { useCreateBill, useUpdateBill, useVendors } from "@/lib/api/hooks/usePurchases";
import { useItems } from "@/lib/api/hooks/useProducts";
import { toast } from "sonner";
import { ItemSelector } from "@/components/features/user/sales/invoices/ItemSelector";
import type { ItemsResponse } from "@/lib/api/hooks/types/productsTypes";

const lineItemSchema = z.object({
  itemId: z.string().min(1, "Item required"),
  quantity: z.number().min(1, "Min 1"),
  rate: z.number().min(0, "Min 0"),
  billItemId: z.string().optional(), // For tracking server-side IDs in edit mode
});

const billSchema = z.object({
  vendor: z.string().min(1, "Vendor required"),
  billDate: z.date(),
  billNumber: z.string().min(1, "Bill number required"),
  dueDate: z.date(),
  poNumber: z.string().optional(),
  paymentTerms: z.string().min(1, "Payment terms required"),
  lineItems: z.array(lineItemSchema).min(1, "At least 1 item"),
  discount: z.number().min(0, "Min 0"),
  tax: z.number().min(0, "Min 0"),
  category: z.string().min(1, "Category required"),
  notes: z.string().optional(),
  attachments: z.any().optional(),
});

type BillFormType = z.infer<typeof billSchema>;

const defaultValues: BillFormType = {
  vendor: "",
  billDate: new Date(),
  billNumber: "",
  dueDate: new Date(),
  poNumber: "",
  paymentTerms: "Net 30",
  lineItems: [{ itemId: "", quantity: 1, rate: 0 }],
  discount: 0,
  tax: 0,
  category: "",
  notes: "",
  attachments: undefined,
};

interface BillsFormProps {
  bill?: Partial<BillFormType> & { id?: string; billItem?: any[] };
  isEditMode?: boolean;
}

export default function BillsForm({ bill, isEditMode = false }: BillsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createBill = useCreateBill();
  const updateBill = useUpdateBill();
  const { data: vendorsData, isLoading: vendorsLoading } = useVendors();
  const itemsQuery = useItems() as { data?: ItemsResponse; isLoading: boolean };

  const vendors = (vendorsData as any)?.vendors || [];
  const items = itemsQuery.data?.items || [];
  const itemsLoading = itemsQuery.isLoading;

  const form = useForm<BillFormType>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      ...defaultValues,
      vendor: bill?.vendor || "",
      billNumber: bill?.billNumber || "",
      poNumber: bill?.poNumber || "",
      paymentTerms: bill?.paymentTerms || "Net 30",
      category: bill?.category || "",
      notes: bill?.notes || "",
      discount: Number(bill?.discount) || 0,
      tax: Number(bill?.tax) || 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (bill) {
      const mappedItems = (bill.billItem || []).map((ii: any) => ({
        itemId: ii.itemId || ii.item?.id || "",
        quantity: Number(ii.quantity) || 1,
        rate: Number(ii.rate) || 0,
        billItemId: ii.id,
      }));

      form.reset({
        vendor: (bill as any).vendorId || (bill.vendor as any)?.id || "",
        billDate: bill.billDate ? new Date(bill.billDate) : new Date(),
        billNumber: bill.billNumber || "",
        dueDate: bill.dueDate ? new Date(bill.dueDate) : new Date(),
        poNumber: bill.poNumber || "",
        paymentTerms: bill.paymentTerms || "Net 30",
        lineItems: mappedItems.length > 0 ? mappedItems : [{ itemId: "", quantity: 1, rate: 0 }],
        discount: Number(bill.discount) || 0,
        tax: Number(bill.tax) || 0,
        category: bill.category || "",
        notes: bill.notes || "",
      });
    }
  }, [bill, form]);
  const [removedItemIds, setRemovedItemIds] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const handleRemove = (index: number) => {
    const item = form.getValues(`lineItems.${index}`);
    if (item?.billItemId) {
      setRemovedItemIds((prev) => [...prev, item.billItemId!]);
    }
    remove(index);
  };

  // Calculate if all items are selected
  const maxItemsSelected = form.watch("lineItems").length >= items.length;

  // Calculations
  const subtotal = form
    .watch("lineItems")
    .reduce(
      (sum, item) =>
        sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
      0,
    );
  const discount = Number(form.watch("discount")) || 0;
  const taxPercent = Number(form.watch("tax")) || 0;
  const taxAmount = ((subtotal - discount) * taxPercent) / 100;
  const total = subtotal - discount + taxAmount;

  const onSubmit = async (values: BillFormType, status?: "draft" | "pending") => {
    try {
      setIsSubmitting(true);
      const billStatus = status || "draft";

      // Prepare line items for payload
      const itemsPayload = values.lineItems.map((li: any) => {
        const out: any = {
          itemId: li.itemId,
          rate: Number(li.rate) || 0,
          quantity: Number(li.quantity) || 0,
        };
        if (li.billItemId) out.id = li.billItemId;
        return out;
      });

      // Build FormData for create/update
      const formData = new FormData();
      formData.append("billDate", values.billDate instanceof Date ? values.billDate.toISOString() : String(values.billDate));
      formData.append("billNumber", values.billNumber);
      formData.append("vendorId", values.vendor);
      formData.append("dueDate", values.dueDate instanceof Date ? values.dueDate.toISOString() : String(values.dueDate));
      if (values.poNumber) formData.append("poNumber", values.poNumber);
      formData.append("paymentTerms", values.paymentTerms);
      formData.append("category", values.category);
      if (values.notes) formData.append("notes", values.notes);
      if (values.tax) formData.append("tax", String(Number(values.tax)));
      if (values.discount) formData.append("discount", String(Number(values.discount)));
      formData.append("items", JSON.stringify(itemsPayload));

      // Add attachment if provided
      if (values.attachments && values.attachments[0]) {
        formData.append("attachment", values.attachments[0]);
      }

      if (isEditMode && bill?.id) {
        // Add removeItemIds if any for updates
        if (removedItemIds.length > 0) {
          formData.append("removeItemIds", JSON.stringify(removedItemIds));
        }
        await updateBill.mutateAsync({ id: bill.id, data: formData });
      } else {
        await createBill.mutateAsync(formData);
      }

      form.reset();
      setIsSubmitting(false);
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} bill:`, error);
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          className="max-w-lg mx-auto space-y-6"
          onSubmit={form.handleSubmit((v) => onSubmit(v))}
        >
          {/* Bill Information */}
          <div className="rounded-2xl border bg-linear-to-br from-pink-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-pink-500 w-5 h-5" />
              <span className="font-semibold text-base">Bill Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={vendorsLoading}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue
                            placeholder={
                              vendorsLoading
                                ? "Loading vendors..."
                                : "Select vendor"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(vendors) && vendors.length > 0 ? (
                            vendors.map((v: any) => (
                              <SelectItem key={v.id} value={v.id}>
                                {v.displayName || v.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-vendors" disabled>
                              No vendors found
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value instanceof Date
                            ? format(field.value, "yyyy-MM-dd")
                            : field.value
                        }
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
                name="billNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BILL-001" {...field} />
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
                        value={
                          field.value instanceof Date
                            ? format(field.value, "yyyy-MM-dd")
                            : field.value
                        }
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
                name="poNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PO Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Purchase order number" {...field} />
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
                    <FormLabel>Payment Terms *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                          <SelectItem value="Net 60">Net 60</SelectItem>
                          <SelectItem value="Due on Receipt">
                            Due on Receipt
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-2xl border bg-linear-to-br from-purple-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-base text-purple-600">
                Line Items
              </span>
              {/* Hide Add Item button if all items are selected */}
              {!maxItemsSelected && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="ml-auto"
                  onClick={() =>
                    append({ itemId: "", quantity: 1, rate: 0 })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Item
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {/* Header Row */}
              <div className="grid grid-cols-[3fr_1.5fr_1.5fr] gap-2 w-full px-2 py-2 text-sm font-semibold text-gray-700 border-b">
                <span>Item</span>
                <span className="text-center">Qty</span>
                <span className="text-center">Rate</span>
              </div>
              {fields.map((item, idx) => {
                // All selected except the current one
                const selectedIds = form.watch("lineItems").map((li: any, i: number) => i !== idx ? li.itemId : null).filter(Boolean);
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
                          onClick={() => handleRemove(idx)}
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
                                  Number((selectedItem as any).sellingPrice || (selectedItem as any).purchasePrice || 0),
                                );
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
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            disabled={true}
                          />
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Totals */}
            <div className="mt-4 space-y-1 text-sm bg-white w-2/3 flex flex-col ml-auto p-3 border rounded-xl">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  $
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="inline-block">
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          className="w-20 inline-block"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>Tax</span>
                <div className="flex items-center gap-1">
                  <FormField
                    control={form.control}
                    name="tax"
                    render={({ field }) => (
                      <FormItem className="inline-block">
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            step="0.01"
                            className="w-14 inline-block"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span className="text-xs">%</span>
                  <span className="ml-2">
                    $
                    {taxAmount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Total</span>
                <span className="text-blue-700 text-xl">
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="rounded-2xl border bg-linear-to-br from-green-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="text-green-400 w-5 h-5" />
              <span className="font-semibold text-base">
                Additional Details
              </span>
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Office Supplies">
                          Office Supplies
                        </SelectItem>
                        <SelectItem value="IT & Software">
                          IT & Software
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add internal notes about this bill..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Attachments */}
            <FormField
              control={form.control}
              name="attachments"
              render={({ field: { value, onChange } }) => (
                <FormItem className="mt-2">
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <div
                      className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-gray-50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                      <div className="text-xs text-gray-500 mb-1">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-xs text-gray-400">
                        Attach vendor invoice (PDF, JPG, PNG up to 10MB)
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => onChange(e.target.files)}
                      />
                      {value && value.length > 0 && (
                        <div className="mt-2 text-xs text-gray-700">
                          {value.length} file(s) selected
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-2 pt-2 pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <div className="flex gap-2 items-center">
              <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  form.handleSubmit((v) => onSubmit(v, "draft"))();

                }}
              >
                {isSubmitting ? "Please wait..." : "Save as Draft"}
              </Button>
              <Button
                type="submit"
                className="bg-pink-600 text-white"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  form.handleSubmit((v) => onSubmit(v, "pending"))();

                }}
              >
                {isSubmitting ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Bill" : "Create Bill")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
