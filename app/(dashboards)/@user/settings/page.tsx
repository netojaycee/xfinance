"use client";

import { CustomTabs, type Tab } from "@/components/local/custom/tabs";
import Organization from "@/components/features/user/settings/organization/Organization";
import SetupConfig from "@/components/features/user/settings/setupConfig/SetupConfig";
import Purchases from "@/components/features/user/settings/purchases/Purchases";
import Sales from "@/components/features/user/settings/sales/Sales";

const settingsTabs: Tab[] = [
  {
    title: "Organization",
    value: "organization",
    content: <Organization />,
  },
  {
    title: "Setup & Config",
    value: "setup-config",
    content: <SetupConfig />,
  },
  {
    title: "Modules",
    value: "modules",
    content: <div className="p-4">Modules - Coming soon</div>,
  },
  {
    title: "Income",
    value: "income",
    content: <Sales />,
  },
  {
    title: "Expense",
    value: "expense",
    content: <Purchases />,
  },
  {
    title: "Email",
    value: "email",
    content: <div className="p-4">Email - Coming soon</div>,
  },
  {
    title: "Product",
    value: "product",
    content: <div className="p-4">Product - Coming soon</div>,
  },
  {
    title: "Tax",
    value: "tax",
    content: <div className="p-4">Tax - Coming soon</div>,
  },
  {
    title: "Payroll",
    value: "payroll",
    content: <div className="p-4">Payroll - Coming soon</div>,
  },
];

export default function SettingsPage() {
  return (
    <>
      <div className="">
        <CustomTabs tabs={settingsTabs} storageKey="settings-tab" variant="route" />
      </div>
    </>
  );
}
