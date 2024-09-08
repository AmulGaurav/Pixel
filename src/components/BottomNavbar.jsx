import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { selectedBlockChainState } from "../store/atoms/uiAtoms";

const BottomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBlockchain = useRecoilValue(selectedBlockChainState);

  return (
    <div className="flex justify-center mt-12">
      <div className="flex space-x-2">
        <div
          className="h-4 w-4 rounded-full cursor-pointer bg-gray-700"
          onClick={() => navigate("/")}
        ></div>

        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            !selectedBlockchain ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => {
            const route = location.pathname.split("/")[1];

            if (route !== "create-wallet" && route !== "import-wallet") {
              navigate("/select-blockchain");
            }
          }}
        ></div>

        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            selectedBlockchain ? "bg-blue-500" : "bg-gray-700"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default BottomNavbar;
