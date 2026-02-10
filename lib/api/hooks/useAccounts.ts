import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

// ============ ACCOUNTS HOOKS ============

export const useAccounts = (params?: { search?: string }) => {
  return useQuery<AccountsResponse>({
    queryKey: ["accounts", params],
    queryFn: () => accountsService.getAccounts(params) as Promise<AccountsResponse>,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountInput) =>
      accountsService.createAccount(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useUpdateAccount = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAccountInput) =>
      accountsService.updateAccount(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useSetOpeningBalances = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { entityId: string; lines: any[] }) =>
      accountsService.setOpeningBalances(data.entityId, { lines: data.lines }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

// ============ BUDGETS HOOKS ============

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetInput) =>
      accountsService.createBudget(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

// ============ JOURNAL HOOKS ============

export const useJournal = (params?: { search?: string }) => {
  return useQuery<JournalResponse>({
    queryKey: ["journal", params],
    queryFn: () => accountsService.getJournal(params) as Promise<JournalResponse>,
    staleTime: 2 * 60 * 1000,
  });
};

export const useJournalById = (id: string) => {
  return useQuery({
    queryKey: ["journal", id],
    queryFn: () => accountsService.getJournalById(id),
    staleTime: 2 * 60 * 1000,
  });
};

export const useJournalByReference = (reference: string) => {
  return useQuery({
    queryKey: ["journal", "reference", reference],
    queryFn: () => accountsService.getJournalByReference(reference),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJournalInput) =>
      accountsService.createJournal(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
    },
  });
};

export const useUpdateJournal = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateJournalInput) =>
      accountsService.updateJournal(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      queryClient.invalidateQueries({ queryKey: ["journal", id] });
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => accountsService.deleteJournal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
    },
  });
};
