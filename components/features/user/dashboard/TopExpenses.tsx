"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TopExpense, FilterOption } from "@/lib/api/services/analyticsService";
import { Skeleton } from "@/components/ui/skeleton";

interface TopExpensesProps {
  data?: TopExpense[];
  filter?: FilterOption;
  onFilterChange?: (filter: FilterOption) => void;
  loading?: boolean;
}

const colors = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#9ca3af",
  "#10b981",
  "#f59e0b",
  "#6366f1",
];

const chartConfig = {
  value: {
    label: "Amount",
  },
} satisfies ChartConfig;

const formatCurrency = (amount: number) => {
  return `₦${(amount / 100).toLocaleString()}`;
};

export function TopExpenses({
  data,
  filter = "THIS_YEAR",
  onFilterChange,
  loading,
}: TopExpensesProps) {
  const chartData = data?.map((item, index) => ({
    name: item.category,
    value: item.amount / 100,
    fill: colors[index % colors.length],
  })) ?? [];

  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Top Expenses</CardTitle>
          <CardDescription>Expense breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Top Expenses</CardTitle>
          <CardDescription>Top expenses by category</CardDescription>
        </div>
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="THIS_YEAR">This Year</SelectItem>
            <SelectItem value="THIS_FISCAL_YEAR">This Fiscal Year</SelectItem>
            <SelectItem value="LAST_FISCAL_YEAR">Last Fiscal Year</SelectItem>
            <SelectItem value="LAST_12_MONTHS">Last 12 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-4 text-sm">
        <div className="w-full space-y-2">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <span className="font-medium">
                {formatCurrency(item.value * 100)}
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
