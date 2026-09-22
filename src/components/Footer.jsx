import { useLanguage } from "../context/LanguageContext";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import git from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

function Footer() { 
  const { lang, t } = useLanguage();
  const emailAddress = "dandipratamapku04@gmail.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <div className="footer-logo-row" onClick={scrollToTop}>
              <span className="logo-mark">D</span>
              <h3 className="footer-logo">
                Dandi <span className="logo-accent">Pratama</span>
              </h3>
            </div>
            <p className="footer-tagline">
              Software Engineer • Backend & Full Stack Developer
            </p>
            <p className="footer-subtext">
              {lang === "id"
                ? "Membangun sistem perangkat lunak yang andal, scalable, dan efisien."
                : "Building reliable, scalable, and high-performance software systems."}
            </p>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-title">
              {lang === "id" ? "Kontak & Lokasi" : "Contact & Location"}
            </h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Mail size={16} className="footer-link-icon" />
                <a href={`mailto:${emailAddress}`} className="footer-text email-link">
                  {emailAddress}
                </a>
              </li>
              <li className="footer-link-item">
                <MapPin size={16} className="footer-link-icon" />
                <span className="footer-text">{t.contact.locationVal || "Pekanbaru, Riau, Indonesia"}</span>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="footer-col">
            <h4 className="footer-title">
              {lang === "id" ? "Profil Profesional" : "Professional Profiles"}
            </h4>
            <div className="footer-social-links">
              <a
                href="https://www.linkedin.com/in/dandi-pratama-5352ba3a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <img src={linkedin} alt="LinkedIn" className="social-icon-img" />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>
              <a
                href="https://github.com/DandiPratama2116"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <img src={git} alt="GitHub" className="social-icon-img" />
                <span>GitHub</span>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{t.footer.copy}</p>
          <button type="button" className="footer-back-to-top" onClick={scrollToTop}>
            <span>{lang === "id" ? "Kembali ke Atas" : "Back to Top"}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

