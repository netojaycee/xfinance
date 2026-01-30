"use client";
import AttendanceHeader from "./PayrollBadgesHeader";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { payrollBadgesColumns } from "./PayrollBadgesColumn";
import { CustomTabs } from "@/components/local/custom/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PayrollBadges from "./PayrollBadges";
import PayrollRecords from "./PayrollRecords";
import ProcessPayrollForm from "./ProcessPayrollForm";

export default function Payroll() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
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
