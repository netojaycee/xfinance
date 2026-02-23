// lib/api/hooks/useBanking.ts

import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as bankingService from "../services/bankingService";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { toast } from "sonner";

// ────────────────────────────────────────────────
// Bank Accounts
// ────────────────────────────────────────────────

export const useBankAccounts = (params?: {
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
}) => {
  return useQuery({
    queryKey: [
      "bankAccounts",
      params?.search,
      params?.page,
      params?.limit,
      params?.status,
    ],
    queryFn: () => bankingService.getBankAccounts(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useBankAccount = (id: string) => {
  return useQuery({
    queryKey: ["bankAccounts", "detail", id],
    queryFn: () => bankingService.getBankAccountById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateBankAccount = (
  options?: UseMutationOptions<any, Error, any>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: bankingService.createBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Bank account connected successfully");
      closeModal(MODAL.BANK_CONNECT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to connect bank account",
      );
    },
    ...options,
  });
};

export const useUpdateBankAccount = (
  options?: UseMutationOptions<any, Error, { id: string; data: any }>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: ({ id, data }) => bankingService.updateBankAccount(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ["bankAccounts", "detail", variables.id],
        });
      }
      toast.success("Bank account updated successfully");
      closeModal(MODAL.BANK_EDIT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update bank account",
      );
    },
    ...options,
  });
};

export const useDeleteBankAccount = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: bankingService.deleteBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Bank account deleted successfully");
      closeModal(MODAL.BANK_DELETE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete bank account",
      );
    },
    ...options,
  });
};

// ────────────────────────────────────────────────
// Bank Transactions
// ────────────────────────────────────────────────

export const useBankTransactions = (
  accountId: string,
  params?: {
    search?: string;
    page?: number;
    limit?: number;
    status?: string;
  },
) => {
  return useQuery({
    queryKey: [
      "bankTransactions",
      accountId,
      params?.search,
      params?.page,
      params?.limit,
      params?.status,
    ],
    queryFn: () => bankingService.getBankTransactions(accountId, params),
    enabled: !!accountId,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useReconcileBankAccount = (
  options?: UseMutationOptions<any, Error, { accountId: string; data: any }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accountId, data }) =>
      bankingService.reconcileBankAccount(accountId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["bankTransactions", variables.accountId],
      });
      queryClient.invalidateQueries({
        queryKey: ["bankAccounts", "detail", variables.accountId],
      });
      toast.success("Bank account reconciled successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to reconcile bank account",
      );
    },
    ...options,
  });
};
