'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', subscriptions: 180 },
  { month: 'Feb', subscriptions: 190 },
  { month: 'Mar', subscriptions: 200 },
  { month: 'Apr', subscriptions: 220 },
  { month: 'May', subscriptions: 240 },
  { month: 'Jun', subscriptions: 255 },
  { month: 'Jul', subscriptions: 265 },
];

export function SubscriptionGrowthChart() {
  return (
    <Card className="border border-gray-200 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">Subscription Growth</h3>
          <p className="text-sm text-gray-600">Total active subscriptions</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value) => value}
            />
            <Bar dataKey="subscriptions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
