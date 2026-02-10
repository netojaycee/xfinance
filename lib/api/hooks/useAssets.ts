import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as assetsService from "../services/assetsService";
import { CreateAssetInput, UpdateAssetInput } from "./types/assetsTypes";

export const useAssets = (params?: { search?: string }) => {
  return useQuery({
    queryKey: ["assets", params],
    queryFn: () => assetsService.getAssets(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useAssetById = (id: string) => {
  return useQuery({
    queryKey: ["assets", id],
    queryFn: () => assetsService.getAssetById(id),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAssetInput) => assetsService.createAsset(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};

export const useUpdateAsset = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAssetInput) =>
      assetsService.updateAsset(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["assets", id] });
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => assetsService.deleteAsset(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};
