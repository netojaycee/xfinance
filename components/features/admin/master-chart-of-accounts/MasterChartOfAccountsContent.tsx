'use client';

import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Data Types
export interface EntityMapping {
  code: string;
  accountCode: string;
  accountName: string;
}

export interface ChartAccount {
  id: string;
  code: string;
  name: string;
  type: 'category' | 'subcategory' | 'account';
  entityMappings?: EntityMapping[];
  children?: ChartAccount[];
}

interface AccountRowProps {
  account: ChartAccount;
  level: number;
  expanded: boolean;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
}

function AccountRow({ account, level, expanded, expandedIds, onToggle }: AccountRowProps) {
  const hasChildren = account.children && account.children.length > 0;
  const isExpandable = account.type !== 'account' && hasChildren;

  const typeVariant = (type: string) => {
    switch (type) {
      case 'category':
        return 'bg-black text-white';
      case 'subcategory':
        return 'bg-gray-200 text-gray-800';
      case 'account':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case 'category':
        return 'Category';
      case 'subcategory':
        return 'Subcategory';
      case 'account':
        return 'Account';
      default:
        return '';
    }
  };

  return (
    <div>
      <div
        className={`flex items-start gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
          level > 0 ? 'bg-gray-50' : 'bg-white'
        }`}
        style={{ paddingLeft: `${24 + level * 20}px` }}
      >
        {/* Expand/Collapse Icon */}
        <div className="shrink-0 pt-1">
          {isExpandable ? (
            <button
              onClick={() => onToggle(account.id)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {expanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>

        {/* Account Code & Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {account.code}
            </span>
            <span className="text-gray-700">
              {account.name}
            </span>
          </div>
        </div>

        {/* Type Badge */}
        <div className="shrink-0">
          <Badge className={`${typeVariant(account.type)} text-xs font-medium`}>
            {typeLabel(account.type)}
          </Badge>
        </div>

        {/* Entity Mappings */}
        <div className="flex-1 flex flex-wrap gap-1.5">
          {account.entityMappings && account.entityMappings.length > 0 ? (
            account.entityMappings.map((mapping, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 border border-indigo-200"
              >
                <span className="font-semibold text-indigo-700 text-xs">
                  {mapping.code}
                </span>
                <span className="text-primary text-xs">
                  {mapping.accountCode} · {mapping.accountName}
                </span>
              </div>
            ))
          ) : (
            <span className="text-xs text-gray-400 italic">—</span>
          )}
        </div>
      </div>

      {/* Render Children */}
      {isExpandable && expanded && account.children && (
        <div>
          {account.children.map((child) => (
            <AccountRow
              key={child.id}
              account={child}
              level={level + 1}
              expanded={expandedIds.has(child.id)}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MasterChartOfAccountsContent() {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(['cat1', 'subcat1']) // Only first category and first subcategory expanded
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Mock hierarchical data matching the images
  const chartData: ChartAccount[] = [
    {
      id: 'cat1',
      code: '1000',
      name: 'Assets',
      type: 'category',
      children: [
        {
          id: 'subcat1',
          code: '1100',
          name: 'Current Assets',
          type: 'subcategory',
          children: [
            {
              id: 'acc1',
              code: '1110',
              name: 'Cash and Cash Equivalents',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '1001', accountName: 'Cash - Operating' },
                { code: 'UK', accountCode: '1010', accountName: 'Bank Current Account' },
                { code: 'DE', accountCode: '1000', accountName: 'Kasse' },
                { code: 'SG', accountCode: '1100', accountName: 'Cash at Bank' },
              ],
            },
            {
              id: 'acc2',
              code: '1120',
              name: 'Accounts Receivable',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '1200', accountName: 'Trade Receivables' },
                { code: 'UK', accountCode: '1100', accountName: 'Debtors' },
                { code: 'DE', accountCode: '1400', accountName: 'Forderungen' },
                { code: 'SG', accountCode: '1200', accountName: 'Trade Debtors' },
              ],
            },
            {
              id: 'acc3',
              code: '1130',
              name: 'Inventory',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '1300', accountName: 'Inventory - Raw Materials' },
                { code: 'UK', accountCode: '1200', accountName: 'Stock' },
                { code: 'DE', accountCode: '1500', accountName: 'Vorräte' },
              ],
            },
          ],
        },
        {
          id: 'subcat2',
          code: '1200',
          name: 'Non-Current Assets',
          type: 'subcategory',
          children: [
            {
              id: 'acc4',
              code: '1210',
              name: 'Property, Plant & Equipment',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '1500', accountName: 'Fixed Assets' },
                { code: 'UK', accountCode: '1400', accountName: 'Tangible Assets' },
                { code: 'DE', accountCode: '0200', accountName: 'Anlagevermögen' },
                { code: 'SG', accountCode: '1500', accountName: 'Fixed Assets' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cat2',
      code: '2000',
      name: 'Liabilities',
      type: 'category',
      children: [
        {
          id: 'subcat3',
          code: '2100',
          name: 'Current Liabilities',
          type: 'subcategory',
          children: [
            {
              id: 'acc5',
              code: '2110',
              name: 'Accounts Payable',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '2000', accountName: 'Trade Payables' },
                { code: 'UK', accountCode: '2100', accountName: 'Creditors' },
                { code: 'DE', accountCode: '1600', accountName: 'Verbindlichkeiten' },
                { code: 'SG', accountCode: '2100', accountName: 'Trade Creditors' },
              ],
            },
            {
              id: 'acc6',
              code: '2120',
              name: 'Short-term Debt',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '2100', accountName: 'Current Portion of Debt' },
                { code: 'UK', accountCode: '2200', accountName: 'Bank Loans - Current' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'cat3',
      code: '3000',
      name: 'Equity',
      type: 'category',
      children: [
        {
          id: 'acc7',
          code: '3100',
          name: 'Share Capital',
          type: 'account',
          entityMappings: [
            { code: 'US', accountCode: '3000', accountName: 'Common Stock' },
            { code: 'UK', accountCode: '3000', accountName: 'Share Capital' },
            { code: 'DE', accountCode: '2900', accountName: 'Stammkapital' },
            { code: 'SG', accountCode: '3000', accountName: 'Issued Capital' },
          ],
        },
        {
          id: 'acc8',
          code: '3200',
          name: 'Retained Earnings',
          type: 'account',
          entityMappings: [
            { code: 'US', accountCode: '3100', accountName: 'Retained Earnings' },
            { code: 'UK', accountCode: '3100', accountName: 'Profit & Loss Account' },
            { code: 'DE', accountCode: '2980', accountName: 'Gewinnvortrag' },
          ],
        },
      ],
    },
    {
      id: 'cat4',
      code: '4000',
      name: 'Revenue',
      type: 'category',
      children: [
        {
          id: 'acc9',
          code: '4100',
          name: 'Operating Revenue',
          type: 'account',
          entityMappings: [
            { code: 'US', accountCode: '4000', accountName: 'Product Sales' },
            { code: 'UK', accountCode: '4000', accountName: 'Sales Revenue' },
            { code: 'DE', accountCode: '8000', accountName: 'Umsatzerlöse' },
            { code: 'SG', accountCode: '4000', accountName: 'Revenue from Services' },
          ],
        },
      ],
    },
    {
      id: 'cat5',
      code: '5000',
      name: 'Expenses',
      type: 'category',
      children: [
        {
          id: 'subcat5',
          code: '5100',
          name: 'Cost of Sales',
          type: 'subcategory',
          children: [
            {
              id: 'acc10',
              code: '5100',
              name: 'Cost of Sales',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '5000', accountName: 'COGS' },
                { code: 'UK', accountCode: '5000', accountName: 'Cost of Sales' },
                { code: 'DE', accountCode: '5000', accountName: 'Wareneinsatz' },
              ],
            },
          ],
        },
        {
          id: 'subcat6',
          code: '5200',
          name: 'Operating Expenses',
          type: 'subcategory',
          children: [
            {
              id: 'acc11',
              code: '5210',
              name: 'Salaries and Wages',
              type: 'account',
              entityMappings: [
                { code: 'US', accountCode: '5100', accountName: 'Payroll Expense' },
                { code: 'UK', accountCode: '5100', accountName: 'Wages and Salaries' },
                { code: 'DE', accountCode: '6000', accountName: 'Löhne und Gehälter' },
                { code: 'SG', accountCode: '5100', accountName: 'Staff Costs' },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Table Headers */}
      <div className="flex items-start gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
        <div className="w-5" />
        <div className="flex-1">Account Code & Name</div>
        <div className="shrink-0">Type</div>
        <div className="flex-1">Entity Mappings</div>
      </div>

      {/* Rows */}
      <div>
        {chartData.map((account) => (
          <AccountRow
            key={account.id}
            account={account}
            level={0}
            expanded={expandedIds.has(account.id)}
            expandedIds={expandedIds}
            onToggle={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
}
