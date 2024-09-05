import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { showToastState } from "../store/atoms/uiAtoms";

const ToastNotification = () => {
  const [showToast, setShowToast] = useRecoilState(showToastState);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
        showToast ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>Copied to clipboard!</span>
        <button
          onClick={() => setShowToast(false)}
          className="ml-2 text-white hover:text-gray-200 focus:outline-none"
        >
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
