const NavigationBar = ({
  activeWallet,
  setIsLandingPage,
  setIsImportedWallet,
  setShowImportWallet,
  setMnemonic,
  setActiveWallet,
  setIsMnemonicEmpty,
  setShowMnemonic,
  setShowSupportedChains,
}) => {
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
            setActiveWallet(null);
            setShowMnemonic(true);
            setShowSupportedChains(false);
          }}
        ></div>
        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            !activeWallet ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => {
            setActiveWallet(null);
            setShowSupportedChains(true);
          }}
        ></div>
        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            activeWallet ? "bg-blue-500" : "bg-gray-700"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default NavigationBar;
