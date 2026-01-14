import { axiosClient } from "@/api/axiosClient";
import type { DocumentRequest, User } from "@/types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosClient.get<User>("/api/users/me");
  return response.data;
};

export interface GetUserRequestsParams {
  page?: number;
  size?: number;
  status?: "PENDING" | "ACCEPTED" | "REJECTED";
  search?: string;
  sortBy?: "createdAt" | "paper.title" | "status";
  sortOrder?: "asc" | "desc";
}

export interface GetUserRequestsResponse {
  content: DocumentRequest[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const getUserRequests = async (
  params?: GetUserRequestsParams,
): Promise<GetUserRequestsResponse> => {
  const response = await axiosClient.get<GetUserRequestsResponse>("/api/users/me/requests", {
    params,
  });
  return response.data;
};
