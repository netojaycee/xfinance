import { Badge } from "@/components/ui/badge";
import { DollarSign, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type BillRow = {
  billNo: string;
  date: string;
  vendor: string;
  dueDate: string;
  amount: string;
  status: "Unpaid" | "Paid" | string;
};

type BillColumn = {
  key: string;
  title: string;
  className?: string;
  render: (value: unknown, row?: BillRow) => React.ReactNode;
};

export const billsColumns: BillColumn[] = [
  {
    key: "billNo",
    title: "Bill #",
    className: "text-xs",
    render: (value: unknown) => (
      <span className="text-xs font-medium">{value as string}</span>
    ),
  },
  {
    key: "date",
    title: "Date",
    className: "text-xs",
    render: (value: unknown) => (
      <span className="text-xs">{value as string}</span>
    ),
  },
  {
    key: "vendor",
    title: "Vendor",
    className: "text-xs",
    render: (value: unknown) => (
      <span className="text-xs font-medium">{value as string}</span>
    ),
  },
  {
    key: "dueDate",
    title: "Due Date",
    className: "text-xs",
    render: (value: unknown) => (
      <span className="text-xs">{value as string}</span>
    ),
  },
  {
    key: "amount",
    title: "Amount",
    className: "text-xs",
    render: (value: unknown) => (
      <span className="text-xs font-semibold">{value as string}</span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",
    render: (value: unknown) => {
      const status = value as string;
      let badgeClass = "";
      let text = status;
      if (status === "Paid") badgeClass = "bg-green-100 text-green-700";
      else if (status === "Unpaid")
        badgeClass = "bg-yellow-100 text-yellow-700";
      else badgeClass = "bg-gray-100 text-gray-700";
      return (
        <Badge
          className={`${badgeClass} px-3 py-1 rounded-full text-xs font-medium`}
        >
          {text}
        </Badge>
      );
    },
  },
  {
    key: "actions",
    title: "Actions",
    className: "text-xs text-center",
    render: (_: unknown, row?: BillRow) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert(`View bill: ${row?.billNo}`)}>
            {" "}
            <Eye className="w-5 h-5" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => alert(`Make payment for: ${row?.billNo}`)}
          >
            <DollarSign className="w-5 h-5" /> Make Payment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
