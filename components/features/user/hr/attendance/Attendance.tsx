"use client";
import React from "react";
import AttendanceHeader from "./AttendanceHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useEmployees } from "@/lib/api/hooks/useHR";
import { attendanceColumns } from "./AttendanceColumn";
import { CustomTabs } from "@/components/local/custom/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import AttendanceForm from "./AttendanceForm";
import { useDebounce } from "use-debounce";

export default function Attendance() {
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
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Attendance</h2>
          <p className="text-muted-foreground">
            Track employee attendance and hours{" "}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download />
            Export
          </Button>
        </div>
      </div>
      <CustomTabs
        storageKey="attendance-tab"
        tabs={[
          {
            title: "Attendance Record",
            value: "record",
            content: (
              <div className="space-y-4">
                <AttendanceHeader stats={stats} loading={isLoading} />
                <CustomTable
                  searchPlaceholder="Search employees..."
                  tableTitle="Today's Attendance"
                  columns={attendanceColumns}
                  data={employees as any}
                  pageSize={10}
                  loading={isLoading}
                  onSearchChange={handleSearchChange}
                  display={{ filterComponent: false, searchComponent: true }}
                />
              </div>
            ),
          },
          {
            title: "Mark Attendance",
            value: "mark",
            content: (
              <>
                <AttendanceForm
                  employees={employees as any}
                  onSubmit={(data) => {
                    // handle attendance form submission here
                    console.log("Attendance submitted:", data);
                  }}
                />{" "}
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
