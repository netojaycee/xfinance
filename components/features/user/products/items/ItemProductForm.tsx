
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { productCategories, productUnits } from "./utils/data";
import { productSchema } from "./utils/schema";
import z from "zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const defaultProduct = {
  name: "",
  sku: "",
  category: "",
  unit: "",
  description: "",
  sellingPrice: "",
  costPrice: "",
  taxable: false,
  trackInventory: true,
  currentStock: 0,
  lowStockAlert: 10,
  sellOnline: false,
};

export default function ItemProductForm({ item, isEditMode = false, onSuccess }: { item?: any; isEditMode?: boolean; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: isEditMode && item ? { ...defaultProduct, ...item } : defaultProduct,
  });

  useEffect(() => {
    if (isEditMode && item) {
      form.reset({ ...defaultProduct, ...item });
    }
  }, [isEditMode, item]);

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    setLoading(true);
    console.log(values);
    setTimeout(() => {
      setLoading(false);
      toast.success(isEditMode ? "Product updated!" : "Product saved!");
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-green-50 p-4 rounded-xl mb-4">
          <h6 className="font-medium text-sm mb-2">Basic Information</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Premium Widget A" {...field} />
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
                  <FormLabel>SKU *</FormLabel>
                  <FormControl>
                    <Input placeholder="WDG-A-001" {...field} />
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
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="w-full border px-2 py-1">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {productCategories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
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
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="w-full border px-2 py-1">
                            <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                            {productUnits.map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                    {unit}
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
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description for customers..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl mb-4">
          <h6 className="font-medium text-sm mb-2">Pricing</h6>
        <div className="grid grid-cols-1 gap-4">
            <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Selling Price *</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="₦0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cost Price</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="₦0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="taxable"
                render={({ field }) => (
                    <FormItem className="col-span-2 mt-2">
                        <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border">
                            <div>
                                <div className="font-semibold text-base leading-tight">Taxable Item</div>
                                <div className="text-gray-500 text-sm leading-tight">Apply tax to this item</div>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl mb-4">
            <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <span>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline-block mr-1 text-purple-500"><path fill="currentColor" d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm0 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2Zm1 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H4Z"></path></svg>
                </span>
                Inventory
            </h6>
            <div className="space-y-4">
                {/* Track Inventory Switch */}
                <FormField
                    control={form.control}
                    name="trackInventory"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border">
                                <div>
                                    <div className="font-semibold text-base leading-tight">Track Inventory</div>
                                    <div className="text-gray-500 text-sm leading-tight">Monitor stock levels for this item</div>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Current Stock & Low Stock Alert */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="currentStock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lowStockAlert"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Low Stock Alert</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Sell on Online Store Switch */}
                <FormField
                    control={form.control}
                    name="sellOnline"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border">
                                <div>
                                    <div className="font-semibold text-base leading-tight">Sell on Online Store</div>
                                    <div className="text-gray-500 text-sm leading-tight">Make this item available on your online store</div>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button type="button" variant="outline" onClick={() => { if (onSuccess) onSuccess(); }}>Cancel</Button>
          <Button type="submit" className="bg-green-600 text-white" disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
