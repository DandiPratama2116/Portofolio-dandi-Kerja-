import foto from "../assets/Foto-dandi.jpeg";
import { useLanguage } from "../context/LanguageContext";
import { FileDown, ArrowRight } from "lucide-react";

function Hero({ scrollTo }) {
  const { lang, t } = useLanguage();

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CV_DandiPratama_SE.pdf";
    link.download = "CV-DandiPratama_SE.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clean strings without legacy emoji
  const cvBtnText = t.hero.cvBtn ? t.hero.cvBtn.replace(/^[^\w\s]+/, "").trim() : (lang === "id" ? "Unduh CV" : "Download CV");
  const contactBtnText = t.hero.contactBtn ? t.hero.contactBtn.replace(/^[^\w\s]+/, "").trim() : (lang === "id" ? "Hubungi Saya" : "Contact Me");

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Copy & CTAs */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="status-dot"></span>
              <span className="hero-badge-text">
                {lang === "id" ? "Terbuka untuk Peluang Kerja (Software Engineer)" : "Open to Software Engineering Opportunities"}
              </span>
            </div>

            <h1 className="hero-title">
              Dandi <span className="hero-title-highlight">Pratama</span>
            </h1>

            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleDownloadCV}>
                <FileDown size={17} />
                <span>{cvBtnText}</span>
              </button>
              <button className="btn btn-secondary" onClick={() => scrollTo("contact")}>
                <span>{contactBtnText}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Right Column: Grounded Professional Profile Card */}
          <div className="hero-right">
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="profile-card-title">developer_profile.ts</span>
              </div>

              <div className="profile-card-body">
                <div className="avatar-frame">
                  <img src={foto} alt="Dandi Pratama" className="avatar-photo" />
                </div>

                <div className="profile-card-details">
                  <div className="profile-name-tag">
                    <span className="profile-name">Dandi Pratama, S.T.</span>
                    <span className="profile-status-badge">Backend & Full Stack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

