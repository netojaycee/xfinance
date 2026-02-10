// lib/api/services/entityService.ts
import { apiClient } from '../client';
import { Entity } from '@/lib/types';

/**
 * API payload for creating an entity.
 * Entity is automatically assigned to the authenticated user's group.
 */
export interface CreateEntityApiPayload {
  name?: string;
  legalName?: string;
  taxId?: string;
  country?: string;
  currency?: string; // ISO 4217 code (USD, EUR, GBP, etc.)
  yearEnd?: string; // MM-DD format (e.g., "12-31")
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phoneNumber?: string;
  email: string; // Required
  website?: string;
  // groupId is derived from authenticated user's context
}

type CreateEntityPayload = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateEntityPayload = Partial<CreateEntityPayload> & { id: string };

/**
 * Create a new entity (business unit) within user's group.
 * The entity is automatically assigned to the authenticated user's group.
 * Background job 'create-entity-user' is queued to create entity admin.
 * @param payload - Entity data following API schema
 * @returns Promise resolving to created Entity
 */
export const createEntity = (payload: CreateEntityPayload): Promise<Entity> => {
  return apiClient<Entity>('entities', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

/**
 * Update an existing entity.
 * Entity email and taxId cannot be modified after creation (immutable).
 * @param id - Entity ID
 * @param payload - Partial entity data to update
 * @returns Promise resolving to updated Entity
 */
export const updateEntity = ({ id, ...payload }: UpdateEntityPayload): Promise<Entity> => {
  return apiClient<Entity>(`entities/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * Delete an entity and all associated data.
 * This is a destructive operation with no recovery.
 * Cascades to delete all accounts, transactions, employees, etc.
 * @param id - Entity ID
 * @returns Promise resolving when deletion completes
 */
export const deleteEntity = (id: string): Promise<void> => {
  return apiClient<void>(`entities/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Retrieve all entities within the authenticated user's group.
 * Each entity can have different fiscal year-end and currency.
 * @returns Promise resolving to array of entities in user's group
 */
export const getEntities = (): Promise<Entity[]> => {
  return apiClient<Entity[]>('entities', {
    method: 'GET',
  });
};

/**
 * Retrieve a specific entity by ID.
 * User must have access to the entity's group.
 * @param id - Entity ID
 * @returns Promise resolving to Entity object
 */
export const getEntity = (id: string): Promise<Entity> => {
  return apiClient<Entity>(`entities/${id}`, {
    method: 'GET',
  });
};
