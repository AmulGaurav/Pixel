const Mnemonic = ({
  mnemonic,
  showMnemonic,
  setShowMnemonic,
  setShowToast,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic.join(" "));
    setShowToast(true);
  };

  return (
    <div>
      <div className="mb-3 flex justify-between items-center">
        <label className="text-lg font-medium text-gray-300">
          Your Seed Phrase:
        </label>
        <button
          onClick={() => setShowMnemonic(!showMnemonic)}
          className="text-indigo-400 hover:text-indigo-300"
        >
          {showMnemonic ? "Hide" : "Show"}
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showMnemonic ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="grid grid-cols-3 gap-2 bg-gray-700 p-4 rounded-lg cursor-pointer"
          onClick={copyToClipboard}
        >
          {mnemonic.map((word, index) => (
            <div
              key={index}
              className="bg-gray-600 p-2 rounded text-white text-center"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mnemonic;
