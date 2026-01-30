"use client";

import { useCustomers } from "@/lib/api/hooks/useSales";
import BudgetHeader from "./BudgetHeader";
import { CustomTabs } from "@/components/local/custom/tabs";
import { CustomTable } from "@/components/local/custom/custom-table";
import { budgetColumns } from "./BudgetColumn";
import SetBudgetForm from "./SetBudgetForm";

export default function Budget() {
  const { data, isLoading } = useCustomers();
  const customers = data?.customers || [];
  return (
    <div className="space-y-4">
      <BudgetHeader data={data} loading={isLoading} />
     
 <CustomTabs
        storageKey="budget-tab"
        tabs={[
          {
            title: "Budget vs Actual",
            value: "budgetActual",
            content: (
              <div className="space-y-4">
                <CustomTable
                  searchPlaceholder="Search employees..."
                  tableTitle="Budget vs Actual"
                  columns={budgetColumns}
                  data={customers as any}
                  pageSize={10}
                  loading={isLoading}
                  display={{ filterComponent: true }}
                />
              </div>
            ),
          },
          {
            title: "Set Budget",
            value: "setBudget",
            content: (
              <>
              <SetBudgetForm />
              </>
            ),
          },
        ]}
      />

    </div>
  );
}
