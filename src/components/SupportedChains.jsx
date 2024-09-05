import { FaEthereum } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { useSetRecoilState } from "recoil";
import {
  selectedBlockChainState,
  showSupportedChainsState,
} from "../store/atoms/uiAtoms";

const SupportedChains = () => {
  const setSelectedBlockChain = useSetRecoilState(selectedBlockChainState);
  const setShowSupportedChains = useSetRecoilState(showSupportedChainsState);

  return (
    <div className="mt-10 flex justify-center space-x-10">
      <button
        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          setSelectedBlockChain("ethereum");
          setShowSupportedChains(false);
        }}
      >
        <div>
          <FaEthereum />
        </div>
        <div>Ethereum</div>
      </button>
      <button
        className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          setSelectedBlockChain("solana");
          setShowSupportedChains(false);
        }}
      >
        <div>
          <SiSolana />
        </div>
        <div>Solana</div>
      </button>
    </div>
  );
};

export default SupportedChains;
