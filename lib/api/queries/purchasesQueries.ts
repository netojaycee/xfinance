// lib/api/queries/purchasesQueries.ts

import { apiClient } from '../client';

// Vendors

export const getVendors = async () => apiClient('purchases/vendors', { method: 'GET', next: { tags: ['vendors'] } });
export const getVendorById = async (id: string | number) => apiClient(`purchases/vendors/${id}`, { method: 'GET', next: { tags: ['vendors', `vendor-${id}`] } });
export const createVendor = async (data: any) => apiClient('purchases/vendors', { method: 'POST', body: JSON.stringify(data) });
export const updateVendor = async (id: string | number, data: any) => apiClient(`purchases/vendors/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteVendor = async (id: string | number) => apiClient(`purchases/vendors/${id}`, { method: 'DELETE' });

// Expenses

export const getExpenses = async () => apiClient('purchases/expenses', { method: 'GET', next: { tags: ['expenses'] } });
export const getExpenseById = async (id: string | number) => apiClient(`purchases/expenses/${id}`, { method: 'GET', next: { tags: ['expenses', `expense-${id}`] } });
export const createExpense = async (data: any) => apiClient('purchases/expenses', { method: 'POST', body: JSON.stringify(data) });
export const updateExpense = async (id: string | number, data: any) => apiClient(`purchases/expenses/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteExpense = async (id: string | number) => apiClient(`purchases/expenses/${id}`, { method: 'DELETE' });
