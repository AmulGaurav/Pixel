import { RouterProvider } from "react-router-dom";
import appRouter from "./router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={appRouter} />
    </RecoilRoot>
  );
}

export default App;
