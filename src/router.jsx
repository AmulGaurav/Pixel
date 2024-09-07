import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateWallet from "./pages/CreateWallet";
import ImportWallet from "./pages/ImportWallet";
import SelectBlockchain from "./pages/SelectBlockchain";
import UserWallet from "./pages/UserWallet";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "create-wallet",
        element: <CreateWallet />,
      },
      {
        path: "import-wallet",
        element: <ImportWallet />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "select-blockchain",
            element: <SelectBlockchain />,
          },
          {
            path: "ethereum",
            element: <UserWallet />,
          },
          {
            path: "solana",
            element: <UserWallet />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
