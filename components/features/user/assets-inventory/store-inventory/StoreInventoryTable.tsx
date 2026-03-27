"use client";

import React from "react";
import { CustomTable } from "@/components/local/custom/custom-table";
import StoreInventoryActions from "./StoreInventoryActions";

// Dummy data for now
const supplies = [
  {
    id: "1",
    name: "A4 Paper (Ream)",
    sku: "PP-A4-500",
    category: "Paper & Stationery",
    unitPrice: 3500,
    qtyOnHand: 45,
    minQty: 20,
    totalValue: 157500,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Printer Toner Cartridge",
    sku: "TN-HP-85A",
    category: "Printer Supplies",
    unitPrice: 28000,
    qtyOnHand: 8,
    minQty: 10,
    totalValue: 224000,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Ballpoint Pens (Box of 50)",
    sku: "BP-50",
    category: "Writing Instruments",
    unitPrice: 5000,
    qtyOnHand: 0,
    minQty: 5,
    totalValue: 0,
    status: "Out of Stock",
  },
];

const columns = [
  {
    key: "name",
    title: "Item Name",
    render: (value: any, row: any) => (
      <div>
        <div className="font-medium text-gray-900">{row.name}</div>
        <div className="text-xs text-gray-500">{row.sku}</div>
      </div>
    ),
  },
  {
    key: "category",
    title: "Category",
  },
  {
    key: "unitPrice",
    title: "Unit Price",
    render: (value: any) => `₦${value.toLocaleString()}`,
  },
  {
    key: "qtyOnHand",
    title: "Qty on Hand",
    render: (value: any) => <span className="font-bold">{value}</span>,
  },
  {
    key: "minQty",
    title: "Min. Qty",
  },
  {
    key: "totalValue",
    title: "Total Value",
    render: (value: any) => `₦${value.toLocaleString()}`,
  },
  {
    key: "status",
    title: "Status",
    render: (value: any) => {
      if (value === "In Stock") return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{value}</span>;
      if (value === "Low Stock") return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">{value}</span>;
      if (value === "Out of Stock") return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{value}</span>;
      return value;
    },
  },
  {
    key: "actions",
    title: "",
    render: (_: any, row: any) => <StoreInventoryActions row={row} />, // Edit action
    searchable: false,
  },
];

export default function StoreInventoryTable() {
  return (
    <div className="space-y-4">
      <CustomTable
        tableTitle="Supplies Inventory"
        columns={columns}
        data={supplies}
        searchPlaceholder="Search supplies..."
        display={{ searchComponent: true, filterComponent: true }}
        pageSize={10}
      />
    </div>
  );
}
