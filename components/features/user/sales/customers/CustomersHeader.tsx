"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CustomerStatCardSmall from "./CustomerStatCardSmall";
import { Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import CustomerForm from "./CustomerForm";
import { MODULES } from "@/lib/types/enums";

export default function CustomersHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Customers</h2>
          <p className="text-muted-foreground">
            Manage customer information and relationships
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Customer
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomerStatCardSmall
          title="Total Customers"
          value={<span className="text-3xl">3</span>}
          subtitle="Total in system"
        />
        <CustomerStatCardSmall
          title="Active Customers"
          value={<span className="text-3xl">3</span>}
          subtitle="100% of total"
        />
        <CustomerStatCardSmall
          title="Outstanding Receivables"
          value={<span className="text-3xl">₦135,500</span>}
          subtitle="Total receivables"
        />
        <CustomerStatCardSmall
          title="Avg. Balance"
          value={<span className="text-3xl">₦45,167</span>}
          subtitle="Average per customer"
        />
      </div>

      <CustomModal
        title="Add New Customer"
        module={MODULES.SALES}
        open={open}
        onOpenChange={setOpen}
      >
        <CustomerForm />
      </CustomModal>
    </div>
  );
}
