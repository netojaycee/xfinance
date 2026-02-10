"use client";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useInventory, useLowStockItems } from "@/lib/api/hooks/useProducts";
import InventoryHeader from "./InventoryHeader";
import { CustomTable } from "@/components/local/custom/custom-table";
import { inventoryColumns, inventoryData } from "./InventoryColumn";

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useInventory({
    search: debouncedSearchTerm,
  });

  console.log("Fetched inventory:", data); // Debug log to check fetched data


  const inventory = (data as any)?.movements || inventoryData;

  return (
    <div className="space-y-4">
      <InventoryHeader
        data={data}
        loading={isLoading}
      />
      <CustomTable
        onSearchChange={setSearchTerm}
        statusOptions={["All Status", "normal", "low_stock", "critical"]}
        onStatusChange={setStatusFilter}
        searchPlaceholder="Search stock..."
        tableTitle="Stock Levels"
        columns={inventoryColumns}
        data={inventory}
        pageSize={10}
        loading={isLoading}
        display={{
          statusComponent: true,
          searchComponent: true,
        }}
      />
    </div>
  );
}
