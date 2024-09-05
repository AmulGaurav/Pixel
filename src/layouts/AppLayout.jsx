import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen items-center justify-center p-6">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
