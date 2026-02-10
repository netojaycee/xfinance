'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 1.9 },
  { month: 'Feb', revenue: 2.1 },
  { month: 'Mar', revenue: 2.15 },
  { month: 'Apr', revenue: 2.3 },
  { month: 'May', revenue: 2.5 },
  { month: 'Jun', revenue: 2.75 },
  { month: 'Jul', revenue: 2.8 },
];

export function RevenueGrowthChart() {
  return (
    <Card className="border border-gray-200 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">Revenue Growth</h3>
          <p className="text-sm text-gray-600">Monthly revenue trend</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => `₦${typeof value === 'number' ? value.toFixed(2) : value}M`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
