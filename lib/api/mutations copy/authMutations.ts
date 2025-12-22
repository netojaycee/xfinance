// lib/api/mutations/authMutations.ts

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../client";
import { UserPayload } from "@/lib/types"; // Assuming these types exist
import { LoginCredentials } from "@/lib/schema";
import { toast } from "sonner";

/**
 * The actual API call function for logging in a user.
 * This function is used by the useLogin mutation hook.
 */
const loginUser = (credentials: LoginCredentials): Promise<UserPayload> => {
  return apiClient<UserPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

/**
 * Custom hook for user login.
 * Provides mutation function, loading state, error handling, etc.
 */
export const useLogin = (
  options?: Omit<
    UseMutationOptions<UserPayload, Error, LoginCredentials>,
    "mutationFn"
  >
) => {
  return useMutation({
    mutationFn: loginUser,
    ...options,
  });
};

// --- Impersonation Types ---
interface ImpersonateGroupPayload {
  groupId: string;
  groupName: string;
}

interface ImpersonateEntityPayload {
  entityId: string;
  entityName: string;
}

// --- API Functions for Impersonation ---

const impersonateGroup = (payload: ImpersonateGroupPayload): Promise<void> => {
  return apiClient<void>("auth/impersonate/group", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const stopGroupImpersonation = (): Promise<void> => {
  return apiClient<void>("auth/impersonate/group", {
    method: "DELETE",
  });
};

const impersonateEntity = (payload: ImpersonateEntityPayload): Promise<void> => {
  return apiClient<void>("auth/impersonate/entity", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

const stopEntityImpersonation = (): Promise<void> => {
  return apiClient<void>("auth/impersonate/entity", {
    method: "DELETE",
  });
};

// --- Custom Hooks for Impersonation ---

export const useImpersonateGroup = (
  options?: UseMutationOptions<void, Error, ImpersonateGroupPayload>
) => {
  return useMutation({
    mutationFn: impersonateGroup,
    ...options,
  });
};

export const useStopGroupImpersonation = (
  options?: UseMutationOptions<void, Error, void>
) => {
  return useMutation({
    mutationFn: stopGroupImpersonation,
    ...options,
  });
};

export const useImpersonateEntity = (
  options?: UseMutationOptions<void, Error, ImpersonateEntityPayload>
) => {
  return useMutation({
    mutationFn: impersonateEntity,
    ...options,
  });
};

export const useStopEntityImpersonation = (
  options?: UseMutationOptions<void, Error, void>
) => {
  return useMutation({
    mutationFn: stopEntityImpersonation,
    ...options,
  });
};
