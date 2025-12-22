// lib/api/queries/groupQueries.ts

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { Group } from '@/lib/types'; // Assuming this type exists

// --- Query Keys ---
export const groupQueryKeys = {
  all: ['groups'] as const,
  lists: () => [...groupQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...groupQueryKeys.lists(), { filters }] as const,
  details: () => [...groupQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...groupQueryKeys.details(), id] as const,
};

// --- API Functions ---

/**
 * Fetches a list of all groups.
 */
const getGroups = (): Promise<Group[]> => {
  return apiClient<Group[]>('groups', {
    method: 'GET',
  });
};

/**
 * Fetches a single group by its ID.
 */
const getGroup = (id: string): Promise<Group> => {
  return apiClient<Group>(`groups/${id}`, {
    method: 'GET',
  });
};

// --- Custom Hooks ---

/**
 * Custom hook to fetch all groups.
 */
export const useGroups = () => {
  return useQuery({
    queryKey: groupQueryKeys.lists(),
    queryFn: getGroups,
  });
};

/**
 * Custom hook to fetch a single group by its ID.
 * @param id The ID of the group to fetch.
 */
export const useGroup = (id: string) => {
  return useQuery({
    queryKey: groupQueryKeys.detail(id),
    queryFn: () => getGroup(id),
    enabled: !!id, // Only run the query if the id is not null or undefined
  });
};

