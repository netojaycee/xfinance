"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCcw } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import { MODULES } from "@/lib/types/enums";
import BankingStatCardSmall from "./BankingStatCardSmall";

export default function BankingHeader({
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
          <h2 className="text-2xl font-bold text-indigo-900">Banking</h2>
          <p className="text-muted-foreground">
            Bank accounts, transactions, and reconciliation{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <RefreshCcw />
            Sync Banks
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> Connect Bank
          </Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BankingStatCardSmall
          title="Total Cash"
          value={
            <span className="text-3xl font-bold text-blue-800">₦680,750</span>
          }
          subtitle={<span>Across 3 accounts</span>}
          loading={false}
        />
        <BankingStatCardSmall
          title="Unreconciled Items"
          value={<span className="text-3xl font-bold text-blue-800">12</span>}
          subtitle={<span className="text-yellow-700">Needs attention</span>}
          loading={false}
        />
        <BankingStatCardSmall
          title="Pending Transactions"
          value={<span className="text-3xl font-bold text-blue-800">3</span>}
          subtitle={<span>Awaiting clearance</span>}
          loading={false}
        />
      </div>
      {/* <CustomModal
        title="Add New Asset"
        module={MODULES.BANKING}
        open={open}
        onOpenChange={setOpen}
      >
        <BankingForm onSuccess={() => setOpen(false)} />
      </CustomModal> */}
    </div>
  );
}
