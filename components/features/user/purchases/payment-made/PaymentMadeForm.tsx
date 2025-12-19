
"use client";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { DollarSign } from "lucide-react";

const paymentSchema = z.object({
  vendor: z.string().min(1, "Vendor is required"),
  billNumber: z.string().optional(),
  paymentDate: z.string().min(1, "Payment date is required"),
  amount: z.coerce.number().min(0.01, "Amount is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  fromAccount: z.string().min(1, "From account is required"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

type PaymentFormType = z.infer<typeof paymentSchema>;

const defaultValues: PaymentFormType = {
  vendor: "",
  billNumber: "",
  paymentDate: format(new Date(), "yyyy-MM-dd"),
  amount: 0,
  paymentMethod: "",
  fromAccount: "",
  reference: "",
  notes: "",
};

export default function PaymentMadeForm() {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema) as any,
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (values: PaymentFormType) => {
    console.log({ ...values, status: "recorded" });
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Vendor and Bill Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-green-50 p-4 rounded-2xl border">
            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor *</FormLabel>
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
              name="billNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill Number (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="BILL-2025-XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Payment Details */}
          <div className="rounded-2xl border bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-blue-500 w-5 h-5" />
              <span className="font-semibold text-base">Payment Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="paymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="ACH">ACH</SelectItem>
                          <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account *</FormLabel>
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
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Reference/Check Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction ID, check number, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional notes about this payment..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-2 pt-2 pb-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Record Payment
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
