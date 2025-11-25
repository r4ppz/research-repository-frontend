export type Role = "STUDENT" | "TEACHER" | "DEPARTMENT_ADMIN" | "SUPER_ADMIN";

export interface Department {
  departmentId: number;
  departmentName: string;
}

export interface User {
  userId: number;
  email: string;
  fullName: string;
  role: Role;
  profilePicture?: string;
  department: Department | null;
}
