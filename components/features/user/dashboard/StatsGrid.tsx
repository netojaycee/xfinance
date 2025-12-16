"use client";

import {
  Banknote,
  Landmark,
  TrendingDown,
  Users,
} from "lucide-react";
import React from "react";
import StatCard from "./StatCard";

const stats = [
  {
    title: "Revenue (MTD)",
    icon: <Banknote className="h-5 w-5" />,
    value: "₦845.2k",
    percentage: 12.5,
    isPositive: true,
  },
  {
    title: "Bank Balance",
    icon: <Landmark className="h-5 w-5" />,
    value: "₦2.5M",
    percentage: 5.3,
    isPositive: true,
  },
  {
    title: "Current Liabilities",
    icon: <TrendingDown className="h-5 w-5" />,
    value: "₦482.5k",
    percentage: 2.1,
    isPositive: false,
  },
  {
    title: "Active Customers",
    icon: <Users className="h-5 w-5" />,
    value: "127",
    percentage: 8.5,
    isPositive: true,
  },
];

export default function StatsGrid() {
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
