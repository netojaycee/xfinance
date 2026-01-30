"use client";

import { useCustomers } from "@/lib/api/hooks/useSales";
import ManualJournalHeader from "./ManualJournalHeader";
import ManualJournalForm from "./ManualJournalForm";
import { CustomTable } from "@/components/local/custom/custom-table";
import { manualJournalColumns } from "./ManualJournalColumn";

export default function ManualJournal() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <ManualJournalHeader data={data} loading={isLoading} />

      <ManualJournalForm />

      <CustomTable
        searchPlaceholder="Search journal entries..."
        tableTitle="Recent Journal Entries"
        columns={manualJournalColumns}
        data={customers as any}
        pageSize={10}
        loading={isLoading}
        display={{ filterComponent: true }}
      />
    </div>
  );
}
