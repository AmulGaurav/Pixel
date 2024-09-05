import { useRecoilState, useSetRecoilState } from "recoil";
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

const NavigationBar = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useRecoilState(
    selectedBlockChainState
  );
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
  const setIsRecoveryPhraseSaved = useSetRecoilState(
    isRecoveryPhraseSavedState
  );

  const resetCommonState = () => {
    setWallets([]);
    setCurrentIndex(0);
    setShowMnemonic(true);
    setSelectedWallet(null);
    setSelectedBlockchain(null);
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex space-x-2">
        <div
          className="h-4 w-4 rounded-full cursor-pointer bg-gray-700"
          onClick={() => {
            setIsLandingPage(true);
            setIsImportedWallet(false);
            setShowImportWallet(false);
            setMnemonic(Array(12).fill(""));
            setIsMnemonicEmpty(true);
            setShowSupportedChains(false);
            setIsRecoveryPhraseSaved(false);
            setIsChecked(false);
            resetCommonState();
          }}
        ></div>
        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            !selectedBlockchain ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => {
            setShowSupportedChains(true);
            resetCommonState();
          }}
        ></div>
        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            selectedBlockchain ? "bg-blue-500" : "bg-gray-700"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default NavigationBar;
