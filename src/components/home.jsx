import foto from "../assets/Foto-dandi.jpeg";
import { useLanguage } from "../context/LanguageContext";

function Hero({ scrollTo }) {
  const { t } = useLanguage();

  const handleDownloadCV = () => {
    // Triggers download/view of Dandi Pratama's CV
    const link = document.createElement("a");
    link.href = "/CV-Dandi-Pratama.pdf";
    link.download = "CV-Dandi-Pratama.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            Dandi <span className="gradient-text">Pratama</span>
          </h1>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleDownloadCV}>
              {t.hero.cvBtn || "📄 Unduh CV"}
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")}>
              {t.hero.contactBtn}
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="avatar-wrapper">
            <div className="avatar-ring"></div>
            <img src={foto} alt="Dandi Pratama" className="avatar-img" />
            <div className="avatar-badge">
              <span>💻</span>
            </div>
          </div>
          <div className="floating-card card-1">
            <span>⚡</span> FastAPI
          </div>
          <div className="floating-card card-2">
            <span>⚛️</span> React
          </div>
          <div className="floating-card card-3">
            <span>🤖</span> AI/ML
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
