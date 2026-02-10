'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  className?: string;
}

function StatCard({ title, value, className = '' }: StatCardProps) {
  return (
    <div className={`border border-gray-200 rounded-lg bg-white p-6 ${className}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}

export function GroupsStatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Groups" value="247" />
      <StatCard title="Active" value="235" />
      <StatCard title="Trial" value="8" />
      <StatCard title="Suspended" value="4" />
    </div>
  );
}
