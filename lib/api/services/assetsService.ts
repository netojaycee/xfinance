import { apiClient } from "../client";

/**
 * Asset Endpoints
 */
export const getAssets = async (params?: {
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);

  const queryString = queryParams.toString();
  const url = queryString ? `asset?${queryString}` : "asset";
  return apiClient(url, { method: "GET" });
};

export const getAssetById = async (id: string) => {
  return apiClient(`asset/${id}`, { method: "GET" });
};

export const createAsset = async (data: {
  name: string;
  type: string;
  department: string;
  assigned: string;
  description: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  expiryDate: string;
  depreciationMethod: string;
  years: number;
  salvageValue: number;
}) => {
  return apiClient("asset", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateAsset = async (
  id: string,
  data: {
    name?: string;
    type?: string;
    department?: string;
    assigned?: string;
    description?: string;
    purchaseDate?: string;
    purchaseCost?: number;
    currentValue?: number;
    expiryDate?: string;
    depreciationMethod?: string;
    years?: number;
    salvageValue?: number;
  }
) => {
  return apiClient(`asset/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteAsset = async (id: string) => {
  return apiClient(`asset/${id}`, { method: "DELETE" });
};
