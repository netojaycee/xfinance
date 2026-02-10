'use client';

import React from 'react';
import {
  BudgetingForecastsHeader,
  BudgetStatsCards,
  BudgetingForecastsContent,
} from '@/components/features/admin/budgeting';

export default function BudgetingForecastsPage() {
  return (
    <div className="space-y-8 p-4">
      {/* Header with Export and New Budget buttons */}
      <BudgetingForecastsHeader />

      {/* Stats Cards */}
      <BudgetStatsCards />

      {/* Main Content with Tabs */}
      <BudgetingForecastsContent />
    </div>
  );
}
