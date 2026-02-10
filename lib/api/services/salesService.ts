// lib/api/services/salesService.ts
import {
  Customer,
  CustomersResponse,
} from "@/components/features/user/sales/customers/utils/types";
import { apiClient } from "../client";
import { InvoicesResponse, PaidInvoicesResponse } from "@/components/features/user/sales/invoices/utils/types";
import { ReceiptsResponse } from "@/components/features/user/sales/sales-receipt/utils/types";

// Customers
export const getCustomers: () => Promise<CustomersResponse> = () =>
  apiClient("sales/customers", {
    method: "GET",
  });
export const getCustomerById = (id: string | number) =>
  apiClient(`sales/customers/${id}`, {
    method: "GET",
  });
export const createCustomer = (data: any) =>
  apiClient("sales/customers", { method: "POST", body: JSON.stringify(data) });

export const updateCustomer = (id: string | number, data: any) =>
  apiClient(`sales/customers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
export const deleteCustomer = (id: string | number) =>
  apiClient(`sales/customers/${id}`, { method: "DELETE" });

// Invoices
export const getInvoices: (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) => Promise<InvoicesResponse> = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", String(params.page));
  if (params.limit) queryParams.append("limit", String(params.limit));
  if (params.status && params.status !== "All Statuses") queryParams.append("status", params.status);
  if (params.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `sales/invoices?${queryString}` : "sales/invoices";

  return apiClient(url, { method: "GET" });
};
export const getInvoiceById = (id: string | number) =>
  apiClient(`sales/invoices/${id}`, {
    method: "GET",
  });
export const createInvoice = (data: any) =>
  apiClient("sales/invoices", { method: "POST", body: JSON.stringify(data) });
export const updateInvoice = (id: string | number, data: any) =>
  apiClient(`sales/invoices/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
export const deleteInvoice = (id: string | number) =>
  apiClient(`sales/invoices/${id}`, { method: "DELETE" });

// Get Paid Invoices
export const getPaidInvoices: (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => Promise<PaidInvoicesResponse> = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", String(params.page));
  if (params.limit) queryParams.append("limit", String(params.limit));
  if (params.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `sales/invoices/paid?${queryString}` : "sales/invoices/paid";

  return apiClient(url, { method: "GET" });
};

// Receipts
export const getReceipts: (params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  paymentMethod?: string;
}) => Promise<ReceiptsResponse> = (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", String(params.page));
  if (params.limit) queryParams.append("limit", String(params.limit));
  if (params.status && params.status !== "All Statuses") queryParams.append("status", params.status);
  if (params.search) queryParams.append("search", params.search);
  if (params.paymentMethod && params.paymentMethod !== "All Methods") queryParams.append("paymentMethod", params.paymentMethod);

  const queryString = queryParams.toString();
  const url = queryString ? `sales/receipts?${queryString}` : "sales/receipts";

  return apiClient(url, { method: "GET" });
};
export const getReceiptById = (id: string | number) =>
  apiClient(`sales/receipts/${id}`, {
    method: "GET",
  });
export const createReceipt = (data: any) =>
  apiClient("sales/receipts", { method: "POST", body: JSON.stringify(data) });
export const updateReceipt = (id: string | number, data: any) =>
  apiClient(`sales/receipts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
export const deleteReceipt = (id: string | number) =>
  apiClient(`sales/receipts/${id}`, { method: "DELETE" });
