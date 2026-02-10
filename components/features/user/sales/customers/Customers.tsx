"use client";
import CustomersHeader from "./CustomersHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { customerColumns } from "./CustomersColumn";

export default function Customers() {
  const { data, isLoading } = useCustomers();
  const customers = (data as any)?.customers || [];

  console.log("Fetched customers:", data); // Debug log to check fetched data
  return (
    <div className="space-y-4">
      <CustomersHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search customers..."
        tableTitle="All Customers"
        columns={customerColumns}
        data={customers}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
