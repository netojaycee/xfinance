// lib/api/hooks/useGroup.ts

import { useMutation, useQuery, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { createGroup, updateGroup, deleteGroup, getGroups, getGroup } from '../services/groupService';
import { Group } from '@/lib/types';

type CreateGroupPayload = Omit<Group, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateGroupPayload = Partial<CreateGroupPayload> & { id: string };


export const useCreateGroup = (options?: UseMutationOptions<Group, Error, CreateGroupPayload>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['groups', 'list'] });
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


export const useGroups = () => {
  return useQuery({
    queryKey: ['groups', 'list'],
    queryFn: getGroups,
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
