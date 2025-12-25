"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CustomerStatCardSmall from "./ItemStatCardSmall";
import { Download, Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import CustomerForm from "./ItemForm";
import { MODULES } from "@/lib/types/enums";
import ItemForm from "./ItemForm";

export default function ItemHeader({
  data,
  loading,
}: {
  data?: any;
  loading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Items</h2>
          <p className="text-muted-foreground">
            Manage inventory items and products{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download />
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> Add Item
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomerStatCardSmall
          title="Total Items"
          value={<span className="text-2xl font-bold text-indigo-900">156</span>}
          subtitle={"+8 this month"}
        />
        <CustomerStatCardSmall
          title="In Stock"
          value={<span className="text-2xl font-bold text-indigo-900">142</span>}
          subtitle={"Available"}
        />
        <CustomerStatCardSmall
          title="Low Stock"
          value={<span className="text-2xl font-bold text-indigo-900">12</span>}
          subtitle={"Needs reorder"}
        />
        <CustomerStatCardSmall
          title="Total Value"
          value={<span className="text-2xl font-bold text-indigo-900">₦125K</span>}
          subtitle={"Inventory value"}
        />
      </div>

      <CustomModal
        title="Add New Item"
        module={MODULES.PRODUCTS}
        open={open}
        onOpenChange={setOpen}
      >
        <ItemForm onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
