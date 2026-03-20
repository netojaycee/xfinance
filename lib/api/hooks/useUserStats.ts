// lib/api/hooks/useUserStats.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUserStats, UserStats } from '../services/userStatsService';

export const useUserStats = (options?: Omit<UseQueryOptions<UserStats>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['users', 'stats'],
    queryFn: getUserStats,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    ...options,
  });
};
