"use client";
import { useRef, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
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
import {
  FileText,
  User,
  DollarSign,
  CreditCard,
  Layers,
  UploadCloud,
} from "lucide-react";
import { useCreateExpense, useVendors } from "@/lib/api/hooks/usePurchases";
import { toast } from "sonner";

const expenseSchema = z.object({
  date: z.date(),
  reference: z.string().optional(),
  supplier: z.string().min(1, "Supplier is required"),
  category: z.string().min(1, "Category is required"),
  paymentMethod: z.enum([
    "Cash",
    "Card",
    "Bank_Transfer",
    "Mobile_Money",
    "Check",
    "Debit_Card",
    "Credit_Card",
    "ACH",
    "Wire_Transfer",
  ]),
  account: z.string().min(1, "Account is required"),
  amount: z.number().min(0.01, "Amount is required"),
  tax: z.number().min(0, ""),
  description: z.string().optional(),
  tags: z.string().optional(),
  attachments: z.any().optional(),
});

type ExpenseFormType = z.infer<typeof expenseSchema>;

const defaultValues: ExpenseFormType = {
  date: new Date(),
  reference: "",
  supplier: "",
  category: "",
  paymentMethod: "Cash",
  account: "",
  amount: 0,
  tax: 0,
  description: "",
  tags: "",
  attachments: undefined,
};

export default function ExpensesForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenseStatus, setExpenseStatus] = useState<"Draft" | "Active">(
    "Draft",
  );
  const createExpense = useCreateExpense();
  const { data: vendorsData, isLoading: vendorsLoading } = useVendors();

  const vendors = (vendorsData as any)?.vendors || [];

  const form = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues,
    mode: "onChange",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const watchAmount = form.watch("amount");
  const watchTax = form.watch("tax");
  const total = (Number(watchAmount) || 0) + (Number(watchTax) || 0);

  const onSubmit = async (values: ExpenseFormType) => {
    try {
      setIsSubmitting(true);

      // Create FormData for multipart request
      const formData = new FormData();
      formData.append("date", values.date.toISOString());
      if (values.reference) formData.append("reference", values.reference);
      formData.append("supplier", values.supplier);
      formData.append("category", values.category);
      formData.append("paymentMethod", values.paymentMethod);
      formData.append("account", values.account);
      formData.append("amount", Math.round(values.amount).toString());
      if (values.tax) formData.append("tax", Math.round(values.tax).toString());
      if (values.description)
        formData.append("description", values.description);

      // Add tags if provided
      if (values.tags) {
        const tagArray = values.tags.split(",").map((tag) => tag.trim());
        tagArray.forEach((tag) => {
          formData.append("tags", tag);
        });
      }

      // Add attachment if provided
      if (values.attachments && values.attachments[0]) {
        formData.append("attachment", values.attachments[0]);
      }

      formData.append("status", expenseStatus);

      await createExpense.mutateAsync(formData);
      toast.success("Expense created successfully");
      form.reset();
      setIsSubmitting(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Error creating expense");
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor/Supplier *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={vendorsLoading}
                      >
                        <SelectTrigger className="w-full">
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Meals & Entertainment">
                            Meals & Entertainment
                          </SelectItem>
                          <SelectItem value="Equipment">Equipment</SelectItem>
                          <SelectItem value="Repairs & Maintenance">
                            Repairs & Maintenance
                          </SelectItem>
                          <SelectItem value="Professional Services">
                            Professional Services
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                          <SelectItem value="Bank_Transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="Mobile_Money">
                            Mobile Money
                          </SelectItem>
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="Debit_Card">Debit Card</SelectItem>
                          <SelectItem value="Credit_Card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="ACH">ACH</SelectItem>
                          <SelectItem value="Wire_Transfer">
                            Wire Transfer
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
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Main Account">
                            Main Account
                          </SelectItem>
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
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2 text-right font-bold text-lg text-blue-700">
              Total Amount{" "}
              <span className="text-2xl">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="rounded-2xl border bg-linear-to-br from-blue-50 to-white p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="text-blue-400 w-5 h-5" />
              <span className="font-semibold text-base">
                Additional Details
              </span>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description/Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add details about this expense..."
                      {...field}
                    />
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
                    <Input
                      placeholder="Add tags (comma separated)"
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
                        PDF, JPG, PNG up to 10MB
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
                  setExpenseStatus("Draft");
                  form.handleSubmit(onSubmit)();
                }}
              >
                {isSubmitting ? "Please wait..." : "Save as Draft"}
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 text-white"
                disabled={isSubmitting}
                onClick={(e) => {
                  e.preventDefault();
                  setExpenseStatus("Active");
                  form.handleSubmit(onSubmit)();
                }}
              >
                {isSubmitting ? "Creating..." : "Create Expense"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
