import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as projectsService from "../services/projectsService";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { toast } from "sonner";

// ────────────────────────────────────────────────
// Projects
// ────────────────────────────────────────────────

export const useProjects = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["projects", params?.search, params?.page, params?.limit],
    queryFn: () => projectsService.getProjects(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", "detail", id],
    queryFn: () => projectsService.getProjectById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateProject = (
  options?: UseMutationOptions<any, Error, any>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: projectsService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
      closeModal(MODAL.PROJECT_CREATE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create project",
      );
    },
    ...options,
  });
};

export const useUpdateProject = (
  options?: UseMutationOptions<any, Error, { id: string; data: any }>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: ({ id, data }) => projectsService.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ["projects", "detail", variables.id],
        });
      }
      toast.success("Project updated successfully");
      closeModal(MODAL.PROJECT_EDIT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update project",
      );
    },
    ...options,
  });
};

export const useDeleteProject = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["projects", "detail", id],
        });
      }
      toast.success("Project deleted successfully");
      closeModal(MODAL.PROJECT_DELETE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete project",
      );
    },
    ...options,
  });
};
