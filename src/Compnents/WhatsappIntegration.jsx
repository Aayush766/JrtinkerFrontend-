import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsappIntegration = () => {
  return (
    <>
      <a
        href="https://wa.me/919990054003?text=Hi!%20I%20was%20viewing%20your%20website%20and%20want%20to%20know%20more%20about%20your%20courses."
        className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 
                   bg-green-500 hover:bg-green-600 text-white 
                   px-4 py-2 rounded-full shadow-lg transition duration-300 
                   flex items-center justify-center space-x-2 z-50 
                   text-base sm:text-lg font-medium whitespace-nowrap" // Adjusted text size and added whitespace-nowrap
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-2xl" /> {/* Slightly smaller icon to fit better with text */}
        <span>Connect with us</span>
      </a>
    </>
  );
};

export default WhatsappIntegration;