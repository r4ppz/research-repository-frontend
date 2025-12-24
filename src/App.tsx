import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/common/Route/ProtectedRoute";
import DepartmentAdminRequestsPage from "@/features/admin/department/RequestPage/RequestPage";
import DepartmentAdminResearchPage from "@/features/admin/department/ResearchPage/ResearchPage";
import SuperAdminRequestsPage from "@/features/admin/super/RequestPage/RequestPage";
import SuperAdminResearchPage from "@/features/admin/super/ResearchPage/ResearchPage";
import LoginPage from "@/features/auth/LoginPage/LoginPage";
import LibraryPage from "@/features/library/LibraryPage/LibraryPage";
import StudentRequestsPage from "@/features/student/RequestPage/RequestPage";
import useScrollbarGutter from "@/hooks/useScrollbarGutter";

const App = () => {
  useScrollbarGutter();

  return (
    <>
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
              <StudentRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-admin/requests"
          element={
            <ProtectedRoute allowedRoles={["DEPARTMENT_ADMIN"]}>
              <DepartmentAdminRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-admin/research"
          element={
            <ProtectedRoute allowedRoles={["DEPARTMENT_ADMIN"]}>
              <DepartmentAdminResearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/requests"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <SuperAdminRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/research"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <SuperAdminResearchPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <div id="modal-root" />
    </>
  );
};

export default App;
