import { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import fallbackImage from "../assets/Dummy.png";
import { useLanguage } from "../LanguageContext"; // Import the language context
import "../CustomStyles.css";

const Stays = forwardRef(({ hotels: propHotels }, ref) => {
  const navigate = useNavigate();
  const { language } = useLanguage(); // Access the current language
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/hotel`
        );
        setHotels(response.data);
      } catch (err) {
        setError("Failed to fetch hotel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const showMoreItems = (hotelId) => {
    navigate(`/hotelviewpage/${hotelId}`);
  };

  const showAllItems = () => {
    navigate("/hotelsearch", { state: { hotels } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-2">
        <div className="border-t-4 border-[#FA9F36] border-solid rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(hotels)) {
    return <div>No hotels found for Stays section.</div>;
  }

  const displayedHotels = hotels.slice(0, 6);

  // Helper function to get the lowest priced room and its details, excluding price 0
  const getLowestPricedRoom = (sessions) => {
    // Ensure sessions is an array before proceeding
    if (!Array.isArray(sessions)) return null;

    let lowestPrice = Infinity;
    let lowestRoom = null;

    sessions.forEach((session) => {
      if (session.Meals && Array.isArray(session.Meals)) {
        session.Meals.forEach((meal) => {
          if (meal.Rooms && Array.isArray(meal.Rooms)) {
            meal.Rooms.forEach((room) => {
              // Ignore rooms with price 0
              if (room.room_price > 0 && room.room_price < lowestPrice) {
                lowestPrice = room.room_price;
                lowestRoom = room;
              }
            });
          }
        });
      }
    });

    return lowestRoom;
  };

  // Define the text for both languages
  const content = {
    en: {
      heading: "Our affordable ",
      heading_span: "Stays",
      subheading:
        "Discover your perfect accommodation with our all-inclusive packages.",
      viewMore: "View More",
      noRooms: "No rooms available",
      viewAll: "View All",
    },
    id: {
      heading: "Penginapan terjangkau",
      heading_span: "Tetap",
      subheading:
        "Temukan akomodasi sempurna Anda dengan paket all-inclusive kami.",
      viewMore: "lagi",
      noRooms: "Tidak ada kamar tersedia",
      viewAll: "Lihat Semua",
    },
  };

  return (
    <section ref={ref} className="h-full bg-white mt-8">
      <div className="text-center py-4">
        <h1 className="text-4xl font-semibold">
          {content[language].heading}
          {""}
          <span className="text-4xl text-[#FA9F36] font-semibold">
            {content[language].heading_span}
          </span>
        </h1>

        <p className=" text-[#666666] mt-4">{content[language].subheading}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-12 bg-white">
        {displayedHotels.map((hotel) => {
          const lowestRoom = getLowestPricedRoom(hotel.Sessions);
          const hotelImage = `${hotel.Hotel.cover_image}`;

          return (
            <div
              className="p-4 rounded cursor-pointer"
              key={hotel.Hotel.hotel_id}
              onClick={() => showMoreItems(hotel.Hotel.hotel_id)}
            >
              <img
                src={hotelImage}
                alt={hotel.Hotel.hotel_name}
                className="w-full h-56 object-fill rounded-t-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
              <h1 className="py-1 my-2 sm:text-xl text-lg font-medium">
                {hotel.Hotel.hotel_name}
              </h1>

              <p>
                <span>
                  <PlaceOutlinedIcon />
                </span>
                <span className="ml-2">{hotel.Hotel.hotel_location}</span>
              </p>

              <div className="grid grid-cols-2 pt-4">
                {lowestRoom ? (
                  <div className="rounded-lg col-span-3 flex justify-between">
                    <div className="p-2 flex flex-col gap-1 bg-[#F7F7F7] rounded-lg">
                      <h1 className="font-medium text-lg">
                        {lowestRoom.room_type}
                      </h1>
                      <h1>
                        <span>
                          {language === "en" ? "Starting from" : "Dimulai dari"}
                        </span>{" "}
                        <span className="ml-2">
                          <span className="text-xs">SAR</span>{" "}
                          <span className="font-medium">
                            {lowestRoom.room_price}
                          </span>
                        </span>
                        <span className="font-medium">
                          {language === "en" ? "/night" : "/malam"}
                        </span>
                      </h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => showMoreItems(hotel.Hotel.hotel_id)}
                      className="ml-2"
                    >
                      {content[language].viewMore}
                      <i
                        className="fas fa-arrow-right ml-1 text-xs"
                        style={{ transform: "rotate(-45deg)" }}
                      ></i>
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1 className="bg-[#F7F7F7] px-2 py-4 mt-2 rounded-lg">
                      {content[language].noRooms}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center py-8">
        <button
          type="button"
          className="px-12 py-4 text-sm text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-lg"
          onClick={showAllItems}
        >
          {content[language].viewAll}
          <i className="fas fa-arrow-right ml-2 text-xs"></i>
        </button>
      </div>
    </section>
  );
});

Stays.displayName = "Stays";
export default Stays;
