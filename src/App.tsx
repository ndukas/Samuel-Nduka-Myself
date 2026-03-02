import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FloatingNav from "./components/FloatingNav";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import SplashScreen from "./components/SplashScreen";

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    // Force dark mode on all pages except home
    if (location.pathname !== "/" && !isDark) {
      setIsDark(true);
    }

    const handleScroll = () => {
      if (location.pathname === "/") {
        // If scrolled past hero (approx 600px), force dark mode
        if (window.scrollY > 600 && !isDark) {
          setIsDark(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDark, location.pathname]);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      <div className={`font-sans text-white selection:bg-blue-500 selection:text-white pb-32 transition-colors duration-500 ${isDark ? 'bg-[#0B1120]' : 'bg-white'}`}>
        <Header isDark={isDark} />
        <FloatingNav />
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </>
  );
}

// Main application component wrapper
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
