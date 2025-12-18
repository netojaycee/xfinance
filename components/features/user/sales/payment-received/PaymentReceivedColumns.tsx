import {
  Eye, DollarSign, Edit3, Send, Download, Trash2, MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Column } from "@/components/local/custom/custom-table";


export const paymentReceived = [
  {
    id: "INV-2025-1248",
    customer: "Acme Corporation",
    date: "2025-11-01",
    dueDate: "2025-11-30",
    amount: 24500,
    status: "Sent",
  },
  {
    id: "INV-2025-1247",
    customer: "Global Tech Inc",
    date: "2025-10-28",
    dueDate: "2025-11-27",
    amount: 18750,
    status: "Paid",
  },
  {
    id: "INV-2025-1246",
    customer: "StartupXYZ",
    date: "2025-10-25",
    dueDate: "2025-10-25",
    amount: 8900,
    status: "Overdue",
  },
  {
    id: "INV-2025-1245",
    customer: "Enterprise Solutions Ltd",
    date: "2025-10-22",
    dueDate: "2025-11-21",
    amount: 42000,
    status: "Sent",
  },
  {
    id: "INV-2025-1244",
    customer: "Digital Dynamics",
    date: "2025-10-20",
    dueDate: "2025-11-19",
    amount: 15600,
    status: "Paid",
  },
  {
    id: "INV-2025-1243",
    customer: "CloudFirst Inc",
    date: "2025-10-15",
    dueDate: "2025-10-15",
    amount: 9300,
    status: "Overdue",
  },
  {
    id: "INV-2025-1242",
    customer: "TechVentures LLC",
    date: "2025-10-12",
    dueDate: "2025-11-11",
    amount: 32500,
    status: "Sent",
  },
  {
    id: "INV-2025-1241",
    customer: "Innovation Labs",
    date: "2025-10-10",
    dueDate: "2025-11-09",
    amount: 21200,
    status: "Paid",
  },
  {
    id: "INV-2025-1240",
    customer: "DataStream Corp",
    date: "2025-10-08",
    dueDate: "2025-11-07",
    amount: 16800,
    status: "Draft",
  },
  {
    id: "INV-2025-1239",
    customer: "NextGen Solutions",
    date: "2025-10-05",
    dueDate: "2025-11-04",
    amount: 28900,
    status: "Paid",
  },
];


const statusColors: Record<string, string> = {
  Sent: "bg-indigo-100 text-indigo-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};

export const PaymentReceivedColumns: Column<(typeof paymentReceived)[0]>[] = [
  { key: "id", title: "Invoice #" },
  { key: "customer", title: "Customer" },
  { key: "date", title: "Date" },
  { key: "dueDate", title: "Due Date" },
  {
    key: "amount",
    title: "Amount",
    render: (value) => (
      <span>
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (value) => (
      <Badge className={`${statusColors[value] || ""} px-3 py-1 rounded-full text-[10px] font-medium`}>
        {value}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "",
    render: (_, row) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onSelect={e => { e.preventDefault(); console.log("view", row.id); }}>
            <Eye className="size-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={e => { e.preventDefault(); console.log("record payment", row.id); }}>
            <DollarSign className="size-4 mr-2" /> Record payment
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={e => { e.preventDefault(); console.log("edit", row.id); }}>
            <Edit3 className="size-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={e => { e.preventDefault(); console.log("send", row.id); }}>
            <Send className="size-4 mr-2" /> Send to customer
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={e => { e.preventDefault(); console.log("download", row.id); }}>
            <Download className="size-4 mr-2" /> Download PDF
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-variant="destructive" onSelect={e => { e.preventDefault(); console.log("delete", row.id); }}>
            <Trash2 className="size-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    searchable: false,
    className: "w-8",
  },
];