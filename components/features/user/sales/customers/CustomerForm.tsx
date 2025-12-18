"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { ArrowRight, Loader2 } from "lucide-react";
import { customerSchema } from "../util/schema";
import {
  countryOptions,
  customerTypeOptions,
  paymentTermsOptions,
} from "../util/data";

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customer?: Partial<CustomerFormData> & { id?: string };
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export default function CustomerForm({
  customer,
  isEditMode = false,
  onSuccess,
}: CustomerFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerType: (customer?.customerType as any) || "Business",
      name: customer?.name || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      companyName: customer?.companyName || "",
      streetAddress: customer?.streetAddress || "",
      city: customer?.city || "",
      state: customer?.state || "",
      postalCode: customer?.postalCode || "",
      country: customer?.country || "Nigeria",
      paymentTerms: (customer?.paymentTerms as any) || "Net 30",
      creditLimit:
        typeof customer?.creditLimit === "number" ? customer.creditLimit : 0,
      notes: customer?.notes || "",
    },
  });

  useEffect(() => {
    // Reset when customer prop changes (edit mode)
    if (customer) {
      form.reset({
        customerType: (customer?.customerType as any) || "Business",
        name: customer?.name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        companyName: customer?.companyName || "",
        streetAddress: customer?.streetAddress || "",
        city: customer?.city || "",
        state: customer?.state || "",
        postalCode: customer?.postalCode || "",
        country: customer?.country || "Nigeria",
        paymentTerms: (customer?.paymentTerms as any) || "Net 30",
        creditLimit: customer?.creditLimit ?? 0,
        notes: customer?.notes || "",
      });
    }
  }, [customer]);

  const onSubmit = async (values: CustomerFormData) => {
    try {
      setSubmitting(true);
      const payload = {
        ...(customer?.id ? { id: customer.id } : {}),
        ...values,
      };

      console.log(
        isEditMode ? "Updating customer:" : "Creating customer:",
        payload
      );

      // Placeholder: replace with actual API call
      await new Promise((r) => setTimeout(r, 500));

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Customer form submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="bg-blue-50 p-4 rounded-xl">
            <h6 className="font-medium text-sm mb-2">Basic Information</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center">
              <FormField
                control={form.control}
                name="customerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {customerTypeOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="customer@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+234 800 000 0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company name (if applicable)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl pt-4">
            <h6 className="font-medium text-sm mb-2">Address</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
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
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl pt-4">
            <h6 className="font-medium text-sm mb-2">Payment Information</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-center">
              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Terms</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment terms" />
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
                name="creditLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Limit (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes about this customer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 border-t pt-1 pb-3">
            <Button variant={"outline"}>Cancel</Button>
            <Button type="submit" className="" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  <span>Please wait</span>
                </>
              ) : (
                <>
                  <span>{isEditMode ? "Update Customer" : "Add Customer"}</span>
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
