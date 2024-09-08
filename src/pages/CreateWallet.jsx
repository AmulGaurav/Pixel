import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { showMnemonicState } from "../store/atoms/uiAtoms";
import Mnemonic from "../components/Mnemonic";
import BottomNavbar from "../components/BottomNavbar";
import Header from "../components/Header";
import { mnemonicStringSelector } from "../store/selectors/mnemonicSelectors";
import { generateMnemonic } from "bip39";
import {
  isMnemonicEmptyState,
  mnemonicState,
} from "../store/atoms/globalAtoms";

const CreateWallet = () => {
  const navigate = useNavigate();
  const mnemonicString = useRecoilValue(mnemonicStringSelector);
  const setMnemonic = useSetRecoilState(mnemonicState);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);
  const [isMnemonicEmpty, setIsMnemonicEmpty] =
    useRecoilState(isMnemonicEmptyState);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isMnemonicEmpty) {
      const mn = generateMnemonic();
      const newMnemonic = mn.split(" ");

      setMnemonic(newMnemonic);
      setShowMnemonic(true);
    }
  }, []);

  return (
    <div className="-mt-5 px-4 md:px-6">
      <Header />

      <div className="bg-gray-800 p-4 py-8 md:px-8 rounded-xl shadow-2xl max-w-2xl mx-auto space-y-5">
        <div className="mb-5 px-4 bg-gray-800 rounded-lg shadow-md w-full space-y-4 text-center text-white">
          <h1 className="text-2xl font-bold">Secret Recovery Phrase</h1>
          <p className="text-yellow-300">
            This phrase is the ONLY way to recover your wallet. Do NOT share it
            with anyone!
          </p>
        </div>

        <Mnemonic />

        <div>
          <div className="flex items-center mt-4">
            <input
              id="recovery-checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2 w-4 h-4 text-purple-600 bg-gray-100 "
            />
            <label htmlFor="recovery-checkbox" className="text-white">
              I saved my Secret Recovery Phrase
            </label>
          </div>

          <button
            onClick={() => {
              setShowMnemonic(false);
              setIsMnemonicEmpty(false);
              localStorage.setItem("mnemonic", mnemonicString);
              navigate("/select-blockchain");
            }}
            disabled={!isChecked}
            className={`mt-4 w-full py-2 px-4 rounded-lg text-white ${
              isChecked
                ? "bg-purple-500 hover:bg-purple-600 cursor-pointer"
                : "bg-gray-500"
            }`}
          >
            Continue
          </button>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default CreateWallet;
