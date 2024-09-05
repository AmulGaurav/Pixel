import { FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import {
  currentIndexState,
  selectedWalletState,
  walletsState,
} from "../store/atoms/walletAtoms";

const DeleteWallet = () => {
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [selectedWallet, setSelectedWallet] =
    useRecoilState(selectedWalletState);

  const handleDeleteWallet = () => {
    const deleteWallet = confirm(
      "Are you sure you want to delete the selected Wallet?"
    );

    if (deleteWallet) {
      let deletedWalletIndex;

      const updatedWallets = wallets
        .filter((w, index) => {
          if (w.name === selectedWallet.name) deletedWalletIndex = index;

          return index !== deletedWalletIndex;
        })
        .map((wallet, index) => {
          if (index >= deletedWalletIndex) {
            return { ...wallet, name: `Wallet ${index + 1}` };
          }

          return wallet;
        });

      setWallets(updatedWallets);
      setCurrentIndex(currentIndex - 1);

      if (updatedWallets.length > deletedWalletIndex) {
        setSelectedWallet(updatedWallets[deletedWalletIndex]);
      } else {
        setSelectedWallet(updatedWallets[deletedWalletIndex - 1]);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteWallet}
      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
      title="Delete selected wallet"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteWallet;
