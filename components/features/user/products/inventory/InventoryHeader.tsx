"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CustomerStatCardSmall from "./InventoryStatCardSmall";
import { Download, Info, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import InventoryForm from "./InventoryForm";
import InventoryStatCardSmall from "./InventoryStatCardSmall";

export default function InventoryHeader({
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
          <h2 className="text-2xl font-bold text-indigo-900">Inventory</h2>
          <p className="text-muted-foreground">
            Track stock levels and reorder points{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download />
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> Adjust Stock
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InventoryStatCardSmall
          title="Total Stock Value"
          value={`$${125}K`}
          subtitle={`+${`$${5000}K`} this month`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <InventoryStatCardSmall
          title="Low Stock Items"
          value={12}
          subtitle="Below reorder point"
          icon={<Info className="w-5 h-5" />}
        />
        <InventoryStatCardSmall
          title="Out of Stock"
          value={3}
          subtitle="Needs immediate restock"
          icon={<TrendingDown className="w-5 h-5" />}
        />
        <InventoryStatCardSmall
          title="Stock Movement"
          value={1245}
          subtitle={"Units this month"}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      <CustomModal
        title="Adjust Stock"
        module={MODULES.PRODUCTS}
        open={open}
        onOpenChange={setOpen}
      >
        <InventoryForm />
      </CustomModal>
    </div>
  );
}
