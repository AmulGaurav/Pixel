import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { showMnemonicState } from "../store/atoms/uiAtoms";
import {
  isMnemonicEmptyState,
  mnemonicState,
} from "../store/atoms/globalAtoms";

function LandingPage() {
  const navigate = useNavigate();
  const setMnemonic = useSetRecoilState(mnemonicState);
  const setIsMnemonicEmpty = useSetRecoilState(isMnemonicEmptyState);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);

  useEffect(() => {
    localStorage.removeItem("mnemonic");
    setMnemonic(Array(12).fill(""));
    setShowMnemonic(true);
    setIsMnemonicEmpty(true);
  }, []);

  return (
    <div className="px-6">
      <div className="flex flex-col items-center mb-14">
        <div className="mb-4">
          <Logo />
        </div>

        <h1 className="text-white text-2xl font-semibold">Welcome to Pixel</h1>
        <p className="text-gray-400 mt-2">Let&#39;s get started.</p>
      </div>

      <Header />

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md mx-auto space-y-4">
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate("/create-wallet")}
        >
          Create a new wallet
        </button>
        <button
          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => navigate("/import-wallet")}
        >
          Import Wallet
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
