import { PermissibleTab } from "@/lib/utils/tab-utils";
import React from "react";

// --- Sales Tabs ---
export const salesTabs: PermissibleTab[] = [
  {
    title: "Customers",
    value: "customers",
    permission: "sales:customers:view",
    content: "<div>Customers Content Here</div>",
  },
  {
    title: "Invoices",
    value: "invoices",
    permission: "sales:invoices:view",
    content: "<div>Invoices Content Here</div>",
  },
  {
    title: "Payment Received",
    value: "paymentRecieved",
    permission: "sales:paymentRecieved:view",
    content: "<div>Payment Received Content Here</div>",
  },
  {
    title: "Credit Notes",
    value: "creditNotes",
    permission: "sales:creditNotes:view",
    content: "<div>Credit Notes Content Here</div>",
  },
];

// --- Purchases Tabs ---
export const purchasesTabs: PermissibleTab[] = [
  {
    title: "Vendors",
    value: "vendors",
    permission: "purchases:vendors:view",
    content: "<div>Vendors Content Here</div>",
  },
  {
    title: "Bills",
    value: "bills",
    permission: "purchases:bills:view",
    content: "<div>Bills Content Here</div>",
  },
  {
    title: "Payment Made",
    value: "paymentMade",
    permission: "purchases:paymentMade:view",
    content: "<div>Payment Made Content Here</div>",
  },
  {
    title: "Expenses",
    value: "expenses",
    permission: "purchases:expenses:view",
    content: "<div>Expenses Content Here</div>",
  },
  {
    title: "Debit Notes",
    value: "debitNotes",
    permission: "purchases:debitNotes:view",
    content: "<div>Debit Notes Content Here</div>",
  },
];

// --- Products Tabs ---
export const productsTabs: PermissibleTab[] = [
  {
    title: "Items",
    value: "items",
    permission: "products:items:view",
    content: "<div>Items Content Here</div>",
  },
  {
    title: "Collections",
    value: "collections",
    permission: "products:collections:view",
    content: "<div>Collections Content Here</div>",
  },
  {
    title: "Inventory",
    value: "inventory",
    permission: "products:inventory:view",
    content: "<div>Inventory Content Here</div>",
  },
  {
    title: "Orders",
    value: "orders",
    permission: "products:orders:view",
    content: "<div>Orders Content Here</div>",
  },
];

// --- HR & Payroll Tabs ---
export const hrAndPayrollTabs: PermissibleTab[] = [
  {
    title: "Employees",
    value: "employees",
    permission: "hrAndPayroll:employees:view",
    content: "<div>Employees Content Here</div>",
  },
  {
    title: "Attendance",
    value: "attendance",
    permission: "hrAndPayroll:attendance:view",
    content: "<div>Attendance Content Here</div>",
  },
  {
    title: "Payroll",
    value: "payroll",
    permission: "hrAndPayroll:payroll:view",
    content: "<div>Payroll Content Here</div>",
  },
  {
    title: "Manage Leave",
    value: "manageLeave",
    permission: "hrAndPayroll:manageLeave:view",
    content: "<div>Manage Leave Content Here</div>",
  },
];

// --- Accounts Tabs ---
export const accountsTabs: PermissibleTab[] = [
  {
    title: "Chart Of Accounts",
    value: "chartOfAccounts",
    permission: "accounts:chartOfAccounts:view",
    content: "<div>Chart Of Accounts Content Here</div>",
  },
  {
    title: "Opening Balance",
    value: "openingBalance",
    permission: "accounts:openingBalance:view",
    content: "<div>Opening Balance Content Here</div>",
  },
  {
    title: "Manual Journal",
    value: "manualJournal",
    permission: "accounts:manualJournal:view",
    content: "<div>Manual Journal Content Here</div>",
  },
  {
    title: "Currency Adjustment",
    value: "currencyAdjustment",
    permission: "accounts:currencyAdjustment:view",
    content: "<div>Currency Adjustment Content Here</div>",
  },
  {
    title: "Budget",
    value: "Budget",
    permission: "accounts:Budget:view",
    content: "<div>Budget Content Here</div>",
  },
];

// --- Banking Tabs ---
export const bankingTabs: PermissibleTab[] = [
  {
    title: "Banking Overview",
    value: "bankingOverview",
    permission: "banking:bankingOverview:view",
    content: "<div>Banking Overview Content Here</div>",
  },
  {
    title: "Bank Accounts",
    value: "bankAccounts",
    permission: "banking:bankAccounts:view",
    content: "<div>Bank Accounts Content Here</div>",
  },
  {
    title: "Reconciliation",
    value: "reconciliation",
    permission: "banking:reconciliation:view",
    content: "<div>Reconciliation Content Here</div>",
  },
];

// --- Reports Tabs ---
export const reportsTabs: PermissibleTab[] = [
  {
    title: "Reports Center",
    value: "reportsCenter",
    permission: "reports:reportsCenter:view",
    content: "<div>Reports Center Content Here</div>",
  },
  {
    title: "Profit And Loss",
    value: "profitAndLoss",
    permission: "reports:profitAndLoss:view",
    content: "<div>Profit And Loss Content Here</div>",
  },
  {
    title: "Balance Sheet",
    value: "balanceSheet",
    permission: "reports:balanceSheet:view",
    content: "<div>Balance Sheet Content Here</div>",
  },
  {
    title: "Cash Flow Statement",
    value: "cashFlowStatement",
    permission: "reports:cashFlowStatement:view",
    content: "<div>Cash Flow Statement Content Here</div>",
  },
];

// --- Settings Tabs ---
export const settingsTabs: PermissibleTab[] = [
  {
    title: "Organization",
    value: "organization",
    permission: "settings:organization:view",
    content: "<div>Organization Content Here</div>",
  },
  {
    title: "Users And Roles",
    value: "usersAndRoles",
    permission: "settings:usersAndRoles:view",
    content: "<div>Users And Roles Content Here</div>",
  },
  {
    title: "Setup And Configuration",
    value: "setupAndConfiguration",
    permission: "settings:setupAndConfiguration:view",
    content: "<div>Setup And Configuration Content Here</div>",
  },
  {
    title: "Sales Settings",
    value: "salesSettings",
    permission: "settings:salesSettings:view",
    content: "<div>Sales Settings Content Here</div>",
  },
  {
    title: "Purchase Settings",
    value: "purchaseSettings",
    permission: "settings:purchaseSettings:view",
    content: "<div>Purchase Settings Content Here</div>",
  },
  {
    title: "Product",
    value: "product",
    permission: "settings:product:view",
    content: "<div>Product Settings Content Here</div>",
  },
  {
    title: "Tax",
    value: "tax",
    permission: "settings:tax:view",
    content: "<div>Tax Settings Content Here</div>",
  },
  {
    title: "General Settings",
    value: "generalSettings",
    permission: "settings:generalSettings:view",
    content: "<div>General Settings Content Here</div>",
  },
  {
    title: "Email Settings",
    value: "emailSettings",
    permission: "settings:emailSettings:view",
    content: "<div>Email Settings Content Here</div>",
  },
];
