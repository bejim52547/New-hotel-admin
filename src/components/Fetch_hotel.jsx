import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import fallbackImage from "../assets/Dummy.png";
import noDataImage from "../assets/noData.jpg";

const Fetch_hotel = ({ hotels, loading }) => {
  const navigate = useNavigate();

  // State for loading status
  //const [loading, setLoading] = useState(true);

  const showMoreItems = (hotelId) => {
    navigate(`/hotelviewpage/${hotelId}`);
  };

  // Function to format dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateShort = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const dateObj = new Date(date);

    // Get the day, month (short form), and year
    const day = dateObj.getDate();
    const month = dateObj
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(); // Month in uppercase
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const handleEnquireClick = (hotelName) => {
    const inputMessage = `Hello, I would like to enquire about booking a room at ${hotelName}.`;
    const phoneNumber = "+966536258731"; // Replace with the actual WhatsApp phone number
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      inputMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  // Show loading state if data is still fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Check if hotels is an array
  if (!Array.isArray(hotels)) {
    return (
      <div className="flex justify-center items-center my-56">
        <div className="border-t-4 border-[#FA9F36] border-solid rounded-full w-8 h-8 animate-spin"></div>
      </div>
    ); // Show loading while fetching
  }

  // if (hotels.length === 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center mt-12">
  //       <AiOutlineSearch size={48} className="text-gray-400 mb-6" />{" "}
  //       {/* Icon */}
  //       <h1 className="text-center mt-4 text-xl text-[#717171]">
  //         No Hotels found for the selected location and month.
  //       </h1>
  //     </div>
  //   );
  // }

  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="w-56 h-56">
          {" "}
          {/* Tailwind class for width and height */}
          <img className="" src={noDataImage} alt="" />
        </div>
        <h1 className="text-center mt-2 text-xl text-[#717171]">
          No Hotels found for the selected location and month.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar /> */}

      <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-8 px-4 sm:px-10 lg:px-16 py-8 bg-[#FEFCFB]">
        {hotels.map((item) => {
          const session =
            item.Sessions && item.Sessions.length > 0 ? item.Sessions[0] : null; // Check for Sessions

          // If session is null, you can either return a placeholder or skip rendering this hotel.
          const startDate = session ? formatDate(session.start_date) : "N/A";
          const endDate = session ? formatDate(session.end_date) : "N/A";

          return (
            <div
              key={item.Hotel.hotel_id}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 bg-white"
            >
              {/* Use the hotel cover image from the JSON */}
              <img
                src={`${item.Hotel.cover_image}`} // Ensure the correct base URL is used
                alt={item.Hotel.hotel_name}
                className="w-full h-56 object-cover rounded-lg cursor-pointer"
                onClick={() => showMoreItems(item.Hotel.hotel_id)} // Trigger navigation
                onError={(e) => {
                  e.target.onerror = null; // Prevent looping
                  e.target.src = fallbackImage; // Fallback image path
                }} // Adjust class for better image handling
              />
              <div className="col-span-1 sm:col-span-2 px-2 ml-6 py-2 ">
                <h1
                  className="py-1 font-medium text-xl sm:text-2xl cursor-pointer"
                  onClick={() => showMoreItems(item.Hotel.hotel_id)}
                >
                  {item.Hotel.hotel_name}
                </h1>
                <span className="">
                  <PlaceOutlinedIcon />
                </span>
                <span className="ml-2">{item.Hotel.hotel_location}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4">
                  {session && session.Meals && session.Meals.length > 0 ? (
                    session.Meals[0].Rooms.map((room, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-[#F7F7F7] p-2 rounded-lg"
                      >
                        <div className="flex flex-col gap-2 ">
                          <h1 className="text-lg font-medium text-[#2f2f2f]">
                            {room.room_type}
                          </h1>

                          <div className="flex items-center">
                            <span className="mr-2">Starting from</span>

                            <h1 className="pt-0">
                              <span className="text-xs">SAR</span>{" "}
                              <span className="font-medium">
                                {room.room_price}
                                /night
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between items-center bg-[#FBFBFB] p-2 rounded-lg">
                      <div className="flex flex-col">
                        <h1 className="">Room Type</h1>
                        <span className="font-medium">Not Available</span>
                      </div>
                      <h1 className="pt-6 font-medium">Not Available</h1>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 text-center sm:text-left mt-4">
                  <p className="col-span-2 text-xs text-[#717171] mt-4">
                    Prices are showing for the session:{" "}
                    {formatDateShort(startDate)} - {formatDateShort(endDate)}
                  </p>
                  <button
                    type="button"
                    onClick={() => showMoreItems(item.Hotel.hotel_id)}
                    className="underline text-center "
                  >
                    View More
                    <i
                      className="fas fa-arrow-right ml-1 text-xs"
                      style={{ transform: "rotate(-45deg)" }}
                    ></i>
                  </button>
                  <button
                    type="button"
                    //onClick={handleEnquireClick}
                    onClick={() => handleEnquireClick(item.Hotel.hotel_name)}
                    className="text-[#FA9F36] bg-[#FAFAFA] rounded-lg h-12  border-2 border-[#EAEAEA]"
                  >
                    Enquire to book now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fetch_hotel;
