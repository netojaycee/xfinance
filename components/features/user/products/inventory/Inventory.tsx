"use client";
import CustomersHeader from "./InventoryHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { inventoryColumns, inventoryData } from "./InventoryColumn";

export default function Inventory() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <CustomersHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search stock..."
        tableTitle="Stock Levels"
        columns={inventoryColumns}
        data={inventoryData}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
