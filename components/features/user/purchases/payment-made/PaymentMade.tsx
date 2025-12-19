"use client";
import { CustomTable } from "@/components/local/custom/custom-table";


import { paymentMadeColumns } from "./PaymentMadeColumns";
import PaymentMadeHeader from "./PaymentMadeHeader";

export const paymentMadeData = [
  {
    paymentNo: "PAY-2025-087",
    date: "2025-11-04",
    vendor: "Office Supplies Inc",
    bill: "BILL-2025-320",
    method: "Check",
    amount: "$1,250",
    status: "Cleared",
  },
  {
    paymentNo: "PAY-2025-086",
    date: "2025-11-03",
    vendor: "Tech Solutions LLC",
    bill: "BILL-2025-318",
    method: "ACH",
    amount: "$5,400",
    status: "Pending",
  },
  {
    paymentNo: "PAY-2025-085",
    date: "2025-11-01",
    vendor: "Cloud Services Pro",
    bill: "BILL-2025-315",
    method: "Wire Transfer",
    amount: "$2,400",
    status: "Cleared",
  },
];

export default function PaymentMade() {
  return (
    <div className="space-y-4">
      <PaymentMadeHeader />
      <CustomTable
        searchPlaceholder="Search payments..."
        tableTitle="Recent Payments"
        columns={paymentMadeColumns}
        data={paymentMadeData}
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
