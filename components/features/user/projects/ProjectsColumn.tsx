"use client";

import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import { Project } from "./utils/types";
import ProjectsActions from "./ProjectsActions";

/**
 * Table columns configuration for Projects
 * Defines columns for displaying project data in CustomTable component
 */
export const projectsColumns: Column<Project>[] = [
  {
    key: "code",
    title: "Project",
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
    key: "customerName",
    title: "Customer",
    className: "text-xs",
    render: (value, row) => <span className="text-gray-700">{(row as any)?.customer?.name}</span>,
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => {
      const statusStyles = {
        "In_Progress": "bg-blue-100 text-blue-700",
        Completed: "bg-green-100 text-green-700",
        Planning: "bg-purple-100 text-purple-700",
        "On_Hold": "bg-orange-100 text-yellow-700",
      };
      return (
        <Badge className={`px-3 py-1 rounded-full font-medium ${statusStyles[value as keyof typeof statusStyles]}`}>
          {value}
        </Badge>
      );
    },
  },
  {
    key: "startDate",
    title: "Timeline",
    className: "text-xs",
    render: (value, row) => (
      <div className="text-gray-700">
        <div className="text-xs">{new Date(value).toLocaleDateString()}</div>
        <div className="text-xs text-gray-400">
          {new Date(row.endDate).toLocaleDateString()}
        </div>
      </div>
    ),
  },
  {
    key: "budgetedRevenue",
    title: "Budget Revenue",
    className: "text-xs",
    render: (value) => (
      typeof value === "number" && !isNaN(value)
        ? <span className="text-gray-700">₦{(value / 1000).toFixed(2)}K</span>
        : <span className="text-gray-400">--</span>
    ),
  },
  {
    key: "actualRevenue",
    title: "Actual Revenue",
    className: "text-xs",
    render: (value) => (
      typeof value === "number" && !isNaN(value)
        ? <span className="text-green-600 font-medium">₦{(value / 1000).toFixed(2)}K</span>
        : <span className="text-gray-400">--</span>
    ),
  },
  {
    key: "budgetedCost",
    title: "Budget Cost",
    className: "text-xs",
    render: (value) => (
      typeof value === "number" && !isNaN(value)
        ? <span className="text-gray-700">₦{(value / 1000).toFixed(2)}K</span>
        : <span className="text-gray-400">--</span>
    ),
  },
  {
    key: "actualCost",
    title: "Actual Cost",
    className: "text-xs",
    render: (value) => (
      typeof value === "number" && !isNaN(value)
        ? <span className="text-red-600 font-medium">₦{(value / 1000000).toFixed(0)}M</span>
        : <span className="text-gray-400">--</span>
    ),
  },
  {
    key: "profitMargin",
    title: "Margin",
    className: "text-xs",
    render: (value) => (
      typeof value === "number" && !isNaN(value)
        ? <span className="text-gray-700">{value.toFixed(1)}%</span>
        : <span className="text-gray-400">--</span>
    ),
  },
  {
    key: "progress",
    title: "Progress",
    className: "text-xs",
    render: (value) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${value || 0}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-700">{value || 0}%</span>
      </div>
    ),
  },
  {
    key: "actions",
    title: "",
    className: "w-8 text-xs",
    render: (_, row) => <ProjectsActions row={row} />,
    searchable: false,
  },
];
