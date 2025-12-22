// lib/api/mutations/usePurchasesMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVendor, updateVendor, deleteVendor, createExpense, updateExpense, deleteExpense } from './purchasesMutations';
import { purchasesQueryKeys } from '../queries/usePurchases';

// Vendors
export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.vendors });
    },
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string | number; [key: string]: any }) => updateVendor(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.vendors });
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.vendor(variables.id) });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteVendor(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.vendors });
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.vendor(id) });
    },
  });
};

// Expenses
export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.expenses });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string | number; [key: string]: any }) => updateExpense(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.expense(variables.id) });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteExpense(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: purchasesQueryKeys.expense(id) });
    },
  });
};
