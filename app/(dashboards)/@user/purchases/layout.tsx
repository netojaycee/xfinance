import RouteTabNav from "@/components/local/custom/route-tab-nav";
import { PERMISSIONS } from "@/lib/utils/permissions";

export default function PurchasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      label: "Vendors",
      href: "/purchases/vendors",
      permission: PERMISSIONS.PURCHASES_VENDORS_VIEW,
    },
    {
      label: "Expenses",
      href: "/purchases/expenses",
      permission: PERMISSIONS.PURCHASES_EXPENSES_VIEW,
    },
    {
      label: "Bills",
      href: "/purchases/bills",
      permission: PERMISSIONS.PURCHASES_BILLS_VIEW,
    },
    {
      label: "Payment Made",
      href: "/purchases/payment-made",
      permission: PERMISSIONS.PURCHASES_PAYMENT_MADE_VIEW,
    },
  ];
  return (
    <>
      <RouteTabNav tabs={tabs} />
      <main className="p-4">{children}</main>
    </>
  );
}
