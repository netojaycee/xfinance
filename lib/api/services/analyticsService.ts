import { apiClient } from "../client";

export type FilterOption = "THIS_YEAR" | "THIS_FISCAL_YEAR" | "LAST_FISCAL_YEAR" | "LAST_12_MONTHS";

export interface DashboardFilters {
  monthlyFilter?: FilterOption;
  cashFlowFilter?: FilterOption;
  expensesFilter?: FilterOption;
}

export interface KPI {
  mtd?: number;
  count?: number;
  total?: number;
  change: number;
  changePercent: number;
}

export interface KPIs {
  revenue: KPI;
  bankBalance: KPI;
  liabilities: KPI;
  activeCustomers: KPI;
}

export interface MonthlyBreakdown {
  month: string;
  revenue: number;
  expenses: number;
}

export interface CashFlowData {
  month: string;
  inflow: number;
  outflow: number;
}

export interface TopExpense {
  category: string;
  amount: number;
  percentage: number;
}

export interface AgingData {
  "0-30": number;
  "31-60": number;
  "61-90": number;
  "90+": number;
}

export interface RecentTransaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  type: string;
  debit: number;
  credit: number;
  amount: number;
  status: string;
}

export interface DashboardData {
  kpis: KPIs;
  monthlyBreakdown: MonthlyBreakdown[];
  cashFlow: CashFlowData[];
  topExpenses: TopExpense[];
  receivableAging: AgingData;
  payableAging: AgingData;
  recentTransactions: RecentTransaction[];
}

/**
 * Get all dashboard data in a single call (Recommended)
 */
export const getDashboardData = async (filters?: DashboardFilters): Promise<DashboardData> => {
  const queryParams = new URLSearchParams();

  if (filters?.monthlyFilter) {
    queryParams.append("monthlyFilter", filters.monthlyFilter);
  }
  if (filters?.cashFlowFilter) {
    queryParams.append("cashFlowFilter", filters.cashFlowFilter);
  }
  if (filters?.expensesFilter) {
    queryParams.append("expensesFilter", filters.expensesFilter);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `analytics/dashboard?${queryString}` : "analytics/dashboard";

  return apiClient(url, { method: "GET" });
};

/**
 * Get monthly revenue and expenses for bar chart
 */
export const getMonthlyBreakdown = async (filter?: FilterOption): Promise<MonthlyBreakdown[]> => {
  const queryParams = new URLSearchParams();
  if (filter) queryParams.append("filter", filter);

  const queryString = queryParams.toString();
  const url = queryString ? `analytics/monthly-breakdown?${queryString}` : "analytics/monthly-breakdown";

  return apiClient(url, { method: "GET" });
};

/**
 * Get inflow vs outflow for line chart
 */
export const getCashFlow = async (filter?: FilterOption): Promise<CashFlowData[]> => {
  const queryParams = new URLSearchParams();
  if (filter) queryParams.append("filter", filter);

  const queryString = queryParams.toString();
  const url = queryString ? `analytics/cash-flow?${queryString}` : "analytics/cash-flow";

  return apiClient(url, { method: "GET" });
};

/**
 * Get top expenses by category for pie chart
 */
export const getExpensesByCategory = async (
  filter?: FilterOption,
  limit?: number
): Promise<TopExpense[]> => {
  const queryParams = new URLSearchParams();
  if (filter) queryParams.append("filter", filter);
  if (limit) queryParams.append("limit", limit.toString());

  const queryString = queryParams.toString();
  const url = queryString ? `analytics/expenses/by-category?${queryString}` : "analytics/expenses/by-category";

  return apiClient(url, { method: "GET" });
};

/**
 * Get KPI cards data only
 */
export const getKPIs = async (): Promise<KPIs> => {
  return apiClient("analytics/kpis", { method: "GET" });
};

/**
 * Get AR aging data
 */
export const getReceivableAging = async (): Promise<AgingData> => {
  return apiClient("analytics/receivable-aging", { method: "GET" });
};

/**
 * Get AP aging data
 */
export const getPayableAging = async (): Promise<AgingData> => {
  return apiClient("analytics/payable-aging", { method: "GET" });
};

/**
 * Get recent activity
 */
export const getRecentTransactions = async (): Promise<RecentTransaction[]> => {
  return apiClient("analytics/recent-transactions", { method: "GET" });
};
