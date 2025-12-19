// lib/api/queries/salesQueries.ts

import { apiClient } from '../client';

// Customers

export const getCustomers = () => apiClient('sales/customers', { method: 'GET', next: { tags: ['customers'] } });
export const getCustomerById = (id: string | number) => apiClient(`sales/customers/${id}`, { method: 'GET', next: { tags: ['customers', `customer-${id}`] } });
export const createCustomer = (data: any) => apiClient('sales/customers', { method: 'POST', body: JSON.stringify(data) });
export const updateCustomer = (id: string | number, data: any) => apiClient(`sales/customers/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteCustomer = (id: string | number) => apiClient(`sales/customers/${id}`, { method: 'DELETE' });

// Invoices

export const getInvoices = () => apiClient('sales/invoices', { method: 'GET', next: { tags: ['invoices'] } });
export const getInvoiceById = (id: string | number) => apiClient(`sales/invoices/${id}`, { method: 'GET', next: { tags: ['invoices', `invoice-${id}`] } });
export const createInvoice = (data: any) => apiClient('sales/invoices', { method: 'POST', body: JSON.stringify(data) });
export const updateInvoice = (id: string | number, data: any) => apiClient(`sales/invoices/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteInvoice = (id: string | number) => apiClient(`sales/invoices/${id}`, { method: 'DELETE' });

// Receipts

export const getReceipts = () => apiClient('sales/receipts', { method: 'GET', next: { tags: ['receipts'] } });
export const getReceiptById = (id: string | number) => apiClient(`sales/receipts/${id}`, { method: 'GET', next: { tags: ['receipts', `receipt-${id}`] } });
export const createReceipt = (data: any) => apiClient('sales/receipts', { method: 'POST', body: JSON.stringify(data) });
export const updateReceipt = (id: string | number, data: any) => apiClient(`sales/receipts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteReceipt = (id: string | number) => apiClient(`sales/receipts/${id}`, { method: 'DELETE' });
