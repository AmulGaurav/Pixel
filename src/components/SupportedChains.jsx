import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { FaEthereum } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { selectedBlockChainState } from "../store/atoms/uiAtoms";

const SupportedChains = () => {
  const navigate = useNavigate();
  const setSelectedBlockChain = useSetRecoilState(selectedBlockChainState);

  return (
    <div>
      <div className="mb-7">
        <h2 className="text-center font-serif text-gray-100 text-3xl font-bold">
          Select Your Blockchain
        </h2>
      </div>

      <div className="flex justify-center space-x-10">
        <button
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            setSelectedBlockChain("ethereum");
            navigate("/ethereum");
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
            navigate("/solana");
          }}
        >
          <div>
            <SiSolana />
          </div>
          <div>Solana</div>
        </button>
      </div>
    </div>
  );
};

export default SupportedChains;
