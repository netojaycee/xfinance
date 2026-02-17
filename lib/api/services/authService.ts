// lib/api/services/authService.ts
import { apiClient } from "../client";
import { UserPayload } from "@/lib/types";
import { LoginCredentials } from "@/lib/schema";

export const loginUser = (
  credentials: LoginCredentials,
): Promise<UserPayload> => {
  return apiClient<UserPayload>("auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const impersonateGroup = (payload: {
  groupId: string;
  groupName: string;
}): Promise<void> => {
  return apiClient<void>("auth/impersonate/group", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const stopGroupImpersonation = (): Promise<void> => {
  return apiClient<void>("auth/impersonate/group", {
    method: "DELETE",
  });
};

export const getProfile = (): Promise<UserPayload> => {
  return apiClient<UserPayload>("/auth/profile", {
    method: "GET",
  });
};

// --- Entity Impersonation Endpoints ---
export const impersonateEntity = (payload: {
  entityId: string;
  entityName: string;
}): Promise<void> => {
  return apiClient<void>("auth/impersonate/entity", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const stopEntityImpersonation = (): Promise<void> => {
  return apiClient<void>("auth/impersonate/entity", {
    method: "DELETE",
  });
};

// Logout endpoint
export const logout = (): Promise<void> => {
  return apiClient<void>("auth/logout", {
    method: "POST",
  });
};
