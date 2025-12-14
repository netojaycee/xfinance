import {
  LayoutDashboard,
  Building,
  CreditCard,
  BarChart3,
  BookCheck,
  FileText,
  Users,
  UserCog,
  ShoppingCart,
  Briefcase,
  Package,
  Store,
  Landmark,
  Settings,
  FilePieChart,
  Home,
  Zap,
  BookCopy,
  AreaChart,
  BookUser,
} from 'lucide-react';

export const superAdminMenu = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    url: '/dashboard',
  },
  {
    title: 'Companies',
    icon: Building,
    url: '/companies',
  },
  {
    title: 'Subscription',
    icon: CreditCard,
    url: '/subscription',
  },
];

export const adminMenu = [
  {
    title: 'Overview',
    icon: BarChart3,
    url: '/dashboard',
  },
  {
    title: 'Consolidation',
    icon: BookCheck,
    url: '/consolidation',
  },
  {
    title: 'Group Reports',
    icon: FileText,
    url: '/group-reports',
  },
  {
    title: 'Budgeting & Forecasts',
    icon: FilePieChart,
    url: '/budgeting',
  },
  {
    title: 'Master Chart of Accounts',
    icon: BookUser,
    url: '/master-chart-of-accounts',
  },
  {
    title: 'Admin',
    icon: UserCog,
    url: '/admin',
  },
];

export const userMenu = [
  {
    title: 'Dashboard',
    icon: Home,
    url: '/dashboard',
    requiredPermission: 'dashboard:view',
  },
  {
    title: 'Sales',
    icon: ShoppingCart,
    url: '/sales',
    requiredPermissions: [
      'sales:customers:view',
      'sales:invoices:view',
      'sales:paymentRecieved:view',
      'sales:creditNotes:view',
    ],
  },
  {
    title: 'Purchases',
    icon: Briefcase,
    url: '/purchases',
    requiredPermissions: [
      'purchases:vendors:view',
      'purchases:bills:view',
      'purchases:paymentMade:view',
      'purchases:expenses:view',
      'purchases:debitNotes:view',
    ],
  },
  {
    title: 'Products',
    icon: Package,
    url: '/products',
    requiredPermissions: [
      'products:items:view',
      'products:collections:view',
      'products:inventory:view',
      'products:orders:view',
    ],
  },
  {
    title: 'Quick Sale',
    icon: Zap,
    url: '/quick-sale',
    requiredPermission: 'quickSale:quickSale:view',
  },
  {
    title: 'Online Store',
    icon: Store,
    url: '/online-store',
    requiredPermission: 'onlineStore:onlineStoreManagement:view',
  },
  {
    title: 'Banking',
    icon: Landmark,
    url: '/banking',
    requiredPermissions: [
      'banking:bankingOverview:view',
      'banking:bankAccounts:view',
      'banking:reconciliation:view',
    ],
  },
  {
    title: 'HR & Payroll',
    icon: Users,
    url: '/hr',
    requiredPermissions: [
      'hrAndPayroll:employees:view',
      'hrAndPayroll:attendance:view',
      'hrAndPayroll:payroll:view',
      'hrAndPayroll:manageLeave:view',
    ],
  },
  {
    title: 'Accounts',
    icon: BookCopy,
    url: '/accounts',
    requiredPermissions: [
      'accounts:chartOfAccounts:view',
      'accounts:openingBalance:view',
      'accounts:manualJournal:view',
      'accounts:currencyAdjustment:view',
      'accounts:Budget:view',
    ],
  },
  {
    title: 'Reports',
    icon: AreaChart,
    url: '/reports',
    requiredPermissions: [
      'reports:reportsCenter:view',
      'reports:profitAndLoss:view',
      'reports:balanceSheet:view',
      'reports:cashFlowStatement:view',
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    url: '/settings',
    requiredPermissions: [
      'settings:organization:view',
      'settings:usersAndRoles:view',
      'settings:setupAndConfiguration:view',
      'settings:salesSettings:view',
      'settings:purchaseSettings:view',
      'settings:product:view',
      'settings:tax:view',
      'settings:generalSettings:view',
      'settings:emailSettings:view',
    ],
  },
];
