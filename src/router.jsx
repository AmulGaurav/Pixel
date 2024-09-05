import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/ErrorPage";

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
    ],
  },
]);

export default appRouter;
