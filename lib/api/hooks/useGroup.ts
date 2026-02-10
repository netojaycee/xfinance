// lib/api/hooks/useGroup.ts

import { useMutation, useQuery, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { 
  createGroup, 
  updateGroup, 
  deleteGroup, 
  getGroups, 
  getGroup,
  GroupFormData,
  transformGroupFormToApiPayload,
} from '../services/groupService';
import { Group } from '@/lib/types';

type CreateGroupPayload = Omit<Group, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateGroupPayload = Partial<CreateGroupPayload> & { id: string };


/**
 * Hook for creating or submitting a group from GroupForm component.
 * Automatically transforms form field names to API format.
 * Handles logo file upload to backend.
 * Triggers background job 'create-group-user' on success.
 */
export const useCreateGroup = (options?: UseMutationOptions<Group, Error, GroupFormData>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['groups', 'list'] });
      // Background job queued: create-group-user
      // - Creates SUPERADMIN user for group
      // - Creates default system roles
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};


export const useUpdateGroup = (options?: UseMutationOptions<Group, Error, UpdateGroupPayload>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGroup,
    onSuccess: (data, variables, context, mutation) => {
      if (variables && 'id' in variables && variables.id) {
        queryClient.invalidateQueries({ queryKey: ['groups', 'detail', variables.id] });
      }
      queryClient.invalidateQueries({ queryKey: ['groups', 'list'] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};


export const useDeleteGroup = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: (data, id, context, mutation) => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['groups', 'detail', id] });
      }
      queryClient.invalidateQueries({ queryKey: ['groups', 'list'] });
      options?.onSuccess?.(data, id, context, mutation);
    },
    ...options,
  });
};


export const useGroups = (params?: {
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['groups', 'list', params?.search, params?.page, params?.limit, params?.status],
    queryFn: () => getGroups(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
};


export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ['groups', 'detail', id],
    queryFn: () => getGroup(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
