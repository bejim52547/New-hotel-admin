// src/apiUtils.js

//const BASE_URL = "http://54.184.122.3:8081"; // Base URL for API requests

// General function to handle API requests
const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}${endpoint}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Example specific function to fetch hotels
export const fetchHotels = async (endpoint) => {
  return fetchFromAPI(endpoint);
};
