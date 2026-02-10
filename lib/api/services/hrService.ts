import { apiClient } from "../client";

/**
 * Employee Endpoints
 */
export const createEmployee = async (formData: FormData) => {
  return apiClient("employee", {
    method: "POST",
    body: formData,
    // Don't set Content-Type header - let browser set it for multipart
  });
};

export const getEmployees = async (params?: { search?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `employee?${queryString}` : "employee";
  return apiClient(url, { method: "GET" });
};

export const getEmployeeById = async (id: string) => {
  return apiClient(`employee/${id}`, { method: "GET" });
};

export const updateEmployee = async (id: string, formData: FormData) => {
  return apiClient(`employee/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

export const deleteEmployee = async (id: string) => {
  return apiClient(`employee/${id}`, { method: "DELETE" });
};
