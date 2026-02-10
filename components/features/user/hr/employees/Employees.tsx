"use client";
import React from "react";
import EmployeesHeader from "./EmployeesHeader";
import { CustomTable } from "@/components/local/custom/custom-table";
import { useEmployees } from "@/lib/api/hooks/useHR";
import { employeesColumns } from "./EmployeesColumn";
import { useDebounce } from "use-debounce";

export default function Employees() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: employeesResponse, isLoading: loading } = useEmployees({
    search: debouncedSearchTerm,
  });

  const employees = (employeesResponse as any)?.employees || [];
  const stats = (employeesResponse as any)?.stats || {
    totalEmployees: 0,
    totalActive: 0,
    totalOnLeave: 0,
    totalHiredThisMonth: 0,
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-4">
      <EmployeesHeader stats={stats} loading={loading} />
      <CustomTable
        searchPlaceholder="Search employees..."
        tableTitle="Employee Directory"
        columns={employeesColumns}
        data={employees as any}
        pageSize={10}
        loading={loading}
        onSearchChange={handleSearchChange}
        display={{ searchComponent: true }}
      />
    </div>
  );
}
