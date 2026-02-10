"use client";

import React from "react";
import { useJournal } from "@/lib/api/hooks/useAccounts";
import ManualJournalHeader from "./ManualJournalHeader";
import ManualJournalForm from "./ManualJournalForm";
import { CustomTable } from "@/components/local/custom/custom-table";
import { manualJournalColumns } from "./ManualJournalColumn";
import { useDebounce } from "use-debounce";

export default function ManualJournal() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: journalResponse, isLoading: loading } = useJournal({
    search: debouncedSearchTerm,
  });

  const journalData = (journalResponse as any)?.data || [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-4">
      <ManualJournalHeader loading={loading} />

      <ManualJournalForm />

      <CustomTable
        searchPlaceholder="Search journal entries..."
        tableTitle="Recent Journal Entries"
        columns={manualJournalColumns}
        data={journalData as any}
        pageSize={10}
        loading={loading}
        onSearchChange={handleSearchChange}
        display={{ searchComponent: true }}
      />
    </div>
  );
}
