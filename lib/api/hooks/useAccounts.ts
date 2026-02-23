// lib/api/hooks/useAccounts.ts

import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as accountsService from "../services/accountsService";
import {
  CreateAccountInput,
  UpdateAccountInput,
  CreateBudgetInput,
  CreateJournalInput,
  UpdateJournalInput,
  AccountsResponse,
  JournalResponse,
} from "./types/accountsTypes";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { toast } from "sonner";

// ────────────────────────────────────────────────
// Accounts
// ────────────────────────────────────────────────

export const useAccounts = (params?: { search?: string; page?: number; limit?: number; subCategory?: string; type?: string }) => {
  return useQuery<AccountsResponse>({
    queryKey: ["accounts", params?.search, params?.page, params?.limit, params?.subCategory, params?.type],
    queryFn: () => accountsService.getAccounts(params) as Promise<AccountsResponse>,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateAccount = (
  options?: UseMutationOptions<any, Error, CreateAccountInput>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: accountsService.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Account created successfully");
      closeModal(MODAL.ACCOUNT_CREATE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create account",
      );
    },
    ...options,
  });
};

export const useUpdateAccount = (
  options?: UseMutationOptions<any, Error, { id: string; data: UpdateAccountInput }>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: ({ id, data }) => accountsService.updateAccount(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["accounts", "detail", variables.id] });
      }
      toast.success("Account updated successfully");
      closeModal(MODAL.ACCOUNT_EDIT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update account",
      );
    },
    ...options,
  });
};

export const useSetOpeningBalances = (
  options?: UseMutationOptions<any, Error, { entityId: string; lines: any[] }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entityId, lines }) => accountsService.setOpeningBalances(entityId, { lines }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Opening balances set successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to set opening balances",
      );
    },
    ...options,
  });
};

// ────────────────────────────────────────────────
// Budgets
// ────────────────────────────────────────────────

export const useCreateBudget = (
  options?: UseMutationOptions<any, Error, CreateBudgetInput>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: accountsService.createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget created successfully");
      closeModal(MODAL.BUDGET_CREATE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create budget",
      );
    },
    ...options,
  });
};

// ────────────────────────────────────────────────
// Journals
// ────────────────────────────────────────────────

export const useJournals = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery<JournalResponse>({
    queryKey: ["journals", params?.search, params?.page, params?.limit],
    queryFn: () => accountsService.getJournal(params) as Promise<JournalResponse>,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useJournal = (id: string) => {
  return useQuery({
    queryKey: ["journals", "detail", id],
    queryFn: () => accountsService.getJournalById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useJournalByReference = (reference: string) => {
  return useQuery({
    queryKey: ["journals", "reference", reference],
    queryFn: () => accountsService.getJournalByReference(reference),
    enabled: !!reference,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateJournal = (
  options?: UseMutationOptions<any, Error, CreateJournalInput>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: accountsService.createJournal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.success("Journal created successfully");
      closeModal(MODAL.JOURNAL_CREATE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create journal",
      );
    },
    ...options,
  });
};

export const useUpdateJournal = (
  options?: UseMutationOptions<any, Error, { id: string; data: UpdateJournalInput }>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: ({ id, data }) => accountsService.updateJournal(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["journals", "detail", variables.id] });
      }
      toast.success("Journal updated successfully");
      closeModal(MODAL.JOURNAL_EDIT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update journal",
      );
    },
    ...options,
  });
};

export const useDeleteJournal = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: accountsService.deleteJournal,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["journals", "detail", id] });
      }
      toast.success("Journal deleted successfully");
      closeModal(MODAL.JOURNAL_DELETE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete journal",
      );
    },
    ...options,
  });
};