import { useSetRecoilState } from "recoil";
import Logo from "./Logo";
import {
  isImportedWalletState,
  isLandingPageState,
  selectedBlockChainState,
  showImportWalletState,
  showMnemonicState,
  showSupportedChainsState,
} from "../store/atoms/uiAtoms";
import {
  isCheckedState,
  isMnemonicEmptyState,
  isRecoveryPhraseSavedState,
  mnemonicState,
} from "../store/atoms/globalAtoms";
import {
  currentIndexState,
  selectedWalletState,
  walletsState,
} from "../store/atoms/walletAtoms";

const Navbar = () => {
  const setIsLandingPage = useSetRecoilState(isLandingPageState);
  const setIsImportedWallet = useSetRecoilState(isImportedWalletState);
  const setShowImportWallet = useSetRecoilState(showImportWalletState);
  const setMnemonic = useSetRecoilState(mnemonicState);
  const setIsMnemonicEmpty = useSetRecoilState(isMnemonicEmptyState);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);
  const setShowSupportedChains = useSetRecoilState(showSupportedChainsState);
  const setWallets = useSetRecoilState(walletsState);
  const setSelectedWallet = useSetRecoilState(selectedWalletState);
  const setCurrentIndex = useSetRecoilState(currentIndexState);
  const setIsChecked = useSetRecoilState(isCheckedState);
  const setSelectedBlockChain = useSetRecoilState(selectedBlockChainState);
  const setIsRecoveryPhraseSaved = useSetRecoilState(
    isRecoveryPhraseSavedState
  );

  return (
    <nav className="flex justify-between items-center mb-24">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          setIsLandingPage(true);
          setIsImportedWallet(false);
          setShowImportWallet(false);
          setMnemonic(Array(12).fill(""));
          setIsMnemonicEmpty(true);
          setSelectedBlockChain(null);
          setShowMnemonic(true);

          setShowSupportedChains(false);
          setIsRecoveryPhraseSaved(false);
          setIsChecked(false);
          setWallets([]);
          setCurrentIndex(0);
          setSelectedWallet(null);
        }}
      >
        <Logo />
        <span className="text-2xl font-bold text-white">Pixel</span>
      </div>

      <a
        href="https://github.com/AmulGaurav/Pixel"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        GitHub
      </a>
    </nav>
  );
};

export default Navbar;
