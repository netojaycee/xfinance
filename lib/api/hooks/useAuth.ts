// lib/api/hooks/useAuth.ts

import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, getProfile, impersonateEntity, stopEntityImpersonation, impersonateGroup, stopGroupImpersonation } from '../services/authService';
// --- Group Impersonation Hooks ---
interface ImpersonateGroupPayload {
  groupId: string;
  groupName: string;
}

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
import { UserPayload } from '@/lib/types';
import { LoginCredentials } from '@/lib/schema';


export const useLogin = (options?: Omit<UseMutationOptions<UserPayload, Error, LoginCredentials>, 'mutationFn'>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables, context, mutation) => {
      // Invalidate and refetch the profile after login
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
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
interface ImpersonateEntityPayload {
  entityId: string;
  entityName: string;
}

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
