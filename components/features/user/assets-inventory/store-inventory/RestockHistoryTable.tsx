"use client";

import React from "react";
import { CustomTable } from "@/components/local/custom/custom-table";

const restockData = [
  {
    id: 1,
    date: "2025-03-05 10:30 AM",
    item: "A4 Paper (Ream)",
    sku: "PP-A4-500",
    quantity: 20,
    unitPrice: 3500,
    totalCost: 70000,
    supplier: "Office Mart Nigeria",
    restockedBy: "John Adebayo",
    notes: "Monthly restock",
  },
  {
    id: 2,
    date: "2025-03-04 02:15 PM",
    item: "Printer Toner Cartridge",
    sku: "TN-HP-85A",
    quantity: 5,
    unitPrice: 28000,
    totalCost: 140000,
    supplier: "TechSupply Lagos",
    restockedBy: "Sarah Okonkwo",
    notes: "Urgent restock",
  },
  {
    id: 3,
    date: "2025-03-03 11:45 AM",
    item: "File Folders (Box of 100)",
    sku: "FF-LTR-100",
    quantity: 10,
    unitPrice: 12000,
    totalCost: 120000,
    supplier: "Office Mart Nigeria",
    restockedBy: "John Adebayo",
    notes: "",
  },
];

const columns = [
  {
    key: "date",
    title: "Date & Time",
    render: (value: string) => <span>{value}</span>,
  },
  {
    key: "item",
    title: "Supply Item",
    render: (_: any, row: any) => (
      <div>
        <div className="font-medium text-gray-900">{row.item}</div>
        <div className="text-xs text-gray-500">{row.sku}</div>
      </div>
    ),
  },
  {
    key: "quantity",
    title: "Quantity",
    render: (value: number) => (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">+{value}</span>
    ),
  },
  {
    key: "unitPrice",
    title: "Unit Price",
    render: (value: number) => `₦${value.toLocaleString()}`,
  },
  {
    key: "totalCost",
    title: "Total Cost",
    render: (value: number) => <span className="font-bold">₦{value.toLocaleString()}</span>,
  },
  {
    key: "supplier",
    title: "Supplier",
  },
  {
    key: "restockedBy",
    title: "Restocked By",
  },
  {
    key: "notes",
    title: "Notes",
  },
];

export default function RestockHistoryTable() {
  return (
    <div className="space-y-4">
      <CustomTable
        tableTitle="Restock History"
        columns={columns}
        data={restockData}
        // searchable
        searchPlaceholder="Search restock records..."
        // filterable
      />
    </div>
  );
}
