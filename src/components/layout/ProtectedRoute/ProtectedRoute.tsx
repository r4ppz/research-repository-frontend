import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import style from "./ProtectedRoute.module.css";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/features/auth/context/useAuth";
import type { Role } from "@/types";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // Show loading spinner while authentication is being checked/restored
  if (isLoading) {
    return (
      <div className={style.loadingContainer}>
        <LoadingSpinner message="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};
