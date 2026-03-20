export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  customerId: string;
  customerName: string;
  status: "Planning" | "In Progress" | "Completed" | "On Hold";
  startDate: string;
  endDate: string;
  budgetRevenue: number;
  actualRevenue: number;
  budgetCost: number;
  actualCost: number;
  profitMargin: number;
  progress: number;
  manager: string;
  isActive: boolean;
}

export type ProjectsResponse = {
  projects: Project[];
  total: number;
  activeProjects: number;
  totalRevenue: number;
  totalCosts: number;
  avgProfitMargin: number;
};
