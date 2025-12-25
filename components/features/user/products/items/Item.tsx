"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { itemColumns, itemsData } from "./ItemColumn";
import ItemHeader from "./ItemHeader";

export default function Item() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
    <ItemHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search items..."
        tableTitle="Inventory Items"
        columns={itemColumns}
        data={itemsData}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
