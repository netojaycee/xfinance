"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import EmployeesStatCardSmall from "./EmployeesStatCardSmall";
import { Download, Plus } from "lucide-react";
import { CustomModal } from "@/components/local/custom/modal";
import EmployeeForm from "./EmployeeForm";
import { MODULES } from "@/lib/types/enums";

export default function EmployeesHeader({
  data,
  loading,
}: {
  data?: any;
  loading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">Employees</h2>
          <p className="text-muted-foreground">
            Manage employee information and records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            <Download />
            Export
          </Button>
          <Button onClick={() => setOpen(true)} className="rounded-xl">
            <Plus /> New Employee
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <EmployeesStatCardSmall
          title="Total Employees"
          value={<span className="text-3xl">{data?.total || 0}</span>}
          subtitle="Total in system"
          loading={loading}
        />
        <EmployeesStatCardSmall
          title="Active"
          value={<span className="text-3xl">{data?.active || 0}</span>}
          subtitle="Currently working"
          loading={loading}
        />
        <EmployeesStatCardSmall
          title="On Leave"
          value={<span className="text-3xl">{data?.onLeave || 0}</span>}
          subtitle="Today"
          loading={loading}
        />
        <EmployeesStatCardSmall
          title="New Hires (Month)"
          value={<span className="text-3xl">{data?.newHires || 0}</span>}
          subtitle="Onboarding"
          loading={loading}
        />
      </div>

      <CustomModal
        title="Add New Employee"
        description="Create a new employee record with complete details"
        module={MODULES.HR_PAYROLL}
        open={open}
        onOpenChange={setOpen}
      >
        <EmployeeForm onSuccess={() => setOpen(false)} />
      </CustomModal>
    </div>
  );
}
