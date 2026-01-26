import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute/ProtectedRoute";
import { AdminRequestsPage } from "@/features/admin/pages/AdminRequestsPage/AdminRequestsPage";
import { AdminPapersPage } from "@/features/admin/pages/AdminPapersPage/AdminPapersPage";
import { AuthRestorer } from "@/features/auth/components/AuthRestorer/AuthRestorer";
import { LoginPage } from "@/features/auth/LoginPage/LoginPage";
import { LibraryPage } from "@/features/library/LibraryPage/LibraryPage";
import { StudentRequestPage } from "@/features/student/StudentRequestPage/StudentRequestPage";

export const App = () => {
  return (
    <>
      <AuthRestorer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["STUDENT", "DEPARTMENT_ADMIN", "SUPER_ADMIN"]}>
              <LibraryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/requests"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-admin/requests"
          element={
            <ProtectedRoute allowedRoles={["DEPARTMENT_ADMIN"]}>
              <AdminRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-admin/research"
          element={
            <ProtectedRoute allowedRoles={["DEPARTMENT_ADMIN"]}>
              <AdminPapersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/requests"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <AdminRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/research"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <AdminPapersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <div id="modal-root" />
    </>
  );
};
