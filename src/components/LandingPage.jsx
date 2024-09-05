import { generateMnemonic } from "bip39";
import Logo from "./Logo";
import ImportWallet from "./ImportWallet";
import EthWallet from "./EthWallet";
import SolanaWallet from "./SolanaWallet";
import ToastNotification from "./ToastNotification";
import NavigationBar from "./NavigationBar";
import SupportedChains from "./SupportedChains";
import Mnemonic from "./Mnemonic";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isLandingPageState,
  selectedBlockChainState,
  showImportWalletState,
  showSupportedChainsState,
} from "../store/atoms/uiAtoms";
import {
  isMnemonicEmptyState,
  mnemonicState,
} from "../store/atoms/globalAtoms";

function LandingPage() {
  const [isLandingPage, setIsLandingPage] = useRecoilState(isLandingPageState);
  const setMnemonic = useSetRecoilState(mnemonicState);
  const [isMnemonicEmpty, setIsMnemonicEmpty] =
    useRecoilState(isMnemonicEmptyState);
  const [showImportWallet, setShowImportWallet] = useRecoilState(
    showImportWalletState
  );
  const showSupportedChains = useRecoilValue(showSupportedChainsState);
  const selectedBlockchain = useRecoilValue(selectedBlockChainState);

  const handleGenerateMnemonic = () => {
    const mn = generateMnemonic();
    const newMnemonic = mn.split(" ");

    setMnemonic(newMnemonic);
    setIsLandingPage(false);
    setIsMnemonicEmpty(false);
  };

  return (
    <div>
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

        {showImportWallet && <ImportWallet />}

        {!isMnemonicEmpty && (
          <div className="mb-6">
            <Mnemonic />

            {showSupportedChains && <SupportedChains />}

            <div className={`${selectedBlockchain ? "mt-10" : ""}`}>
              {selectedBlockchain === "ethereum" && <EthWallet />}
              {selectedBlockchain === "solana" && <SolanaWallet />}
            </div>
          </div>
        )}
      </div>

      {!isLandingPage && <NavigationBar />}

      <ToastNotification />
    </div>
  );
}

export default LandingPage;
