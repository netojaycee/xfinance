"use client";
import AttendanceHeader from "./AttendanceHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { attendanceColumns } from "./AttendanceColumn";
import { CustomTabs } from "@/components/local/custom/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import AttendanceForm from "./AttendanceForm";

export default function Attendance() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
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
                <AttendanceHeader data={data} loading={isLoading} />
                <CustomTable
                  searchPlaceholder="Search employees..."
                  tableTitle="Today's Attendance"
                  columns={attendanceColumns}
                  data={customers as any}
                  pageSize={10}
                  loading={isLoading}
                  display={{ filterComponent: true }}
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
                  employees={customers as any}
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
