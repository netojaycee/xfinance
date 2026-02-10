"use client";

import {
  Banknote,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";
import StatCard from "@/components/features/user/dashboard/StatCard";

const stats = [
  {
    title: "Consolidated Revenue",
    icon: <Banknote className="h-5 w-5" />,
    value: "₦4.9M",
    percentage: 13.5,
    isPositive: true,
  },
  {
    title: "Net Profit",
    icon: <TrendingUp className="h-5 w-5" />,
    value: "₦1.2M",
    percentage: 8.3,
    isPositive: true,
  },
  {
    title: "FX Impact (YTD)",
    icon: <Zap className="h-5 w-5" />,
    value: "₦-82.4k",
    percentage: 3.2,
    isPositive: false,
  },
  {
    title: "Group EBITDA",
    icon: <TrendingDown className="h-5 w-5" />,
    value: "₦1.7M",
    percentage: 15.7,
    isPositive: true,
  },
];

export default function AdminStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          icon={stat.icon}
          value={stat.value}
          percentage={stat.percentage}
          isPositive={stat.isPositive}
        />
      ))}
    </div>
  );
}
