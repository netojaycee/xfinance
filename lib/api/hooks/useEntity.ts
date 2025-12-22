// lib/api/hooks/useEntity.ts

import { useMutation, useQuery, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { createEntity, updateEntity, deleteEntity, getEntities, getEntity } from '../services/entityService';
import { Entity } from '@/lib/types';

type CreateEntityPayload = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateEntityPayload = Partial<CreateEntityPayload> & { id: string };


export const useCreateEntity = (options?: UseMutationOptions<Entity, Error, CreateEntityPayload>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEntity,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['entities', 'list'] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};


export const useUpdateEntity = (options?: UseMutationOptions<Entity, Error, UpdateEntityPayload>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEntity,
    onSuccess: (data, variables, context, mutation) => {
      if (variables && 'id' in variables && variables.id) {
        queryClient.invalidateQueries({ queryKey: ['entities', 'detail', variables.id] });
      }
      queryClient.invalidateQueries({ queryKey: ['entities', 'list'] });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};


export const useDeleteEntity = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntity,
    onSuccess: (data, id, context, mutation) => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['entities', 'detail', id] });
      }
      queryClient.invalidateQueries({ queryKey: ['entities', 'list'] });
      options?.onSuccess?.(data, id, context, mutation);
    },
    ...options,
  });
};


export const useEntities = () => {
  return useQuery({
    queryKey: ['entities', 'list'],
    queryFn: getEntities,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
};


export const useEntity = (id: string) => {
  return useQuery({
    queryKey: ['entities', 'detail', id],
    queryFn: () => getEntity(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
