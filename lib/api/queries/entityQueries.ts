// lib/api/queries/entityQueries.ts

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { Entity } from '@/lib/types'; // Assuming this type exists

// --- Query Keys ---
export const entityQueryKeys = {
  all: ['entities'] as const,
  lists: () => [...entityQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...entityQueryKeys.lists(), { filters }] as const,
  details: () => [...entityQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...entityQueryKeys.details(), id] as const,
};

// --- API Functions ---

/**
 * Fetches a list of all entities.
 */
const getEntities = (): Promise<Entity[]> => {
  return apiClient<Entity[]>('entities', {
    method: 'GET',
  });
};

/**
 * Fetches a single entity by its ID.
 */
const getEntity = (id: string): Promise<Entity> => {
  return apiClient<Entity>(`entities/${id}`, {
    method: 'GET',
  });
};

// --- Custom Hooks ---

/**
 * Custom hook to fetch all entities.
 */
export const useEntities = () => {
  return useQuery({
    queryKey: entityQueryKeys.lists(),
    queryFn: getEntities,
  });
};

/**
 * Custom hook to fetch a single entity by its ID.
 * @param id The ID of the entity to fetch.
 */
export const useEntity = (id: string) => {
  return useQuery({
    queryKey: entityQueryKeys.detail(id),
    queryFn: () => getEntity(id),
    enabled: !!id, // Only run the query if the id is not null or undefined
  });
};
