import { apiClient } from "../client";

/**
 * Account Type Endpoints
 */
export const getAccountTypes = async () =>
  apiClient("account-type", { method: "GET" });

export const getAccountTypeById = async (id: string) =>
  apiClient(`account-type/${id}`, { method: "GET" });

export const createAccountType = async (data: { code: string; name: string; description: string }) =>
  apiClient("account-type", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const updateAccountType = async (
  id: string,
  data: Partial<{ code: string; name: string; description: string }>
) =>
  apiClient(`account-type/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const deleteAccountType = async (id: string) =>
  apiClient(`account-type/${id}`, { method: "DELETE" });

/**
 * Account Category Endpoints
 */
export const getAccountCategories = async () =>
  apiClient("account-category", { method: "GET" });

export const getAccountCategoriesByType = async (typeId: string) =>
  apiClient(`account-category/type/${typeId}`, { method: "GET" });

export const getAccountCategoryById = async (id: string) =>
  apiClient(`account-category/${id}`, { method: "GET" });

export const createAccountCategory = async (data: { name: string; typeId: string; description?: string; code?: string }) =>
  apiClient("account-category", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const updateAccountCategory = async (
  id: string,
  data: Partial<{ name: string; description: string; code: string }>
) =>
  apiClient(`account-category/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const deleteAccountCategory = async (id: string) =>
  apiClient(`account-category/${id}`, { method: "DELETE" });

/**
 * Account SubCategory Endpoints
 */
export const getSubCategoriesByCategory = async (categoryId: string) =>
  apiClient(`account-subcategory/category/${categoryId}`, { method: "GET" });

export const getSubCategoryById = async (id: string) =>
  apiClient(`account-subcategory/${id}`, { method: "GET" });

export const createSubCategory = async (data: { name: string; categoryId: string; description?: string; code?: string }) =>
  apiClient("account-subcategory", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const updateSubCategory = async (
  id: string,
  data: Partial<{ name: string; description: string; code: string }>
) =>
  apiClient(`account-subcategory/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

export const deleteSubCategory = async (id: string) =>
  apiClient(`account-subcategory/${id}`, { method: "DELETE" });

/**
 * Accounts Endpoints
 */
export const createAccount = async (data: {
  name: string;
  // code: string;
  categoryId: string;
  subCategoryId: string;
  description: string;
  
}) => {
  return apiClient("account", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAccounts = async (params?: { search?: string; subCategory?: string; type?: string; page?: number; limit?: number }) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);
  if (params?.subCategory) queryParams.append("subCategory", params.subCategory);
  if (params?.type) queryParams.append("type", params.type);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

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
