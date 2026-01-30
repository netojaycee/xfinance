import RouteTabNav from "@/components/local/custom/route-tab-nav";
import { PERMISSIONS } from "@/lib/utils/permissions";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      label: "Organization",
      href: "/settings/organization",
      permission: PERMISSIONS.SETTINGS_ORGANIZATION_VIEW,
    },
    {
      label: "Users & Roles",
      href: "/settings/users-and-roles",
      permission: PERMISSIONS.SETTINGS_USERS_AND_ROLES_VIEW,
    },
    {
      label: "Setup & Config",
      href: "/settings/setup-config",
      permission: PERMISSIONS.SETTINGS_SETUP_AND_CONFIGURATION_VIEW,
    },
    {
      label: "Sales",
      href: "/settings/sales",
      permission: PERMISSIONS.SETTINGS_SALES_SETTINGS_VIEW,
    },
    {
      label: "Purchases",
      href: "/settings/purchases",
      permission: PERMISSIONS.SETTINGS_PURCHASE_SETTINGS_VIEW,
    },
    {
      label: "Email",
      href: "/settings/email",
      permission: PERMISSIONS.SETTINGS_EMAIL_SETTINGS_VIEW,
    },
    {
      label: "Product",
      href: "/settings/product",
      permission: PERMISSIONS.SETTINGS_PRODUCT_VIEW,
    },
    {
      label: "Tax",
      href: "/settings/tax",
      permission: PERMISSIONS.SETTINGS_TAX_VIEW,
    },
    {
      label: "Payroll",
      href: "/settings/payroll",
      permission: PERMISSIONS.SETTINGS_PAYROLL_SETTINGS_VIEW,
    },
  ];
  return (
    <>
      <RouteTabNav tabs={tabs} />
      <main className="p-4">{children}</main>
    </>
  );
}
