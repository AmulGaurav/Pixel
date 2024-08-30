import { FaTrash } from "react-icons/fa";

const DeleteWallet = ({
  wallets,
  currentIndex,
  selectedWallet,
  setWallets,
  setCurrentIndex,
  setSelectedWallet,
}) => {
  const handleDeleteWallet = () => {
    const deleteWallet = confirm(
      "Are you sure you want to delete the selected Wallet?"
    );

    if (deleteWallet) {
      let deletedWalletIndex = wallets.findIndex(
        (w) => w.name === selectedWallet.name
      );
      const updatedWallets = wallets.filter((w, index) => {
        if (index > deletedWalletIndex) {
          w.name = `Wallet ${index}`;
        }

        return index !== deletedWalletIndex;
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
