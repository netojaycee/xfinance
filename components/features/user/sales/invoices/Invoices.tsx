"use client";
import { Badge } from "@/components/ui/badge";
import InvoicesHeader from "./InvoicesHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { InvoiceColumns, invoices } from "./InvoiceColumns";
import { AccountsReceivableAgingChart } from "./AccountsReceivableAgingChart";
import { MonthlyInvoiceRevenue } from "./MonthlyInvoiceRevenue";

export default function Invoices() {
  return (
    <div className="space-y-4">
      <InvoicesHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable
        searchPlaceholder="Search invoices..."
        tableTitle="All Invoices"
        columns={InvoiceColumns}
        data={invoices}
        pageSize={10}
        statusOptions={["All Statuses", "Draft", "Sent", "Overdue", "Paid"]}
        display={{
          statusComponent: true,
          filterComponent: true,
          searchComponent: true,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AccountsReceivableAgingChart />
        <MonthlyInvoiceRevenue />
      </div>
    </div>
  );
}
