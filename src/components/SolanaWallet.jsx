import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import ToastNotification from "./ToastNotification";
import WalletBalance from "./WalletBalance";
import WalletDropdown from "./WalletDropdown";
import DeleteWallet from "./DeleteWallet";
import KeyPair from "./KeyPair";

function SolanaWallet({ mnemonic, setShowMnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(true);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const newWallet = {
      name: `Wallet ${currentIndex + 1}`,
      publicKey: keypair.publicKey,
      privateKey: secret,
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
  };

  const getWalletBalance = async () => {
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
            Add SOL Wallet
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
            <WalletDropdown
              wallets={wallets}
              selectedWallet={selectedWallet}
              setSelectedWallet={setSelectedWallet}
            />

            <DeleteWallet
              wallets={wallets}
              currentIndex={currentIndex}
              selectedWallet={selectedWallet}
              setWallets={setWallets}
              setCurrentIndex={setCurrentIndex}
              setSelectedWallet={setSelectedWallet}
            />
          </div>
        )}
      </div>

      {selectedWallet && (
        <div className="bg-gray-700 rounded-lg p-4">
          <KeyPair
            chain={"solana"}
            selectedWallet={selectedWallet}
            setShowToast={setShowToast}
          />

          <WalletBalance
            chain="solana"
            walletBalance={walletBalance}
            isLoading={isBalanceLoading}
          />

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

      <ToastNotification showToast={showToast} setShowToast={setShowToast} />
    </div>
  );
}

export default SolanaWallet;
