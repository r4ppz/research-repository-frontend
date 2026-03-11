export type Role = "STUDENT" | "FACULTY" | "DEPARTMENT_ADMIN" | "SUPER_ADMIN";

export interface Department {
  departmentId: number;
  departmentName: string;
}

export interface User {
  userId: number;
  email: string;
  fullName: string;
  role: Role;
  profilePictureUrl: string | null;
  department: Department | null;
}
