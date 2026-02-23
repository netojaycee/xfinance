"use client";

import React, { useMemo, useState } from "react";
import { CustomTable } from "@/components/local/custom/custom-table";
import { CustomTabs, Tab } from "@/components/local/custom/tabs";
import { BankTransaction } from "./types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useDebounce } from "use-debounce";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
} from "lucide-react";

interface BankTransactionsProps {
  transactions: BankTransaction[];
  isLoading: boolean;
}

export default function BankTransactions({
  transactions,
  isLoading,
}: BankTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Filter pending transactions
  const pendingTransactions = useMemo(() => {
    return transactions.filter((t) => t.status === "Pending");
  }, [transactions]);

  // Search through all transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      t.reference.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      t.payeePayor.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [transactions, debouncedSearchTerm]);

  const filteredPendingTransactions = useMemo(() => {
    return pendingTransactions.filter((t) =>
      t.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      t.reference.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      t.payeePayor.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [pendingTransactions, debouncedSearchTerm]);

  const columns = [
    {
      key: "date",
      title: "Date",
      render: (value: unknown) => (
        <span className="text-xs">
          {format(new Date(value as string), "MMM dd yyyy")}
        </span>
      ),
    },
    {
      key: "type",
      title: "Type",
      render: (value: unknown) => {
        const type = value as string;
        let badgeClass = "";
        let Icon = CreditCard;

        if (type === "Deposit") {
          badgeClass = "bg-green-100 text-green-700";
          Icon = ArrowDownRight;
        } else if (type === "Withdrawal") {
          badgeClass = "bg-red-100 text-red-700";
          Icon = ArrowUpRight;
        } else if (type === "Fee") {
          badgeClass = "bg-orange-100 text-orange-700";
        } else if (type === "Interest") {
          badgeClass = "bg-blue-100 text-blue-700";
        } else if (type === "Transfer") {
          badgeClass = "bg-purple-100 text-purple-700";
        }

        return (
          <Badge className={`${badgeClass} text-xs font-medium px-2 py-1`}>
            {type}
          </Badge>
        );
      },
    },
    {
      key: "description",
      title: "Description",
      render: (value: unknown) => (
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-xs">{value as string}</span>
        </div>
      ),
    },
    {
      key: "payeePayor",
      title: "Payee/Payor",
      render: (value: unknown) => (
        <span className="text-xs text-gray-600">{value as string}</span>
      ),
    },
    {
      key: "method",
      title: "Method",
      render: (value: unknown) => (
        <span className="text-xs text-gray-500">{value as string}</span>
      ),
    },
    {
      key: "reference",
      title: "Reference",
      render: (value: unknown) => (
        <span className="text-xs font-mono text-gray-600">{value as string}</span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (value: unknown, row?: any) => {
        const isDeposit = row?.type === "Deposit" || row?.type === "Interest";
        return (
          <span
            className={`text-xs font-semibold ${
              isDeposit ? "text-green-700" : "text-red-700"
            }`}
          >
            {isDeposit ? "+" : "-"}₦
            {(value as number).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        );
      },
    },
    {
      key: "balance",
      title: "Balance",
      render: (value: unknown) => (
        <span className="text-xs font-semibold text-gray-900">
          ₦
          {(value as number).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value: unknown) => {
        const status = value as string;
        const badgeClass =
          status === "Cleared"
            ? "bg-green-100 text-green-700"
            : status === "Pending"
              ? "bg-orange-100 text-orange-700"
              : "bg-blue-100 text-blue-700";

        return (
          <Badge className={`${badgeClass} text-xs font-medium px-2 py-1`}>
            {status}
          </Badge>
        );
      },
    },
  ];

  const tabs: Tab[] = [
    {
      value: "all",
      title: "All Transactions",
      content: (
        <CustomTable
          data={filteredTransactions}
          columns={columns as any}
          tableTitle="All Transactions"
          searchPlaceholder="Search transactions..."
          onSearchChange={setSearchTerm}
          display={{
            searchComponent: true,
            statusComponent: false,
            filterComponent: false,
            methodsComponent: false,
          }}
          loading={isLoading}
        />
      ),
    },
    {
      value: "pending",
      title: `Pending (${pendingTransactions.length})`,
      content: (
        <CustomTable
          data={filteredPendingTransactions}
          columns={columns as any}
          tableTitle="Pending Transactions"
          searchPlaceholder="Search pending transactions..."
          onSearchChange={setSearchTerm}
          display={{
            searchComponent: true,
            statusComponent: false,
            filterComponent: false,
            methodsComponent: false,
          }}
          loading={isLoading}
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <CustomTabs tabs={tabs} storageKey="bank-account-transactions-tab" />
    </div>
  );
}
