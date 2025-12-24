import axiosClient, { refreshClient } from "@/api/axiosClient";
import { AuthResponse, User } from "@/types";
import { extractApiError } from "@/util/errorHandler";

export const loginApi = async (code: string): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>("/api/auth/google", { code });
  return response.data;
};

let isRefreshInProgress = false;
let refreshPromise: Promise<{ accessToken: string }> | null = null;

export const refreshApi = async (): Promise<{ accessToken: string }> => {
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
      // Re-throw the properly formatted API error
      throw extractApiError(error);
    });

  return refreshPromise;
};

export const logoutApi = async (): Promise<{ message: string }> => {
  const response = await axiosClient.post<{ message: string }>("/api/auth/logout");
  return response.data;
};

export const getUserApi = async (): Promise<User> => {
  const response = await axiosClient.get<User>("/api/auth/me");
  return response.data;
};
