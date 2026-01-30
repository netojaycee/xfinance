import RouteTabNav from "@/components/local/custom/route-tab-nav";
import { PERMISSIONS } from "@/lib/utils/permissions";

export default function AccountsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [
    {
      label: "Chart of Accounts",
      href: "/accounts/chart-of-accounts",
      permission: PERMISSIONS.ACCOUNTS_CHART_OF_ACCOUNTS_VIEW,
    },
    {
      label: "Opening Balance",
      href: "/accounts/opening-balance",
      permission: PERMISSIONS.ACCOUNTS_OPENING_BALANCE_VIEW,
    },
    {
      label: "Manual Journal",
      href: "/accounts/manual-journal",
      permission: PERMISSIONS.ACCOUNTS_MANUAL_JOURNAL_VIEW,
    },
    {
      label: "Currency Adjustment",
      href: "/accounts/currency-adjustment",
      permission: PERMISSIONS.ACCOUNTS_CURRENCY_ADJUSTMENT_VIEW,
    },
    {
      label: "Budget",
      href: "/accounts/budget",
      permission: PERMISSIONS.ACCOUNTS_BUDGET_VIEW,
    },
  ];
  return (
    <>
      <RouteTabNav tabs={tabs} />
      <main className="p-4">{children}</main>
    </>
  );
}
