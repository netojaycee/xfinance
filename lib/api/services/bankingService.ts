import { apiClient } from "@/lib/api/client";

// ────────────────────────────────────────────────
// Bank Accounts
// ────────────────────────────────────────────────

export const getBankAccounts = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", String(params.page));
  if (params?.limit) queryParams.append("limit", String(params.limit));
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = queryString ? `banking/accounts?${queryString}` : "banking/accounts";

  return apiClient(url, {
    method: "GET",
  });
};

export const getBankAccountById = async (id: string) =>
  apiClient(`banking/accounts/${id}`, {
    method: "GET",
  });

export const createBankAccount = async (data: any) =>
  apiClient("banking/accounts", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBankAccount = async (id: string, data: any) =>
  apiClient(`banking/accounts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteBankAccount = async (id: string) =>
  apiClient(`banking/accounts/${id}`, {
    method: "DELETE",
  });

// ────────────────────────────────────────────────
// Bank Account Transactions
// ────────────────────────────────────────────────

export const getBankTransactions = async (
  accountId: string,
  params?: {
    search?: string;
    page?: number;
    limit?: number;
    status?: string;
  },
) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", String(params.page));
  if (params?.limit) queryParams.append("limit", String(params.limit));
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = queryString
    ? `banking/accounts/${accountId}/transactions?${queryString}`
    : `banking/accounts/${accountId}/transactions`;

  return apiClient(url, {
    method: "GET",
  });
};

export const reconcileBankAccount = async (
  accountId: string,
  data: any,
) =>
  apiClient(`banking/accounts/${accountId}/reconcile`, {
    method: "POST",
    body: JSON.stringify(data),
  });
