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
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const { data: accountsResponse, isLoading: loading } = useAccounts({
    search: debouncedSearchTerm,
    page,
    limit: pageSize,
  });

  console.log("Fetched accounts:", accountsResponse); // Debug log to check fetched data

  const accountsData = (accountsResponse?.data as any) || [];
  const pagination = accountsResponse?.pagination;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };

  return (
    <div className="space-y-4">
      <ChartOfAccountsHeader loading={loading} />
      <CustomTable
        searchPlaceholder="Search accounts..."
        tableTitle="Chart of Accounts"
        columns={chartOfAccountsColumns}
        data={accountsData}
        pageSize={pageSize}
        loading={loading}
        onSearchChange={handleSearchChange}
        display={{ searchComponent: true }}
        pagination={{
          page,
          totalPages: pagination?.totalPages || 1,
          total: pagination?.total,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
