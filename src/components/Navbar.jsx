import { useLanguage } from "../context/LanguageContext";
import { Sun, Moon, Menu, X, Globe, ArrowRight } from "lucide-react";

function Navbar({ activeSection, scrollTo, darkMode, setDarkMode, menuOpen, setMenuOpen }) {
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" id="navbar" aria-label="Main Navigation">
        <div className="nav-inner">
          {/* Logo Branding */}
          <div className="logo-wrap" onClick={() => scrollTo("home")} role="button" tabIndex={0}>
            <div className="logo-mark-wrap">
              <span className="logo-mark">D</span>
              <span className="logo-dot-glow"></span>
            </div>
            <span className="logo">PORTOFOLIO</span>
          </div>

          {/* Segmented Pill Navigation */}
          <ul className={`menu ${menuOpen ? "open" : ""}`} role="menubar">
            {["home", "about", "skills", "projects", "contact"].map((s) => (
              <li
                key={s}
                className={activeSection === s ? "active" : ""}
                onClick={() => scrollTo(s)}
                role="menuitem"
              >
                {t.nav[s] || s.charAt(0).toUpperCase() + s.slice(1)}
              </li>
            ))}
          </ul>

          {/* Nav Actions */}
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

            {/* Quick Contact CTA */}
            <button
              className="nav-cta-btn"
              onClick={() => scrollTo("contact")}
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

