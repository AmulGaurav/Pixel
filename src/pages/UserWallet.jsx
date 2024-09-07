import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import WalletDropdown from "../components/WalletDropdown";
import DeleteWallet from "../components/DeleteWallet";
import KeyPair from "../components/KeyPair";
import WalletBalance from "../components/WalletBalance";
import BottomNavbar from "../components/BottomNavbar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentIndexState,
  isBalanceLoadingState,
  selectedWalletState,
  walletBalanceState,
  walletsState,
} from "../store/atoms/walletAtoms";
import {
  selectedBlockChainState,
  showMnemonicState,
} from "../store/atoms/uiAtoms";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import Header from "../components/Header";
import Mnemonic from "../components/Mnemonic";
import { useLocation } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import {
  isMnemonicEmptyState,
  mnemonicState,
} from "../store/atoms/globalAtoms";
import { mnemonicStringSelector } from "../store/selectors/mnemonicSelectors";

const UserWallet = () => {
  const location = useLocation();
  const mnemonicString = useRecoilValue(mnemonicStringSelector);
  const setIsMnemonicEmpty = useSetRecoilState(isMnemonicEmptyState);
  const setShowMnemonic = useSetRecoilState(showMnemonicState);
  const setWalletBalance = useSetRecoilState(walletBalanceState);
  const setIsBalanceLoading = useSetRecoilState(isBalanceLoadingState);
  const setMnemonic = useSetRecoilState(mnemonicState);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [selectedWallet, setSelectedWallet] =
    useRecoilState(selectedWalletState);
  const [selectedBlockChain, setSelectedBlockChain] = useRecoilState(
    selectedBlockChainState
  );

  const addWallet = (newWallet) => {
    setCurrentIndex(currentIndex + 1);
    setWallets([...wallets, newWallet]);
    setSelectedWallet(newWallet);
  };

  const addWalletEth = async () => {
    const seed = await mnemonicToSeed(mnemonicString);
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

    addWallet(newWallet);
  };

  const getWalletBalanceEth = async () => {
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

  const addWalletSol = async () => {
    const seed = await mnemonicToSeed(mnemonicString);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const newWallet = {
      name: `Wallet ${currentIndex + 1}`,
      publicKey: keypair.publicKey,
      privateKey: secret,
    };

    addWallet(newWallet);
  };

  const getWalletBalanceSol = async () => {
    try {
      setIsBalanceLoading(true);
      const response = await fetch(import.meta.env.VITE_SOLANA_MAINNET_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [selectedWallet.publicKey],
        }),
      });
      const json = await response.json();
      setWalletBalance(json.result.value);

      // console.log(json);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsBalanceLoading(false);
    }
  };

  const clearAllWallets = () => {
    setWallets([]);
    setSelectedWallet(null);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (!selectedBlockChain) {
      setMnemonic(localStorage.getItem("mnemonic").split(" "));
      setIsMnemonicEmpty(false);
      setSelectedBlockChain(location.pathname.split("/")[1]);
      setShowMnemonic(false);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (selectedWallet) {
      selectedBlockChain === "ethereum"
        ? getWalletBalanceEth()
        : getWalletBalanceSol();
    }
  }, [selectedWallet]);

  if (isLoading && selectedBlockChain) {
    return <Shimmer />;
  }

  return (
    <div>
      <Header />

      <div
        className={`mx-auto max-w-[600px] ${selectedWallet ? "pt-4" : "pt-8"}`}
      >
        <div className="flex justify-center mb-4">
          {selectedWallet && (
            <div className="flex items-center space-x-2">
              <WalletDropdown />

              <DeleteWallet />
            </div>
          )}
        </div>

        <div>
          <div
            className={`flex ${
              selectedWallet
                ? "justify-between mb-3"
                : "justify-center space-x-3"
            }`}
          >
            <button
              onClick={() => {
                selectedBlockChain === "ethereum"
                  ? addWalletEth()
                  : addWalletSol();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {selectedBlockChain === "ethereum"
                ? "Add ETH Wallet"
                : "Add SOL Wallet"}
            </button>

            <button
              onClick={clearAllWallets}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Clear All Wallets
            </button>
          </div>

          {selectedWallet && (
            <div className="bg-gray-700 rounded-xl px-5 pt-5 pb-8">
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
        </div>
      </div>

      <BottomNavbar />

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl mx-auto mt-12 space-y-4">
        <Mnemonic />
      </div>
    </div>
  );
};

export default UserWallet;
