import React, { useEffect } from "react";
import "../assets/css/GoogleTranslate.css";

const GoogleTranslate = () => {
  useEffect(() => {
    // Dynamically load Google Translate script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the Google Translate widget
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Set your page language (e.g., 'en' for English)
          includedLanguages: "en,id,ar", // List the languages you want to include (comma-separated)
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element" // ID where the widget will be placed
      );
    };

    return () => {
      document.body.removeChild(script); // Cleanup on component unmount
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="translate-widget absolute top-4 right-4 p-2 bg-white rounded-md z-10"
    ></div>
  );
};

export default GoogleTranslate;
