"use client";

import {
  AdminDashboardHeader,
  AdminStatsGrid,
  RevenueAndProfitTrendChart,
  EntityPerformanceChart,
  ConsolidationStatusChart,
  FXImpactSummaryCard,
  QuickActionsCard,
} from "@/components/features/admin/dashboard";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AdminDashboardHeader />
      <AdminStatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueAndProfitTrendChart />
        <EntityPerformanceChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ConsolidationStatusChart />
        {/* <div className="flex flex-col gap-4"> */}
          <FXImpactSummaryCard />
          <QuickActionsCard />
        {/* </div> */}
      </div>
    </div>
  );
}
