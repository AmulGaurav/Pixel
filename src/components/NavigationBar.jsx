const NavigationBar = ({
  setIsLandingPage,
  setShowImportWallet,
  setMnemonic,
  setIsMnemonicEmpty,
}) => {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex space-x-2">
        <div
          className="h-4 w-4 rounded-full cursor-pointer bg-gray-700"
          onClick={() => {
            setIsLandingPage(true);
            setShowImportWallet(false);
            setMnemonic(Array(12).fill(""));
            setIsMnemonicEmpty(true);
          }}
        ></div>
        <div className="h-4 w-4 rounded-full cursor-pointer bg-blue-500"></div>
      </div>
    </div>
  );
};

export default NavigationBar;
