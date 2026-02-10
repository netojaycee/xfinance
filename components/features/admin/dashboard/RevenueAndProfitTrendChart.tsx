"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", revenue: 3.2, profit: 0.8 },
  { month: "Feb", revenue: 3.8, profit: 0.9 },
  { month: "Mar", revenue: 4.1, profit: 1.0 },
  { month: "Apr", revenue: 4.0, profit: 0.95 },
  { month: "May", revenue: 4.5, profit: 1.1 },
  { month: "Jun", revenue: 4.8, profit: 1.2 },
  { month: "Jul", revenue: 4.9, profit: 1.25 },
  { month: "Aug", revenue: 4.7, profit: 1.15 },
  { month: "Sep", revenue: 5.1, profit: 1.3 },
  { month: "Oct", revenue: 5.3, profit: 1.4 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function RevenueAndProfitTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Profit Trend</CardTitle>
        <CardDescription>Last 10 months (in millions)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="profit"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
