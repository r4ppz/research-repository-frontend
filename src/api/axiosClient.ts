import axios from "axios";
import { refreshApi } from "@/features/auth/api/auth";
import { setAccessToken, getAccessToken } from "@/features/auth/context/tokenStore";
import { extractApiError, isAuthError } from "@/util/errorHandler";
import { ApiError } from "@/types/api";

const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: ApiError) => void;
};

let failedQueue: QueueItem[] = [];

function processQueue(err: ApiError | null, token?: string): void {
  for (const item of failedQueue) {
    if (err) {
      item.reject(err);
    } else if (token) {
      item.resolve(token);
    }
  }
  failedQueue = [];
}

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    const apiError = extractApiError(error);
    return Promise.reject(apiError);
  },
);

axiosClient.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    const apiError = extractApiError(error);

    if (!axios.isAxiosError(error)) {
      return Promise.reject(apiError);
    }

    const original = error.config;
    const status = error.response?.status;

    if (!original) {
      return Promise.reject(apiError);
    }

    const url = original.url ?? "";

    // Handle 401 errors with token refresh, except for auth endpoints
    const shouldRefresh = status === 401 && !url.endsWith("/refresh") && !url.endsWith("/google") && !url.endsWith("/logout");

    if (!shouldRefresh) {
      // For auth errors on auth endpoints, redirect to login
      if (isAuthError(apiError) && (url.endsWith("/refresh") || url.endsWith("/google"))) {
        setAccessToken(null);
        window.location.href = "/login";
      }
      return Promise.reject(apiError);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers.set("Authorization", `Bearer ${token}`);
          return axiosClient(original);
        })
        .catch((queueErr: unknown) => {
          const queueApiError = extractApiError(queueErr);
          return Promise.reject(queueApiError);
        });
    }

    isRefreshing = true;

    try {
      const { accessToken } = await refreshApi();

      setAccessToken(accessToken);
      processQueue(null, accessToken);

      original.headers.set("Authorization", `Bearer ${accessToken}`);

      return await axiosClient(original);
    } catch (err: unknown) {
      const refreshApiError = extractApiError(err);

      setAccessToken(null);
      processQueue(refreshApiError);

      // Redirect to login for auth errors
      if (isAuthError(refreshApiError)) {
        window.location.href = "/login";
      }

      return await Promise.reject(refreshApiError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosClient;
