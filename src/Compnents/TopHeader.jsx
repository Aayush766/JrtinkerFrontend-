import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-2 text-sm hidden md:flex justify-center">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            <a href="tel:+919990802009" className="hover:text-gray-300 transition-colors">
              +91 9990-80-2009
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <a href="mailto:contact@jrtinker.com" className="hover:text-gray-300 transition-colors">
              contact@jrtinker.com
            </a>
          </div>
        </div>

        {/* Right Side: Social Media Icons (Now with brand colors) */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/people/Jr-Tinker/61576350248516/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#1877F2] hover:opacity-80 transition-opacity" // Facebook's blue
          >
            <FaFacebook size={22} />
          </a>
          <a
            href="https://www.instagram.com/jrtinker_stem/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#E4405F] hover:opacity-80 transition-opacity" // Instagram's pink
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://www.linkedin.com/company/jr-tinker/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#0A66C2] hover:opacity-80 transition-opacity" // LinkedIn's blue
          >
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;