// lib/api/queries/useSales.ts

import { useQuery } from '@tanstack/react-query';
import { getCustomers, getCustomerById, getInvoices, getInvoiceById, getReceipts, getReceiptById } from './salesQueries';

export const salesQueryKeys = {
  customers: ['customers'] as const,
  customer: (id: string | number) => ['customers', id] as const,
  invoices: ['invoices'] as const,
  invoice: (id: string | number) => ['invoices', id] as const,
  receipts: ['receipts'] as const,
  receipt: (id: string | number) => ['receipts', id] as const,
};

export const useCustomers = () => useQuery({
  queryKey: salesQueryKeys.customers,
  queryFn: getCustomers,
});

export const useCustomer = (id: string | number) => useQuery({
  queryKey: salesQueryKeys.customer(id),
  queryFn: () => getCustomerById(id),
  enabled: !!id,
});

export const useInvoices = () => useQuery({
  queryKey: salesQueryKeys.invoices,
  queryFn: getInvoices,
});

export const useInvoice = (id: string | number) => useQuery({
  queryKey: salesQueryKeys.invoice(id),
  queryFn: () => getInvoiceById(id),
  enabled: !!id,
});

export const useReceipts = () => useQuery({
  queryKey: salesQueryKeys.receipts,
  queryFn: getReceipts,
});

export const useReceipt = (id: string | number) => useQuery({
  queryKey: salesQueryKeys.receipt(id),
  queryFn: () => getReceiptById(id),
  enabled: !!id,
});
