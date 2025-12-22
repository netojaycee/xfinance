// lib/api/hooks/usePurchases.ts

import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import * as purchasesService from '../services/purchasesService';

// Vendors

export const useVendors = () => useQuery({
	queryKey: ['vendors'],
	queryFn: purchasesService.getVendors,
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

// Expenses

export const useExpenses = () => useQuery({
	queryKey: ['expenses'],
	queryFn: purchasesService.getExpenses,
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
export const useCreateExpense = (options?: UseMutationOptions<any, Error, any>) => {
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
