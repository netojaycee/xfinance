// lib/api/hooks/useEntity.ts

import {
  useMutation,
  useQuery,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntities,
  getEntity,
  EntityFormData,
} from "../services/entityService";
import { Entity } from "@/lib/types";

type CreateEntityPayload = EntityFormData;
type UpdateEntityPayload = EntityFormData & { id: string };

/**
 * Hook for creating an entity (business unit) within the user's group.
 * Handles logo file upload via multipart/form-data.
 * Triggers background job 'create-entity-user' on success.
 * Entity is automatically assigned to authenticated user's group.
 */
export const useCreateEntity = (
  options?: UseMutationOptions<Entity, Error, CreateEntityPayload>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEntity,
    onSuccess: async (data, variables, context, mutation) => {
      await queryClient.refetchQueries({ queryKey: ["entities", "list"] });
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
 * Handles logo file upload via multipart/form-data.
 * Email and taxId cannot be changed after creation (immutable).
 */
export const useUpdateEntity = (
  options?: UseMutationOptions<Entity, Error, UpdateEntityPayload>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEntity,
    onSuccess: async (data, variables, context, mutation) => {
      if (variables && "id" in variables && variables.id) {
        queryClient.invalidateQueries({
          queryKey: ["entities", "detail", variables.id],
        });
      }
      await queryClient.refetchQueries({ queryKey: ["entities", "list"] });
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
export const useDeleteEntity = (
  options?: UseMutationOptions<void, Error, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEntity,
    onSuccess: async (data, id, context, mutation) => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["entities", "detail", id] });
      }
      await queryClient.refetchQueries({ queryKey: ["entities", "list"] });
      options?.onSuccess?.(data, id, context, mutation);
    },
    ...options,
  });
};

/**
 * Hook to fetch all entities within the authenticated user's group.
 * Each entity can have different currency (ISO 4217) and fiscal year-end.
 * Supports search, filtering, and pagination.
 */
export const useEntities = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["entities", "list"],

    // queryKey: ['entities', 'list', params?.search, params?.page, params?.limit],
    queryFn: () => getEntities(params),
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
    queryKey: ["entities", "detail", id],
    queryFn: () => getEntity(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
