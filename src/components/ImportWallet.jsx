import { useState } from "react";

const ImportWallet = ({
  mnemonic,
  setMnemonic,
  setIsMnemonicEmpty,
  setShowImportWallet,
  setIsImportedWallet,
  setShowSupportedChains,
}) => {
  const [is24Words, setIs24Words] = useState(false);

  const handleInputChange = (index, value) => {
    let words = value.split(" ").filter((word) => word.trim() !== "");
    if (is24Words && words.length > 24) {
      words = words.slice(0, 24);
    } else if (!is24Words && words.length > 12) {
      words = words.slice(0, 12);
    }

    let newMnemonic;
    if (words.length === 12 || words.length === 24) {
      newMnemonic = [];

      words.forEach((word, i) => {
        newMnemonic[i] = word;
      });
    } else {
      newMnemonic = [...mnemonic];
      newMnemonic[index] = value;
    }

    setMnemonic(newMnemonic);
  };

  const handleUse24Words = () => {
    if (!is24Words) {
      setMnemonic([...mnemonic, ...Array(12).fill("")]);
    } else {
      setMnemonic(mnemonic.slice(0, 12));
    }

    setIs24Words(!is24Words);
  };

  const allFieldsFilled = mnemonic.every((word) => word.trim() !== "");

  const handleImport = () => {
    setMnemonic(mnemonic);
    setIsMnemonicEmpty(false);
    setShowImportWallet(false);
    setIsImportedWallet(true);
    setShowSupportedChains(true);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-lg space-y-6 text-center text-white">
        <h1 className="text-2xl font-bold">Secret Recovery Phrase</h1>
        <p>Enter or paste your 12 - 24-word phrase.</p>

        <button
          className="text-indigo-400 hover:text-indigo-500 font-bold"
          onClick={handleUse24Words}
        >
          {is24Words ? "Use 12 words" : "Use 24 words"}
        </button>

        <div className="grid grid-cols-3 gap-4">
          {mnemonic.map((word, index) => (
            <div key={index} className="relative">
              <span className="absolute left-2 top-2 text-gray-400">
                {index + 1}
              </span>
              <input
                type="text"
                className="bg-gray-700 text-white p-2 pl-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 w-full"
                value={word}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          className={`w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform ${
            !allFieldsFilled
              ? "opacity-50"
              : "hover:bg-indigo-700 hover:scale-105"
          }`}
          onClick={handleImport}
          disabled={!allFieldsFilled}
        >
          Import
        </button>
      </div>
    </div>
  );
};

export default ImportWallet;
