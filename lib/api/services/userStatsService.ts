// lib/api/services/userStatsService.ts
import { apiClient } from '../client';

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  roles: number;
  pendingInvites: number;
}

export const getUserStats = (): Promise<UserStats> => {
  return apiClient<UserStats>('users/stats', {
    method: 'GET',
  });
};
