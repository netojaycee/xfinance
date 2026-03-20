'use client';

import React from 'react';
import {
  BudgetingForecastsHeader,
  BudgetStatsCards,
} from '@/components/features/admin/budgeting';

export default function ForecastPage() {
  return (
    <div className="space-y-8 p-4">
      {/* Header with Export and New Budget buttons */}
      <BudgetingForecastsHeader />

      {/* Stats Cards */}
      <BudgetStatsCards />

      {/* Forecast Content */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Financial Forecast</h2>
        <p className="text-gray-600">Forecast content will be displayed here.</p>
      </div>
    </div>
  );
}
