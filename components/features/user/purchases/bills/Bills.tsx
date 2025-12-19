"use client";
import { CustomTable } from "@/components/local/custom/custom-table";

// Vendor data and columns
import { billsColumns } from "./BillsColumns";
import BillsHeader from "./BillsHeader";




    export const billsData = [
      {
        billNo: "BILL-2025-324",
        date: "2025-11-01",
        vendor: "Office Supplies Inc",
        dueDate: "2025-11-15",
        amount: "$1,250",
        status: "Unpaid",
      },
      {
        billNo: "BILL-2025-323",
        date: "2025-10-28",
        vendor: "Tech Solutions LLC",
        dueDate: "2025-11-12",
        amount: "$5,400",
        status: "Unpaid",
      },
      {
        billNo: "BILL-2025-322",
        date: "2025-10-25",
        vendor: "Cloud Services Pro",
        dueDate: "2025-11-08",
        amount: "$2,400",
        status: "Paid",
      },
    ];
   




export default function Bills() {
  return (
    <div className="space-y-4">
      <BillsHeader />
      <CustomTable
        searchPlaceholder="Search bills..."
        tableTitle="All Bills"
        columns={billsColumns}
        data={billsData}
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
