import { useRecoilValue } from "recoil";
import { selectedBlockChainState } from "../store/atoms/uiAtoms";
import {
  isBalanceLoadingState,
  walletBalanceState,
} from "../store/atoms/walletAtoms";

const WalletBalance = () => {
  const selectedBlockchain = useRecoilValue(selectedBlockChainState);
  const walletBalance = useRecoilValue(walletBalanceState);
  const isBalanceLoading = useRecoilValue(isBalanceLoadingState);

  return (
    <div className="mb-4">
      <label className="text-gray-400">Balance</label>
      {isBalanceLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-8 bg-gray-600 rounded w-24"></div>
          <div className="h-8 bg-gray-600 rounded w-12"></div>
        </div>
      ) : (
        <p className="text-white text-2xl font-bold">
          {walletBalance} {selectedBlockchain === "solana" ? "SOL" : "ETH"}
        </p>
      )}
    </div>
  );
};

export default WalletBalance;
