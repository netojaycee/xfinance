"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PERMISSIONS } from "@/lib/utils/permissions";
import { Can } from "@/components/local/shared/Can";

const tabs = [
  { label: "Invoice", href: "/sales/invoices", permission: PERMISSIONS.SALES_INVOICES_VIEW },
  { label: "Customer", href: "/sales/customers", permission: PERMISSIONS.SALES_CUSTOMERS_VIEW },
  { label: "Payment Received", href: "/sales/payment-received", permission: PERMISSIONS.SALES_PAYMENT_RECEIVED_VIEW },
  { label: "Sales Receipt", href: "/sales/sales-receipt", permission: PERMISSIONS.SALES_CREDIT_NOTES_VIEW }, // Adjust if different
];

export function TabsNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 border-b">
      {tabs.map((tab) => (
        <Can key={tab.href} do={tab.permission}>
          <Link
            href={tab.href}
            prefetch
            className={cn(
              "px-4 py-2 text-sm font-medium",
              pathname === tab.href && "border-b-2 border-primary"
            )}
          >
            {tab.label}
          </Link>
        </Can>
      ))}
    </div>
  );
}