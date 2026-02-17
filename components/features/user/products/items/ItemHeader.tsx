"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CustomerStatCardSmall from "./ItemStatCardSmall";
import { Download, Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import ItemForm from "./ItemForm";
import { ItemsResponse } from "@/lib/api/hooks/types/productsTypes";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";

export default function ItemHeader({
  data,
  loading,
  // onSearch,
  // searchValue,
  // onCategoryChange,
  // categoryValue,
}: {
  data?: ItemsResponse;
  loading: boolean;
  // onSearch?: (value: string) => void;
  // searchValue?: string;
  // onCategoryChange?: (category: string) => void;
  // categoryValue?: string;
}) {
  const { isOpen, openModal, closeModal} = useModal()
  const totalCount = data?.total || 0;
  const totalInStock = data?.totalInStock || 0;
  const totalOutOfStock = data?.totalOutOfStock || 0;


  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Items</h2>
          <p className="text-muted-foreground">
            Manage inventory items and products ({totalCount} items)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl" disabled>
            <Download />
            Export
          </Button>
          <Button onClick={() => openModal(MODAL.ITEM_CREATE)} className="rounded-xl">
            <Plus /> Add Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      {/* <div className="mt-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            className="w-full pl-9"
            placeholder="Search items..."
            value={searchValue || ""}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Select
          value={categoryValue || ""}
          onValueChange={(value) => onCategoryChange?.(value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomerStatCardSmall
          title="Total Items"
          value={<span className="text-2xl font-bold text-indigo-900">{totalCount}</span>}
          subtitle={`In Stock: ${totalInStock}`}
        />
        <CustomerStatCardSmall
          title="In Stock"
          value={<span className="text-2xl font-bold text-green-600">{totalInStock}</span>}
          subtitle={"Available"}
        />
        <CustomerStatCardSmall
          title="Out of Stock"
          value={<span className="text-2xl font-bold text-red-600">{totalOutOfStock}</span>}
          subtitle={"Needs reorder"}
        />
        <CustomerStatCardSmall
          title="Total Value"
          value={<span className="text-2xl font-bold text-indigo-900">125k</span>}
          subtitle={"Inventory Value"}
        />
      </div>

      <CustomModal
        title="Add New Item"
        module={MODULES.PRODUCTS}
        open={isOpen(MODAL.ITEM_CREATE)}
        onOpenChange={(open) => (open ? openModal(MODAL.ITEM_CREATE) : closeModal(MODAL.ITEM_CREATE))}
      >
        <ItemForm />
      </CustomModal>
    </div>
  );
}
