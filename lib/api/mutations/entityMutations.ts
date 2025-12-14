// lib/api/mutations/entityMutations.ts

import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../client';
import { entityQueryKeys } from '../queries/entityQueries';
import { Entity } from '@/lib/types';

// --- Types ---

type CreateEntityPayload = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateEntityPayload = Partial<CreateEntityPayload> & { id: string };

// --- API Functions ---

const createEntity = (payload: CreateEntityPayload): Promise<Entity> => {
  return apiClient<Entity>('entities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

const updateEntity = ({ id, ...payload }: UpdateEntityPayload): Promise<Entity> => {
  return apiClient<Entity>(`entities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

const deleteEntity = (id: string): Promise<void> => {
  return apiClient<void>(`entities/${id}`, {
    method: 'DELETE',
  });
};

// --- Custom Hooks ---

export const useCreateEntity = (
  options?: UseMutationOptions<Entity, Error, CreateEntityPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEntity,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: entityQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

export const useUpdateEntity = (
  options?: UseMutationOptions<Entity, Error, UpdateEntityPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEntity,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: entityQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: entityQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

export const useDeleteEntity = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntity,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: entityQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};
