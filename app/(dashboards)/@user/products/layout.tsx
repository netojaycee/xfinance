import RouteTabNav from "@/components/local/custom/route-tab-nav";
import { PERMISSIONS } from "@/lib/utils/permissions";

export default function SalesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      label: "Items",
      href: "/products/items",
      permission: PERMISSIONS.PRODUCTS_ITEMS_VIEW,
    },
    {
      label: "Collections",
      href: "/products/collections",
      permission: PERMISSIONS.PRODUCTS_COLLECTIONS_VIEW,
    },
    {
      label: "Inventory",
      href: "/products/inventory",
      permission: PERMISSIONS.PRODUCTS_INVENTORY_VIEW,
    },
    {
      label: "Orders",
      href: "/products/orders",
      permission: PERMISSIONS.PRODUCTS_ORDERS_VIEW,
    },
  ];
  return (
    <>
      <RouteTabNav tabs={tabs} />
      <main className="p-4">{children}</main>
    </>
  );
}
