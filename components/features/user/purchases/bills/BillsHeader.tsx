"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import BillsForm from "./BillsForm";

export default function BillsHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Bills</h2>
          <p className="text-muted-foreground">
            Manage vendor bills and accounts payable
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Bill
          </Button>
        </div>
      </div>

      <CustomModal
        title="New Bill"
        description="Create a new bill for your vendor"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.PURCHASES}
      >
        <BillsForm />
      </CustomModal>
    </div>
  );
}
