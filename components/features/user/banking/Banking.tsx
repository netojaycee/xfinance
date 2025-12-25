"use client";
import React from "react";
import BankingHeader from "./BankingHeader";
import BankAccountsCard from "./BankAccountsCard";
import { BankingTabs } from "./BankingTabs";

export default function Bnaking() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4 p-4">
      <BankingHeader data={data} loading={loading} />
            <BankAccountsCard />
            <BankingTabs />

     
    </div>
  );
}
