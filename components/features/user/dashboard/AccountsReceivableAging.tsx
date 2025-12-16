"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const rows = [
  { label: "Current (0-30 days)", amount: 124000, percent: 70 },
  { label: "31-60 days", amount: 38000, percent: 45 },
  { label: "61-90 days", amount: 12000, percent: 30 },
  { label: "90+ days", amount: 8000, percent: 15, highlight: true },
];

const formatCurrency = (amt: number) => `₦${(amt / 1000).toFixed(0)}K`;

export function AccountsReceivableAging() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts Receivable Aging</CardTitle>
        <CardDescription>Outstanding invoices by age</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between ">
                <div className="mb-2 text-sm text-gray-700">{r.label}</div>
                <div className="w-24 text-right"></div>
                <span
                  className={
                    r.highlight
                      ? "text-amber-500 font-medium"
                      : "text-gray-800 font-medium"
                  }
                >
                  {formatCurrency(r.amount)}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full  bg-slate-900"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
