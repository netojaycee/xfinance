"use client";

import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import { Item } from "./utils/types";
import ItemsActions from "./ItemsActions";

/**
 * Table columns configuration for Items
 * Defines columns for displaying item data in CustomTable component
 */
export const itemsColumns: Column<Item>[] = [
  {
    key: "code",
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
    key: "type",
    title: "Type",
    className: "text-xs",
    render: (value) => (
      <Badge className={`px-3 py-1 rounded-full font-medium ${
        value === "Service"
          ? "bg-blue-100 text-blue-700"
          : "bg-purple-100 text-purple-700"
      }`}>
        {value}
      </Badge>
    ),
  },
  {
    key: "category",
    title: "Category",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "unitPrice",
    title: "Unit Price",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700">
        {value ? `₦${value.toLocaleString()}` : "-"}
      </span>
    ),
  },
  {
    key: "incomeAccountName",
    title: "Income Account",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "isActive",
    title: "Status",
    className: "text-xs",
    render: (value) => (
      <Badge className={`px-3 py-1 rounded-full font-medium ${
        value
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700"
      }`}>
        {value ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "",
    className: "w-8 text-xs",
    render: (_, row) => <ItemsActions row={row} />,
    searchable: false,
  },
];
