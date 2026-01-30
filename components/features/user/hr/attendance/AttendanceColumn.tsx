import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import { Employee } from "./utils/types";
import { getInitials } from "@/lib/utils";

export const attendanceColumns: Column<Employee>[] = [
  {
    key: "name",
    title: "Employee",
    className: "text-xs",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-gray-500 font-semibold text-base">
          {getInitials(row.name)}
        </div>
        <span className="font-medium text-gray-900 line-clamp-1">{row.name}</span>
      </div>
    ),
  },
  {
    key: "date",
    title: "Date",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700">{value || "-"}</span>
    ),
  },
  {
    key: "checkIn",
    title: "Check In",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700">{value || "-"}</span>
    ),
  },
  {
    key: "checkOut",
    title: "Check Out",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700">{value || "-"}</span>
    ),
  },
  {
    key: "hours",
    title: "Hours",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700">{value !== undefined && value !== null ? value : "-"}</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => {
      if (value === "Present") {
        return (
          <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Present
          </Badge>
        );
      }
      if (value === "On Leave") {
        return (
          <Badge className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-medium">
            On Leave
          </Badge>
        );
      }
      return (
        <Badge className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
          {value}
        </Badge>
      );
    },
  },
];