import { axiosClient } from "@/api/axiosClient";
import type { DocumentRequest, Page, ResearchPaper } from "@/types";

export interface GetPapersParams {
  search?: string;
  departmentId?: string;
  year?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  size?: number;
  archived?: boolean;
}

export const getPapers = async (params: GetPapersParams = {}): Promise<Page<ResearchPaper>> => {
  const response = await axiosClient.get<Page<ResearchPaper>>("/api/papers", {
    params,
  });
  return response.data;
};

export const getPaperById = async (id: number): Promise<ResearchPaper> => {
  const response = await axiosClient.get<ResearchPaper>(`/api/papers/${id.toString()}`);
  return response.data;
};

export const getMyPaperRequest = async (paperId: number): Promise<DocumentRequest> => {
  const response = await axiosClient.get<DocumentRequest>(
    `/api/papers/${paperId.toString()}/my-request`,
  );
  return response.data;
};
