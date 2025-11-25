import axiosClient from "@/api/axiosClient";
import { AuthResponse } from "@/types";

export const loginWithGoogle = async (code: string): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>("/api/auth/google", { code });
  return response.data;
};

export const refreshAccessToken = async (): Promise<{ accessToken: string }> => {
  const response = await axiosClient.post<{ accessToken: string }>("/api/auth/refresh");
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const response = await axiosClient.post<{ message: string }>("/api/auth/logout");
  return response.data;
};
