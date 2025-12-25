"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { FolderArchive, Image } from "lucide-react";
import { collectionSchema } from "./utils/schema";

type CollectionFormData = z.infer<typeof collectionSchema>;

export default function CollectionsForm({
  collection,
  isEditMode = false,
  onSuccess,
}: {
  collection?: Partial<CollectionFormData> & { id?: string };
  isEditMode?: boolean;
  onSuccess?: () => void;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection?.name || "",
      slug: collection?.slug || "",
      description: collection?.description || "",
      image: collection?.image || undefined,
      visible: collection?.visible !== undefined ? collection.visible : true,
      featured:
        collection?.featured !== undefined ? collection.featured : false,
    },
  });

  useEffect(() => {
    if (collection) {
      form.reset({
        name: collection?.name || "",
        slug: collection?.slug || "",
        description: collection?.description || "",
        image: collection?.image || undefined,
        visible: collection?.visible ?? true,
        featured: collection?.featured ?? false,
      });
    }
  }, [collection]);

  const onSubmit = async (values: CollectionFormData) => {
    // Simulate API call
    toast.success(isEditMode ? "Collection updated" : "Collection created");
    if (onSuccess) onSuccess();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Collection Details */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h6 className="font-medium text-sm mb-3 text-blue-900 flex items-center gap-2">
              <span className=" w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                <FolderArchive className="w-4 h-4 text-blue-600" />
              </span>
              Collection Details
            </h6>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Summer Collection 2025"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="summer-collection-2025"
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.replace(/\s+/g, "-").toLowerCase()
                          )
                        }
                      />
                    </FormControl>
                    <div className="text-xs text-gray-400 mt-1">
                      http://yourstore.com/collections/
                      <span className="text-gray-500">
                        {field.value || "collection-name"}
                      </span>
                    </div>
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
                      <Textarea
                        placeholder="Brief description of this collection..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Collection Image */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h6 className="font-medium text-sm mb-3 text-blue-900 flex items-center gap-2">
              <span className=" w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                <Image className="w-4 h-4 text-blue-600" />
              </span>
              Collection Image
            </h6>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-xl p-6 cursor-pointer bg-white hover:bg-blue-50 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mb-2"
                />
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <Image className="w-10 h-10 text-blue-600" />
                    <div className="text-gray-400 text-sm mt-2">
                      Click to upload or drag and drop
                    </div>
                    <div className="text-xs text-gray-400">
                      PNG, JPG up to 5MB
                    </div>
                  </div>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Visibility Settings */}
          <div className="rounded-xl p-0 border border-blue-100 bg-linear-to-br from-blue-50 via-white to-blue-50">
            <h6 className="font-semibold text-base mb-0 px-6 pt-5 pb-2 text-blue-900 flex items-center gap-2">
              <span className=" w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z"
                    fill="#6366f1"
                    fillOpacity=".15"
                  />
                  <path
                    d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                    fill="#6366f1"
                  />
                </svg>
              </span>
              Visibility Settings
            </h6>
            <div className="flex flex-col gap-3 px-4 pb-4">
              <FormField
                control={form.control}
                name="visible"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm border border-blue-100">
                    <div>
                      <FormLabel className="font-semibold text-gray-800">
                        Visible on Online Store
                      </FormLabel>
                      <div className="text-xs text-gray-400">
                        Show this collection to customers
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm border border-blue-100">
                    <div>
                      <FormLabel className="font-semibold text-gray-800">
                        Featured Collection
                      </FormLabel>
                      <div className="text-xs text-gray-400">
                        Display prominently on homepage
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditMode ? "Update Collection" : "Create Collection"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
