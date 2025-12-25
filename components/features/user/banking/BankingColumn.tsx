"use client";
import {
 
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import { getInitials } from "@/lib/utils";


export const bankingData = [
  {
    id: "TXN-8471",
    date: "2025-11-06",
    description: "ACH Payment - Acme Corporation",
    account: "Operating Account",
    category: "Revenue",
    amount: 24500,
    amountType: "credit",
    status: "Cleared",
  },
  {
    id: "TXN-8470",
    date: "2025-11-05",
    description: "Wire Transfer - Payroll Processing",
    account: "Payroll Account",
    category: "Payroll",
    amount: -45200,
    amountType: "debit",
    status: "Cleared",
  },
  {
    id: "TXN-8469",
    date: "2025-11-05",
    description: "ACH Debit - Office Rent",
    account: "Operating Account",
    category: "Operating Expense",
    amount: -8500,
    amountType: "debit",
    status: "Cleared",
  },
  {
    id: "TXN-8468",
    date: "2025-11-04",
    description: "Check #2847 - Global Tech Inc",
    account: "Operating Account",
    category: "Revenue",
    amount: 18750,
    amountType: "credit",
    status: "Pending",
  },
  {
    id: "TXN-8467",
    date: "2025-11-04",
    description: "Card Payment - AWS Services",
    account: "Operating Account",
    category: "IT",
    amount: -2400,
    amountType: "debit",
    status: "Cleared",
  },
  {
    id: "TXN-8466",
    date: "2025-11-03",
    description: "ACH Payment - Enterprise Solutions",
    account: "Operating Account",
    category: "Revenue",
    amount: 42000,
    amountType: "credit",
    status: "Cleared",
  },
];


export const bankingColumns: Column<any>[] = [
  {
    key: "id",
    title: "ID",
    className: "text-xs",
    render: (value) => <span className="font-medium text-gray-900">{value}</span>,
  },
  {
    key: "date",
    title: "Date",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "description",
    title: "Description",
    className: "text-xs",
    render: (value) => <span className="text-gray-900">{value}</span>,
  },
  {
    key: "account",
    title: "Account",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "category",
    title: "Category",
    className: "text-xs",
    render: (value) => (
      <Badge className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{value}</Badge>
    ),
  },
  {
    key: "amount",
    title: "Amount",
    className: "text-xs",
    render: (value, row) => {
      const isCredit = row.amount > 0;
      const color = isCredit ? "text-green-600" : "text-red-600";
      const sign = isCredit ? "+" : "-";
      return (
        <span className={`font-semibold ${color}`}>
          {sign}${Math.abs(row.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      );
    },
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => {
      if (value === "Cleared")
        return (
          <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Cleared</Badge>
        );
      if (value === "Pending")
        return (
          <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">Pending</Badge>
        );
      return null;
    },
  },
];
