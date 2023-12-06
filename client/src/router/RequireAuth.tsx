import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const user = localStorage.getItem("userName");
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
