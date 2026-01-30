"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import PayrollBadgesHeader from "./PayrollBadgesHeader";
import { payrollBadgesColumns } from "./PayrollBadgesColumn";

export default function PayrollBadges() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <PayrollBadgesHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search employees..."
        tableTitle="Payroll Batches"
        columns={payrollBadgesColumns}
        data={customers as any}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
