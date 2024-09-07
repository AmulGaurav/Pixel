import { useEffect } from "react";
import BottomNavbar from "../components/BottomNavbar";
import Header from "../components/Header";
import Mnemonic from "../components/Mnemonic";
import SupportedChains from "../components/SupportedChains";
import { useSetRecoilState } from "recoil";
import {
  isMnemonicEmptyState,
  mnemonicState,
} from "../store/atoms/globalAtoms";
import {
  currentIndexState,
  selectedWalletState,
  walletsState,
} from "../store/atoms/walletAtoms";
import {
  selectedBlockChainState,
  showMnemonicState,
} from "../store/atoms/uiAtoms";

const SelectBlockchain = () => {
  const setMnemonic = useSetRecoilState(mnemonicState);
  const setIsMnemonicEmpty = useSetRecoilState(isMnemonicEmptyState);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);
  const setWallets = useSetRecoilState(walletsState);
  const setCurrentIndex = useSetRecoilState(currentIndexState);
  const setSelectedWallet = useSetRecoilState(selectedWalletState);
  const setSelectedBlockchain = useSetRecoilState(selectedBlockChainState);

  useEffect(() => {
    setWallets([]);
    setCurrentIndex(0);
    setSelectedWallet(null);
    setSelectedBlockchain(null);

    if (localStorage.getItem("mnemonic")) {
      setMnemonic(localStorage.getItem("mnemonic").split(" "));
      setShowMnemonic(false);
      setIsMnemonicEmpty(false);
    }
  }, []);

  return (
    <div>
      <Header />

      <div className="pt-6 mb-24">
        <SupportedChains />
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl mx-auto space-y-4">
        <Mnemonic />
      </div>

      <BottomNavbar />
    </div>
  );
};

export default SelectBlockchain;
