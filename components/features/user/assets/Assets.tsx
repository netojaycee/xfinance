"use client";
import { assetsColumns } from "./AssetsColumns";
import CustomersHeader from "./AssetsHeader";
import { CustomTable } from "@/components/local/custom/custom-table";


export const customers = [
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



export default function Assets() {
  return (
    <div className="space-y-6">
      <CustomersHeader />
      {/* Placeholder for customers table/list - import and implement later */}
      <CustomTable
        searchPlaceholder="Search assets..."
        tableTitle="All Assets"
        columns={assetsColumns}
        data={customers}
        pageSize={10}
      />
    </div>
  );
}
