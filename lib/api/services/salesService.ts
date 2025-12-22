// lib/api/services/salesService.ts
import {
  Customer,
  CustomersResponse,
} from "@/components/features/user/sales/customers/utils/types";
import { apiClient } from "../client";
import { InvoicesResponse } from "@/components/features/user/sales/invoices/utils/types";

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
export const getInvoices: () => Promise<InvoicesResponse> = () =>
  apiClient("sales/invoices", { method: "GET" });
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

// Receipts
export const getReceipts = () => apiClient("sales/receipts", { method: "GET" });
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
