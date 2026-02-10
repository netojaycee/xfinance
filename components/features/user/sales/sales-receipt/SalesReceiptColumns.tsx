import {
  Eye,
  DollarSign,
  Edit3,
  Send,
  Download,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Column } from "@/components/local/custom/custom-table";

const statusColors: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Void: "bg-red-100 text-red-700",
};

export const SalesReceiptColumns: Column<any>[] = [
  { key: "id", title: "Receipt No.", className: "text-xs" },
  { key: "customer", title: "Customer", className: "text-xs" },
  {
    key: "date",
    title: "Date",
    className: "text-xs",
    render: (value) =>
      value
        ? new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "",
  },
  { key: "paymentMethod", title: "Payment Method", className: "text-xs" },
  {
    key: "total",
    title: "Amount",
    className: "text-xs",
    render: (value) => (
      <span className="text-xs">
        ₦
        {(value / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        k
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => (
      <Badge
        className={
          value === "Completed"
            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-medium"
            : "bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-medium"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    className: "w-8 text-xs",
    render: (_, row) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            className="text-xs"
            onSelect={(e) => {
              e.preventDefault();
              console.log("view", row.id);
            }}
          >
            <Eye className="size-4 mr-2" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onSelect={(e) => {
              e.preventDefault();
              console.log("print", row.id);
            }}
          >
            <Download className="size-4 mr-2" /> Print Receipt
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs"
            onSelect={(e) => {
              e.preventDefault();
              console.log("email", row.id);
            }}
          >
            <Send className="size-4 mr-2" /> Email Receipt
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-xs text-red-500"
            onSelect={(e) => {
              e.preventDefault();
              console.log("void", row.id);
            }}
          >
            <Trash2 className="size-4 mr-2" /> Void Receipt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    searchable: false,
  },
];
