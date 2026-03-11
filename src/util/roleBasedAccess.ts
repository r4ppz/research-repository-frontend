import type { Role, User } from "@/types";

function hasRole(user: User | null | undefined, ...roles: Role[]): boolean {
  if (!user) {
    return false;
  }
  return roles.includes(user.role);
}

export function isUserStudentOrFaculty(user: User | null | undefined): boolean {
  return hasRole(user, "STUDENT", "FACULTY");
}

export function isUserAdmin(user: User | null | undefined): boolean {
  return hasRole(user, "DEPARTMENT_ADMIN", "SUPER_ADMIN");
}

export function isUserStudent(user: User | null | undefined): boolean {
  return hasRole(user, "STUDENT");
}

export function isUserFaculty(user: User | null | undefined): boolean {
  return hasRole(user, "FACULTY");
}

export function isUserDepartmentAdmin(user: User | null | undefined): boolean {
  return hasRole(user, "DEPARTMENT_ADMIN");
}

export function isUserSuperAdmin(user: User | null | undefined): boolean {
  return hasRole(user, "SUPER_ADMIN");
}
