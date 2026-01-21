import { axiosClient } from "@/api/axiosClient";
import type { ResearchPaper } from "@/types";
import type { Page } from "@/types/api";

export interface GetAdminPapersParams {
  departmentId?: number;
  page?: number;
  size?: number;
  search?: string;
  year?: number;
  archived?: boolean;
  sortBy?: string;
  sortOrder?: string;
}

export const getAdminPapers = async (
  params?: GetAdminPapersParams,
): Promise<Page<ResearchPaper>> => {
  const response = await axiosClient.get<Page<ResearchPaper>>("/api/admin/papers", {
    params,
  });
  return response.data;
};
