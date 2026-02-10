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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { entity: "Humbow Inc. (US)", revenue: 2.8 },
  { entity: "Humbow Ltd. (UK)", revenue: 2.0 },
  { entity: "Humbow GmbH (DE)", revenue: 1.4 },
  { entity: "Humbow Pty (AU)", revenue: 1.2 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function EntityPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entity Performance</CardTitle>
        <CardDescription>Revenue by entity (in millions)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="entity"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--chart-3)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
