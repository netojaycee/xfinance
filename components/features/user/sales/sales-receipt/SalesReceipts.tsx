"use client";
import { CustomTable } from "@/components/local/custom/custom-table";
import { useState } from "react";
import { useReceipts } from "@/lib/api/hooks/useSales";
import { useDebounce } from "use-debounce";
import { SalesReceiptColumns } from "./SalesReceiptColumns";
import SalesReceiptHeader from "./SalesReceiptHeader";

export default function SalesReceipts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [methodFilter, setMethodFilter] = useState("All Methods");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useReceipts({
    search: debouncedSearchTerm,
    page: currentPage,
    limit: rowsPerPage,
    status: statusFilter === "All Statuses" ? undefined : statusFilter,
    paymentMethod: methodFilter === "All Methods" ? undefined : methodFilter,
  });
  const receipts = data?.receipts || [];

  // console.log("Fetched receipts:", data); // Debug log to check fetched data

  return (
    <div className="space-y-4">
      <SalesReceiptHeader loading={isLoading} stats={(data as any)?.stats} />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable
        searchPlaceholder="Search receipts or customers..."
        tableTitle="Receipts List"
        columns={SalesReceiptColumns}
        data={receipts}
        pageSize={10}
        statusOptions={["All Statuses", "Completed", "Void"]}
        methodsOptions={[
          "All Methods",
          "Cash",
          "Card",
          "Bank_Transfer",
          "Mobile_Money",
          "Check",
          "Debit_Card",
          "Credit_Card",
          "ACH",
          "Wire_Transfer",
        ]}
        display={{
          statusComponent: true,
          filterComponent: false,
          searchComponent: true,
          methodsComponent: true,
        }}
        onStatusChange={setStatusFilter}
        onSearchChange={setSearchTerm}
        onMethodsChange={setMethodFilter}
      />
    </div>
  );
}
