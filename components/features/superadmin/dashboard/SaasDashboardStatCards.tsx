'use client';

import React from 'react';
import { Building2, Users, DollarSign, Briefcase, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ title, value, trend, icon, className = '' }: StatCardProps) {
  const isPositive = trend >= 0;

  return (
    <Card className={`border border-gray-200 bg-white p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {isPositive ? '+' : ''}{trend}%
            </span>
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function SaasDashboardStatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Companies"
        value="247"
        trend={12}
        icon={<Building2 className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Active Users"
        value="1.8k"
        trend={18}
        icon={<Users className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Monthly Revenue"
        value="₦2.8M"
        trend={22}
        icon={<DollarSign className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Churn Rate"
        value="2.4%"
        trend={-0.5}
        icon={<Briefcase className="h-5 w-5 text-primary" />}
      />
    </div>
  );
}
