"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { SalesReceiptColumns, salesReceipts } from "./SalesReceiptColumns";
import SalesReceiptHeader from "./SalesReceiptHeader";
export default function SalesReceipts() {
  return (
    <div className="space-y-4">
      <SalesReceiptHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable
        searchPlaceholder="Search receipts or customers..."
        tableTitle="Receipts List"
        columns={SalesReceiptColumns}
        data={salesReceipts}
        pageSize={10}
        statusOptions={["All Statuses", "Completed", "Void"]}
        methodsOptions={[
          "All Methods",
          "Bank Transfer",
          "Credit Card",
          "Cash",
          "Check",
        ]}
        display={{
          statusComponent: true,
          filterComponent: false,
          searchComponent: true,
          methodsComponent: true,
        }}
      />
    </div>
  );
}
