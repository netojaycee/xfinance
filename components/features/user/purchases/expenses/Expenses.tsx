"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

// Vendor data and columns
import { expensesColumns } from "./ExpensesColumns";
import ExpensesHeader from "./ExpensesHeader";


export const expenseData = [
  {
    expenseNo: "EXP-2025-142",
    date: "2025-11-04",
    vendor: "Office Supplies Inc",
    category: "Office Supplies",
    submittedBy: "Sarah Chen",
    amount: "$1,250",
    status: "Approved",
  },
  {
    expenseNo: "EXP-2025-141",
    date: "2025-11-03",
    vendor: "Tech Solutions LLC",
    category: "IT & Software",
    submittedBy: "Mike Johnson",
    amount: "$5,400",
    status: "Pending",
  },
  {
    expenseNo: "EXP-2025-140",
    date: "2025-11-02",
    vendor: "Cloud Services Pro",
    category: "IT & Software",
    submittedBy: "Emily Davis",
    amount: "$2,400",
    status: "Approved",
  },
];



export default function Expenses() {
  return (
    <div className="space-y-4">
      <ExpensesHeader />
      <CustomTable
        searchPlaceholder="Search expenses..."
        tableTitle="All Expenses"
        columns={expensesColumns}
        data={expenseData}
        pageSize={10}
        display={{
          statusComponent: false,
          filterComponent: true,
          searchComponent: true,
          methodsComponent: false,
        }}
      />
    </div>
  );
}
