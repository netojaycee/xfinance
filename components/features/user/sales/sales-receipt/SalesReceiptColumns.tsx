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

export const salesReceipts = [
  {
    id: "RCP-2025-001",
    customer: "Walk-in Customer",
    date: "Dec 10, 2025",
    paymentMethod: "Cash",
    amount: 45000,
    status: "Completed",
  },
  {
    id: "RCP-2025-002",
    customer: "John Doe",
    date: "Dec 10, 2025",
    paymentMethod: "Card",
    amount: 28500,
    status: "Completed",
  },
  {
    id: "RCP-2025-003",
    customer: "Jane Smith",
    date: "Dec 9, 2025",
    paymentMethod: "Bank Transfer",
    amount: 67200,
    status: "Completed",
  },
  {
    id: "RCP-2025-004",
    customer: "Walk-in Customer",
    date: "Dec 9, 2025",
    paymentMethod: "Cash",
    amount: 15000,
    status: "Completed",
  },
  {
    id: "RCP-2025-005",
    customer: "Michael Johnson",
    date: "Dec 8, 2025",
    paymentMethod: "Mobile Money",
    amount: 92500,
    status: "Completed",
  },
  {
    id: "RCP-2025-006",
    customer: "Sarah Williams",
    date: "Dec 8, 2025",
    paymentMethod: "Card",
    amount: 34000,
    status: "Void",
  },
  {
    id: "RCP-2025-007",
    customer: "Walk-in Customer",
    date: "Dec 7, 2025",
    paymentMethod: "Cash",
    amount: 21500,
    status: "Completed",
  },
];

const statusColors: Record<string, string> = {
  Sent: "bg-indigo-100 text-indigo-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};

export const SalesReceiptColumns: Column<(typeof salesReceipts)[0]>[] = [
  { key: "id", title: "Receipt No.", className: "text-xs" },
  { key: "customer", title: "Customer", className: "text-xs" },
  { key: "date", title: "Date", className: "text-xs" },
  { key: "paymentMethod", title: "Payment Method", className: "text-xs" },
  {
    key: "amount",
    title: "Amount",
    className: "text-xs",
    render: (value) => (
      <span className="text-xs">₦{(value / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}k</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value) => (
      <Badge className={
        value === "Completed"
          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-medium"
          : "bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-medium"
      }>
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
          <DropdownMenuItem className="text-xs" onSelect={e => { e.preventDefault(); console.log("view", row.id); }}>
            <Eye className="size-4 mr-2" /> View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs" onSelect={e => { e.preventDefault(); console.log("print", row.id); }}>
            <Download className="size-4 mr-2" /> Print Receipt
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs" onSelect={e => { e.preventDefault(); console.log("email", row.id); }}>
            <Send className="size-4 mr-2" /> Email Receipt
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-red-500" onSelect={e => { e.preventDefault(); console.log("void", row.id); }}>
            <Trash2 className="size-4 mr-2" /> Void Receipt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    searchable: false,
  },
];
