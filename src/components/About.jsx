import React from "react";
import rec1 from "../assets/Rectangle1.png";
import rec2 from "../assets/Rectangle2.png";
import { useLanguage } from "../LanguageContext"; // Import the language context

const About = React.forwardRef((props, ref) => {
  const { language } = useLanguage(); // Access the current language

  return (
    <section ref={ref} className="bg-[#Ffffff]">
      <div className="gap-16 items-center py-8 px-4 mx-16 max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="text-black ">
          <h1 className="mb-8 text-5xl tracking-tight font-medium">
            {language === "en" ? "know more" : "tahu lebih banyak"}
            <br />
            <span className="text-[#FA9F36]">
              {language === "en" ? "about us" : "tentang kami"}
            </span>
          </h1>
          <p className="mb-4 text-black leading-7">
            Welcome to Alharmain, your partner for a memorable Hajj and Umrah
            pilgrimage. As a leading hotel management company, we are committed
            to providing exceptional hospitality services that cater to the
            unique needs of spiritual travelers. Our deep understanding of the
            religious significance of these journeys ensures a fulfilling and
            unforgettable experience for every guest.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img className="w-full rounded-lg" src={rec1} alt="" />
          <img className="mt-4 w-full lg:mt-10 rounded-lg" src={rec2} alt="" />
        </div>
      </div>
    </section>
  );
});
// Define the display name to avoid eslint warning
About.displayName = "About";

export default About;
