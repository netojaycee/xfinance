// lib/api/hooks/useEntity.ts

import { useMutation, useQuery, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { createEntity, updateEntity, deleteEntity, getEntities, getEntity } from '../services/entityService';
import { Entity } from '@/lib/types';

type CreateEntityPayload = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateEntityPayload = Partial<CreateEntityPayload> & { id: string };


/**
 * Hook for creating an entity (business unit) within the user's group.
 * Triggers background job 'create-entity-user' on success.
 * Entity is automatically assigned to authenticated user's group.
 */
export const useCreateEntity = (options?: UseMutationOptions<Entity, Error, CreateEntityPayload>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEntity,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: ['entities', 'list'] });
      // Background job queued: create-entity-user
      // - Creates entity admin user
      // - Entity ready for financial data entry
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};


/**
 * Hook for updating an existing entity.
 * Email and taxId cannot be changed after creation (immutable).
 */
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


/**
 * Hook for deleting an entity.
 * This is a destructive operation with cascading deletes.
 * Deletes: accounts, transactions, employees, customers, etc.
 */
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


/**
 * Hook to fetch all entities within the authenticated user's group.
 * Each entity can have different currency (ISO 4217) and fiscal year-end.
 */
export const useEntities = () => {
  return useQuery({
    queryKey: ['entities', 'list'],
    queryFn: getEntities,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
};


/**
 * Hook to fetch a specific entity by ID.
 * User must have access to the entity's group.
 */
export const useEntity = (id: string) => {
  return useQuery({
    queryKey: ['entities', 'detail', id],
    queryFn: () => getEntity(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
