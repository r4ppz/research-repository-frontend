import axios from "axios";
import { refreshApi } from "@/features/auth/api/auth";
import { setAccessToken, getAccessToken } from "@/features/auth/context/tokenStore";
import { normalizeError, isAuthError, ERROR_CODES, getErrorCode } from "@/util/getError";

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
    const errorCode = getErrorCode(error);

    // Don't attempt refresh for certain auth endpoints or if error is refresh token revoked
    const shouldRefresh =
      status === 401 &&
      !url.endsWith("/refresh") &&
      !url.endsWith("/login") &&
      errorCode !== ERROR_CODES.REFRESH_TOKEN_REVOKED;

    if (!shouldRefresh) {
      // If it's an auth error (UNAUTHENTICATED or REFRESH_TOKEN_REVOKED), clear tokens and redirect
      if (isAuthError(error)) {
        setAccessToken(null);
        window.location.href = "/login";
      }
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
