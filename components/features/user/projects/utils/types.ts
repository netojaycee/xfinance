export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  customerId: string;
  customerName: string;
  status: "Planning" | "In_Progress" | "Completed" | "On_Hold";
  startDate: string;
  endDate: string;
  budgetedRevenue: number;
  actualRevenue: number;
  budgetedCost: number;
  actualCost: number;
  profitMargin: number;
  progress: number;
  manager: string;
  isActive: boolean;
}

export type ProjectsResponse = {
  projects: Project[];
  total: number;
  totalProjects: number;
  totalActive: number;
  totalBudgetedRevenue: number;
  totalBudgetedCost: number;
  averageProfitMargin: number;
};
