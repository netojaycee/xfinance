"use client";
import { useState } from "react";
import { CustomTable } from "@/components/local/custom/custom-table";
import VendorsHeader from "./VendorsHeader";
import { vendorColumns } from "./VendorColumns";
import { useVendors } from "@/lib/api/hooks/usePurchases";
import { useDebounce } from "use-debounce";

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useVendors({
    search: debouncedSearchTerm,
    page: currentPage,
    limit: rowsPerPage,
    type: typeFilter === "All Types" ? undefined : typeFilter,
  });

  const vendors = (data as any)?.vendors || [];
  const totalVendors = (data as any)?.totalCount || 0;

  return (
    <div className="space-y-4">
      <VendorsHeader loading={isLoading} data={data as any} />
      <CustomTable
        searchPlaceholder="Search vendors..."
        tableTitle="All Vendors"
        columns={vendorColumns as any}
        data={vendors}
        pageSize={rowsPerPage}
        onSearchChange={setSearchTerm}
        statusOptions={["All Types", "supplier", "manufacturer", "consultant"]}
        onStatusChange={setTypeFilter}
        display={{
          statusComponent: true,
          filterComponent: true,
          searchComponent: true,
          methodsComponent: false,
        }}
        loading={isLoading}
      />
    </div>
  );
}
