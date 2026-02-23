"use client";
import { CustomTable } from "@/components/local/custom/custom-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import BankReconciliationCard from "./BankReconciliationCard";
import { bankingColumns, bankingData } from "./BankingColumn";

export function BankingTabs() {
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="reconciliation">Bank Reconciliation</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
           <CustomTable
            tableTitle="Recent Transactions"
            tableSubtitle="Latest bank activity"
            columns={bankingColumns}
            data={bankingData}
            pageSize={10}
            loading={loading}
            display={{ searchComponent: false, exportButton: true }}
          />
        </TabsContent>
        <TabsContent value="reconciliation">
                   <BankReconciliationCard />

        </TabsContent>
      </Tabs>
    </div>
  );
}
