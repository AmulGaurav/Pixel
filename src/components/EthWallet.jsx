import { useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import ToastNotification from "./ToastNotification";
import WalletDropdown from "./WalletDropdown";
import DeleteWallet from "./DeleteWallet";
import KeyPair from "./KeyPair";
import WalletBalance from "./WalletBalance";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentIndexState,
  isBalanceLoadingState,
  selectedWalletState,
  walletBalanceState,
  walletsState,
} from "../store/atoms/walletAtoms";
import { showMnemonicState } from "../store/atoms/uiAtoms";
import { mnemonicStringSelector } from "../store/selectors/mnemonicSelectors";

const EthWallet = () => {
  const mnemonic = useRecoilValue(mnemonicStringSelector);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [selectedWallet, setSelectedWallet] =
    useRecoilState(selectedWalletState);
  const setWalletBalance = useSetRecoilState(walletBalanceState);
  const setIsBalanceLoading = useSetRecoilState(isBalanceLoadingState);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    const newWallet = {
      name: `Wallet ${currentIndex + 1}`,
      publicKey: wallet.address,
      privateKey,
    };

    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets, newWallet]);
    setSelectedWallet(newWallet);
    setShowMnemonic(false);
  };

  const clearAllWallets = () => {
    setWallets([]);
    setSelectedWallet(null);
    setCurrentIndex(0);
    setShowMnemonic(true);
  };

  const getWalletBalance = async () => {
    try {
      setIsBalanceLoading(true);
      const response = await fetch(import.meta.env.VITE_ETH_MAINNET_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [selectedWallet.publicKey, "latest"],
        }),
      });
      const json = await response.json();
      setWalletBalance(json.result.split("x")[1]);

      // console.log(json);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsBalanceLoading(false);
    }
  };

  useEffect(() => {
    if (selectedWallet) {
      getWalletBalance();
    }
  }, [selectedWallet]);

  return (
    <div className="bg-gray-800 rounded-lg">
      <div
        className={`flex ${
          selectedWallet ? "justify-between" : "justify-center"
        } items-center mb-4`}
      >
        <div className="space-x-3">
          <button
            onClick={addWallet}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold ${
              selectedWallet ? "py-2" : "py-3"
            } px-4 rounded`}
          >
            Add ETH Wallet
          </button>

          {selectedWallet && (
            <button
              onClick={clearAllWallets}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Clear All Wallets
            </button>
          )}
        </div>

        {selectedWallet && (
          <div className="flex space-x-2">
            <WalletDropdown />

            <DeleteWallet />
          </div>
        )}
      </div>

      {selectedWallet && (
        <div className="bg-gray-700 rounded-lg p-4">
          <KeyPair />

          <WalletBalance />

          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex-grow">
              Send
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex-grow">
              Receive
            </button>
          </div>
        </div>
      )}

      <ToastNotification />
    </div>
  );
};

export default EthWallet;
