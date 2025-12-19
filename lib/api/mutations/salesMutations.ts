// lib/api/mutations/salesMutations.ts

import { apiClient } from '../client';

// Customers
export const createCustomer = (data: any) => apiClient('sales/customers', { method: 'POST', body: JSON.stringify(data), next: { revalidate: ['customers'] } });
export const updateCustomer = (id: string | number, data: any) => apiClient(`sales/customers/${id}`, { method: 'PATCH', body: JSON.stringify(data), next: { revalidate: ['customers', `customer-${id}`] } });
export const deleteCustomer = (id: string | number) => apiClient(`sales/customers/${id}`, { method: 'DELETE', next: { revalidate: ['customers', `customer-${id}`] } });

// Invoices
export const createInvoice = (data: any) => apiClient('sales/invoices', { method: 'POST', body: JSON.stringify(data), next: { revalidate: ['invoices'] } });
export const updateInvoice = (id: string | number, data: any) => apiClient(`sales/invoices/${id}`, { method: 'PATCH', body: JSON.stringify(data), next: { revalidate: ['invoices', `invoice-${id}`] } });
export const deleteInvoice = (id: string | number) => apiClient(`sales/invoices/${id}`, { method: 'DELETE', next: { revalidate: ['invoices', `invoice-${id}`] } });

// Receipts
export const createReceipt = (data: any) => apiClient('sales/receipts', { method: 'POST', body: JSON.stringify(data), next: { revalidate: ['receipts'] } });
export const updateReceipt = (id: string | number, data: any) => apiClient(`sales/receipts/${id}`, { method: 'PATCH', body: JSON.stringify(data), next: { revalidate: ['receipts', `receipt-${id}`] } });
export const deleteReceipt = (id: string | number) => apiClient(`sales/receipts/${id}`, { method: 'DELETE', next: { revalidate: ['receipts', `receipt-${id}`] } });
