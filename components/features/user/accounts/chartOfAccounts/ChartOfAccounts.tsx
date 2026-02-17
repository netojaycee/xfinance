"use client";
import React from "react";
import { CustomTable } from "@/components/local/custom/custom-table";
import { useAccounts } from "@/lib/api/hooks/useAccounts";
import { chartOfAccountsColumns } from "./ChartOfAccountsColumn";
import ChartOfAccountsHeader from "./ChartOfAccountsHeader";
import { useDebounce } from "use-debounce";

export default function ChartOfAccounts() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: accountsResponse, isLoading: loading } = useAccounts({
    search: debouncedSearchTerm,
  });

  console.log("Fetched accounts:", accountsResponse); // Debug log to check fetched data

  const accountsData = (accountsResponse as any) || [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-4">
      <ChartOfAccountsHeader loading={loading} />
      <CustomTable
        searchPlaceholder="Search accounts..."
        tableTitle="Chart of Accounts"
        columns={chartOfAccountsColumns}
        data={accountsData}
        pageSize={10}
        loading={loading}
        onSearchChange={handleSearchChange}
        display={{ searchComponent: true }}
      />
    </div>
  );
}
