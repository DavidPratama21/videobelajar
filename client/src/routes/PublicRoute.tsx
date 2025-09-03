import { Navigate } from "react-router";
import type { ReactElement } from "react";

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const user = localStorage.getItem("token");
  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
