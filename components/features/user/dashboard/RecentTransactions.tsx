"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const transactions = [
  {
    description: "Invoice Payment - Acme Corp",
    date: "2025-11-10",
    amount: 125000,
    type: "credit",
  },
  {
    description: "Office Supplies - Supply Co",
    date: "2025-11-09",
    amount: 8500,
    type: "debit",
  },
  {
    description: "Salary Payment - October",
    date: "2025-11-08",
    amount: 180000,
    type: "debit",
  },
  {
    description: "Invoice Payment - Tech Solutions",
    date: "2025-11-07",
    amount: 95000,
    type: "credit",
  },
  {
    description: "Utility Bill - Electric Co",
    date: "2025-11-06",
    amount: 12000,
    type: "debit",
  },
];

const formatCurrency = (amount: number) => {
  return `₦${(amount / 1000).toFixed(amount % 1000 !== 0 ? 1 : 0)}k`;
};

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
          >
            <div>
              <p className="font-normal text-sm">{transaction.description}</p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
            <p
              className={cn(
                "font-semibold",
                transaction.type === "credit"
                  ? "text-green-500"
                  : "text-red-500"
              )}
            >
              {transaction.type === "credit" ? "+" : ""}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
