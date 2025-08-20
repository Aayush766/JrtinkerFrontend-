import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SummerCampbtn = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute -top-2 -right-2 bg-white text-gray-700 hover:text-red-600 rounded-full shadow-md w-6 h-6 flex items-center justify-center font-bold text-sm transition duration-200"
        title="Close"
      >
        ×
      </button>

      {/* Clickable Image with jump animation */}
      <img
        src="/images/summerCamp/summerCampBtn.png"
        alt="Summer Camp"
        onClick={() => navigate("/summer-camp")}
        className="h-32 w-auto cursor-pointer rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 animate-[jump_1.2s_infinite]"
      />
    </div>
  );
};

export default SummerCampbtn;
