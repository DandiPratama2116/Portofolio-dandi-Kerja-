import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import HalftoneReveal from "../fitur-gsap/HalftoneReveal";
import ScrollMask from "../fitur-gsap/ScrollMask";
import "../css/HomeHero.css";

function Hero({ darkMode }) {
  const { lang, t } = useLanguage();
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
    <section id="home" className="hero-new-container">
      <ScrollMask
        welcomeText={t.hero?.welcome || (lang === "id" ? "SELAMAT DATANG" : "WELCOME")}
        title={t.hero?.title || "PORTFOLIO DANDI PRATAMA"}
        subtitle={t.hero?.subtitleLead || "SOFTWARE ENGINEER"}
        scrollHint={t.hero?.scrollHint || (lang === "id" ? "Scroll ke bawah" : "Scroll down")}
        variant="iris"
        scrollLength={2.8}
        settle={0.82}
        zoom={1.18}
        isDark={isDark}
      >
        <div className="hero-stack">
          {/* Atas: PORTFOLIO */}
          <div className="hero-top-typography" aria-hidden="true">
            <h1 className="hero-bg-title">PORTFOLIO</h1>
          </div>

          {/* Tengah: Halftone Dot Matrix Eksklusif Persis Seperti Screenshot */}
          <div className="hero-photo-wrapper">
            <HalftoneReveal
              src="/foto1.png"
              fit="contain"
              mode="mono"
              shape="dot"
              cellSize={7}
              angle={23}
              dotScale={1}
              inkColor={isDark ? "#ffffff" : "#41464f"}
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

          {/* Bawah: SOFTWARE ENGINEER badge */}
          <div className="hero-bottom-typography" aria-hidden="true">
            <div className="hero-bg-subtitle-pill">
              <span className="hero-bg-subtitle-dot" />
              <h2 className="hero-bg-subtitle">{t.hero?.subtitleLead || "SOFTWARE ENGINEER"}</h2>
            </div>
          </div>
        </div>
      </ScrollMask>
    </section>
  );
}

export default Hero;
