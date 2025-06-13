import logo from "../assets/logo.png"; // If you need to use the logo
import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../assets/css/CalendarStyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Navbar, Newsletter, Footer } from "./index";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash"; // Assuming lodash is installed
//import "../CustomStyles.css";

function HotelViewPage() {
  const { hotelId } = useParams();
  const [date, setDate] = useState(new Date());
  const [hoveredSessionIndex, setHoveredSessionIndex] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [selectedRoomData, setSelectedRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [error, setError] = useState(null);

  const [mealType, setMealType] = useState("FB"); // Default to FB
  const roomOrder = ["Double", "Triple", "Quad", "Quint", "Jr Suites"];

  // Define the API endpoint variable
  //const API_BASE_URL = "http://13.60.240.139:8080";

  const fetchHotelData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/hotel/${hotelId}`
      );
      const data = await response.json();
      setHotelData(data[0]);
      fetchRoomData(new Date());
    } catch (err) {
      console.error(err);
      setError("Failed to load hotel data");
    } finally {
      setLoading(false);
    }
  }, [hotelId]);

  const fetchRoomData = useCallback(
    async (selectedDate) => {
      const formattedDate = formatDate(selectedDate);
      setLoadingRooms(true);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/hotel?hotel_id=${hotelId}&date=${formattedDate}`
        );
        const data = await response.json();

        // Fetch all sessions from the hotel data
        const roomDataForDate = data[0]?.Sessions || [];

        // Find the session that includes the selected date
        const availableSession = roomDataForDate.find((session) => {
          const startDate = new Date(session.start_date);
          const endDate = new Date(session.end_date);
          return selectedDate >= startDate && selectedDate <= endDate;
        });

        // Check if we found a valid session
        if (availableSession) {
          // Filter rooms based on the selected meal type (BB or FB)
          const roomsForSelectedMeal =
            availableSession.Meals.find((meal) => meal.meal_type === mealType)
              ?.Rooms || [];

          // Update state with the rooms available for the selected date and meal type
          setSelectedRoomData(roomsForSelectedMeal);
        } else {
          setSelectedRoomData([]); // No rooms available for this date
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load room data");
      } finally {
        setLoadingRooms(false);
      }
    },
    [hotelId, mealType] // Re-fetch when hotelId or mealType changes
  );

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  // Update room data when either mealType or date changes
  useEffect(() => {
    fetchRoomData(date, mealType);
  }, [mealType, date, fetchRoomData]); // Re-fetch when either mealType or date changes

  const handleDateChange = debounce((newDate) => {
    setDate(newDate);
    fetchRoomData(newDate, mealType); // Fetch room data based on selected date and meal type
  }, 300);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEnquireClick = (hotelName) => {
    const hotelNameString = hotelName || "Your Hotel"; // Fallback to a default value if hotelName is undefined
    const inputMessage = `Hello, I would like to enquire about booking a room at ${hotelNameString}.`;
    const phoneNumber = "+966536258731"; // Replace with the actual WhatsApp phone number
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      inputMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true, // Arrows should be enabled
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // No arrows on smaller screens
        },
      },
    ],
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-[#FEFCFB]">
      <Navbar />
      <section className="ml-4 md:ml-24 mr-4 md:mr-32 ">
        {/* Breadcrumb Navigation */}
        <nav className="flex mt-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 font-medium "
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to="/hotelsearch"
                  className="ms-1 text-sm text-gray-500 font-medium"
                >
                  Hotel Search
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link to="/fetchhotel" className="ms-1 text-sm font-medium">
                  Hotel view
                </Link>
              </div>
            </li>
          </ol>
        </nav>

        {loading ? (
          <div className="flex justify-center items-center my-56">
            <div className="border-t-4 border-[#FA9F36] border-solid rounded-full w-8 h-8 animate-spin"></div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {/* Hotel Details */}
            <div className="mt-4">
              <h1 className="md:text-4xl font-semibold text-[#05073C]">
                {hotelData.Hotel.hotel_name}
              </h1>
              <h2 className="md:text-xl py-4 font-regular">
                <PlaceOutlinedIcon />
                <span className="ml-2">{hotelData.Hotel.hotel_location}</span>
              </h2>
            </div>

            {/* Carousel for Images */}
            <div className="py-2 ">
              {hotelData.Images && hotelData.Images.length > 0 ? (
                <Slider {...settings} className="carousel-container">
                  {hotelData.Images.map((image, index) => (
                    <div
                      key={index}
                      className="carousel-slide w-full flex justify-center items-center "
                    >
                      <img
                        src={`${image.image_path}`}
                        alt={`Hotel Image ${index + 1}`}
                        className="carousel-image object:fit-contain w-full md:h-screen rounded-md "
                        style={{
                          height: "550px",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://cdn.icon-icons.com/icons2/2490/PNG/512/hotel_icon_150155.png"; // Fallback image
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex justify-center items-center h-96">
                  <img
                    src="https://cdn.icon-icons.com/icons2/2490/PNG/512/hotel_icon_150155.png"
                    alt="No hotel images available"
                    className="object-contain w-64 h-64"
                  />
                </div>
              )}
            </div>

            {/* Accommodation Details */}

            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="mt-8 mb-4 text-xl font-medium text-center md:text-left abc">
                Accommodation Details
              </h1>

              <div className="flex space-x-16 bg-[#FFFFFF] py-4 px-8 rounded-lg flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 w-full sm:w-auto">
                <h1 className="font-medium text-center sm:text-left">
                  Meal Type
                </h1>
                <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                  <label className="flex items-center space-x-2 justify-center sm:justify-start">
                    <input
                      type="radio"
                      value="BB"
                      checked={mealType === "BB"}
                      onChange={() => setMealType("BB")}
                    />
                    <span>BB (1 Meal/Day)</span>
                  </label>
                  <label className="flex items-center space-x-2 justify-center sm:justify-start">
                    <input
                      type="radio"
                      value="FB"
                      checked={mealType === "FB"}
                      onChange={() => setMealType("FB")}
                    />
                    <span>FB (3 Meal/Day)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="min-h-screen bg-[#FEFCFB] mb-12">
              <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column for All Sessions */}
                <div className="bg-[#FEFCFB] rounded-lg col-span-1 md:col-span-2 relative">
                  <h2 className="text-xl my-4">All Sessions</h2>
                  {hotelData.Sessions && hotelData.Sessions.length > 0 ? (
                    hotelData.Sessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex flex-col p-4 bg-[#ffffff] mb-6 mr-8 relative hover-trigger leading-normal transition duration-500 ease-in-out transform"
                        onMouseEnter={() => setHoveredSessionIndex(index)}
                        onMouseLeave={() => setHoveredSessionIndex(null)}
                        aria-expanded={hoveredSessionIndex === index}
                      >
                        <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
                          {/* Date Range */}
                          <div className="flex flex-row items-center bg-white p-2 rounded-lg mr-4">
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-regular text-black bg-[#F5F5F5] p-1">
                                {new Date(session.start_date)
                                  .toLocaleString("en", { month: "short" })
                                  .toUpperCase()}
                              </span>
                              <span className="text-xl font-regular text-black">
                                {new Date(session.start_date).getDate()}
                              </span>
                              <span className="text-sm font-regular text-black">
                                {new Date(session.start_date).getFullYear()}
                              </span>
                            </div>
                            <span className="text-xs mt-1">
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="text-xs text-[#505050] rounded-lg"
                              />
                            </span>
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-regular text-black bg-[#F5F5F5] p-1">
                                {new Date(session.end_date)
                                  .toLocaleString("en", { month: "short" })
                                  .toUpperCase()}
                              </span>
                              <span className="text-xl font-regular text-black">
                                {new Date(session.end_date).getDate()}
                              </span>
                              <span className="text-sm font-regular text-black">
                                {new Date(session.end_date).getFullYear()}
                              </span>
                            </div>
                          </div>
                          {/* Room Pricing */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {session.Meals && session.Meals.length > 0 ? (
                              session.Meals.filter(
                                (meal) => meal.meal_type === mealType
                              )[0]
                                ?.Rooms.sort(
                                  (a, b) =>
                                    roomOrder.indexOf(a.room_type) -
                                    roomOrder.indexOf(b.room_type)
                                )
                                .map((room, roomIndex) => (
                                  <div
                                    key={roomIndex}
                                    className="flex flex-col items-left bg-[#f9f7f7] p-4 rounded-lg"
                                  >
                                    <span className="text-sm font-medium mb-1">
                                      {room.room_type}
                                    </span>
                                    <span className="text-lg font-medium">
                                      {room.room_price > 0 ? (
                                        <>
                                          {room.room_price}
                                          <span className="text-sm ml-1">
                                            /night
                                          </span>
                                        </>
                                      ) : (
                                        <span className="text-xs text-[#717171]">
                                          Not Available
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                ))
                            ) : (
                              <p>No rooms available for this session.</p>
                            )}
                          </div>
                        </div>
                        {hoveredSessionIndex === index && (
                          <div
                            className={`mt-4 grid items-center justify-center bg-white transition-all duration-300 ease-in-out ${
                              hoveredSessionIndex === index
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                          >
                            {/* <p className="text-[#717171] text-left col-span-4">
                              <span className="text-black">Breakfast (FB)</span>{" "}
                              is included with all suite types.
                            </p> */}
                            <button
                              type="button"
                              onClick={() =>
                                handleEnquireClick(hotelData.Hotel.hotel_name)
                              }
                              className="text-[#FA9F36] bg-[#FAFAFA] rounded-lg h-12 w-64 border-2 border-[#EAEAEA]"
                            >
                              Enquire to book now
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No sessions available for this hotel.</p>
                  )}
                </div>

                {/* Column for Choosing Specific Date */}
                <div className="p-4 col-span-1 bg-[#FFFFFF] mt-16">
                  <h2 className="text-xl mt-4">Choose Specific Date</h2>
                  <div className="mb-4 mt-4">
                    <Calendar
                      onChange={handleDateChange}
                      value={date}
                      className="border border-gray-100 rounded-lg"
                    />
                  </div>
                  {loadingRooms ? (
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center mt-2">
                        <div className="border-t-4 border-[#FA9F36] border-solid rounded-full w-8 h-8 animate-spin"></div>
                      </div>
                    </div>
                  ) : selectedRoomData.length > 0 ? (
                    <div className="mt-4">
                      <div className="flex flex-col gap-4">
                        {/* Display only three room types initially */}
                        {selectedRoomData.map((room, roomIndex) => (
                          <div
                            key={roomIndex}
                            className="flex flex-col items-start bg-[#F6F6F6] p-2 rounded-lg w-full sm:w-1/2 lg:w-full"
                          >
                            <span className="mb-1">{room.room_type}</span>
                            <span className="font-medium">
                              {room.room_price > 0
                                ? `${room.room_price}/night`
                                : "Not Available"}
                            </span>
                          </div>
                        ))}

                        <div>
                          {/* <p className="text-[#717171]">
                            <span className="text-black">Breakfast (FB)</span>{" "}
                            as a meal is included in all types of suites.
                          </p> */}
                          <button
                            type="button"
                            onClick={() =>
                              handleEnquireClick(hotelData.Hotel.hotel_name)
                            }
                            className="text-[#FA9F36] bg-[#FAFAFA] rounded-lg mt-4 h-12 w-full border-2 border-[#EAEAEA]"
                          >
                            Enquire to book now
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>No rooms available for this date.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <Newsletter />
      <Footer />
    </section>
  );
}

export default HotelViewPage;
