import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isCheckedState,
  isRecoveryPhraseSavedState,
  mnemonicState,
} from "../store/atoms/globalAtoms";
import {
  isImportedWalletState,
  showMnemonicState,
  showSupportedChainsState,
  showToastState,
} from "../store/atoms/uiAtoms";

const Mnemonic = () => {
  const [showMnemonic, setShowMnemonic] = useRecoilState(showMnemonicState);
  const [isRecoveryPhraseSaved, setIsRecoveryPhraseSaved] = useRecoilState(
    isRecoveryPhraseSavedState
  );
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);
  const mnemonic = useRecoilValue(mnemonicState);
  const isImportedWallet = useRecoilValue(isImportedWalletState);
  const setShowSupportedChains = useSetRecoilState(showSupportedChainsState);
  const setShowToast = useSetRecoilState(showToastState);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic.join(" "));
    setShowToast(true);
  };

  return (
    <div>
      {!isImportedWallet && !isRecoveryPhraseSaved && (
        <div className="mb-5 px-4 bg-gray-800 rounded-lg shadow-md w-full space-y-4 text-center text-white">
          <h1 className="text-2xl font-bold">Secret Recovery Phrase</h1>
          <p className="text-yellow-300">
            This phrase is the ONLY way to recover your wallet. Do NOT share it
            with anyone!
          </p>
        </div>
      )}

      {(isRecoveryPhraseSaved || isImportedWallet) && (
        <div className="mb-3 flex justify-between items-center">
          <label className="text-lg font-medium text-gray-300">
            Your Seed Phrase:
          </label>
          <button
            onClick={() => setShowMnemonic(!showMnemonic)}
            className="text-indigo-400 hover:text-indigo-300"
          >
            {showMnemonic ? "Hide" : "Show"}
          </button>
        </div>
      )}

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showMnemonic ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="grid grid-cols-3 gap-2 bg-gray-700 p-4 rounded-lg cursor-pointer transition-all duration-400 ease-in-out transform blur-sm hover:blur-none"
          onClick={copyToClipboard}
        >
          {mnemonic.map((word, index) => (
            <div
              key={index}
              className="bg-gray-600 p-2 rounded text-white text-center transition-opacity duration-500 ease-in-out hover:opacity-90"
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {!isImportedWallet && !isRecoveryPhraseSaved && (
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
              setIsRecoveryPhraseSaved(true);
              setShowSupportedChains(true);
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
      )}
    </div>
  );
};

export default Mnemonic;
