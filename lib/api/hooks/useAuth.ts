// lib/api/hooks/useAuth.ts

import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';
import { loginUser, getProfile, impersonateEntity, stopEntityImpersonation, impersonateGroup, stopGroupImpersonation, logout, getWhoami } from '../services/authService';

// --- Group Impersonation Hooks ---
import { UserPayload, WhoamiResponse } from '@/lib/types';
import { LoginCredentials } from '@/lib/schema';

interface ImpersonateGroupPayload {
  groupId: string;
  groupName: string;
}

interface ImpersonateGroupResponse {
  success: boolean;
  message: string;
  groupId: string;
  groupName: string;
}

interface ImpersonateEntityPayload {
  entityId: string;
  entityName: string;
}

interface ImpersonateEntityResponse {
  success: boolean;
  message: string;
  entityId: string;
  entityName: string;
}

interface ImpersonationResponse {
  success: boolean;
  message: string;
}

export const useImpersonateGroup = (
  options?: UseMutationOptions<ImpersonateGroupResponse, Error, ImpersonateGroupPayload>
) => {
  return useMutation({
    mutationFn: impersonateGroup,
    ...options,
  });
};

export const useStopGroupImpersonation = (
  options?: UseMutationOptions<ImpersonationResponse, Error, void>
) => {
  return useMutation({
    mutationFn: stopGroupImpersonation,
    ...options,
  });
};

export const useLogin = (options?: Omit<UseMutationOptions<UserPayload, Error, LoginCredentials>, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables, context, mutation) => {
      // Invalidate whoami after login so it gets refetched
      queryClient.invalidateQueries({ queryKey: ['whoami'] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

/**
 * Hook to fetch complete user context with menus, permissions, entities, etc.
 * Automatically handles caching with 5-minute stale time
 * 
 * @param options - React Query useQuery options (e.g., enabled, retry, etc.)
 */
export const useWhoami = (options?: Omit<UseQueryOptions<WhoamiResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['whoami'],
    queryFn: getWhoami,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    ...options,
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

// --- Entity Impersonation Hooks ---
export const useImpersonateEntity = (
  options?: UseMutationOptions<ImpersonateEntityResponse, Error, ImpersonateEntityPayload>
) => {
  return useMutation({
    mutationFn: impersonateEntity,
    ...options,
  });
};

export const useStopEntityImpersonation = (
  options?: UseMutationOptions<ImpersonationResponse, Error, void>
) => {
  return useMutation({
    mutationFn: stopEntityImpersonation,
    ...options,
  });
};

// Logout hook
export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async (...args) => {
      // Clear all react-query cache (global state)
      await queryClient.clear();
      options?.onSuccess?.(...args);
    },
    ...options,
  });
};
