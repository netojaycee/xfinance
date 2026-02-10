'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Starter', value: 142 },
  { name: 'Professional', value: 78 },
  { name: 'Enterprise', value: 27 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

export function PlanDistributionChart() {
  return (
    <Card className="border border-gray-200 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">Plan Distribution</h3>
          <p className="text-sm text-gray-600">Active subscriptions</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => {
                const item = data.find((d) => d.name === value);
                return `${item?.name} ${item?.value}`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
