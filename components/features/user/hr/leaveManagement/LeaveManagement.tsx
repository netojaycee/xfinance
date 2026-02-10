"use client";
import React from "react";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useEmployees } from "@/lib/api/hooks/useHR";
import { leaveManagementColumns } from "./LeaveManagementColumn";
import LeaveManagementHeader from "./LeaveManagementHeader";
import { useDebounce } from "use-debounce";

export default function LeaveManagement() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: employeesResponse, isLoading } = useEmployees({
    search: debouncedSearchTerm,
  });

  const employees = (employeesResponse as any)?.employees || [];
  const stats = (employeesResponse as any)?.stats;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-4">
      <LeaveManagementHeader stats={stats} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search employees..."
        tableTitle="Leave Requests"
        columns={leaveManagementColumns}
        data={employees as any}
        pageSize={10}
        loading={isLoading}
        onSearchChange={handleSearchChange}
        display={{ searchComponent: true }}
      />
    </div>
  );
}
