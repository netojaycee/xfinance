import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as analyticsService from "../services/analyticsService";
import {
  DashboardData,
  DashboardFilters,
  FilterOption,
  KPIs,
  MonthlyBreakdown,
  CashFlowData,
  TopExpense,
  AgingData,
  RecentTransaction,
} from "../services/analyticsService";

/**
 * Fetch all dashboard data in a single call (Recommended)
 */
export const useDashboardData = (
  filters?: DashboardFilters,
  options?: UseQueryOptions<DashboardData>
) => {
  return useQuery<DashboardData>({
    queryKey: ["dashboard", filters?.monthlyFilter, filters?.cashFlowFilter, filters?.expensesFilter],
    queryFn: () => analyticsService.getDashboardData(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch monthly revenue and expenses for bar chart
 */
export const useMonthlyBreakdown = (
  filter?: FilterOption,
  options?: UseQueryOptions<MonthlyBreakdown[]>
) => {
  return useQuery<MonthlyBreakdown[]>({
    queryKey: ["monthlyBreakdown", filter],
    queryFn: () => analyticsService.getMonthlyBreakdown(filter),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch inflow vs outflow for line chart
 */
export const useCashFlow = (filter?: FilterOption, options?: UseQueryOptions<CashFlowData[]>) => {
  return useQuery<CashFlowData[]>({
    queryKey: ["cashFlow", filter],
    queryFn: () => analyticsService.getCashFlow(filter),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch top expenses by category for pie chart
 */
export const useExpensesByCategory = (
  filter?: FilterOption,
  limit?: number,
  options?: UseQueryOptions<TopExpense[]>
) => {
  return useQuery<TopExpense[]>({
    queryKey: ["expensesByCategory", filter, limit],
    queryFn: () => analyticsService.getExpensesByCategory(filter, limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch KPI cards data only
 */
export const useKPIs = (options?: UseQueryOptions<KPIs>) => {
  return useQuery<KPIs>({
    queryKey: ["kpis"],
    queryFn: () => analyticsService.getKPIs(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch AR aging data
 */
export const useReceivableAging = (options?: UseQueryOptions<AgingData>) => {
  return useQuery<AgingData>({
    queryKey: ["receivableAging"],
    queryFn: () => analyticsService.getReceivableAging(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch AP aging data
 */
export const usePayableAging = (options?: UseQueryOptions<AgingData>) => {
  return useQuery<AgingData>({
    queryKey: ["payableAging"],
    queryFn: () => analyticsService.getPayableAging(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Fetch recent transactions
 */
export const useRecentTransactions = (options?: UseQueryOptions<RecentTransaction[]>) => {
  return useQuery<RecentTransaction[]>({
    queryKey: ["recentTransactions"],
    queryFn: () => analyticsService.getRecentTransactions(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...options,
  });
};
