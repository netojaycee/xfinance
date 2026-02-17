"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAccountCategories } from "@/lib/api/hooks/useAccountCategories";
import { useAccountTypes } from "@/lib/api/hooks/useAccountTypes";

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
  type: "category" | "subcategory" | "account";
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

function AccountRow({
  account,
  level,
  expanded,
  expandedIds,
  onToggle,
}: AccountRowProps) {
  const hasChildren = account.children && account.children.length > 0;
  const isExpandable = account.type !== "account" && hasChildren;

  const typeVariant = (type: string) => {
    switch (type) {
      case "category":
        return "bg-black text-white";
      case "subcategory":
        return "bg-gray-200 text-gray-800";
      case "account":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case "category":
        return "Category";
      case "subcategory":
        return "Subcategory";
      case "account":
        return "Account";
      default:
        return "";
    }
  };

  return (
    <div>
      <div
        className={`flex items-start gap-4 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
          level > 0 ? "bg-gray-50" : "bg-white"
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
            <span className="font-medium text-gray-900">{account.code}</span>
            <span className="text-gray-700">{account.name}</span>
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
  const { data: accountTypes, isLoading: loadingTypes } = useAccountTypes();
  const { data: categories, isLoading: loadingCategories } =
    useAccountCategories();

  // Dynamically open the first category and its first subcategory
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
  React.useEffect(() => {
    if (accountTypes && categories) {
      const firstCat = accountTypes[0]?.id;
      const firstSub = categories.find((cat) => cat.typeId === firstCat)?.id;
      if (firstCat) {
        setExpandedIds(new Set(firstSub ? [firstCat, firstSub] : [firstCat]));
      }
    }
  }, [accountTypes, categories]);

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

  // Build dynamic chart data from API
  const chartData: ChartAccount[] =
    accountTypes && categories
      ? accountTypes.map((type) => ({
          id: type.id,
          code: type.code,
          name: type.name,
          type: "category",
          children: categories
            .filter((cat) => cat.typeId === type.id)
            .map((cat) => ({
              id: cat.id,
              code: cat.code,
              name: cat.name,
              type: "subcategory",
              // For now, subcategories as children, accounts not yet mapped
              children:
                cat.subCategories?.map((sub) => ({
                  id: sub.id,
                  code: sub.code,
                  name: sub.name,
                  type: "account",
                  entityMappings: [], // Placeholder, as entity mapping is not yet dynamic
                })) || [],
            })),
        }))
      : [];

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
