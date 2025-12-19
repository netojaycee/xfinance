"use client";
import { Column } from "@/components/local/custom/custom-table";
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
import { customers } from "./Assets";
import { Badge } from "@/components/ui/badge";

export const assetsColumns: Column<(typeof customers)[0]>[] = [
  {
    key: "name",
    title: "Customer",

    className: "text-xs",

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
    className: "text-xs",

    render: (value, row) => (
      <div className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1 text-sm text-gray-700">
          <Mail className="w-3 h-3" />
          {row.email}
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Phone className="w-3 h-3" />
          {row.phone}
        </span>
      </div>
    ),
  },
  {
    key: "location",
    title: "Location",
    className: "text-xs",

    render: (value) => (
      <span className="flex items-center gap-1 text-gray-700">
        <MapPin className="w-3 h-3" />
        {value}
      </span>
    ),
  },
  { key: "invoices", title: "Invoices", className: "text-xs" },
  {
    key: "outstanding",
    title: "Outstanding",
    className: "text-xs",

    render: (value) => (
      <span className="font-normal text-gray-700">
        {new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(value)}
      </span>
    ),
  },
  {
    key: "status",
    title: "Status",
    className: "text-xs",

    render: (value) => (
      <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
        {value}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "",
    className: "w-8 text-xs",

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
  },
];
