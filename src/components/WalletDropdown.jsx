import { FaChevronDown } from "react-icons/fa";

const WalletDropdown = ({ wallets, selectedWallet, setSelectedWallet }) => {
  return (
    <div className="relative">
      <select
        value={selectedWallet?.name}
        onChange={(e) =>
          setSelectedWallet(wallets.find((w) => w.name === e.target.value))
        }
        className="bg-gray-700 text-white py-2 pl-4 pr-8 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {wallets.map((wallet) => (
          <option key={wallet.name.split(" ")[1]}>{wallet.name}</option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
    </div>
  );
};

export default WalletDropdown;
