"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import SalesReceiptStatCardSmall from "./SalesReceiptStatCardSmall";
import {
  FileText,
  Send,
  Clock,
  CheckCircle,
  DollarSign,
  Calendar,
  Edit3,
} from "lucide-react";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import SalesReceiptsForm from "./SalesReceiptsForm";
import { MODULES } from "@/lib/types/enums";

export default function SalesReceiptHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Sales Receipts</h2>
          <p className="text-muted-foreground">
            Manage non-invoiced sales and cash transactions{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Receipt
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SalesReceiptStatCardSmall
          title="Total Sales"
          value={<span className="text-2xl">₦269.7k</span>}
          icon={
            <DollarSign className="h-6 w-6 text-emerald-600 bg-emerald-100 rounded-xl p-1" />
          }
        />
        <SalesReceiptStatCardSmall
          title="Today's Sales"
          value={<span className="text-2xl">₦73.5k</span>}
          icon={
            <Calendar className="h-6 w-6 text-indigo-600 bg-indigo-100 rounded-xl p-1" />
          }
        />
        <SalesReceiptStatCardSmall
          title="Total Receipts"
          value={<span className="text-2xl">6</span>}
          icon={
            <FileText className="h-6 w-6 text-fuchsia-600 bg-fuchsia-100 rounded-xl p-1" />
          }
        />
        <SalesReceiptStatCardSmall
          title="Avg Receipt Value"
          value={<span className="text-2xl">₦45k</span>}
          icon={
            <Edit3 className="h-6 w-6 text-amber-500 bg-amber-100 rounded-xl p-1" />
          }
        />
      </div>

      <CustomModal
        title="New Sales Receipt"
        description="Create a new sales receipt for non-invoiced sales"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.SALES}
      >
        <SalesReceiptsForm />
      </CustomModal>
    </div>
  );
}
