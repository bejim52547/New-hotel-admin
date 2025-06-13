import {
  About,
  Newsletter,
  HomePage,
  Fetch_hotel,
  HotelSearchingPage,
  Hotelviewpage,
  TestHotelviewpage,
  Stays,
  Chatbot,
} from "./components/index";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider } from "./LanguageContext"; // Import the LanguageProvider
import GoogleTranslate from "../src/components/GoogleTranslate"; // Import the component

const App = () => {
  //console.log(import.meta.env.VITE_BASE_URL);
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stays" element={<Stays />} />

          <Route path="/about" element={<About />} />
          <Route path="/fetchhotel" element={<Fetch_hotel />} />
          <Route path="/contact" element={<Newsletter />} />
          <Route path="/hotelsearch" element={<HotelSearchingPage />} />
          <Route path="/hotelviewpage/:hotelId" element={<Hotelviewpage />} />
          <Route
            path="/Testhotelviewpage/:hotelId"
            element={<TestHotelviewpage />}
          />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
