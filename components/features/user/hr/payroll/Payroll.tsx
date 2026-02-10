"use client";
import React from "react";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useEmployees } from "@/lib/api/hooks/useHR";
import { payrollBadgesColumns } from "./PayrollBadgesColumn";
import { CustomTabs } from "@/components/local/custom/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PayrollBadges from "./PayrollBadges";
import PayrollRecords from "./PayrollRecords";
import ProcessPayrollForm from "./ProcessPayrollForm";
import { useDebounce } from "use-debounce";

export default function Payroll() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: employeesResponse, isLoading } = useEmployees({
    search: debouncedSearchTerm,
  });

  const employees = (employeesResponse as any)?.employees || [];
  const stats = (employeesResponse as any)?.stats;

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Payroll</h2>
          <p className="text-muted-foreground">
            Manage employee salaries and payroll{" "}
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
        storageKey="payroll-tab"
        tabs={[
          {
            title: "Process Payroll",
            value: "process",
            content: <ProcessPayrollForm />
          },
          {
            title: "Payroll Batches",
            value: "batches",
            content: <PayrollBadges />,
          },
          {
            title: "Payroll Records",
            value: "records",
            content: <PayrollRecords />,
          },
        ]}
      />
    </div>
  );
}
