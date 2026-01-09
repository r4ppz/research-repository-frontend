import { axiosClient, refreshClient } from "@/api/axiosClient";
import type { AuthResponse } from "@/types";
import { extractApiError } from "@/util/errorHandler";

export const postLoginGoogle = async (code: string): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>("/api/auth/google", { code });
  return response.data;
};

let isRefreshInProgress = false;
let refreshPromise: Promise<{ accessToken: string }> | null = null;

export const postRefresh = (): Promise<{ accessToken: string }> => {
  if (isRefreshInProgress && refreshPromise) {
    return refreshPromise;
  }

  isRefreshInProgress = true;
  refreshPromise = refreshClient
    .post<{ accessToken: string }>("/api/auth/refresh")
    .then((response) => {
      isRefreshInProgress = false;
      return response.data;
    })
    .catch((error: unknown) => {
      isRefreshInProgress = false;
      throw extractApiError(error);
    });

  return refreshPromise;
};

export const postLogout = async (): Promise<{ message: string }> => {
  const response = await axiosClient.post<{ message: string }>("/api/auth/logout");
  return response.data;
};
