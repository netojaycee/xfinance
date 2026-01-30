"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { chartOfAccountsColumns } from "./ChartOfAccountsColumn";
import ChartOfAccountsHeader from "./ChartOfAccountsHeader";

export default function ChartOfAccounts() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <ChartOfAccountsHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search accounts..."
        tableTitle="Chart of Accounts"
        columns={chartOfAccountsColumns}
        data={customers}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
