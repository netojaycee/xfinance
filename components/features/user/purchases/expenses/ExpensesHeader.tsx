"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import ExpensesForm from "./ExpensesForm";
import { MODULES } from "@/lib/types/enums";

export default function ExpensesHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Expenses</h2>
          <p className="text-muted-foreground">
            Track and manage business expenses{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Expense
          </Button>
        </div>
      </div>

      <CustomModal
        title="New Expense"
        description="Add details about the expense to create a new entry"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.PURCHASES}
      >
        <ExpensesForm  />
      </CustomModal>
    </div>
  );
}
