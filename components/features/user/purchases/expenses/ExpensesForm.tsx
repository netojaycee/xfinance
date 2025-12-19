"use client";
import { useRef } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { FileText, User, DollarSign, CreditCard, Layers, UploadCloud } from "lucide-react";

const expenseSchema = z.object({
  date: z.string().min(1, "Date is required"),
  reference: z.string().optional(),
  vendor: z.string().min(1, "Vendor is required"),
  category: z.string().min(1, "Category is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  account: z.string().min(1, "Account is required"),
  amount: z.number().min(0.01, "Amount is required"),
  taxAmount: z.number().min(0, ""),
  description: z.string().optional(),
  tags: z.string().optional(),
  attachments: z.any().optional(),
});

type ExpenseFormType = z.infer<typeof expenseSchema>;

const defaultValues: ExpenseFormType = {
  date: format(new Date(), "yyyy-MM-dd"),
  reference: "",
  vendor: "",
  category: "",
  paymentMethod: "",
  account: "",
  amount: 0,
  taxAmount: 0,
  description: "",
  tags: "",
  attachments: undefined,
};

export default function ExpensesForm() {
  const form = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues,
    mode: "onChange",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const watchAmount = form.watch("amount");
  const watchTax = form.watch("taxAmount");
  const total = (Number(watchAmount) || 0) + (Number(watchTax) || 0);

  const onSubmit = (status: "draft" | "submitted") => (values: ExpenseFormType) => {
    const payload = { ...values, status };
    console.log(payload);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit("submitted"))}>
          {/* Basic Information */}
          <div className="rounded-2xl border bg-linear-to-br from-purple-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-purple-500 w-5 h-5" />
              <span className="font-semibold text-base">Basic Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference/Receipt #</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., REC-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Vendor & Category */}
          <div className="rounded-2xl border bg-linear-to-br from-blue-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="text-blue-500 w-5 h-5" />
              <span className="font-semibold text-base">Vendor & Category</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="vendor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor/Supplier *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office Supplies Inc">Office Supplies Inc</SelectItem>
                          <SelectItem value="Tech Solutions LLC">Tech Solutions LLC</SelectItem>
                          <SelectItem value="Cloud Services Pro">Cloud Services Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                          <SelectItem value="IT & Software">IT & Software</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="rounded-2xl border bg-linear-to-br from-green-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="text-green-500 w-5 h-5" />
              <span className="font-semibold text-base">Payment Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Main Account">Main Account</SelectItem>
                          <SelectItem value="Petty Cash">Petty Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Amount Details */}
          <div className="rounded-2xl border bg-linear-to-br from-pink-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-pink-500 w-5 h-5" />
              <span className="font-semibold text-base">Amount Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount *</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2 text-right font-bold text-lg text-blue-700">
              Total Amount {" "}
              <span className="text-2xl">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="rounded-2xl border bg-linear-to-br from-blue-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="text-blue-400 w-5 h-5" />
              <span className="font-semibold text-base">Additional Details</span>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description/Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add details about this expense..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Add tags (comma separated)" {...field} />
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
                      <div className="text-xs text-gray-500 mb-1">Click to upload or drag and drop</div>
                      <div className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={e => onChange(e.target.files)}
                      />
                      {value && value.length > 0 && (
                        <div className="mt-2 text-xs text-gray-700">{value.length} file(s) selected</div>
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
            <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
            <Button type="button" variant="secondary" onClick={form.handleSubmit(onSubmit("draft"))}>
              Save as Draft
            </Button>
            <Button type="submit" className="bg-purple-600 text-white">
              Create Expense
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
