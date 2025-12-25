"use client";

import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import ItemActions from "./ItemActions";

// Data for the table
export const itemsData = [
  {
    id: 1,
    name: "Premium Wireless Mouse",
    sku: "TECH-WM-001",
    category: "Electronics",
    quantity: 45,
    unitPrice: 2500,
    status: "in_stock",
    code: "ITM-001",
  },
  {
    id: 2,
    name: "Ergonomic Keyboard",
    sku: "TECH-KB-002",
    category: "Electronics",
    quantity: 8,
    unitPrice: 4500,
    status: "low_stock",
    code: "ITM-002",
  },
  {
    id: 3,
    name: "Office Chair - Executive",
    sku: "FURN-CH-001",
    category: "Furniture",
    quantity: 15,
    unitPrice: 35000,
    status: "in_stock",
    code: "ITM-003",
  },
  {
    id: 4,
    name: "USB-C Hub Adapter",
    sku: "TECH-HB-003",
    category: "Electronics",
    quantity: 0,
    unitPrice: 1800,
    status: "out_of_stock",
    code: "ITM-004",
  },
];

// Table columns for items
export const itemColumns: Column<any>[] = [
  {
    key: "name",
    title: "Item",
    className: "text-xs",
    render: (value, row) => (
      <div>
        <div className="font-normal text-gray-900 line-clamp-1">
          {row.name}
        </div>
        <div className="text-xs text-gray-400 line-clamp-1">{row.code}</div>
      </div>
    ),
  },
  {
    key: "sku",
    title: "SKU",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "category",
    title: "Category",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "quantity",
    title: "Quantity",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "unitPrice",
    title: "Unit Price",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700">₦{value.toLocaleString()}</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => {
      if (value === "in_stock")
        return (
          <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            In Stock
          </Badge>
        );
      if (value === "low_stock")
        return (
          <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
            Low Stock
          </Badge>
        );
      if (value === "out_of_stock")
        return (
          <Badge className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
            Out of Stock
          </Badge>
        );
      return null;
    },
  },
  {
    key: "actions",
    title: "",
    className: "w-8 text-xs",
    render: (_, row) => <ItemActions row={row} />, // parent should provide onEdit/onDelete
    searchable: false,
  },
];
