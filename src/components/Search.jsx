import { useState, useEffect } from "react";
import { fetchHotels } from "../components/utils/apiutils";
import Select from "react-select"; // Import react-select

const Search = ({ onDataUpdate, initialLocation, initialMonth }) => {
  const [location, setLocation] = useState(initialLocation);
  const [month, setMonth] = useState(initialMonth);
  const [loading, setLoading] = useState(false);

  // Use useEffect to update state when initial props change
  useEffect(() => {
    setLocation(initialLocation);
    setMonth(initialMonth);
  }, [initialLocation, initialMonth]);

  // Handle change for location select
  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption.value); // Use the selected value
  };

  // Handle change for month select
  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption.value); // Use the selected value
  };

  const handleSearchClick = async () => {
    setLoading(true);
    let endpoint = "/hotel?";

    // Add location and month to the query string if valid
    if (location && location !== "Location") {
      endpoint += `location=${location}&`;
    }

    if (month && month !== "Month") {
      endpoint += `month=${month}`;
    }

    if (endpoint.endsWith("&")) {
      endpoint = endpoint.slice(0, -1); // Remove trailing "&" if month is not added
    }

    try {
      const data = await fetchHotels(endpoint);
      console.log("Hotels data:", data);
      onDataUpdate(data.length > 0 ? data : []); // Update parent component with data
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Month options for react-select
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(0, i)
    ),
  }));

  // Location options for react-select
  const locations = [
    { value: "Madina", label: "Madina" },
    { value: "Makkah", label: "Makkah" },
  ];

  return (
    <div className="relative bg-[#FFFFFF] rounded-lg mt-6 py-4 mx-20 flex flex-col sm:flex-row items-center justify-between sm:px-12 lg:px-20 xl:px-52 px-6 sm:mx-0">
      <form className="flex flex-col sm:flex-row gap-16 w-full">
        {/* Location select */}
        <div className="flex-none sm:w-4/12 md:w-3/12">
          <label
            htmlFor="location"
            className="block text-[#666666] text-sm mb-2"
          >
            Your staying location
          </label>
          <Select
            id="location"
            options={locations}
            value={locations.find((loc) => loc.value === location)}
            onChange={handleLocationChange}
            placeholder="Location"
            className="font-medium"
            styles={{
              control: (base) => ({
                ...base,
                minWidth: "100px",
                maxWidth: "150px",
                borderRadius: "4px",
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

        {/* Month select */}
        <div className="flex-1">
          <label
            htmlFor="month"
            className="block text-[#666666] text-sm pl-1 mb-2"
          >
            Expected month to visit
          </label>
          <Select
            id="month"
            options={months}
            value={months.find((monthOption) => monthOption.value === month)}
            onChange={handleMonthChange}
            placeholder="Month"
            className="font-medium"
            styles={{
              control: (base) => ({
                ...base,
                minWidth: "100px",
                maxWidth: "150px",
                borderRadius: "4px",
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

        {/* Search button */}
        <button
          type="button"
          className="px-12 text-sm text-[#FA9F36] border border-[#FA9F36] hover:bg-[#FA9F36] hover:text-white hover:border-white rounded-sm"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </form>

      {/* Show loading spinner if data is loading */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-600 rounded-full animate-spin"></div>{" "}
          {/* Spinner */}
        </div>
      )}
    </div>
  );
};

export default Search;
