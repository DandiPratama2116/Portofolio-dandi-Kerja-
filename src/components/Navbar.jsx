import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Sun, Moon, Menu, X, Globe, ArrowRight } from "lucide-react";
import "../css/NavbarDragonBall.css";

// ── 4-Star Dragon Ball (Sūshinchū) Component ──
function DragonBallSphere() {
  return (
    <div className="dragonball-sphere-wrap" title="4-Star Dragon Ball (Sūshinchū)">
      <svg viewBox="0 0 44 44" className="dragonball-svg" width="36" height="36" aria-hidden="true">
        <defs>
          <radialGradient id="dbSphereGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="20%" stopColor="#FB923C" />
            <stop offset="60%" stopColor="#EA580C" />
            <stop offset="90%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </radialGradient>
          <radialGradient id="dbGlassHighlight" cx="30%" cy="22%" r="28%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Ki Glow ring */}
        <circle cx="22" cy="22" r="19" className="db-aura-ring" />

        {/* Main Crystal Sphere */}
        <circle cx="22" cy="22" r="18" fill="url(#dbSphereGrad)" />

        {/* Four Red Stars (Sūshinchū) */}
        <g fill="#DC2626" stroke="#991B1B" strokeWidth="0.3">
          {/* Top Star */}
          <path d="M22,12 L22.8,14.5 L25.4,14.5 L23.3,16 L24.1,18.5 L22,17 L19.9,18.5 L20.7,16 L18.6,14.5 L21.2,14.5 Z" />
          {/* Bottom Star */}
          <path d="M22,25.5 L22.8,28 L25.4,28 L23.3,29.5 L24.1,32 L22,30.5 L19.9,32 L20.7,29.5 L18.6,28 L21.2,28 Z" />
          {/* Left Star */}
          <path d="M15.5,18.5 L16.3,21 L18.9,21 L16.8,22.5 L17.6,25 L15.5,23.5 L13.4,25 L14.2,22.5 L12.1,21 L14.7,21 Z" />
          {/* Right Star */}
          <path d="M28.5,18.5 L29.3,21 L31.9,21 L29.8,22.5 L30.6,25 L28.5,23.5 L26.4,25 L27.2,22.5 L25.1,21 L27.7,21 Z" />
        </g>

        {/* 3D Glass Specular Reflection */}
        <ellipse cx="17" cy="14" rx="7" ry="4" fill="url(#dbGlassHighlight)" transform="rotate(-20 17 14)" />
        <ellipse cx="28" cy="30" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.3" transform="rotate(30 28 30)" />
      </svg>
      <span className="db-ki-pulse"></span>
    </div>
  );
}

// ── Kinto'un (Awan Kinton / Flying Nimbus) SVG ──
function KintonCloudSVG() {
  return (
    <svg
      viewBox="0 0 120 60"
      className="kinton-svg kinton-svg-subtle"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kintonYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="kintonPuffShine" cx="35%" cy="25%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FEF08A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main puffy cloud body */}
      <g fill="url(#kintonYellowGrad)" stroke="#D97706" strokeWidth="1" strokeOpacity="0.4">
        {/* Base rounded cloud puffs */}
        <ellipse cx="60" cy="42" rx="42" ry="14" />
        <circle cx="32" cy="34" r="16" />
        <circle cx="58" cy="24" r="20" />
        <circle cx="86" cy="32" r="16" />
        <circle cx="16" cy="40" r="10" />
        <circle cx="102" cy="40" r="10" />
      </g>

      {/* White/light yellow gloss puff highlights */}
      <ellipse cx="55" cy="18" rx="12" ry="6" fill="url(#kintonPuffShine)" />
      <ellipse cx="30" cy="28" rx="9" ry="5" fill="url(#kintonPuffShine)" />
      <ellipse cx="84" cy="26" rx="9" ry="5" fill="url(#kintonPuffShine)" />

      {/* Akira Toriyama style comic cloud swirl */}
      <path
        d="M 28,38 C 24,32 32,28 36,33 C 38,36 34,40 30,38"
        stroke="#B45309"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M 78,36 C 74,30 82,26 86,31 C 88,34 84,38 80,36"
        stroke="#B45309"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* Nimbus wind trails on the left */}
      <path
        d="M 6,43 Q 12,41 18,43"
        stroke="#FDE68A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 8,48 Q 14,47 20,49"
        stroke="#FDE68A"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

function Navbar({ activeSection, scrollTo, darkMode, setDarkMode, menuOpen, setMenuOpen }) {
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  const handleMenuClick = (s) => {
    scrollTo(s);
    if (menuOpen) setMenuOpen(false);
  };

  const navItems = ["home", "about", "skills", "projects", "certificate", "contact"];

  return (
    <header className="navbar-wrapper">
      <nav className="navbar dragonball-nav" id="navbar" aria-label="Main Navigation">
        <div className="nav-inner">
          {/* Logo Branding: Official LogoDP.png */}
          <div className="logo-wrap" onClick={() => scrollTo("home")} role="button" tabIndex={0}>
            <div className="logo-dp-wrap">
              <img src="/LogoDP.png" alt="Dandi Pratama Logo" className="logo-dp-img" />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">Portfolio</span>
            </div>
          </div>

          {/* Segmented Pill Navigation with Awan Kinton di Bawah saat Aktif */}
          <ul className={`menu ${menuOpen ? "open" : ""}`} role="menubar">
            {navItems.map((s) => {
              const isActive = activeSection === s;

              return (
                <li
                  key={s}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  onClick={() => handleMenuClick(s)}
                  role="menuitem"
                >
                  <span className="menu-text">{t.nav[s] || s.charAt(0).toUpperCase() + s.slice(1)}</span>

                  {/* Kinto'un Cloud Cushion Base (Awan Kinton Bawah) */}
                  {isActive && (
                    <span className="active-kinton-cushion" aria-hidden="true">
                      <KintonCloudSVG />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Nav Actions: Language, Theme, and Dragon Ball Ki Energy CTA */}
          <div className="nav-actions">
            {/* Language Switcher */}
            <button
              className="lang-toggle"
              onClick={toggleLanguage}
              title={lang === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
              aria-label="Toggle language"
            >
              <Globe size={14} className="lang-icon" />
              <span className={`lang-badge ${lang === "id" ? "active" : ""}`}>ID</span>
              <span className="lang-divider">/</span>
              <span className={`lang-badge ${lang === "en" ? "active" : ""}`}>EN</span>
            </button>

            {/* Theme Switcher */}
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              id="theme-toggle-btn"
              title={darkMode ? "Mode Terang" : "Mode Gelap"}
            >
              {darkMode ? (
                <Sun size={17} className="theme-icon light" />
              ) : (
                <Moon size={17} className="theme-icon dark" />
              )}
            </button>

            {/* Quick Contact CTA: Goku Gi / Saiyan Fire Gradient Button */}
            <button
              className="nav-cta-btn db-cta"
              onClick={() => handleMenuClick("contact")}
              title={lang === "id" ? "Hubungi Saya" : "Get in Touch"}
            >
              <span>{lang === "id" ? "Kontak" : "Hire Me"}</span>
              <ArrowRight size={13} className="nav-cta-arrow" />
            </button>

            {/* Mobile Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
