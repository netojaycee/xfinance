"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import CollectionsForm from "./CollectionsForm";
import CollectionsStatCardSmall from "./CollectionsStatCardSmall";
import CollectionCardGrid from "./CollectionsGrid";

export default function CollectionsHeader({
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
          <h2 className="text-2xl font-bold text-indigo-900">Collections</h2>
          <p className="text-muted-foreground">
            Organize items into collections{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download />
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Collection
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CollectionsStatCardSmall
          title="Total Collections"
          value={<span>12</span>}
          subtitle={<span>4 active</span>}
        />
        <CollectionsStatCardSmall
          title="Total Items"
          value={<span>156</span>}
          subtitle={<span>Across collections</span>}
        />
        <CollectionsStatCardSmall
          title="Total Value"
          value={<span className="text-blue-800">$245K</span>}
          subtitle={<span>Collection value</span>}
        />
        <CollectionsStatCardSmall
          title="Most Popular"
          value={<span className="text-blue-800 font-bold">Best Sellers</span>}
          subtitle={<span>24 items</span>}
        />
      </div>
      {/* Collection card grid below */}
      <CollectionCardGrid />

      <CustomModal
        title="Add New Collection"
        module={MODULES.PRODUCTS}
        open={open}
        onOpenChange={setOpen}
      >
        <CollectionsForm onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
