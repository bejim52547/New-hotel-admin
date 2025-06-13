import logo from "../assets/logo.png";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles for the calendar
import "../assets/css/CalendarStyles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; // Import the Slider component

function HotelViewPage() {
  const [date, setDate] = useState(new Date());
  const [showMessage, setShowMessage] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchRoomData(newDate);
  };

  const fetchRoomData = async (selectedDate) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const response = await fetch(
        `https://your-backend-api.com/rooms?date=${selectedDate.toISOString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRoomData(data); // Assuming data is an object with room types and prices
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected Date: ${date.toDateString()}`);
  };

  const handleMouseEnter = () => setShowMessage(true);
  const handleMouseLeave = () => setShowMessage(false);

  const handleEnquireClick = () => {
    alert("Enquiry button clicked!");
    setShowMessage(false);
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section>
      <nav className="bg-white px-4 font-poppins">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Hotel Logo" className="h-16 w-32" />
          <div className="space-x-4">
            <a
              href="#about"
              className="hover:text-gray-400 font-medium text-2xl"
            >
              Rehman
            </a>
          </div>
        </div>
      </nav>

      <div className="py-2 px-16">
        <h1 className="text-4xl font-semibold">Bosphorus Waqf</h1>
        <h2 className="text-xl py-2 font-medium">Madina</h2>
      </div>

      {/* Carousel for Images */}
      <div className="mx-16 py-4">
        <Slider {...settings}>
          <div>
            <img
              src={logo}
              alt="Bosphorus Waqf Image 1"
              className="mx-16 w-6/12 h-44 object-cover"
            />
          </div>
          <div>
            <img
              src={logo}
              alt="Bosphorus Waqf Image 2"
              className="w-full h-44 object-cover"
            />
          </div>
          <div>
            <img
              src={logo}
              alt="Bosphorus Waqf Image 3"
              className="w-full h-44 object-cover"
            />
          </div>
          <div>
            <img
              src={logo}
              alt="Bosphorus Waqf Image 4"
              className="w-full h-44 object-cover"
            />
          </div>
        </Slider>
      </div>

      <h1 className="px-16 text-2xl">Accommodation Details</h1>

      <div className="min-h-screen bg-[#FEFCFB] p-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column for All Sessions */}
          <div className="bg-white p-6 rounded-lg col-span-2 relative">
            <h2 className="text-xl font-semibold mb-4">All Sessions</h2>
            <div
              className="overflow-x-auto"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <table className="min-w-full my-4 bg-[#FFFFFF] border-separate border-spacing-x-2 ">
                <thead className="bg-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Session</th>
                    <th className="py-2 px-4 text-left bg-[#FBFBFB] rounded-sm">
                      Double Suite
                    </th>
                    <th className="py-2 px-4 text-left bg-[#FBFBFB]">
                      Triple Suite
                    </th>
                    <th className="py-2 px-4 text-left bg-[#FBFBFB]">
                      Quad Suite
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 text-sm">
                      January 10
                      <br />
                      <span className="">
                        <i className="fas fa-arrow-down text-xs" />{" "}
                      </span>
                      <br />
                      January 15
                    </td>
                    <td className="py-2 px-4 bg-[#FBFBFB]">$150/night</td>
                    <td className="py-2 px-4 bg-[#FBFBFB]">$200/night</td>
                    <td className="py-2 px-4 bg-[#FBFBFB]">$250/night</td>
                  </tr>
                  {showMessage && (
                    <div className="absolute left-4 right-6 mt-4 flex justify-between items-center bg-white ">
                      <p className="text-[#717171]">
                        Breakfast (FB) as a meal is included in all types of
                        suites.
                      </p>
                      <button
                        onClick={handleEnquireClick}
                        className="bg-[#FBFBFB] text-[#FA9F36] py-2 px-4 border rounded-sm"
                      >
                        Enquire to Book Now
                      </button>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column for Choosing Specific Date */}
          <div className="p-6 col-span-1">
            <h2 className="text-xl mb-4">Choose Specific Date</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="border border-gray-100 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white py-2 rounded-lg w-full hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>

            {/* Room data display */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {roomData && (
              <div className="mt-4 bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">Room Types and Prices</h3>
                <ul className="list-disc pl-5">
                  {Object.entries(roomData).map(([type, price]) => (
                    <li key={type} className="py-1">
                      {type}: {price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotelViewPage;
