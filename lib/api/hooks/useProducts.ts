"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as productsService from "../services/productsService";
import { Collection, Item, ItemsResponse, CollectionsResponse } from "./types/productsTypes";

/**
 * Collections Hooks
 */
export const useCollections = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["collections", params],
    queryFn: () => productsService.getCollections(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCollectionById = (id: string) => {
  return useQuery({
    queryKey: ["collection", id],
    queryFn: () => productsService.getCollectionById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      productsService.createCollection(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useUpdateCollection = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      productsService.updateCollection(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["collection", id] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.deleteCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

/**
 * Items Hooks
 */
export const useItems = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) => {
  return useQuery<ItemsResponse>({
    queryKey: ["items", params],
    queryFn: () => productsService.getItems(params) as Promise<ItemsResponse>,
    staleTime: 2 * 60 * 1000,
  });
};

export const useItemById = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => productsService.getItemById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => productsService.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useUpdateItem = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => productsService.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", id] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

/**
 * Inventory Hooks
 */
export const useInventory = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["inventory", params],
    queryFn: () => productsService.getInventory(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useAdjustInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => productsService.adjustInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useInventoryMovements = (params?: {
  page?: number;
  limit?: number;
  itemId?: string;
}) => {
  return useQuery({
    queryKey: ["inventoryMovements", params],
    queryFn: () => productsService.getInventoryMovements(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useLowStockItems = () => {
  return useQuery({
    queryKey: ["lowStockItems"],
    queryFn: () => productsService.getLowStockItems(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
