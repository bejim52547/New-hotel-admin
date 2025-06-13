import styles from "./style";
import "./App.css";
import { useState, useRef } from "react";
import { useLanguage } from "../LanguageContext"; // Import the language context
import GoogleTranslate from "./GoogleTranslate"; // Import the component

import {
  Navbar,
  Hero,
  Steps,
  Stays,
  About,
  Newsletter,
  Footer,
  Chatbot,
} from "./index";
function HomePage() {
  const { language, toggleLanguage } = useLanguage(); // Get the current language and toggle function
  const [sharedData, setSharedData] = useState(null);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false); // state for showing/hiding chatbot

  const staysRef = useRef(null); // Create a reference for the Stays section
  const aboutRef = useRef(null); // Reference for About section

  const handleExploreClick = () => {
    // Scroll to the Stays section
    staysRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDataUpdate = (data) => {
    console.log("SharedDataSet----", data);
    setSharedData(data);
  };

  const toggleChatbot = () => {
    setIsChatbotVisible((prevState) => !prevState); // Toggle visibility
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-page">
      <Navbar aboutRef={aboutRef} />
      {/* Language Toggle Button */}
      {/* <div className="text-right fixed z-50 right-4"> */}
      {/* <GoogleTranslate /> */}
      {/* <button */}
      {/* onClick={toggleLanguage} */}
      {/* className="px-2 py-2 text-sm text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-lg transition duration-300" */}
      {/* > */}
      {/* {language === "en" ? "Id" : "En"} */}
      {/* </button> */}
      {/* </div> */}

      <Hero
        onDataUpdate={handleDataUpdate}
        handleExploreClick={handleExploreClick}
      />

      <Steps />
      <Stays hotels={sharedData} ref={staysRef} />
      <About ref={aboutRef} />
      <Newsletter />
      <Footer />

      {/* Chatbot toggle button */}

      {/* Chatbot component */}

      <div>
        <Chatbot />
      </div>
    </div>
  );
}

export default HomePage;
