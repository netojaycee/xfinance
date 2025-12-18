"use client";
import { CustomTable } from "@/components/local/custom/custom-table";
import VendorsHeader from "./VendorsHeader";

// Vendor data and columns
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { vendorColumns } from "./VendorColumns";

export const vendorData = [
  {
    id: "VEN-001",
    name: "Office Supplies Co.",
    initials: "OS",
    email: "sales@officesupplies.com",
    phone: "+1 (555) 111-2222",
    bills: 8,
    outstanding: 15000,
    status: "Active",
  },
  {
    id: "VEN-002",
    name: "Tech Equipment Inc.",
    initials: "TE",
    email: "contact@techequip.com",
    phone: "+1 (555) 222-3333",
    bills: 5,
    outstanding: 32000,
    status: "Active",
  },
  {
    id: "VEN-003",
    name: "Professional Services LLC",
    initials: "PS",
    email: "info@proservices.com",
    phone: "+1 (555) 333-4444",
    bills: 12,
    outstanding: 0,
    status: "Active",
  },
];



export default function Vendors() {
  return (
    <div className="space-y-4">
      <VendorsHeader />
      <CustomTable
        searchPlaceholder="Search vendors..."
        tableTitle="All Vendors"
        columns={vendorColumns}
        data={vendorData}
        pageSize={10}
        display={{
          statusComponent: false,
          filterComponent: false,
          searchComponent: true,
          methodsComponent: false,
        }}
      />
    </div>
  );
}
