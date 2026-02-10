"use client";
import { useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useItems } from "@/lib/api/hooks/useProducts";
import { CustomTable } from "@/components/local/custom/custom-table";
import { itemColumns, itemsData } from "./ItemColumn";
import ItemHeader from "./ItemHeader";

export default function Item() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useItems({
    page: currentPage,
    limit: rowsPerPage,
    category: categoryFilter,
    search: debouncedSearchTerm,
  });

  const items = (data as any)?.items || [];
  // const totalCount = data?.total || 0;
  // const totalInStock = data?.totalInStock || 0;
  // const totalOutOfStock = data?.totalOutOfStock || 0;

  console.log("Fetched items:", data); // Debug log to check fetched data

  return (
    <div className="space-y-4">
      <ItemHeader data={data as any} loading={isLoading} />
      <CustomTable
        onSearchChange={setSearchTerm}
        statusOptions={[
          "All Categories",
          "Electronics",
          "Office Supplies",
          "Furniture",
          "Hardware",
          "Software",
        ]}
        onStatusChange={setCategoryFilter}
        searchPlaceholder="Search items..."
        tableTitle="Inventory Items"
        columns={itemColumns}
        data={items}
        pageSize={rowsPerPage}
        loading={isLoading}
        display={{
          statusComponent: true,
          searchComponent: true,
        }}
      />
    </div>
  );
}
