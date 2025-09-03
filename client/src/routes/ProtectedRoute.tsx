import { Navigate } from "react-router";
import type { ReactElement } from "react";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = localStorage.getItem("token");
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
