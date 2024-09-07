import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mnemonicState } from "../store/atoms/globalAtoms";
import { showMnemonicState, showToastState } from "../store/atoms/uiAtoms";

const Mnemonic = () => {
  const mnemonic = useRecoilValue(mnemonicState);
  const setShowToast = useSetRecoilState(showToastState);
  const [showMnemonic, setShowMnemonic] = useRecoilState(showMnemonicState);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic.join(" "));
    setShowToast(true);
  };

  return (
    <div>
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
              className="bg-gray-600 p-2 rounded text-white text-center transition-opacity duration-500 ease-in-out"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mnemonic;
