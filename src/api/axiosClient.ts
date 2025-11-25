import axios, { AxiosError } from "axios";
import { refreshAccessToken } from "@/features/auth/api/auth";
import { getAccessToken, setAccessToken } from "@/features/auth/tokenStore";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
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
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Check if the error is a 401 and the request was not for refreshing the token

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.endsWith("/refresh")
    ) {
      try {
        const { accessToken } = await refreshAccessToken();

        setAccessToken(accessToken);

        // Update the header of the original request

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request

        return await axiosClient(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        // Redirect to login or handle logout

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
