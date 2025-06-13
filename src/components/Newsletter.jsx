import { useState } from "react";
import { useLanguage } from "../LanguageContext"; // Import the language context

const Newsletter = () => {
  const { language } = useLanguage(); // Access the current language

  return (
    <section className="bg-[#FA9F36] py-8 px-4 mx-20 md:px-8 lg:px-16  border rounded-lg">
      <div className="container  flex flex-col md:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl md:text-3xl text-white font-medium mb-2">
            {language === "en"
              ? "Subscribe and get exclusive"
              : "Berlangganan dan dapatkan eksklusif"}{" "}
            <br />
            {language === "en" ? "deals & offers" : "penawaran & promosi"}
          </h2>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              // value="email"
              className="w-full md:w-2/3 px-4 py-2 border rounded-lg"
            />
            <button className="w-full md:w-1/3 px-4 py-2 font-medium rounded-lg text-lg bg-white">
              {language === "en" ? "subscribe" : "berlangganan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
