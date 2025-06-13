import { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./LanguageContext"
import "./i18n"
import "./CustomStyles.css"

// Import components
import HomePage from "./components/HomePage"
import HotelSearchingPage from "./components/HotelSearchingPage"
import Hotelviewpage from "./components/Hotelviewpage"
import TestHotelviewpage from "./components/TestHotelviewpage"
import About from "./components/About"
import RoomsPage from "./components/RoomsPage"

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<HotelSearchingPage />} />
              <Route path="/hotel/:id" element={<Hotelviewpage />} />
              <Route path="/test-hotel/:id" element={<TestHotelviewpage />} />
              <Route path="/about" element={<About />} />
              <Route path="/rooms" element={<RoomsPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
