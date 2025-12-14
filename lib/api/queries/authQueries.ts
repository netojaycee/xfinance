// lib/api/queries/authQueries.ts

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { UserPayload } from '@/lib/types'; // Assuming this type exists

// A unique key to identify this query in TanStack Query's cache
export const profileQueryKeys = {
  all: ['profile'] as const,
};

/**
 * The actual API call function for fetching the user profile.
 */
const getProfile = (): Promise<UserPayload> => {
  return apiClient<UserPayload>('/auth/profile', {
    method: 'GET',
  });
};

/**
 * Custom hook for fetching the current user's profile.
 * Handles fetching, caching, refetching, etc.
 */
export const useProfile = () => {
  return useQuery({
    queryKey: profileQueryKeys.all,
    queryFn: getProfile,
    // You might want to add options like:
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // retry: 1, // Retry once on failure
  });
};
