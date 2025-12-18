"use client";
import { Badge } from "@/components/ui/badge";
import CustomersHeader from "./CustomersHeader";
import { Column, CustomTable } from "@/components/local/custom/custom-table";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const customers = [
  {
    id: "CUST-001",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    invoices: 12,
    outstanding: 45000,
    status: "Active",
    initials: "AC",
  },
  {
    id: "CUST-002",
    name: "Tech Solutions Ltd",
    email: "info@techsolutions.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, USA",
    invoices: 8,
    outstanding: 28500,
    status: "Active",
    initials: "TS",
  },
  {
    id: "CUST-003",
    name: "Global Enterprises",
    email: "hello@globalent.com",
    phone: "+1 (555) 345-6789",
    location: "London, UK",
    invoices: 15,
    outstanding: 62000,
    status: "Active",
    initials: "GE",
  },
];

const columns: Column<(typeof customers)[0]>[] = [
  {
    key: "name",
    title: "Customer",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-indigo-200 flex items-center justify-center text-gray-500 font-semibold text-xs">
          {row.initials}
        </div>
        <div>
          <div className="font-normal text-gray-900 text-sm">{row.name}</div>
          <div className="text-xs text-gray-400">{row.id}</div>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    title: "Contact",
    render: (value, row) => (
      <div className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1 text-sm text-gray-700">
         <Mail className="w-3 h-3" />
          {row.email}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Phone className="w-3 h-3" />
          {row.phone}
        </span>
      </div>
    ),
  },
  {
    key: "location",
    title: "Location",
    render: (value) => (
      <span className="flex items-center gap-1 text-sm text-gray-700">
        <MapPin className="w-3 h-3" />
        {value}
      </span>
    ),
  },
  { key: "invoices", title: "Invoices" },
  {
    key: "outstanding",
    title: "Outstanding",
    render: (value) => (
      <span className="font-normal text-gray-700 text-sm">
        {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value)}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    render: (value) => (
      <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-medium">
        {value}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "",
    render: (_, row) => {
      const handleView = () => console.log("view details", row.id);
      const handleEdit = () => console.log("edit", row.id);
      const handleCreateInvoice = () => console.log("create invoice", row.id);
      const handleViewInvoices = () => console.log("view invoices", row.id);
      const handleDelete = () => console.log("delete", row.id);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleView();
              }}
            >
              <Eye className="size-4 mr-2" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              <Edit3 className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleCreateInvoice();
              }}
            >
              <FilePlus className="size-4 mr-2" />
              Create invoice
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleViewInvoices();
              }}
            >
              <FileText className="size-4 mr-2" />
              View invoices
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-variant="destructive"
              onSelect={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    searchable: false,
    className: "w-8",
  },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <CustomersHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable
        searchPlaceholder="Search customers..."
        tableTitle="All Customers"
        columns={columns}
        data={customers}
        pageSize={10}
      />
    </div>
  );
}
