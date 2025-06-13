import React from "react";
import { useLanguage } from "../LanguageContext"; // Import the language context
import logo from "../assets/logo-login.png";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const Footer = () => {
  const { language } = useLanguage(); // Access the current language

  const content = {
    en: {
      officeAddress: [
        "Gedung Citra Tower, Lt.2 Unit K1 Jalan Benyamin Sueb Kab A.6,",
        "Kemayoran, Jakarta Pusat",
      ],
      privacyPolicy: "Privacy Policy",
      help: "Help",
      copyright: "© Alhermain 2024. All rights reserved.",
      designBy: "Design & Tech supported by",
      visualhiveLinkText: "The Visualhive",
    },
    id: {
      officeAddress: [
        "Gedung Citra Tower, Lt.2 Unit K1 Jalan Benyamin Sueb Kab A.6,",
        "Kemayoran, Jakarta Pusat",
      ],
      privacyPolicy: "Kebijakan Privasi",
      help: "Bantuan",
      copyright: "© Alhermain 2024. Semua hak dilindungi.",
      designBy: "Desain & Teknologi didukung oleh",
      visualhiveLinkText: "The Visualhive",
    },
  };

  return (
    <footer className="bg-gray-800 text-white py-12 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-32 px-4">
        {/* First Column: Logo */}
        <div className="flex flex-col items-center justify-center text-center md:text-left">
          <img src={logo} alt="Logo" className="h-24 mb-4" />
        </div>

        {/* Second Column: Office Address */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-lg font-semibold mb-3 text-yellow-400 text-left">
            {language === "en" ? "Office Address" : "Alamat Kantor"}
          </h2>
          <div className="flex items-center justify-center md:justify-start text-sm text-gray-300 space-x-2">
            <PlaceOutlinedIcon className="text-yellow-400" />
            <div>
              {content[language].officeAddress.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Third Column: More Links */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-lg font-semibold mb-3 text-yellow-400 text-left">
            {language === "en" ? "More" : "Lainnya"}
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {content[language].privacyPolicy}
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {content[language].help}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-8 text-center text-sm flex justify-center items-center space-x-1">
        <p className="text-sm text-gray-400">{content[language].copyright}</p>
        <p className="text-lg">|</p>
        <p className="text-sm text-gray-400">
          {content[language].designBy}{" "}
          <a
            href="https://www.instagram.com/the.visualhive/"
            className="text-yellow-400 hover:text-yellow-500 ml-1 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content[language].visualhiveLinkText}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
