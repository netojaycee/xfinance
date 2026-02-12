// lib/api/hooks/useSales.ts

import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import * as salesService from '../services/salesService';
import { CustomersResponse } from '@/components/features/user/sales/customers/utils/types';
import { InvoicesResponse, PaidInvoicesResponse } from '@/components/features/user/sales/invoices/utils/types';
import { ReceiptsResponse } from '@/components/features/user/sales/sales-receipt/utils/types';
import { PaymentReceivedResponse } from '@/components/features/user/sales/payment-received/utils/types';

// Customers



export const useCustomers = () => useQuery<CustomersResponse>({
	queryKey: ['customers'],
	queryFn: () => salesService.getCustomers() as Promise<CustomersResponse>,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});
export const useCustomer = (id: string | number) => useQuery({
	queryKey: ['customer', id],
	queryFn: () => salesService.getCustomerById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});
export const useCreateCustomer = (options?: UseMutationOptions<any, Error, any>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.createCustomer,
		onSuccess: (data, variables, context, mutation) => {
			queryClient.invalidateQueries({ queryKey: ['customers'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};
export const useUpdateCustomer = (options?: UseMutationOptions<any, Error, { id: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => salesService.updateCustomer(id, data),
		onSuccess: (data, variables, context, mutation) => {
			if (variables && variables.id) {
				queryClient.invalidateQueries({ queryKey: ['customer', variables.id] });
			}
			queryClient.invalidateQueries({ queryKey: ['customers'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};
export const useDeleteCustomer = (options?: UseMutationOptions<any, Error, string | number>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.deleteCustomer,
		onSuccess: (data, id, context, mutation) => {
			if (id) {
				queryClient.invalidateQueries({ queryKey: ['customer', id] });
			}
			queryClient.invalidateQueries({ queryKey: ['customers'] });
			options?.onSuccess?.(data, id, context, mutation);
		},
		...options,
	});
};

// Invoices

export const useInvoices = (params?: {
	page?: number;
	limit?: number;
	status?: string;
	search?: string;
}) => useQuery<InvoicesResponse>({
	queryKey: ['invoices', params],
	queryFn: () => salesService.getInvoices(params) as Promise<InvoicesResponse>,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});
export const useInvoice = (id: string | number) => useQuery({
	queryKey: ['invoice', id],
	queryFn: () => salesService.getInvoiceById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});
export const useCreateInvoice = (options?: UseMutationOptions<any, Error, any>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.createInvoice,
		onSuccess: (data, variables, context, mutation) => {
			queryClient.invalidateQueries({ queryKey: ['invoices'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};
export const useUpdateInvoice = (options?: UseMutationOptions<any, Error, { id: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => salesService.updateInvoice(id, data),
		onSuccess: (data, variables, context, mutation) => {
			if (variables && variables.id) {
				queryClient.invalidateQueries({ queryKey: ['invoice', variables.id] });
			}
			queryClient.invalidateQueries({ queryKey: ['invoices'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};
export const useDeleteInvoice = (options?: UseMutationOptions<any, Error, string | number>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.deleteInvoice,
		onSuccess: (data, id, context, mutation) => {
			if (id) {
				queryClient.invalidateQueries({ queryKey: ['invoice', id] });
			}
			queryClient.invalidateQueries({ queryKey: ['invoices'] });
			options?.onSuccess?.(data, id, context, mutation);
		},
		...options,
	});
};

// Paid Invoices
export const usePaidInvoices = (params?: {
	page?: number;
	limit?: number;
	search?: string;
}) => useQuery<PaidInvoicesResponse>({
	queryKey: ['paidInvoices', params],
	queryFn: () => salesService.getPaidInvoices(params) as Promise<PaidInvoicesResponse>,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

// Receipts

export const useReceipts = (params?: {
	page?: number;
	limit?: number;
	status?: string;
	search?: string;
	paymentMethod?: string;
}) => useQuery<ReceiptsResponse>({
	queryKey: ['receipts', params],
	queryFn: () => salesService.getReceipts(params) as Promise<ReceiptsResponse>,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});
export const useReceipt = (id: string | number) => useQuery({
	queryKey: ['receipt', id],
	queryFn: () => salesService.getReceiptById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});
export const useCreateReceipt = (options?: UseMutationOptions<any, Error, any>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.createReceipt,
		onSuccess: (data, variables, context, mutation) => {
			queryClient.invalidateQueries({ queryKey: ['receipts'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};
export const useUpdateReceipt = (options?: UseMutationOptions<any, Error, { id: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => salesService.updateReceipt(id, data),
		onSuccess: (data, variables, context, mutation) => {
			if (variables && variables.id) {
				queryClient.invalidateQueries({ queryKey: ['receipt', variables.id] });
			}
			queryClient.invalidateQueries({ queryKey: ['receipts'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};
export const useDeleteReceipt = (options?: UseMutationOptions<any, Error, string | number>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.deleteReceipt,
		onSuccess: (data, id, context, mutation) => {
			if (id) {
				queryClient.invalidateQueries({ queryKey: ['receipt', id] });
			}
			queryClient.invalidateQueries({ queryKey: ['receipts'] });
			options?.onSuccess?.(data, id, context, mutation);
		},
		...options,
	});
};

// Payment Received

export const usePaymentsReceived = (params?: {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
}) => useQuery<PaymentReceivedResponse>({
	queryKey: ['payment-received', params],
	queryFn: () => salesService.getPaymentsReceived(params) as Promise<PaymentReceivedResponse>,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const usePaymentReceived = (id: string | number) => useQuery({
	queryKey: ['payment-received', id],
	queryFn: () => salesService.getPaymentReceivedById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useCreatePaymentReceived = (options?: UseMutationOptions<any, Error, any>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.createPaymentReceived,
		onSuccess: async (data, variables, context, mutation) => {
			await Promise.all([
				queryClient.refetchQueries({ queryKey: ['payment-received'] }),
				queryClient.refetchQueries({ queryKey: ['invoices'] }),
			]);
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useUpdatePaymentReceived = (options?: UseMutationOptions<any, Error, { id: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => salesService.updatePaymentReceived(id, data),
		onSuccess: async (data, variables, context, mutation) => {
			if (variables && variables.id) {
				await queryClient.refetchQueries({ queryKey: ['payment-received', variables.id] });
			}
			await Promise.all([
				queryClient.refetchQueries({ queryKey: ['payment-received'] }),
				queryClient.refetchQueries({ queryKey: ['invoices'] }),
			]);
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useDeletePaymentReceived = (options?: UseMutationOptions<any, Error, string | number>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: salesService.deletePaymentReceived,
		onSuccess: async (data, id, context, mutation) => {
			if (id) {
				await queryClient.refetchQueries({ queryKey: ['payment-received', id] });
			}
			await Promise.all([
				queryClient.refetchQueries({ queryKey: ['payment-received'] }),
				queryClient.refetchQueries({ queryKey: ['invoices'] }),
			]);
			options?.onSuccess?.(data, id, context, mutation);
		},
		...options,
	});
};

export const usePaymentReceivedReportsSummary = (params?: {
	page?: number;
	limit?: number;
	search?: string;
	status?: string;
	from?: string;
	to?: string;
}) => useQuery<PaymentReceivedResponse>({
	queryKey: ['payment-received-reports', params],
	queryFn: () => salesService.getPaymentReceivedReportsSummary(params) as Promise<PaymentReceivedResponse>,
	staleTime: 5 * 60 * 1000,
	refetchOnWindowFocus: true,
});
