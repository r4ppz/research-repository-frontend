import type { Role, User } from "@/types";

function hasRole(user: User | null | undefined, ...roles: Role[]): boolean {
  if (!user) {
    return false;
  }
  return roles.includes(user.role);
}

export function isUserStudentOrTeacher(user: User | null | undefined): boolean {
  return hasRole(user, "STUDENT", "TEACHER");
}

export function isUserAdmin(user: User | null | undefined): boolean {
  return hasRole(user, "DEPARTMENT_ADMIN", "SUPER_ADMIN");
}

export function isUserStudent(user: User | null | undefined): boolean {
  return hasRole(user, "STUDENT");
}

export function isUserTeacher(user: User | null | undefined): boolean {
  return hasRole(user, "TEACHER");
}

export function isUserDepartmentAdmin(user: User | null | undefined): boolean {
  return hasRole(user, "DEPARTMENT_ADMIN");
}

export function isUserSuperAdmin(user: User | null | undefined): boolean {
  return hasRole(user, "SUPER_ADMIN");
}
