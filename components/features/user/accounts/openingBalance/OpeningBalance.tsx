"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import ChartOfAccountsHeader from "./OpeningBalanceHeader";
import OpeningBalanceForm from "./OpeningBalanceForm";

export default function OpeningBalance() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <ChartOfAccountsHeader data={data} loading={isLoading} />

      <OpeningBalanceForm />
    </div>
  );
}
