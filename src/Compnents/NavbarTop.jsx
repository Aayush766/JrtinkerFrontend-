import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { useLanguage } from "../Context/LanguageContext";
import { GrLanguage } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";

const NavbarTop = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, logoutWithGoogle, logout, user } = useAuth();
  
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "ar" : "en"));
  };

  const handleLogout = () => {
    if (user?.googleID) {
      logoutWithGoogle();
    } else {
      logout();
    }
    setProfileOpen(false);
  };

  return (
    // Reduced vertical padding from "pt-4 pb-1" to "py-2" to make it shorter
    <div className="w-full hidden md:flex lg:flex flex-col md:flex-row sm:flex-col items-center justify-between px-40 md:px-12 lg:px-44 py-2 gap-4 md:gap-0">
      <div>
        <Link to="/">
          <img
            src="/images/logo-new.png"
            alt="logo"
            className="w-[182px] md:w-[225px] object-cover"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row sm:flex-col items-center gap-4 md:gap-8">
        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <GrLanguage
            className="text-2xl cursor-pointer text-[#2C4073] hover:text-[#2C4073] transition duration-300"
            onClick={toggleLanguage}
            title={`Switch language (current: ${language})`}
          />
          <span className="text-lg font-semibold">{language.toUpperCase()}</span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(prev => !prev)}>
            <FaUserCircle className="text-4xl text-gray-600 hover:text-[#344b85]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left whitespace-nowrap block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                >
                  {t.navbar.logout}
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    {t.navbar.login}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    {t.navbar.signup}
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;