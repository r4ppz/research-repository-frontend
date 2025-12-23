import axios from "axios";
import { refreshApi } from "@/features/auth/api/auth";
import { setAccessToken, getAccessToken } from "@/features/auth/context/tokenStore";
import { normalizeError, extractApiError } from "@/util/getError";

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
  reject: (err: Error) => void;
};

let failedQueue: QueueItem[] = [];

function processQueue(err: Error | null, token?: string): void {
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
  (error) => Promise.reject(normalizeError(error)),
);

axiosClient.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    const normalized = normalizeError(error);

    if (!axios.isAxiosError(error)) {
      return Promise.reject(normalized);
    }

    const original = error.config;
    const status = error.response?.status;

    if (!original) {
      return Promise.reject(normalized);
    }

    const url = original.url ?? "";

    // Check if this is an auth error that needs token refresh
    // Only try to refresh if it's a 401 and not already a refresh/login endpoint
    const shouldRefresh = status === 401 && !url.endsWith("/refresh") && !url.endsWith("/google");

    if (!shouldRefresh) {
      return Promise.reject(normalized);
    }

    // Check if the error is REFRESH_TOKEN_REVOKED - don't try to refresh in that case
    const apiError = extractApiError(error);
    if (apiError?.code === "REFRESH_TOKEN_REVOKED") {
      setAccessToken(null);
      window.location.href = "/login";
      return Promise.reject(normalized);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers.set("Authorization", `Bearer ${token}`);
          return axiosClient(original);
        })
        .catch((queueErr: unknown) => Promise.reject(normalizeError(queueErr)));
    }

    isRefreshing = true;

    try {
      const { accessToken } = await refreshApi();

      setAccessToken(accessToken);
      processQueue(null, accessToken);

      original.headers.set("Authorization", `Bearer ${accessToken}`);

      return await axiosClient(original);
    } catch (err: unknown) {
      const normalizedErr = normalizeError(err);

      setAccessToken(null);
      processQueue(normalizedErr);

      window.location.href = "/login";
      return await Promise.reject(normalizedErr);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosClient;
