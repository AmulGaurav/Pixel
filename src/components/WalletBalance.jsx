const WalletBalance = ({ chain, walletBalance, isLoading }) => {
  return (
    <div className="mb-4">
      <label className="text-gray-400">Balance</label>
      {isLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-8 bg-gray-600 rounded w-24"></div>
          <div className="h-8 bg-gray-600 rounded w-12"></div>
        </div>
      ) : (
        <p className="text-white text-2xl font-bold">
          {walletBalance} {chain === "solana" ? "SOL" : "ETH"}
        </p>
      )}
    </div>
  );
};

export default WalletBalance;
