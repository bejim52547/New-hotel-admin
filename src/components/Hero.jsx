import Hero1 from "../assets/Hero_images/Hero1.jpg";
import Hero2 from "../assets/Hero_images/Hero2.jpg";
import Hero3 from "../assets/Hero_images/Hero3.jpg";
import Hero4 from "../assets/Hero_images/Hero4.jpg";
import Hero5 from "../assets/Hero_images/Hero5.jpg";
import Hero6 from "../assets/Hero_images/Hero6.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHotels } from "../components/utils/apiutils";
import Slider from "react-slick";
import Select from "react-select"; // Import react-select
import "../CustomStyles.css";
import { useLanguage } from "../LanguageContext"; // Import the useLanguage hook

const Hero = ({ onDataUpdate, handleExploreClick }) => {
  const { language } = useLanguage(); // Get the current language
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption.value); // Use the value from the selected option
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption.value); // Use the value from the selected option
  };

  const handleSearchClick = async () => {
    if (!location || location === "Location") {
      //alert("Location not selected. Proceeding with the selected month.");
    }

    if (!month || month === "Month") {
      //alert("Month not selected. Proceeding with the selected location.");
    }

    const endpoint = `/hotel?location=${location}&month=${month}`;
    try {
      const data = await fetchHotels(endpoint);
      console.log("Hero---", data);
      navigate("/hotelsearch", {
        state: {
          hotels: data,
          location: location,
          month: month,
        },
      });
      onDataUpdate(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Static background images
  const images = [Hero3, Hero4, Hero5, Hero6];

  // Slick settings for carousel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Hides arrows if not needed
  };

  // Month options for react-select
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(0, i)),
  }));

  // Location options for react-select
  const locations = [
    { value: "Madina", label: language === "en" ? "Madina" : "Madinah" },
    { value: "Makkah", label: language === "en" ? "Makkah" : "Mekah" },
  ];

  return (
    <section
      className="relative flex flex-col items-center justify-center text-black"
      style={{
        height: "650px",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          height: "650px",
        }}
      >
        {/* Slick Carousel for background images */}
        <Slider {...settings}>
          {images.map((image, index) => (
            <div className="" key={index}>
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="w-full"
                style={{
                  height: "650px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="relative mb-5 px-5 pt-12 sm:px-16 md:pt-12">
        <h1 className="font-bold text-xl sm:text-3xl">
          {language === "en" ? "Get started your" : "memulai Anda"}
          <br className="block" />
          <span className="text-[#FA9F36]">
            {language === "en" ? "Hajj & Umrah" : "Hajj & Umrah"}
          </span>{" "}
          {""}
          {language === "en" ? "with us." : "bersama kami"}
        </h1>
        <p className="pt-2 pb-4 font-medium text-white">
          {language === "en"
            ? "Experience a seamless Hajj and Umrah pilgrimage with our expert travel agency."
            : "Nikmati pengalaman ibadah haji dan umrah yang lancar dengan agen perjalanan ahli kami."}
          <br />
          {language === "en"
            ? "Our team offers personalized assistance, ensuring a memorable spiritual journey."
            : "Tim kami menawarkan bantuan yang dipersonalisasi, memastikan perjalanan spiritual yang tak terlupakan."}
          <br />
          {language === "en"
            ? "We are dedicated to guiding you through every step, from memorable hospitality to accommodations."
            : "Kami berdedikasi untuk memandu Anda melalui setiap langkah, dari keramahtamahan yang berkesan hingga akomodasi."}
        </p>
        <button
          type="button"
          className="text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white font-medium rounded-lg text-md px-10 py-3 mb-4"
          onClick={handleExploreClick} // Update to call the scroll function
        >
          {language === "en" ? "Explore" : "Jelajahi"}
        </button>

        <div className="relative bg-white rounded-lg mt-6 py-4 flex flex-col sm:flex-row items-center justify-between px-6 mx-12 sm:mx-0">
          <form className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
              <label
                htmlFor="location"
                className="block pl-1 mb-2 text-[#666666] text-sm"
              >
                {language === "en"
                  ? "Your staying location"
                  : "Lokasi tempat tinggal Anda"}
              </label>

              {/* Using react-select for the location dropdown */}
              <Select
                id="location"
                options={locations}
                value={locations.find((loc) => loc.value === location)}
                onChange={handleLocationChange}
                placeholder={language === "en" ? "Location" : "Lokasi"}
                className="font-medium"
                styles={{
                  control: (base) => ({
                    ...base,
                    minWidth: "100px",
                    maxWidth: "150px",
                    borderRadius: "4px",
                    "@media (max-width: 640px)": {
                      minWidth: "100%", // Adjust width for mobile
                      maxWidth: "100%", // Adjust width for mobile
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "black", // Set placeholder text color to black
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "black", // Set selected value text color to black
                  }),
                }}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="month"
                className="block pl-1 mb-2 text-[#666666] text-sm"
              >
                {language === "en"
                  ? "Expected month to visit"
                  : "bulan untuk berkunjung"}
              </label>

              {/* Using react-select for the month dropdown */}
              <Select
                id="month"
                options={months}
                value={months.find((month) => month.value === parseInt(month))}
                onChange={handleMonthChange}
                placeholder={language === "en" ? "Month" : "Bulan"}
                className="font-medium"
                styles={{
                  control: (base) => ({
                    ...base,
                    minWidth: "100px",
                    maxWidth: "150px",
                    borderRadius: "4px",
                    "@media (max-width: 640px)": {
                      minWidth: "100%", // Adjust width for mobile
                      maxWidth: "100%", // Adjust width for mobile
                    },
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: "160px", // Limit height to show only 4 months
                    overflowY: "auto", // Make the list scrollable
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "black", // Set placeholder text color to black
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "black", // Set selected value text color to black
                  }),
                }}
              />
            </div>

            <button
              type="button"
              className="px-12 sm:py-0 py-4 text-sm text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-sm"
              onClick={handleSearchClick}
            >
              {language === "en" ? "Search" : "Cari"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
