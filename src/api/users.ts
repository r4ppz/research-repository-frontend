import { axiosClient } from "@/api/axiosClient";
import { DocumentRequest, User } from "@/types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosClient.get<User>("/api/users/me");
  return response.data;
};

export interface GetUserRequestsResponse {
  requests: DocumentRequest[];
}

export const getUserRequests = async (): Promise<GetUserRequestsResponse> => {
  const response = await axiosClient.get<GetUserRequestsResponse>("/api/users/me/requests");
  return response.data;
};
