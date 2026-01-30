"use client";
import EmployeesHeader from "./EmployeesHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { employeesColumns } from "./EmployeesColumn";

export default function Employees() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <EmployeesHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search employees..."
        tableTitle="Employee Directory"
        columns={employeesColumns}
        data={customers as any}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
