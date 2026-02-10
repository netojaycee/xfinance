'use client';

import React from 'react';
import { DollarSign, ShoppingCart, Percent, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ title, value, icon, className = '' }: StatCardProps) {
  return (
    <Card className={`border border-gray-200 bg-white p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function SubscriptionStatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total MRR"
        value="$284,750"
        icon={<DollarSign className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Active Subscriptions"
        value="847"
        icon={<ShoppingCart className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Trial Conversions"
        value="68%"
        icon={<Percent className="h-5 w-5 text-primary" />}
      />
      <StatCard
        title="Avg Revenue/Customer"
        value="$336"
        icon={<Users className="h-5 w-5 text-primary" />}
      />
    </div>
  );
}
