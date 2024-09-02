import { useState } from "react";
import { generateMnemonic } from "bip39";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar";
import ImportWallet from "./components/ImportWallet";
import EthWallet from "./components/EthWallet";
import SolanaWallet from "./components/SolanaWallet";
import ToastNotification from "./components/ToastNotification";
import NavigationBar from "./components/NavigationBar";
import SupportedChains from "./components/SupportedChains";
import Mnemonic from "./components/Mnemonic";

function App() {
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
  const [isMnemonicEmpty, setIsMnemonicEmpty] = useState(true);
  const [showImportWallet, setShowImportWallet] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(true);
  const [activeWallet, setActiveWallet] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleGenerateMnemonic = () => {
    const mn = generateMnemonic();
    const newMnemonic = mn.split(" ");

    setMnemonic(newMnemonic);
    setIsLandingPage(false);
    setIsMnemonicEmpty(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 items-center justify-center p-6">
      <Navbar />

      {isLandingPage && (
        <div className="flex flex-col items-center mb-14">
          <div className="mb-4">
            <Logo />
          </div>

          <h1 className="text-white text-2xl font-semibold">
            Welcome to Pixel
          </h1>
          <p className="text-gray-400 mt-2">Let&#39;s get started.</p>
        </div>
      )}

      <div>
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          HD Wallet
        </h1>
      </div>

      <div
        className={`bg-gray-800 p-8 rounded-xl shadow-2xl w-full ${
          isLandingPage ? "max-w-md" : "max-w-2xl"
        } mx-auto`}
      >
        {isLandingPage && (
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
                setIsLandingPage(false);
                setShowImportWallet(true);
              }}
            >
              Import Wallet
            </button>
          </div>
        )}

        {showImportWallet && (
          <ImportWallet
            mnemonic={mnemonic}
            setMnemonic={setMnemonic}
            setIsMnemonicEmpty={setIsMnemonicEmpty}
            setShowImportWallet={setShowImportWallet}
          />
        )}

        {!isMnemonicEmpty && (
          <div className="mb-6">
            <Mnemonic
              mnemonic={mnemonic}
              showMnemonic={showMnemonic}
              setShowMnemonic={setShowMnemonic}
              setShowToast={setShowToast}
            />

            {!activeWallet && (
              <SupportedChains setActiveWallet={setActiveWallet} />
            )}

            <div className={`${activeWallet ? "mt-10" : ""}`}>
              {activeWallet === "ethereum" && (
                <EthWallet
                  mnemonic={mnemonic.join(" ")}
                  setShowMnemonic={setShowMnemonic}
                />
              )}
              {activeWallet === "solana" && (
                <SolanaWallet
                  mnemonic={mnemonic.join(" ")}
                  setShowMnemonic={setShowMnemonic}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {!isLandingPage && (
        <NavigationBar
          activeWallet={activeWallet}
          setIsLandingPage={setIsLandingPage}
          setShowImportWallet={setShowImportWallet}
          setMnemonic={setMnemonic}
          setActiveWallet={setActiveWallet}
          setIsMnemonicEmpty={setIsMnemonicEmpty}
          setShowMnemonic={setShowMnemonic}
        />
      )}

      <ToastNotification showToast={showToast} setShowToast={setShowToast} />
    </div>
  );
}

export default App;
