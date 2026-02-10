import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as hrService from "../services/hrService";

// ============ EMPLOYEE HOOKS ============

export const useEmployees = (params?: { search?: string }) => {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => hrService.getEmployees(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useEmployeeById = (id: string) => {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => hrService.getEmployeeById(id),
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => hrService.createEmployee(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => hrService.updateEmployee(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employees", id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => hrService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
