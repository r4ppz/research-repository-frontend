import { type Department, type User } from "./user";

export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface ResearchPaper {
  paperId: number;
  title: string;
  authorName: string;
  abstractText: string;
  department: Department;
  submissionDate: string; // YYYY-MM-DD
  filePath?: string; // relative file path, e.g. '2023/dept_cs/paper_123.pdf'
  archived?: boolean;
  archivedAt?: string | null; // ISO datetime when archived (optional)
}

export interface DocumentRequest {
  requestId: number;
  status: RequestStatus;
  requestDate: string; // YYYY-MM-DD
  paper: ResearchPaper;
  requester: User;
}
