import { generateMnemonic } from "bip39";
import { useState } from "react";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import EthWallet from "./components/EthWallet";
import SolanaWallet from "./components/SolanaWallet";
import ToastNotification from "./components/ToastNotification";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [showMnemonic, setShowMnemonic] = useState(true);
  const [activeWallet, setActiveWallet] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleGenerateMnemonic = async () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
    setShowGenerateButton(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 items-center justify-center p-6">
      <Navbar />

      {!mnemonic && (
        <div className="flex flex-col items-center mb-10">
          <div className="mb-4">
            <Logo />
          </div>

          <h1 className="text-white text-2xl font-semibold">
            Welcome to Pixel
          </h1>
          <p className="text-gray-400 mt-2">Let&#39;s get started.</p>
        </div>
      )}

      <div
        className={`bg-gray-800 p-8 rounded-xl shadow-2xl w-full ${
          mnemonic ? "max-w-3xl" : "max-w-md"
        } mx-auto text-center`}
      >
        <h1 className="text-4xl font-bold mb-8 text-white">HD Wallet</h1>

        {showGenerateButton ? (
          <div className="space-y-4">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleGenerateMnemonic}
            >
              Create a new wallet
            </button>
            <button
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => {
                /* Implement import wallet logic */
              }}
            >
              Import Wallet
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex justify-between items-center">
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
                showMnemonic ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                className="grid grid-cols-3 gap-2 bg-gray-700 p-4 rounded-lg cursor-pointer"
                onClick={copyToClipboard}
              >
                {mnemonic.split(" ").map((word, index) => (
                  <div
                    key={index}
                    className="bg-gray-600 p-2 rounded text-white text-center"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-10">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setActiveWallet("ethereum")}
              >
                Ethereum
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setActiveWallet("solana")}
              >
                Solana
              </button>
            </div>

            <div className="mt-8">
              {activeWallet === "ethereum" && <EthWallet mnemonic={mnemonic} />}
              {activeWallet === "solana" && (
                <SolanaWallet mnemonic={mnemonic} />
              )}
            </div>
          </div>
        )}
      </div>

      <ToastNotification showToast={showToast} setShowToast={setShowToast} />
    </div>
  );
}

export default App;
