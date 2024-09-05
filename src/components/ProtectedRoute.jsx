import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isMnemonicEmptyState } from "../recoil/atoms/globalAtoms";

const ProtectedRoute = () => {
  const isMnemonicEmpty = useRecoilValue(isMnemonicEmptyState);

  return isMnemonicEmpty ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedRoute;
