import { apiClient } from "../client";

/**
 * Project Endpoints
 */
export const getProjects = async (params?: { search?: string; page?: number; limit?: number }) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const queryString = queryParams.toString();
  const url = queryString ? `project?${queryString}` : "project";
  return apiClient(url, { method: "GET" });
};

export const getProjectById = async (id: string) => {
  return apiClient(`project/${id}`, { method: "GET" });
};

export const createProject = async (data: any) => {
  return apiClient("project", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProject = async (id: string, data: any) => {
  return apiClient(`project/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteProject = async (id: string) => {
  return apiClient(`project/${id}`, { method: "DELETE" });
};
