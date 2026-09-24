import { useState, useEffect } from "react";
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
import ShapeGrid from "./components/ShapeGrid";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <div className="global-shapegrid-bg" aria-hidden="true">
        <ShapeGrid
          speed={0.4}
          squareSize={40}
          direction="diagonal"
          borderColor={darkMode ? "rgba(99, 102, 241, 0.16)" : "rgba(79, 70, 229, 0.09)"}
          hoverFillColor={darkMode ? "rgba(56, 189, 248, 0.35)" : "rgba(79, 70, 229, 0.2)"}
          shape="square"
          hoverTrailAmount={5}
        />
      </div>
      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Hero scrollTo={scrollTo} />
      <About scrollTo={scrollTo} />
      <Skills />
      <Projects />
      <Contact />
      <Footer scrollTo={scrollTo} />
    </div>
  );
}

export default App;