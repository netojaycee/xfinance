"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import PayrollRecordsHeader from "./PayrollRecordsHeader";
import { payrollRecordsColumns } from "./PayrollRecordsColumn";

export default function PayrollRecords() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <PayrollRecordsHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search employees..."
        tableTitle="Payroll Records"
        columns={payrollRecordsColumns}
        data={customers as any}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
