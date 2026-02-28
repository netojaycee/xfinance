import React, { useEffect, useMemo } from "react";
import BankProfileHeader from "./BankProfileHeader";
import BankStatsCard from "./BankStatsCard";
import BankTransactions from "./BankTransactions";
import {
  BankAccountProfile,
  BankStats,
  BankApiResponse,
} from "./types";
import { useBankAccount } from "@/lib/api/hooks/useBanking";
import { useAccountTransactionsByBankAccountId } from "@/lib/api/hooks/useAccounts";
import { AccountTransaction } from "@/lib/api/hooks/types/accountsTypes";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function BankAccountLedger() {
  const params = useParams();
  const accountId = params?.id ? params.id.toString() : "";

  const {
    data: fetchedAccount,
    isLoading: accountLoading,
  } = useBankAccount(accountId);

  const {
    data: transactionsResponse,
    isLoading: transactionsLoading,
  } = useAccountTransactionsByBankAccountId(accountId, {
    pageSize: 50,
  });

  const accountData = fetchedAccount as BankApiResponse | undefined;
  const transactions: AccountTransaction[] = (transactionsResponse as any)?.data || [];

  // Derive Profile Data
  const profile: BankAccountProfile = useMemo(() => {
    if (!accountData) {
      return {
        id: "",
        accountName: "",
        bankName: "",
        accountNumber: "",
        currency: "USD",
        accountType: "",
        currentBalance: 0,
        openingBalance: 0,
      };
    }

    return {
      id: accountData.id,
      accountName: accountData.accountName,
      bankName: accountData.bankName,
      accountNumber: accountData.accountNumber,
      currency: accountData.currency,
      accountType: accountData.accountType,
      currentBalance: accountData.currentBalance,
      openingBalance: accountData.openingBalance,
    };
  }, [accountData]);

  // Calculate Statistics
  const stats: BankStats = useMemo(() => {
    const deposits = transactions
      .reduce((sum, t) => sum + (t.debitAmount || 0), 0);

    const withdrawals = transactions
      .reduce((sum, t) => sum + (t.creditAmount || 0), 0);

    const pendingCount = transactions.filter(
      (t) => t.status === "Pending"
    ).length;

    return {
      currentBalance: profile.currentBalance,
      totalDeposits: deposits,
      totalWithdrawals: withdrawals,
      pendingCount: pendingCount,
      totalTransactions: transactions.length,
    };
  }, [transactions, profile.currentBalance]);

  if (accountLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Profile Header */}
      <BankProfileHeader profile={profile} />

      {/* Stats Cards */}
      <BankStatsCard stats={stats} currency={profile.currency} />

      {/* Transactions */}
      <BankTransactions
        transactions={transactions}
        isLoading={transactionsLoading}
      />
    </div>
  );
}
