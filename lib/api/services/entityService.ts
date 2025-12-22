// lib/api/services/entityService.ts
import { apiClient } from '../client';
import { Entity } from '@/lib/types';

type CreateEntityPayload = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateEntityPayload = Partial<CreateEntityPayload> & { id: string };

export const createEntity = (payload: CreateEntityPayload): Promise<Entity> => {
  return apiClient<Entity>('entities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateEntity = ({ id, ...payload }: UpdateEntityPayload): Promise<Entity> => {
  return apiClient<Entity>(`entities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteEntity = (id: string): Promise<void> => {
  return apiClient<void>(`entities/${id}`, {
    method: 'DELETE',
  });
};

export const getEntities = (): Promise<Entity[]> => {
  return apiClient<Entity[]>('entities', {
    method: 'GET',
  });
};

export const getEntity = (id: string): Promise<Entity> => {
  return apiClient<Entity>(`entities/${id}`, {
    method: 'GET',
  });
};
