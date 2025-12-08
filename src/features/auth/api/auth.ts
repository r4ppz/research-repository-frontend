import axiosClient, { refreshClient } from "@/api/axiosClient";
import { AuthResponse } from "@/types";

export const loginApi = async (code: string): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>("/api/auth/google", { code });
  return response.data;
};

export const refreshApi = async (): Promise<{ accessToken: string }> => {
  const response = await refreshClient.post<{ accessToken: string }>("/api/auth/refresh");
  return response.data;
};

export const logoutApi = async (): Promise<{ message: string }> => {
  const response = await axiosClient.post<{ message: string }>("/api/auth/logout");
  return response.data;
};
