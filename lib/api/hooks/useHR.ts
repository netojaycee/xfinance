// lib/api/hooks/useEmployees.ts

import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as hrService from "../services/hrService";
import { useModal } from "@/components/providers/ModalProvider";
import { MODAL } from "@/lib/data/modal-data";
import { toast } from "sonner";

// ────────────────────────────────────────────────
// Employees
// ────────────────────────────────────────────────

export const useEmployees = (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["employees", params?.search, params?.page, params?.limit],
    queryFn: () => hrService.getEmployees(params),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employees", "detail", id],
    queryFn: () => hrService.getEmployeeById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateEmployee = (
  options?: UseMutationOptions<any, Error, FormData>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: hrService.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created successfully");
      closeModal(MODAL.EMPLOYEE_CREATE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create employee",
      );
    },
    ...options,
  });
};

export const useUpdateEmployee = (
  options?: UseMutationOptions<any, Error, { id: string; formData: FormData }>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: ({ id, formData }) => hrService.updateEmployee(id, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ["employees", "detail", variables.id],
        });
      }
      toast.success("Employee updated successfully");
      closeModal(MODAL.EMPLOYEE_EDIT);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update employee",
      );
    },
    ...options,
  });
};

export const useDeleteEmployee = (
  options?: UseMutationOptions<any, Error, string>,
) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationFn: hrService.deleteEmployee,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["employees", "detail", id],
        });
      }
      toast.success("Employee deleted successfully");
      closeModal(MODAL.EMPLOYEE_DELETE);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete employee",
      );
    },
    ...options,
  });
};