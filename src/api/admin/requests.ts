import { axiosClient } from "@/api/axiosClient";
import { Page } from "@/types/api";
import { User } from "@/types/user";
import { RequestStatus, ResearchPaper } from "@/types";

export interface AdminDocumentRequest {
  requestId: number;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
  paper: ResearchPaper;
}

export interface GetAdminRequestsParams {
  departmentId?: number; // SUPER_ADMIN only
  status?: string; // comma-separated list of PENDING, ACCEPTED, REJECTED
  page?: number; // zero-indexed (default: 0)
  size?: number; // results per page (default: 20, max: 100)
  sortBy?: string; // createdAt (default), status, paper.title, userId
  sortOrder?: string; // desc (default), asc
}

export const getAdminRequests = async (
  params?: GetAdminRequestsParams,
): Promise<Page<AdminDocumentRequest>> => {
  const response = await axiosClient.get<Page<AdminDocumentRequest>>("/api/admin/requests", {
    params,
  });
  return response.data;
};
