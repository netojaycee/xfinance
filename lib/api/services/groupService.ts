// lib/api/services/groupService.ts
import { apiClient } from '../client';
import { Group } from '@/lib/types';

type CreateGroupPayload = Omit<Group, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateGroupPayload = Partial<CreateGroupPayload> & { id: string };

export const createGroup = (payload: CreateGroupPayload): Promise<Group> => {
  return apiClient<Group>('groups', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateGroup = ({ id, ...payload }: UpdateGroupPayload): Promise<Group> => {
  return apiClient<Group>(`groups/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteGroup = (id: string): Promise<void> => {
  return apiClient<void>(`groups/${id}`, {
    method: 'DELETE',
  });
};

export const getGroups = (): Promise<Group[]> => {
  return apiClient<Group[]>('groups', {
    method: 'GET',
  });
};

export const getGroup = (id: string): Promise<Group> => {
  return apiClient<Group>(`groups/${id}`, {
    method: 'GET',
  });
};
