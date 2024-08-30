import { useState } from "react";
import bs58 from "bs58";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";

const KeyPair = ({ chain, selectedWallet, setShowToast }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-400">Public Key</label>
        <div className="flex items-center">
          <input
            type="text"
            readOnly
            value={selectedWallet?.publicKey}
            className="bg-gray-600 text-white py-2 px-3 rounded flex-grow mr-2"
          />

          <button
            onClick={() => copyToClipboard(selectedWallet?.publicKey)}
            className="bg-gray-500 hover:bg-gray-600 p-2 rounded"
          >
            <FaCopy className="text-white" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-gray-400">Private Key</label>
        <div className="flex items-center">
          <input
            type={showPrivateKey ? "text" : "password"}
            readOnly
            value={
              chain === "solana"
                ? bs58.encode(selectedWallet?.privateKey)
                : selectedWallet?.privateKey
            }
            className="bg-gray-600 text-white py-2 px-3 rounded flex-grow mr-2"
          />

          <button
            onClick={() => setShowPrivateKey(!showPrivateKey)}
            className="bg-gray-500 hover:bg-gray-600 p-2 rounded mr-2"
          >
            {showPrivateKey ? (
              <FaEyeSlash className="text-white" />
            ) : (
              <FaEye className="text-white" />
            )}
          </button>
          <button
            onClick={() => copyToClipboard(selectedWallet?.privateKey)}
            className="bg-gray-500 hover:bg-gray-600 p-2 rounded"
          >
            <FaCopy className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyPair;
