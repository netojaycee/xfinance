import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";

export const payrollRecordsColumns: Column<any>[] = [
  {
    key: "employee",
    title: "Employee",
    className: "text-xs",
    render: (value, row) => (
      <div>
        <div className="font-medium text-gray-900 line-clamp-1">
          {row.employee}
        </div>
        <div className="text-xs text-gray-400 line-clamp-1">
          Pay Date: {row.payDate}
        </div>
      </div>
    ),
  },
  {
    key: "role",
    title: "Role",
    className: "text-xs",
    render: (value) => <span className="text-gray-700">{value}</span>,
  },
  {
    key: "basicSalary",
    title: "Basic Salary",
    className: "text-xs",
    render: (value) => {
      typeof value !== "number" ? (
        <span className="text-gray-700">--</span>
      ) : (
        <span className="text-green-600 font-medium">
          ${value.toLocaleString()}
        </span>
      );
    },
  },
  {
    key: "allowances",
    title: "Allowances",
    className: "text-xs",
    render: (value) => {
      typeof value !== "number" ? (
        <span className="text-gray-700">--</span>
      ) : (
        <span className="text-green-600 font-medium">
          +${value.toLocaleString()}
        </span>
      );
    },
  },
  {
    key: "deductions",
    title: "Deductions",
    className: "text-xs",
    render: (value, row) =>
      typeof value !== "number" ? (
        <span className="text-gray-700">--</span>
      ) : (
        <div>
          <span className="text-red-600 font-medium">
            -${value.toLocaleString()}
          </span>
          <div className="text-xs text-gray-400">
            Stat:{" "}
            {typeof row.deductionsStat === "number"
              ? `$${row.deductionsStat.toLocaleString()}`
              : "--"}{" "}
            | Other:{" "}
            {typeof row.deductionsOther === "number"
              ? `$${row.deductionsOther.toLocaleString()}`
              : "--"}
          </div>
        </div>
      ),
  },
  {
    key: "netPay",
    title: "Net Pay",
    className: "text-xs",
    render: (value) => {
      typeof value !== "number" ? (
        <span className="text-gray-700">--</span>
      ) : (
        <span className="text-blue-900 font-medium">
          ${value.toLocaleString()}
        </span>
      );
    },
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => {
      if (value === "Processed") {
        return (
          <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Processed
          </Badge>
        );
      }
      if (value === "Pending") {
        return (
          <Badge className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
            Pending
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
