import { axiosClient } from "@/api/axiosClient";

export interface CreateRequestParams {
  paperId: number;
}

export interface CreateRequestResponse {
  requestId: number;
}

export const createRequest = async (
  params: CreateRequestParams,
): Promise<CreateRequestResponse> => {
  const response = await axiosClient.post<CreateRequestResponse>("/api/requests", params);
  return response.data;
};

export const deleteRequest = async (requestId: number): Promise<void> => {
  await axiosClient.delete(`/api/requests/${requestId.toString()}`);
};
