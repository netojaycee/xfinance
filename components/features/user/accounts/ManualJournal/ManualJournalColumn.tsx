import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/local/custom/custom-table";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const manualJournalColumns: Column<any>[] = [
  {
    key: "entryNumber",
    title: "Entry #",
    className: "text-xs font-medium",
    render: (value) => (
      <span className="text-gray-900 font-semibold">{value}</span>
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
    key: "description",
    title: "Description",
    className: "text-xs",
    render: (value) => (
      <span className="text-gray-700 line-clamp-2">{value || "-"}</span>
    ),
  },
  {
    key: "debit",
    title: "Debit",
    className: "text-xs text-right",
    render: (value) => (
      <span className="text-gray-900 font-medium">
        {value ? `$${parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00"}
      </span>
    ),
  },
  {
    key: "credit",
    title: "Credit",
    className: "text-xs text-right",
    render: (value) => (
      <span className="text-gray-900 font-medium">
        {value ? `$${parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "$0.00"}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => {
      if (value === "Posted") {
        return (
          <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Posted
          </Badge>
        );
      }
      if (value === "Draft") {
        return (
          <Badge className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
            Draft
          </Badge>
        );
      }
      if (value === "Reversed") {
        return (
          <Badge className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
            Reversed
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
  {
    key: "actions",
    title: "Actions",
    className: "w-20 text-xs",
    render: (_, row) => (
      <div className="flex gap-2 items-center">
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <Eye className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-gray-100"
          disabled={row.status === "Posted"}
        >
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-red-100 text-red-600"
          disabled={row.status === "Posted"}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
    searchable: false,
  },
];