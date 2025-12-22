// lib/api/mutations/groupMutations.ts

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../client';
import { groupQueryKeys } from '../queries/groupQueries';
import { Group } from '@/lib/types';

// --- Types ---

// Assuming these are the payload types for your API
type CreateGroupPayload = Omit<Group, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateGroupPayload = Partial<CreateGroupPayload> & { id: string };

// --- API Functions ---

const createGroup = (payload: CreateGroupPayload): Promise<Group> => {
  return apiClient<Group>('groups', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

const updateGroup = ({ id, ...payload }: UpdateGroupPayload): Promise<Group> => {
  return apiClient<Group>(`groups/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

const deleteGroup = (id: string): Promise<void> => {
  return apiClient<void>(`groups/${id}`, {
    method: 'DELETE',
  });
};

// --- Custom Hooks ---

/**
 * Custom hook to create a new group.
 */
export const useCreateGroup = (
  options?: UseMutationOptions<Group, Error, CreateGroupPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data, variables, context, mutation) => {
      // Invalidate and refetch the list of groups to show the new one
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

/**
 * Custom hook to update an existing group.
 */
export const useUpdateGroup = (
  options?: UseMutationOptions<Group, Error, UpdateGroupPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGroup,
    onSuccess: (data, variables, context, mutation) => {
      // Invalidate the specific group's details and the list of groups
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

/**
 * Custom hook to delete a group.
 */
export const useDeleteGroup = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: (data, variables, context, mutation) => {
      // Invalidate the list of groups since one has been removed
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};
