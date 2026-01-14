import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute/ProtectedRoute";
import { DepartmentRequestPage } from "@/features/admin/pages/DepartmentRequestPage/DepartmentRequestPage";
import { DepartmentResearchPage } from "@/features/admin/pages/DepartmentResearchPage/DepartmentResearchPage";
import { SuperRequestPage } from "@/features/admin/pages/SuperRequestPage/SuperRequestPage";
import { SuperResearchPage } from "@/features/admin/pages/SuperResearchPage/SuperResearchPage";
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
              <DepartmentRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-admin/research"
          element={
            <ProtectedRoute allowedRoles={["DEPARTMENT_ADMIN"]}>
              <DepartmentResearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/requests"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <SuperRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/research"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <SuperResearchPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <div id="modal-root" />
    </>
  );
};
