"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import PaymentReceivedStatCardSmall from "./PaymentReceivedStatCardSmall";
import { FileText, Send, Clock, CheckCircle } from "lucide-react";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import Invoice from "./PaymentReceivedForm";

export default function PaymentReceivedHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">
            Payment Received
          </h2>
          <p className="text-muted-foreground">
            Track and manage invoice payments{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> Record Paymnent
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3  gap-4">
        <PaymentReceivedStatCardSmall
          title="Total Paid"
          value={<span className="text-xl">₦1.4M</span>}
          subtitle="6 paid invoices"
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
        />
        <PaymentReceivedStatCardSmall
          title="This Month Paid"
          value={<span className="text-xl">₦0</span>}
          subtitle="Payments received this month"
          icon={<Send className="h-5 w-5 text-muted-foreground" />}
        />
        <PaymentReceivedStatCardSmall
          title="Partial Payments"
          value={<span className="text-xxl">0</span>}
          subtitle="Invoices partially paid"
          icon={<Clock className="h-5 w-5 text-red-400" />}
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
