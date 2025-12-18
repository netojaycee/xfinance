"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import InvoiceStatCardSmall from "./InvoiceStatCardSmall";
import { FileText, Send, Clock, CheckCircle } from "lucide-react";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import Invoice from "./InvoiceForm";

export default function InvoicesHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Invoices</h2>
          <p className="text-muted-foreground">
            Create, manage, and track customer invoices{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Invoice
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InvoiceStatCardSmall
          title="Draft"
          value={<span className="text-3xl">8 invoices</span>}
          subtitle="$42,500"
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
        />
        <InvoiceStatCardSmall
          title="Sent"
          value={<span className="text-3xl">15 invoices</span>}
          subtitle="$128,400"
          icon={<Send className="h-5 w-5 text-muted-foreground" />}
        />
        <InvoiceStatCardSmall
          title="Overdue"
          value={<span className="text-3xl">3 invoices</span>}
          subtitle="$18,200"
          icon={<Clock className="h-5 w-5 text-red-400" />}
        />
        <InvoiceStatCardSmall
          title="Paid"
          value={<span className="text-3xl">47 invoices</span>}
          subtitle="$524,800"
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
        />
      </div>

      <CustomModal
        title="Create New Invoice"
        description="Create a new invoice with line items, payment terms, and
                customer details"
        open={open}
        onOpenChange={setOpen}
      >
        <Invoice />
      </CustomModal>
    </div>
  );
}
