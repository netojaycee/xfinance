// Types for Bank Account Ledger

export interface BankTransaction {
  id: string;
  date: string;
  type:
    | "Deposit"
    | "Withdrawal"
    | "Fee"
    | "Interest"
    | "Transfer"
    | "Check";
  description: string;
  payeePayor: string;
  method:
    | "ACH"
    | "Wire"
    | "Check"
    | "Card"
    | "Other"
    | "Transfer";
  reference: string;
  amount: number;
  balance: number;
  status: "Cleared" | "Pending" | "Reconciled";
  createdAt: string;
  updatedAt: string;
}

export interface BankStats {
  currentBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingCount: number;
  totalTransactions: number;
}

export interface BankAccountProfile {
  id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  currency: string;
  accountType: string;
  currentBalance: number;
  openingBalance: number;
}

export interface BankApiResponse {
  id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  currency: string;
  accountType: string;
  currentBalance: number;
  openingBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsApiResponse {
  transactions: BankTransaction[];
  totalCount: number;
  page: number;
  limit: number;
}
