import { useEffect } from "react";
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
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner";
import { getUserApi, refreshApi } from "./features/auth/api/auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./features/auth/context/tokenStore";
import { useAuth } from "./features/auth/context/useAuth";

const App = () => {
  const { setUser, isLoading, setLoading } = useAuth();

  useScrollbarGutter();

  useEffect(() => {
    setLoading(true);

    const autoLogin = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const data = await refreshApi();
          removeAccessToken();
          setAccessToken(data.accessToken);
          console.log("Access token recieved from refreshApi call");

          const user = await getUserApi();
          console.log("User object ecieved from getUserApi call");

          setUser(user);
        } catch (error) {
          console.error("Auth login failed: ", error);
          removeAccessToken();
        }
      }
      setLoading(false);
    };
    void autoLogin();
  }, [setLoading, setUser]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner message="Just wait bro" />
      </div>
    );
  }

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
