"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import InvoiceStatCardSmall from "./InvoiceStatCardSmall";
import { FileText, Send, Clock, CheckCircle, Download } from "lucide-react";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import InvoiceForm from "./InvoiceForm";
import { MODULES } from "@/lib/types/enums";
import { InvoiceStats } from "./utils/types";

export default function InvoicesHeader({
  stats,
  loading,
}: {
  stats?: InvoiceStats;
  loading: boolean;
}) {
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
            <Download />
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Invoice
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* <InvoiceStatCardSmall
          title="Pending"
          value={<span className="text-3xl">8 invoices</span>}
          subtitle="$42,500"
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
        /> */}
        <InvoiceStatCardSmall
          title="Draft"
          value={
            <span className="text-3xl">{stats?.draft?.count} invoices</span>
          }
          subtitle={`$${stats?.draft?.total.toLocaleString()}`}
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
          loading={loading}
        />
        <InvoiceStatCardSmall
          title="Sent"
          value={
            <span className="text-3xl">{stats?.sent?.count} invoices</span>
          }
          subtitle={`$${stats?.sent?.total.toLocaleString()}`}
          icon={<Send className="h-5 w-5 text-muted-foreground" />}
          loading={loading}
        />
        <InvoiceStatCardSmall
          title="Overdue"
          value={
            <span className="text-3xl">{stats?.overdue?.count} invoices</span>
          }
          subtitle={`$${stats?.overdue?.total.toLocaleString()}`}
          icon={<Clock className="h-5 w-5 text-red-400" />}
          loading={loading}
        />
        <InvoiceStatCardSmall
          title="Paid"
          value={
            <span className="text-3xl">{stats?.paid?.count} invoices</span>
          }
          subtitle={`$${stats?.paid?.total.toLocaleString()}`}
          icon={<CheckCircle className="h-5 w-5 text-green-400" />}
          loading={loading}
        />
      </div>

      <CustomModal
        title="Create New Invoice"
        description="Create a new invoice with line items, payment terms, and
                customer details"
        open={open}
        onOpenChange={setOpen}
        module={MODULES.SALES}
      >
        <InvoiceForm onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
