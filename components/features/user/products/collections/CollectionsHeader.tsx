"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import CollectionsForm from "./CollectionsForm";
import CollectionsStatCardSmall from "./CollectionsStatCardSmall";
import { CollectionsResponse } from "@/lib/api/hooks/types/productsTypes";

export default function CollectionsHeader({
  data,
  loading,
  onSearch,
  searchValue,
}: {
  data?: CollectionsResponse;
  loading: boolean;
  onSearch?: (value: string) => void;
  searchValue?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const totalCount = data?.total || 0;

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Collections</h2>
          <p className="text-muted-foreground">
            Organize items into collections ({totalCount} collections)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl" disabled>
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
          value={<span>{totalCount}</span>}
          subtitle={<span>{data?.collections.filter(c => c.featured).length || 0} featured</span>}
        />
        <CollectionsStatCardSmall
          title="Active Collections"
          value={<span>{data?.collections.filter(c => c.visibility).length || 0}</span>}
          subtitle={<span>Visible collections</span>}
        />
        <CollectionsStatCardSmall
          title="Hidden Collections"
          value={<span>{data?.collections.filter(c => !c.visibility).length || 0}</span>}
          subtitle={<span>Not visible</span>}
        />
        <CollectionsStatCardSmall
          title="Featured"
          value={<span>{data?.collections.filter(c => c.featured).length || 0}</span>}
          subtitle={<span>Featured collections</span>}
        />
      </div>

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
