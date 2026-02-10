// lib/api/hooks/usePurchases.ts

import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import * as purchasesService from '../services/purchasesService';

// =============== VENDORS ===============

export const useVendors = (params?: {
	page?: number;
	limit?: number;
	search?: string;
	type?: string;
}) => useQuery({
	queryKey: ['vendors', params],
	queryFn: () => purchasesService.getVendors(params),
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useVendor = (id: string | number) => useQuery({
	queryKey: ['vendor', id],
	queryFn: () => purchasesService.getVendorById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useCreateVendor = (options?: UseMutationOptions<any, Error, any>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: purchasesService.createVendor,
		onSuccess: (data, variables, context, mutation) => {
			queryClient.invalidateQueries({ queryKey: ['vendors'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useUpdateVendor = (options?: UseMutationOptions<any, Error, { id: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => purchasesService.updateVendor(id, data),
		onSuccess: (data, variables, context, mutation) => {
			if (variables && variables.id) {
				queryClient.invalidateQueries({ queryKey: ['vendor', variables.id] });
			}
			queryClient.invalidateQueries({ queryKey: ['vendors'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useDeleteVendor = (options?: UseMutationOptions<any, Error, string | number>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: purchasesService.deleteVendor,
		onSuccess: (data, id, context, mutation) => {
			if (id) {
				queryClient.invalidateQueries({ queryKey: ['vendor', id] });
			}
			queryClient.invalidateQueries({ queryKey: ['vendors'] });
			options?.onSuccess?.(data, id, context, mutation);
		},
		...options,
	});
};

// =============== BILLS ===============

export const useCreateBill = (options?: UseMutationOptions<any, Error, FormData>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: purchasesService.createBill,
		onSuccess: (data, variables, context, mutation) => {
			queryClient.invalidateQueries({ queryKey: ['bills'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useBills = (params?: {
	page?: number;
	limit?: number;
	category?: string;
	search?: string;
}) => useQuery({
	queryKey: ['bills', params],
	queryFn: () => purchasesService.getBills(params),
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useBill = (id: string | number) => useQuery({
	queryKey: ['bill', id],
	queryFn: () => purchasesService.getBillById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useCreateBillPayment = (options?: UseMutationOptions<any, Error, { billId: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ billId, data }) => purchasesService.createBillPayment(billId, data),
		onSuccess: (data, variables, context, mutation) => {
			if (variables?.billId) {
				queryClient.invalidateQueries({ queryKey: ['bill', variables.billId] });
			}
			queryClient.invalidateQueries({ queryKey: ['billPayments'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useBillPayments = (params?: {
	page?: number;
	limit?: number;
}) => useQuery({
	queryKey: ['billPayments', params],
	queryFn: () => purchasesService.getBillPayments(params),
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

// =============== EXPENSES ===============

export const useExpenses = (params?: {
	page?: number;
	limit?: number;
	category?: string;
	search?: string;
}) => useQuery({
	queryKey: ['expenses', params],
	queryFn: () => purchasesService.getExpenses(params),
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useExpense = (id: string | number) => useQuery({
	queryKey: ['expense', id],
	queryFn: () => purchasesService.getExpenseById(id),
	enabled: !!id,
	staleTime: 2 * 60 * 1000,
	refetchOnWindowFocus: true,
});

export const useCreateExpense = (options?: UseMutationOptions<any, Error, FormData>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: purchasesService.createExpense,
		onSuccess: (data, variables, context, mutation) => {
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useUpdateExpense = (options?: UseMutationOptions<any, Error, { id: string | number; data: any }>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => purchasesService.updateExpense(id, data),
		onSuccess: (data, variables, context, mutation) => {
			if (variables && variables.id) {
				queryClient.invalidateQueries({ queryKey: ['expense', variables.id] });
			}
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
			options?.onSuccess?.(data, variables, context, mutation);
		},
		...options,
	});
};

export const useDeleteExpense = (options?: UseMutationOptions<any, Error, string | number>) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: purchasesService.deleteExpense,
		onSuccess: (data, id, context, mutation) => {
			if (id) {
				queryClient.invalidateQueries({ queryKey: ['expense', id] });
			}
			queryClient.invalidateQueries({ queryKey: ['expenses'] });
			options?.onSuccess?.(data, id, context, mutation);
		},
		...options,
	});
};
