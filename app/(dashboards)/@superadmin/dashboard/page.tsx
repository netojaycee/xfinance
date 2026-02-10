'use client';

import React from 'react';
import {
  SaasDashboardHeader,
  SaasDashboardStatCards,
  RevenueGrowthChart,
  PlanDistributionChart,
  SubscriptionGrowthChart,
  RecentSignupsSection,
} from '@/components/features/superadmin/dashboard';

export default function SuperadminDashboard() {
  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <SaasDashboardHeader />

      {/* Stat Cards */}
      <SaasDashboardStatCards />

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueGrowthChart />
        <PlanDistributionChart />
      </div>

      {/* Subscription Growth */}
      <SubscriptionGrowthChart />

      {/* Recent Sign-ups */}
      <RecentSignupsSection />
    </div>
  );
}
