import { useLanguage } from "../context/LanguageContext";

function Navbar({ activeSection, scrollTo, darkMode, setDarkMode, menuOpen, setMenuOpen }) {
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-inner">
        <div className="logo-wrap" onClick={() => scrollTo("home")}>
          <span className="logo">Portofolio</span>
        </div>

        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          {["home", "about", "skills", "projects", "contact"].map((s) => (
            <li
              key={s}
              className={activeSection === s ? "active" : ""}
              onClick={() => scrollTo(s)}
            >
              {t.nav[s] || s.charAt(0).toUpperCase() + s.slice(1)}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {/* Language Switcher */}
          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            title={lang === "id" ? "Switch to English" : "Tukar ke Bahasa Indonesia"}
            aria-label="Toggle language"
          >
            <span className={`lang-badge ${lang === "id" ? "active" : ""}`}>ID</span>
            <span className="lang-divider">|</span>
            <span className={`lang-badge ${lang === "en" ? "active" : ""}`}>EN</span>
          </button>

          {/* Theme Switcher */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            <span className="toggle-track">
              <span className="toggle-thumb">{darkMode ? "🌙" : "☀️"}</span>
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
