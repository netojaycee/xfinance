"use client";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Eye,
  Edit3,
  FilePlus,
  FileText,
  Trash2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
// ...existing code...
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import { Employee } from "./utils/types";
import { getInitials } from "@/lib/utils";

export const employeesColumns: Column<Employee>[] = [
  {
    key: "name",
    title: "Employee",
    className: "text-xs",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-gray-500 font-semibold text-base">
          {getInitials(row.name)}
        </div>
        <div>
          <div className="font-medium text-gray-900 line-clamp-1">{row.name}</div>
          <div className="text-xs text-gray-500 line-clamp-1">{row.type}</div>
          <div className="text-xs text-gray-400 line-clamp-1">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    title: "Department",
    className: "text-xs",
    render: (_, row) => (
      <span className="text-gray-700">{row.department}</span>
    ),
  },
  {
    key: "salary",
    title: "Salary",
    className: "text-xs",
    render: (value) => (
      <span className="font-normal text-gray-700">
        {typeof value === "number"
          ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value)
          : value}
      </span>
    ),
  },
  {
    key: "isActive",
    title: "Status",
    className: "text-xs",
    render: (value) => (
      <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
        {value ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "",
    className: "w-32 text-xs",
    render: (_, row) => (
      <Button variant="outline" className="flex items-center gap-2 px-4 py-1 text-xs border-gray-200" onClick={() => {/* handle view profile */}}>
        <Eye className="w-4 h-4" /> View Profile
      </Button>
    ),
    searchable: false,
  },
];
