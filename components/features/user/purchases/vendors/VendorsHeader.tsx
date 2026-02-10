"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, Calendar, Edit3, Download } from "lucide-react";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import VendorsForm from "./VendorsForm";
import { MODULES } from "@/lib/types/enums";
import { VendorsResponse } from "./types";

interface VendorsHeaderProps {
  loading?: boolean;
  data?: VendorsResponse;
}

export default function VendorsHeader({ loading = false, data }: VendorsHeaderProps) {
  const [open, setOpen] = React.useState(false);
  const totalVendors = data?.totalCount || 0;

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Vendors</h2>
          <p className="text-muted-foreground">
            Manage vendor information and payables ({totalVendors} vendors)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download />
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Vendor
          </Button>
        </div>
      </div>

      <CustomModal
        title="Add New Vendor"
        description="Create a new vendor profile with contact information and payment details"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.PURCHASES}
      >
        <VendorsForm  onSuccess={() => setOpen(false)} />{" "}
      </CustomModal>
    </div>
  );
}
