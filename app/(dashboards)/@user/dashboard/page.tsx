"use client";
import {
  AccountsReceivableAging,
  CashFlow,
  DashboardHeader,
  RecentTransactions,
  RevenueExpensesChart,
  StatsGrid,
  TopExpenses,
} from "@/components/features/user/dashboard";
import { useSessionStore } from "@/lib/store/session";

export default function UserDashboard() {
  const { entity } = useSessionStore();
  return (
    <div className="flex flex-col gap-4 p-4">
      <DashboardHeader entity={entity} />
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueExpensesChart />
        <CashFlow />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
        <TopExpenses />
        <RecentTransactions />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AccountsReceivableAging />
        <AccountsReceivableAging />
      </div>
    </div>
  );
}
