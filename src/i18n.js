// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define the translation data
const resources = {
  en: {
    translation: {
      logo: "Logo",
      officeAddress: "Office Address",
      privacyPolicy: "Privacy Policy",
      help: "Help",
      copyright: "© Alhermain 2024. All rights reserved.",
      designSupport: "Design & Tech supported by",
    },
  },
  id: {
    translation: {
      logo: "Logo",
      officeAddress: "Alamat Kantor",
      privacyPolicy: "Kebijakan Privasi",
      help: "Bantuan",
      copyright: "© Alhermain 2024. Semua hak dilindungi.",
      designSupport: "Desain & Teknologi didukung oleh",
    },
  },
};

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    keySeparator: false,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
