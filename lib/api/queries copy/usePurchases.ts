// lib/api/queries/usePurchases.ts

import { useQuery } from '@tanstack/react-query';
import { getVendors, getVendorById, getExpenses, getExpenseById } from './purchasesQueries';

export const purchasesQueryKeys = {
  vendors: ['vendors'] as const,
  vendor: (id: string | number) => ['vendors', id] as const,
  expenses: ['expenses'] as const,
  expense: (id: string | number) => ['expenses', id] as const,
};

export const useVendors = () => useQuery({
  queryKey: purchasesQueryKeys.vendors,
  queryFn: getVendors,
});

export const useVendor = (id: string | number) => useQuery({
  queryKey: purchasesQueryKeys.vendor(id),
  queryFn: () => getVendorById(id),
  enabled: !!id,
});

export const useExpenses = () => useQuery({
  queryKey: purchasesQueryKeys.expenses,
  queryFn: getExpenses,
});

export const useExpense = (id: string | number) => useQuery({
  queryKey: purchasesQueryKeys.expense(id),
  queryFn: () => getExpenseById(id),
  enabled: !!id,
});
