"use client";
import InvoicesHeader from "./InvoicesHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { InvoiceColumns } from "./InvoiceColumns";
import { AccountsReceivableAgingChart } from "./AccountsReceivableAgingChart";
import { MonthlyInvoiceRevenue } from "./MonthlyInvoiceRevenue";
import { useInvoices } from "@/lib/api/hooks/useSales";

export default function Invoices() {
  const { data, isLoading } = useInvoices();
  const invoices = data?.invoices || [];

  return (
    <div className="space-y-4">
      <InvoicesHeader loading={isLoading} stats={data?.stats} />
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
        loading={isLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AccountsReceivableAgingChart />
        <MonthlyInvoiceRevenue />
      </div>
    </div>
  );
}
