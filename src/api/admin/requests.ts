import { axiosClient } from "@/api/axiosClient";
import type { DocumentRequest } from "@/types";
import type { Page } from "@/types/api";

// Read the docs for details
export interface GetAdminRequestsParams {
  departmentId?: number;
  status?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
}

export const getAdminRequests = async (
  params?: GetAdminRequestsParams,
): Promise<Page<DocumentRequest>> => {
  const response = await axiosClient.get<Page<DocumentRequest>>("/api/admin/requests", {
    params,
  });
  return response.data;
};
