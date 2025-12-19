"use client";
import { useRef } from "react";
import { z } from "zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
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

const lineItemSchema = z.object({
  description: z.string().min(1, "Description required"),
  quantity: z.number().min(1, "Min 1"),
  rate: z.number().min(0, "Min 0"),
});

const billSchema = z.object({
  vendor: z.string().min(1, "Vendor required"),
  billDate: z.string().min(1, "Bill date required"),
  billNumber: z.string().min(1, "Bill number required"),
  dueDate: z.string().min(1, "Due date required"),
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
  billDate: format(new Date(), "yyyy-MM-dd"),
  billNumber: "",
  dueDate: "",
  poNumber: "",
  paymentTerms: "Net 30",
  lineItems: [{ description: "", quantity: 1, rate: 0 }],
  discount: 0,
  tax: 0,
  category: "",
  notes: "",
  attachments: undefined,
};

export default function BillsForm() {
  const form = useForm<BillFormType>({
    resolver: zodResolver(billSchema),
    defaultValues,
    mode: "onChange",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  // Calculations
  const subtotal = form
    .watch("lineItems")
    .reduce(
      (sum, item) =>
        sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
      0
    );
  const discount = Number(form.watch("discount")) || 0;
  const taxPercent = Number(form.watch("tax")) || 0;
  const taxAmount = ((subtotal - discount) * taxPercent) / 100;
  const total = subtotal - discount + taxAmount;

  const onSubmit =
    (status: "draft" | "submitted") => (values: BillFormType) => {
      const payload = { ...values, status };
      console.log(payload);
    };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          className="max-w-lg mx-auto space-y-6"
          onSubmit={form.handleSubmit(onSubmit("submitted"))}
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
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office Supplies Inc">
                            Office Supplies Inc
                          </SelectItem>
                          <SelectItem value="Tech Solutions LLC">
                            Tech Solutions LLC
                          </SelectItem>
                          <SelectItem value="Cloud Services Pro">
                            Cloud Services Pro
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
                name="billDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                      <Input type="date" {...field} />
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
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="ml-auto"
                onClick={() =>
                  append({ description: "", quantity: 1, rate: 0 })
                }
              >
                <Plus className="w-4 h-4 mr-1" /> Add Item
              </Button>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-1">
                <div className="col-span-3">Description</div>
                <div className="col-span-1 text-center">Quantity</div>
                <div className="col-span-1 text-center">Rate</div>
                <div className="col-span-1 text-center">Amount</div>
                <div className="col-span-1 text-center"> </div>
              </div>
              {fields.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-7 gap-2 mb-2 items-center"
                >
                  <FormField
                    control={form.control}
                    name={`lineItems.${idx}.description`}
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input placeholder="Item description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`lineItems.${idx}.quantity`}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`lineItems.${idx}.rate`}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormControl>
                          <Input type="number" min={0} step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-1 text-center font-semibold">
                    $
                    {(
                      (Number(form.watch(`lineItems.${idx}.quantity`)) || 0) *
                      (Number(form.watch(`lineItems.${idx}.rate`)) || 0)
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="col-span-1 text-center">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(idx)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
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
                type="button"
                variant="secondary"
                onClick={form.handleSubmit(onSubmit("draft"))}
              >
                Save as Draft
              </Button>
              <Button type="submit" className="bg-pink-600 text-white">
                Create Bill
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
