import axios, { AxiosError } from "axios";
import { refreshApi } from "@/features/auth/api/auth";
import { setAccessToken, getAccessToken } from "@/features/auth/context/tokenStore";

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
      !originalRequest.url?.endsWith("/refresh") &&
      !originalRequest.url?.endsWith("/login")
    ) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token || ""}`;
            return axiosClient(originalRequest);
          })
          .catch((err: unknown) => {
            const error =
              err instanceof Error ? err : new Error(JSON.stringify(err) || "Unknown error");
            return Promise.reject(error);
          });
      }

      isRefreshing = true;

      try {
        const { accessToken } = await refreshApi();
        setAccessToken(accessToken);
        processQueue(null, accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axiosClient(originalRequest);
      } catch (refreshError: unknown) {
        setAccessToken(null);
        processQueue(refreshError, null);

        window.location.href = "/login";
        const error =
          refreshError instanceof Error
            ? refreshError
            : new Error(JSON.stringify(refreshError) || "Unknown error");
        return void Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
