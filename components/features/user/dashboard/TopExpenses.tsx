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

const chartData = [
    { name: "Salaries", value: 180000, fill: "#3b82f6" },
    { name: "Rent", value: 85000, fill: "#8b5cf6" },
    { name: "Utilities", value: 42000, fill: "#ec4899" },
    { name: "Marketing", value: 68000, fill: "#f97316" },
    { name: "Other", value: 95000, fill: "#9ca3af" },
];

const chartConfig = {
  value: {
    label: "Expenses",
  },
  salaries: {
    label: "Salaries",
    color: "#3b82f6",
  },
  rent: {
    label: "Rent",
    color: "#8b5cf6",
  },
  utilities: {
    label: "Utilities",
    color: "#ec4899",
  },
  marketing: {
    label: "Marketing",
    color: "#f97316",
  },
  other: {
    label: "Other",
    color: "#9ca3af",
  },
} satisfies ChartConfig;

const formatCurrency = (amount: number) => {
  return `₦${(amount / 1000).toFixed(0)}K`;
};

export function TopExpenses() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Top Expenses</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="This Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="this-fiscal-year">This Fiscal Year</SelectItem>
            <SelectItem value="previous-fiscal-year">
              Previous Fiscal Year
            </SelectItem>
            <SelectItem value="last-12-months">Last 12 Months</SelectItem>
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
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
