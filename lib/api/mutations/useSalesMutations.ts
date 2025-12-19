// lib/api/mutations/useSalesMutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer, updateCustomer, deleteCustomer, createInvoice, updateInvoice, deleteInvoice, createReceipt, updateReceipt, deleteReceipt } from './salesMutations';
import { salesQueryKeys } from '../queries/useSales';

// Customers
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.customers });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string | number; [key: string]: any }) => updateCustomer(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.customers });
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.customer(variables.id) });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteCustomer(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.customers });
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.customer(id) });
    },
  });
};

// Invoices
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.invoices });
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string | number; [key: string]: any }) => updateInvoice(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.invoices });
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.invoice(variables.id) });
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteInvoice(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.invoices });
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.invoice(id) });
    },
  });
};

// Receipts
export const useCreateReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.receipts });
    },
  });
};

export const useUpdateReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string | number; [key: string]: any }) => updateReceipt(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.receipts });
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.receipt(variables.id) });
    },
  });
};

export const useDeleteReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteReceipt(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.receipts });
      queryClient.invalidateQueries({ queryKey: salesQueryKeys.receipt(id) });
    },
  });
};
