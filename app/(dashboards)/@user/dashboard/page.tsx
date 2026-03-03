"use client";

import React, { useState } from "react";
import {
  AccountsReceivableAging,
  CashFlow,
  DashboardHeader,
  RecentTransactions,
  RevenueExpensesChart,
  StatsGrid,
  TopExpenses,
} from "@/components/features/user/dashboard";
import { useDashboardData } from "@/lib/api/hooks/useAnalytics";
import { useSessionStore } from "@/lib/store/session";
import { FilterOption } from "@/lib/api/services/analyticsService";
import { Loader2 } from "lucide-react";

export default function UserDashboard() {
  const { entity } = useSessionStore();
  const [filters, setFilters] = useState({
    monthlyFilter: "THIS_YEAR" as FilterOption,
    cashFlowFilter: "LAST_12_MONTHS" as FilterOption,
    expensesFilter: "THIS_YEAR" as FilterOption,
  });

  const { data, isLoading, error } = useDashboardData(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Failed to load dashboard</p>
          <p className="text-gray-600">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <DashboardHeader entity={entity} filters={filters} onFiltersChange={setFilters} />

      <StatsGrid data={data?.kpis} loading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueExpensesChart
          data={data?.monthlyBreakdown}
          filter={filters.monthlyFilter}
          onFilterChange={(filter) => setFilters((prev) => ({ ...prev, monthlyFilter: filter }))}
          loading={isLoading}
        />
        <CashFlow
          data={data?.cashFlow}
          filter={filters.cashFlowFilter}
          onFilterChange={(filter) => setFilters((prev) => ({ ...prev, cashFlowFilter: filter }))}
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
        <TopExpenses
          data={data?.topExpenses}
          filter={filters.expensesFilter}
          onFilterChange={(filter) => setFilters((prev) => ({ ...prev, expensesFilter: filter }))}
          loading={isLoading}
        />
        <RecentTransactions data={data?.recentTransactions} loading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AccountsReceivableAging data={data?.receivableAging} loading={isLoading} />
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounts Payable Aging</h3>
          {data?.payableAging && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">0-30 Days</span>
                <span className="font-semibold text-gray-900">₦{(data.payableAging["0-30"] / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">31-60 Days</span>
                <span className="font-semibold text-gray-900">₦{(data.payableAging["31-60"] / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">61-90 Days</span>
                <span className="font-semibold text-gray-900">₦{(data.payableAging["61-90"] / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">90+ Days</span>
                <span className="font-semibold text-gray-900">₦{(data.payableAging["90+"] / 100).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}