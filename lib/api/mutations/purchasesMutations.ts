// lib/api/mutations/purchasesMutations.ts

import { apiClient } from '../client';

// Vendors
export const createVendor = async (data: any) => apiClient('purchases/vendors', { method: 'POST', body: JSON.stringify(data), next: { revalidate: ['vendors'] } });
export const updateVendor = async (id: string | number, data: any) => apiClient(`purchases/vendors/${id}`, { method: 'PATCH', body: JSON.stringify(data), next: { revalidate: ['vendors', `vendor-${id}`] } });
export const deleteVendor = async (id: string | number) => apiClient(`purchases/vendors/${id}`, { method: 'DELETE', next: { revalidate: ['vendors', `vendor-${id}`] } });

// Expenses
export const createExpense = async (data: any) => apiClient('purchases/expenses', { method: 'POST', body: JSON.stringify(data), next: { revalidate: ['expenses'] } });
export const updateExpense = async (id: string | number, data: any) => apiClient(`purchases/expenses/${id}`, { method: 'PATCH', body: JSON.stringify(data), next: { revalidate: ['expenses', `expense-${id}`] } });
export const deleteExpense = async (id: string | number) => apiClient(`purchases/expenses/${id}`, { method: 'DELETE', next: { revalidate: ['expenses', `expense-${id}`] } });
