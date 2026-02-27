"use client";
import React from "react";
import { useAccounts } from "@/lib/api/hooks/useAccounts";
import { useDebounce } from "use-debounce";
import OpeningBalanceHeader from "./OpeningBalanceHeader";
import OpeningBalanceForm from "./OpeningBalanceForm";

export default function OpeningBalance() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: accountsResponse, isLoading: loading } = useAccounts({
    search: debouncedSearchTerm,
  });

  const accountsData = (accountsResponse as any)?.data || [];

  console.log("Accounts Data:", accountsData);

  return (
    <div className="space-y-4">
      <OpeningBalanceHeader loading={loading} />

      <OpeningBalanceForm accounts={accountsData} />
    </div>
  );
}
