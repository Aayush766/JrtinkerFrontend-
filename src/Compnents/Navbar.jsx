import { useState, useEffect, useRef } from "react";

import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../Context/Auth";

import { useLanguage } from "../Context/LanguageContext";

import { motion } from "framer-motion";



// --- ICONS ---

import { MdMenu, MdClose } from "react-icons/md";

import { GrLanguage } from "react-icons/gr";

import { FaUserCircle } from "react-icons/fa";

import TopHeader from "./TopHeader";



const Navbar = () => {

  const { t, language, setLanguage } = useLanguage();

  const { isAuthenticated, user, logout, logoutWithGoogle } = useAuth();



  const [showNavbar, setShowNavbar] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  const [profileOpen, setProfileOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const profileRef = useRef(null);



  const navLinks = [

    { path: "/", label: t.navbar.home },

    { path: "/courses", label: t.navbar.forkids },

    { path: "/stemlab", label: t.navbar.forschools },

    { path: "/products", label: t.navbar.products },

    { path: "/projects", label: t.navbar.projects },

    { path: "/blog", label: t.navbar.blog },

     { path: "/about", label: "About"},

  ];



  // --- HOOKS ---



  // Effect to hide/show navbar on scroll

  useEffect(() => {

    const handleScroll = () => {

      setShowNavbar(window.scrollY <= lastScrollY);

      setLastScrollY(window.scrollY);

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, [lastScrollY]);



  // Effect to close profile dropdown on outside click

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (profileRef.current && !profileRef.current.contains(event.target)) {

        setProfileOpen(false);

      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);



  // --- HANDLERS ---



  const toggleLanguage = () => {

    setLanguage((prev) => (prev === "en" ? "ar" : "en"));

  };



  const handleLogout = () => {

    if (user?.googleID) {

      logoutWithGoogle();

    } else {

      logout();

    }

    setProfileOpen(false);

    setMobileMenuOpen(false);

  };



  return (

    <motion.nav

      initial={{ y: -100 }}

      animate={{ y: showNavbar ? 0 : -100 }}

      transition={{ duration: 0.3, ease: "linear" }}

      className="w-full fixed z-[900] bg-white shadow-md"

    >

      <TopHeader/>

      {/* ======================================================================= */}

      {/* DESKTOP NAVBAR                                                          */}

      {/* ======================================================================= */}

      <div

        className="w-full hidden md:flex items-center justify-between px-6 lg:px-12"

        style={{

          backgroundImage: `url('/images/background/bg-menu.png')`,

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundRepeat: 'no-repeat',

        }}

      >

        {/* Left Side: Logo */}

        <div className="flex-shrink-0">

          <Link to="/">

            <img

              src="/images/logo-new.png"

              alt="logo"

              className="w-[180px] lg:w-[225px] object-cover"

            />

          </Link>

        </div>



        {/* Center: Navigation Links */}

        <div className="flex items-center justify-center">

          <div className="flex items-center justify-center text-base lg:text-xl text-white gap-4 lg:gap-6 uppercase">

            {navLinks.map((link) => (

              <NavLink

                key={link.path}

                to={link.path}

                className={({ isActive }) =>

                  `salsa hover:text-red-400 transition-colors ${

                    isActive ? "text-red-400" : ""

                  }`

                }

              >

                {link.label}

              </NavLink>

            ))}

          </div>

        </div>



        {/* Right Side: Icons */}

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">

            <GrLanguage

              className="text-2xl cursor-pointer text-white hover:opacity-75"

              onClick={toggleLanguage}

            />

            <span className="text-lg font-semibold text-white">{language.toUpperCase()}</span>

          </div>

          <div className="relative" ref={profileRef}>

            <button onClick={() => setProfileOpen((prev) => !prev)}>

              <FaUserCircle className="text-4xl text-white hover:opacity-75" />

            </button>

            {profileOpen && (

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">

                {isAuthenticated ? (

                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">

                    {t.navbar.logout}

                  </button>

                ) : (

                  <>

                    <Link to="/login" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">

                      {t.navbar.login}

                    </Link>

                    <Link to="/signup" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">

                      {t.navbar.signup}

                    </Link>

                  </>

                )}

              </div>

            )}

          </div>

        </div>

      </div>



      {/* ======================================================================= */}

      {/* MOBILE NAVBAR                                                           */}

      {/* ======================================================================= */}

      <div className="md:hidden flex justify-between items-center px-4 py-2">

        <Link to="/">

          <img

            src="/images/logo-new.png"

            alt="logo"

            className="w-[152px] object-cover"

          />

        </Link>

        <div className="flex items-center gap-4">

          <GrLanguage

            className="text-2xl cursor-pointer text-[#2C4073]"

            onClick={toggleLanguage}

          />

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#33467b] p-2">

            {mobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}

          </button>

        </div>

      </div>



      {/* Mobile Menu Dropdown */}

      {mobileMenuOpen && (

        <div className="md:hidden bg-white shadow-lg">

          <div className="flex flex-col py-2">

            {navLinks.map((link) => (

              <Link key={link.path} to={link.path} className="px-6 py-3 text-[#33467b] hover:bg-gray-100 salsa" onClick={() => setMobileMenuOpen(false)}>

                {link.label}

              </Link>

            ))}

            <div className="border-t mx-6 my-2"></div>

            {isAuthenticated ? (

              <button onClick={handleLogout} className="px-6 py-3 text-left text-[#33467b] hover:bg-gray-100 salsa">

                {t.navbar.logout}

              </button>

            ) : (

              <>

                <Link to="/login" className="px-6 py-3 text-[#33467b] hover:bg-gray-100 salsa" onClick={() => setMobileMenuOpen(false)}>

                  {t.navbar.login}

                </Link>

                <Link to="/signup" className="px-6 py-3 text-[#33467b] hover:bg-gray-100 salsa" onClick={() => setMobileMenuOpen(false)}>

                  {t.navbar.signup}

                </Link>

              </>

            )}

          </div>

        </div>

      )}

    </motion.nav>

  );

};



export default Navbar;