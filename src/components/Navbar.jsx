import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo-login.png"; // Update with the path to your logo
import { useLanguage } from "../LanguageContext"; // Import the language context

function Navbar({ aboutRef }) {
  const { language, toggleLanguage } = useLanguage(); // Access the current language

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAboutClick = () => {
    // Scroll to the About section using the ref
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="text-lg bg-[#FEFCFB] p-2 relative z-10">
      <div className="container flex justify-between items-center h-16 mx-auto px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-full w-44 object-contain" />
          </Link>
        </div>

        <div className="flex items-center space-x-12">
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => handleNavigation("/")}
              className="hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              {language === "en" ? "Home" : "Rumah"}
            </button>
            <button
              onClick={handleAboutClick}
              className="hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              {language === "en" ? "About" : "Tentang"}
            </button>
            <button
              //onClick={() => handleNavigation("/offers")}
              className="hover:bg-gray-100 px-3 py-2 rounded-md"
            >
              {language === "en" ? "Offers" : "Penawaran"}
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            {/* English Button */}
            <button
              onClick={() => toggleLanguage("en")} // Set language to English
              className={`px-2 py-2 text-sm ${
                language === "en"
                  ? "bg-[#FA9F36] text-white"
                  : "text-[#FA9F36] border border-[#FA9F36]"
              } hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-l-lg transition duration-300`}
            >
              English
            </button>

            {/* Divider */}
            <span className="text-[#FA9F36]">|</span>

            {/* Indonesian Button */}
            <button
              onClick={() => toggleLanguage("id")} // Set language to Indonesian
              className={`px-2 py-2 text-sm ${
                language === "id"
                  ? "bg-[#FA9F36] text-white"
                  : "text-[#FA9F36] border border-[#FA9F36]"
              } hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-r-lg transition duration-300`}
            >
              Bahasa
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white opacity-75 ${
          isOpen ? "block" : "hidden"
        } z-20`}
      >
        <button
          onClick={() => {
            handleNavigation("/");
            setIsOpen(false);
          }}
          className="block px-4 py-2 text-center hover:bg-gray-700"
        >
          Home
        </button>
        <button
          onClick={() => {
            handleAboutClick();
            setIsOpen(false);
          }}
          className="block px-4 py-2 text-center hover:bg-gray-700"
        >
          About
        </button>
        <button
          onClick={() => {
            //handleNavigation("/offers");
            setIsOpen(false);
          }}
          className="block px-4 py-2 text-center hover:bg-gray-700"
        >
          Offers
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
