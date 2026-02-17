// lib/api/hooks/useAssets.ts

import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as assetsService from "../services/assetsService";
import { CreateAssetInput, UpdateAssetInput } from "./types/assetsTypes";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { toast } from "sonner";

// ────────────────────────────────────────────────
// Assets
// ────────────────────────────────────────────────

export const useAssets = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["assets", params?.search, params?.page, params?.limit],
    queryFn: () => assetsService.getAssets(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useAsset = (id: string) => {
  return useQuery({
    queryKey: ["assets", "detail", id],
    queryFn: () => assetsService.getAssetById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateAsset = (
  options?: UseMutationOptions<any, Error, CreateAssetInput>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: assetsService.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      toast.success("Asset created successfully");
      closeModal(MODAL.ASSET_CREATE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create asset",
      );
    },
    ...options,
  });
};

export const useUpdateAsset = (
  options?: UseMutationOptions<any, Error, { id: string; data: UpdateAssetInput }>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: ({ id, data }) => assetsService.updateAsset(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ["assets", "detail", variables.id],
        });
      }
      toast.success("Asset updated successfully");
      closeModal(MODAL.ASSET_EDIT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update asset",
      );
    },
    ...options,
  });
};

export const useDeleteAsset = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: assetsService.deleteAsset,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["assets", "detail", id],
        });
      }
      toast.success("Asset deleted successfully");
      closeModal(MODAL.ASSET_DELETE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete asset",
      );
    },
    ...options,
  });
};