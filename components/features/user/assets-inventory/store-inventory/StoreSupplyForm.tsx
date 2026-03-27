"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const supplySchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().optional(),
  quantity: z.number().min(0, "Quantity is required"),
  location: z.string().optional(),
  description: z.string().optional(),
});

type SupplyFormValues = z.infer<typeof supplySchema>;

interface StoreSupplyFormProps {
  supply?: any;
  isEditMode?: boolean;
  onSuccess?: () => void;
}

export default function StoreSupplyForm({ supply, isEditMode, onSuccess }: StoreSupplyFormProps) {
  const form = useForm<SupplyFormValues>({
    resolver: zodResolver(supplySchema),
    defaultValues: {
      name: "",
      sku: "",
      quantity: 0,
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditMode && supply) {
      form.reset({
        name: supply.name || "",
        sku: supply.sku || "",
        quantity: supply.quantity ?? 0,
        location: supply.location || "",
        description: supply.description || "",
      });
    }
  }, [isEditMode, supply, form]);

  const onSubmit = async (values: SupplyFormValues) => {
    // TODO: Call create or update API here
    // await apiCall(values);
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Supply name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} placeholder="SKU (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Location (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Description (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isEditMode ? "Update Supply" : "Add Supply"}
        </Button>
      </form>
    </Form>
  );
}
