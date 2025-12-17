import RouteTabNav from "@/components/local/custom/route-tab-nav";
import { PERMISSIONS } from "@/lib/utils/permissions";

export default function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      label: "Customers",
      href: "/sales/customers",
      permission: PERMISSIONS.SALES_CUSTOMERS_VIEW,
    },
    {
      label: "Invoices",
      href: "/sales/invoices",
      permission: PERMISSIONS.SALES_INVOICES_VIEW,
    },
    {
      label: "Payment Received",
      href: "/sales/payment-received",
      permission: PERMISSIONS.SALES_PAYMENT_RECEIVED_VIEW,
    },
    {
      label: "Sales Receipt",
      href: "/sales/sales-receipt",
      permission: PERMISSIONS.SALES_CREDIT_NOTES_VIEW,
    },
  ];
  return (
    <>
      <RouteTabNav tabs={tabs} />
      <main className="p-4">{children}</main>
    </>
  );
}
