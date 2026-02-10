import { apiClient } from "../client";

/**
 * Accounts Endpoints
 */
export const createAccount = async (data: {
  name: string;
  code: string;
  category: string;
  subCategory: string;
  description: string;
  type: string;
  credit?: number;
  debit?: number;
  date?: string;
}) => {
  return apiClient("account", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAccounts = async (params?: { search?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `account?${queryString}` : "account";
  return apiClient(url, { method: "GET" });
};

export const updateAccount = async (
  id: string,
  data: {
    name?: string;
    code?: string;
    category?: string;
    subCategory?: string;
    description?: string;
    type?: string;
    credit?: number;
    debit?: number;
    date?: string;
  }
) => {
  return apiClient(`account/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const setOpeningBalances = async (
  entityId: string,
  data: {
    lines: Array<{
      accountId: string;
      debit?: number;
      credit?: number;
    }>;
  }
) => {
  return apiClient(`account/${entityId}/opening-balances`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Budgets Endpoints
 */
export const createBudget = async (data: {
  name: string;
  periodType: string;
  month: string;
  fiscalYear: string;
  note?: string;
  lines: Array<{
    accountId: string;
    amount: number;
  }>;
}) => {
  return apiClient("budget", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Journal Endpoints
 */
export const createJournal = async (data: {
  description: string;
  date: string;
  entityId: string;
  lines: Array<{
    account: string;
    debit?: number;
    credit?: number;
  }>;
}) => {
  return apiClient("journal", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getJournal = async (params?: { search?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `journal?${queryString}` : "journal";
  return apiClient(url, { method: "GET" });
};

export const getJournalById = async (id: string) => {
  return apiClient(`journal/${id}`, { method: "GET" });
};

export const updateJournal = async (
  id: string,
  data: {
    description?: string;
    date?: string;
    reference?: string;
    lines?: Array<{
      account: string;
      debit?: number;
      credit?: number;
    }>;
  }
) => {
  return apiClient(`journal/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteJournal = async (id: string) => {
  return apiClient(`journal/${id}`, { method: "DELETE" });
};

export const getJournalByReference = async (reference: string) => {
  return apiClient(`journal/by-reference/${reference}`, { method: "GET" });
};
