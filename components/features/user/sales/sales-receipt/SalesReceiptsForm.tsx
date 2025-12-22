"use client";


import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus, Loader2, ArrowRight, Receipt } from "lucide-react";
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
import { format } from "date-fns";
import { toast } from "sonner";
import { useCreateReceipt, useUpdateReceipt } from "@/lib/api/hooks/useSales";

export const receiptSchema = z.object({
  customer: z.string().min(1, "Customer name is required"),
  invoiceDate: z.date(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  lineItems: z.array(
    z.object({
      description: z.string().min(1, "Description is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      rate: z.number().min(0, "Unit price must be at least 0"),
    })
  ).min(1, "At least one item is required"),
});

type ReceiptFormData = z.infer<typeof receiptSchema>;

interface SalesReceiptsFormProps {
  receipt?: Partial<ReceiptFormData> & { id?: string };
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export default function SalesReceiptsForm({
  receipt,
  isEditMode = false,
  onSuccess,
}: SalesReceiptsFormProps) {
  const createReceipt = useCreateReceipt();
  const updateReceipt = useUpdateReceipt();

  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      customer: receipt?.customer || "",
      invoiceDate: receipt?.invoiceDate ? new Date(receipt.invoiceDate as any) : new Date(),
      paymentMethod: receipt?.paymentMethod || "Cash",
      lineItems: receipt?.lineItems || [],
    },
  });

  useEffect(() => {
    if (receipt) {
      form.reset({
        customer: receipt?.customer || "",
        invoiceDate: receipt?.invoiceDate ? new Date(receipt.invoiceDate as any) : new Date(),
        paymentMethod: receipt?.paymentMethod || "Cash",
        lineItems: receipt?.lineItems || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const total = form.watch("lineItems").reduce((sum, item) => sum + (item.quantity || 0) * (item.rate || 0), 0);

  const onSubmit = async (values: ReceiptFormData) => {
    try {
      if (isEditMode && receipt?.id) {
        await updateReceipt.mutateAsync({ id: receipt.id, data: values });
      } else {
        await createReceipt.mutateAsync(values);
      }
    } catch (error) {
      // error handled below
    }
  };

  useEffect(() => {
    if (createReceipt.isSuccess || updateReceipt.isSuccess) {
      toast.success("Receipt saved successfully");
      if (onSuccess) onSuccess();
    }
    if (createReceipt.isError) {
      toast.error(createReceipt.error?.message || "Failed to create receipt");
    }
    if (updateReceipt.isError) {
      toast.error(updateReceipt.error?.message || "Failed to update receipt");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createReceipt.isSuccess, createReceipt.isError, updateReceipt.isSuccess, updateReceipt.isError]);

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="bg-blue-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-2">Customer & Date</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="invoiceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={format(field.value, "yyyy-MM-dd")}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl pt-4">
            <h6 className="font-medium text-sm mb-2">Payment Information</h6>
            <div className="grid grid-cols-1  gap-4 md:items-center">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl pt-4">
            <h6 className="font-medium text-sm mb-2">Line Items</h6>
            <div className="rounded-2xl bg-gray-50 p-2">
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 w-full mb-1">
                <div className="col-span-3 text-gray-400 font-medium text-xs">Description</div>
                <div className="col-span-2 text-gray-400 font-medium text-center text-xs">Qty</div>
                <div className="col-span-2 text-gray-400 font-medium text-center text-xs">Unit Price</div>
                <div className="col-span-2 text-gray-400 font-medium text-center text-xs">Total</div>
                <div className="col-span-1 text-center text-gray-400 font-medium text-xs">Actions</div>
              </div>
              {fields.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-2 items-center">
                  <Controller
                    control={form.control}
                    name={`lineItems.${idx}.description`}
                    render={({ field }) => (
                      <Input placeholder="Description" {...field} className="col-span-3 rounded-xl" />
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
                        className="col-span-2 rounded-xl text-center"
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                        className="col-span-2 rounded-xl text-center"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  <span className="col-span-2 text-center font-semibold">
                    ₦{((form.watch(`lineItems.${idx}.quantity`) || 0) * (form.watch(`lineItems.${idx}.rate`) || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <Button type="button" variant="ghost" className=" text-red-500" onClick={() => remove(idx)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="mx-auto"
                  onClick={() => append({ description: "", quantity: 1, rate: 0 })}
                >
                  <Plus className="w-5 h-5 mr-1" /> Add Item
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="font-semibold text-lg">Total Amount</span>
            <span className="font-bold text-2xl">
              ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-end gap-2 border-t pt-1 pb-3">
            <Button variant={"outline"} type="button">Cancel</Button>
            <Button type="submit" className="" disabled={createReceipt.isPending || updateReceipt.isPending}>
              {(createReceipt.isPending || updateReceipt.isPending) ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> <span>Please wait</span>
                </>
              ) : (
                <>
                  <span>{isEditMode ? "Update Receipt" : "Add Receipt"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
