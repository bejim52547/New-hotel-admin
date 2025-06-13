import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Fetch_hotel, Search, Newsletter, Footer } from "./index";
import axios from "axios";
// import fallbackImage from "../assets/Dummy.png";
import noDataImage from "../assets/noData.jpg";

function HotelSearchingPage() {
  const location = useLocation();
  const [location_h, setLocation_h] = useState("");
  const [month, setMonth] = useState("");
  const [sharedData, setSharedData] = useState(location.state?.hotels || null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [hotelsPerPage] = useState(5); // Number of hotels to display per page
  const [filters, setFilters] = useState({
    location: location.state?.location || "",
    month: location.state?.month || "",
  });

  const [noResults, setNoResults] = useState(false);

  const handleDataUpdate = (data) => {
    setSharedData(data);
    setCurrentPage(1); // Reset to first page when new data is fetched
    setNoResults(data.length === 0); // Update noResults state based on data
  };

  useEffect(() => {
    if (!sharedData) {
      const fetchHotels = async () => {
        try {
          const currentMonthIndex = "";
          const response = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/hotel?location=${location_h}&month=${month}`
          );
          console.log("month wala response", response);
          setSharedData(response.data);
        } catch (error) {
          console.error("Failed to fetch hotels", error);
        }
      };
      fetchHotels();
    }
  }, [sharedData]);

  // Pagination Logic
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sharedData?.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(sharedData?.length / hotelsPerPage);

  // Pagination buttons calculation
  const pagesToShow = 5;

  const getPaginationRange = () => {
    let startPage, endPage;

    // Case when there are fewer than 5 pages
    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      // Case when we are in the middle of the pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPaginationRange();

  // Create the list of page numbers to display
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="bg-[#FFF9F9]">
      <Navbar />
      <nav className="flex pl-16 mt-8 ml-5" aria-label="Breadcrumb">
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
              <Link to="/hotelsearch" className="ms-1 text-sm font-medium">
                Hotel search
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <Search
        onDataUpdate={handleDataUpdate}
        initialLocation={filters.location}
        initialMonth={filters.month}
      />

      {/* Display the total number of hotels fetched */}
      {/* Enable before testing */}
      {/* <div className="text-left ml-20 py-2">
        {sharedData && sharedData.length > 0 ? (
          <h2 className="text-lg font-medium text-[#717171]">
            {sharedData.length} Hotels found
          </h2>
        ) : (
          <h2 className="text-lg font-medium text-[#717171]">
            No Hotels found
          </h2>
        )}
      </div> 

      {/* Disable above after testing */}

      {noResults ? (
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="w-56 h-56">
            <img className="" src={noDataImage} alt="" />
          </div>
          <h1 className="text-center mt-2 text-xl text-[#717171]">
            No Hotels found for the selected location and month.
          </h1>
        </div>
      ) : (
        <Fetch_hotel hotels={currentHotels} />
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-6 text-xs">
        {/* Previous button */}
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mx-1 px-4 py-2 text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-full"
          >
            Previous
          </button>
        )}

        {/* First page button */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="mx-1 px-4 py-2 text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-full"
            >
              1
            </button>
            <span className="mx-1">...</span>
          </>
        )}

        {/* Page number buttons */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`mx-1 px-4 py-2 border ${
              currentPage === pageNumber
                ? "bg-[#FA9F36] text-white"
                : "bg-white text-[#FA9F36]"
            } border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-full`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Last page button */}
        {endPage < totalPages && (
          <>
            <span className="mx-1">...</span>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="mx-1 px-4 py-2 text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-full"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="mx-1 px-4 py-2 text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-full"
          >
            Next
          </button>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default HotelSearchingPage;
