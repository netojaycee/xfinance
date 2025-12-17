"use client";
import { Badge } from "@/components/ui/badge";
import CustomersHeader from "./CustomersHeader";
import { Column, CustomTable } from "@/components/local/custom/custom-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";


const customers = [
  {
    id: 'CUST-001',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    invoices: 12,
    outstanding: 45000,
    status: 'Active',
    initials: 'AC',
  },
  {
    id: 'CUST-002',
    name: 'Tech Solutions Ltd',
    email: 'info@techsolutions.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, USA',
    invoices: 8,
    outstanding: 28500,
    status: 'Active',
    initials: 'TS',
  },
  {
    id: 'CUST-003',
    name: 'Global Enterprises',
    email: 'hello@globalent.com',
    phone: '+1 (555) 345-6789',
    location: 'London, UK',
    invoices: 15,
    outstanding: 62000,
    status: 'Active',
    initials: 'GE',
  },
];

const columns: Column<typeof customers[0]>[] = [
  {
    key: 'name',
    title: 'Customer',
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-base">
          {row.initials}
        </div>
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-xs text-gray-400">{row.id}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'email',
    title: 'Contact',
    render: (value, row) => (
      <div className="flex flex-col gap-0.5">
        <span className="flex items-center gap-1 text-sm text-gray-700">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15Zm1.75.75 8.25 6.5 8.25-6.5" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {row.email}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15Zm1.75.75 8.25 6.5 8.25-6.5" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {row.phone}
        </span>
      </div>
    ),
  },
  {
    key: 'location',
    title: 'Location',
    render: (value) => (
      <span className="flex items-center gap-1 text-sm text-gray-700">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8Zm0-11a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {value}
      </span>
    ),
  },
  { key: 'invoices', title: 'Invoices' },
  {
    key: 'outstanding',
    title: 'Outstanding',
    render: (value) => (
      <span className="font-medium text-gray-700">₦{value.toLocaleString()}</span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (value) => (
      <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">{value}</Badge>
    ),
  },
  {
    key: 'actions',
    title: '',
    render: (_, row) => (
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <MoreHorizontal className="w-5 h-5" />
      </Button>
    ),
    searchable: false,
    className: 'w-8',
  },
];


export default function Customers() {
  return (
    <div className="space-y-6">
      <CustomersHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable columns={columns} data={customers} pageSize={10} />
    </div>
  );
}
