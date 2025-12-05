import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "@/features/auth/api/auth";
import { setAccessToken, getAccessToken } from "@/features/auth/context/tokenStore";

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.endsWith("/refresh")
    ) {
      try {
        const { accessToken } = await refreshAccessToken();
        setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axiosClient(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        // FIX: this might be wrong
        window.location.href = "/login";
        return Promise.reject(
          refreshError instanceof Error ? refreshError : new Error(String(refreshError)),
        );
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
