"use client";

import { Button } from "@/components/ui/button";
import PayrollRecordsStatCardSmall from "./PayrollRecordsStatCardSmall";
import { DollarSign, Users, TrendingUp, CalendarDays } from "lucide-react";
import React from "react";

export default function PayrollRecordsHeader({
  data,
  loading,
}: {
  data?: any;
  loading: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PayrollRecordsStatCardSmall
          title={
            <span className="flex items-center gap-2 justify-between">
              Total Payroll (Month){" "}
              <DollarSign className="w-4 h-4 text-gray-400" />
            </span>
          }
          value={
            <span className="text-3xl font-bold text-[#2d3a7b]">
              ${data?.totalPayroll ?? "0"}
            </span>
          }
          subtitle={
            <span className="text-green-600">
              {data?.payrollChange ?? "+0% vs last month"}
            </span>
          }
          loading={loading}
        />
        <PayrollRecordsStatCardSmall
          title={
            <span className="flex items-center gap-2 justify-between">
              Employees <Users className="w-4 h-4 text-gray-400" />
            </span>
          }
          value={
            <span className="text-3xl font-bold text-[#2d3a7b]">
              {data?.employees ?? 0}
            </span>
          }
          subtitle={<span className="text-gray-400">Active payroll</span>}
          loading={loading}
        />
        <PayrollRecordsStatCardSmall
          title={
            <span className="flex items-center gap-2 justify-between">
              Avg Salary <TrendingUp className="w-4 h-4 text-gray-400" />
            </span>
          }
          value={
            <span className="text-3xl font-bold text-[#2d3a7b]">
              ${data?.avgSalary ?? "0"}
            </span>
          }
          subtitle={<span className="text-gray-400">Per employee</span>}
          loading={loading}
        />
        <PayrollRecordsStatCardSmall
          title={
            <span className="flex items-center gap-2 justify-between">
              Next Pay Date <CalendarDays className="w-4 h-4 text-gray-400" />
            </span>
          }
          value={
            <span className="text-3xl font-bold text-[#2d3a7b]">
              {data?.nextPayDate ?? "-"}
            </span>
          }
          subtitle={
            <span className="text-gray-400">
              {data?.daysLeft ?? "-"} days left
            </span>
          }
          loading={loading}
        />
      </div>
    </div>
  );
}
