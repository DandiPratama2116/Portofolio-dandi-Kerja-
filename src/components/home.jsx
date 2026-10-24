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
      <HalftoneReveal
        src="/fotoremove.png"
        fit="contain"
        mode="mono"
        shape="dot"
        cellSize={6}
        angle={45}
        dotScale={1}
        inkColor={isDark ? "#e2e8f0" : "#0f172a"}
        paperColor="transparent"
        contrast={1.2}
        brightness={0.05}
        invert={false}
        roughness={0.1}
        misregistration={0}
        revealRadius={180}
        softness={0.55}
        linger={1.4}
        reverse={false}
        wander={false}
        clickBurst={false}
        intro={false}
      />
    </section>
  );
}

export default Hero;
