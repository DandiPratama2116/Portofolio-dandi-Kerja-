import { useState, useEffect } from "react";
import HalftoneReveal from "../fitur-gsap/HalftoneReveal";
import "../css/HomeHero.css";

function Hero({ darkMode }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof darkMode === "boolean") return darkMode;
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    if (typeof darkMode === "boolean") {
      setIsDark(darkMode);
      return;
    }
    const update = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    };
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, [darkMode]);

  return (
    <section id="home" className="hero-new">
      {/* Ambient studio backdrop */}


      {/* Flex column: title → foto → badge, semua saling berdekatan */}
      <div className="hero-stack">
        {/* Atas: PORTFOLIO */}
        <div className="hero-top-typography" aria-hidden="true">
          <h1 className="hero-bg-title">PORTFOLIO</h1>
        </div>

        {/* Tengah: foto interaktif */}
        <div className="hero-photo-wrapper">
          <HalftoneReveal
            src="/foto1.png"
            fit="contain"
            mode="mono"
            shape="dot"
            cellSize={7}
            angle={23}
            dotScale={1}
            inkColor={isDark ? "#ffffffff" : "#41464fff"}
            paperColor="transparent"
            contrast={1.15}
            brightness={0.03}
            invert={false}
            roughness={0.08}
            misregistration={0}
            revealRadius={190}
            softness={0.55}
            linger={1.5}
            reverse={false}
            wander={false}
            clickBurst={false}
            intro={false}
          />
        </div>

        {/* Bawah: BACKEND ENGINEER badge — langsung menempel di bawah foto */}
        <div className="hero-bottom-typography" aria-hidden="true">
          <div className="hero-bg-subtitle-pill">
            <span className="hero-bg-subtitle-dot" />
            <h2 className="hero-bg-subtitle">BACKEND ENGINEER</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
