"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

import { useCustomers } from "@/lib/api/hooks/useSales";
import { leaveManagementColumns } from "./LeaveManagementColumn";
import LeaveManagementHeader from "./LeaveManagementHeader";

export default function LeaveManagement() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <LeaveManagementHeader data={data} loading={isLoading} />
      <CustomTable
        searchPlaceholder="Search employees..."
        tableTitle="Leave Requests"
        columns={leaveManagementColumns}
        data={customers as any}
        pageSize={10}
        loading={isLoading}
      />
    </div>
  );
}
