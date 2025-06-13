import React, { createContext, useContext, useState } from "react";

// Create the context with default language set to English
const LanguageContext = createContext();

// Create a custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language is English

  const toggleLanguage = (lang) => {
    setLanguage(lang); // Set the language directly based on the passed argument
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
