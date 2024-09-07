import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return localStorage.getItem("mnemonic") ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
