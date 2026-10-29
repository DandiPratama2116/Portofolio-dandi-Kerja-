import { useState, useEffect, useRef } from "react";
import "./css/App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certificate from "./components/Certificate";
import SkyBackground from "./components/SkyBackground";


gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      // Jangan timpa activeSection jika sedang smooth scrolling dari klik navbar
      if (isClickScrollingRef.current) return;

      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }
      const sections = ["home", "about", "skills", "projects", "certificate", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollTo = (id) => {
    // Kunci scroll listener seketika agar awan navbar langsung aktif dan tidak loncat-loncat saat smooth scroll
    setActiveSection(id);
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <SkyBackground darkMode={darkMode} />
      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Hero darkMode={darkMode} scrollTo={scrollTo} />
      <About scrollTo={scrollTo} />
      <Skills />
      <Projects />
      <Certificate />
      <Contact />
      <Footer scrollTo={scrollTo} />
    </div>
  );
}

export default App;