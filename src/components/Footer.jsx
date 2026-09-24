import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Mail, MapPin, ArrowUpRight, ArrowUp, Copy, Check } from "lucide-react";
import git from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

function Footer() {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const emailAddress = "dandipratamapku04@gmail.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="footer" id="footer">
      {/* Top subtle glow line */}
      <div className="footer-glow-line" aria-hidden="true"></div>

      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <div
              className="footer-logo-row"
              onClick={scrollToTop}
              role="button"
              tabIndex={0}
              title={lang === "id" ? "Kembali ke Atas" : "Back to Top"}
            >
              <div className="footer-logo-mark-wrap">
                <span className="logo-mark">D</span>
                <span className="logo-dot-glow"></span>
              </div>
              <h3 className="footer-logo">
                Dandi <span className="logo-accent">Pratama</span>
              </h3>
            </div>

            <p className="footer-tagline">
              Software Engineer • Backend & Full Stack Developer
            </p>
          </div>

          {/* Contact Details */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-title">
              {lang === "id" ? "Kontak" : "Contact"}
            </h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Mail size={15} className="footer-link-icon" />
                <a
                  href={`mailto:${emailAddress}`}
                  className="footer-text email-link"
                  title={lang === "id" ? "Kirim Email" : "Send Email"}
                >
                  {emailAddress}
                </a>
                <button
                  type="button"
                  className={`footer-copy-btn ${copied ? "copied" : ""}`}
                  onClick={handleCopyEmail}
                  title={
                    copied
                      ? lang === "id"
                        ? "Tersalin!"
                        : "Copied!"
                      : lang === "id"
                      ? "Salin Email"
                      : "Copy Email"
                  }
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check size={12} className="copy-icon-copied" />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </li>

              <li className="footer-link-item">
                <MapPin size={15} className="footer-link-icon" />
                <span className="footer-text">
                  {t.contact?.locationVal || "Pekanbaru, Riau, Indonesia"}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="footer-col footer-social-col">
            <h4 className="footer-title">
              {lang === "id" ? "Sosial" : "Social"}
            </h4>
            <div className="footer-social-links">
              <a
                href="https://www.linkedin.com/in/dandi-pratama-5352ba3a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-card"
                title="LinkedIn Profile"
              >
                <div className="footer-social-icon-box linkedin-box">
                  <img src={linkedin} alt="LinkedIn" className="social-icon-img" />
                </div>
                <div className="footer-social-info">
                  <span className="footer-social-platform">LinkedIn</span>
                </div>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>

              <a
                href="https://github.com/DandiPratama2116"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-card"
                title="GitHub Profile"
              >
                <div className="footer-social-icon-box github-box">
                  <img
                    src={git}
                    alt="GitHub"
                    className="social-icon-img github-icon-img"
                  />
                </div>
                <div className="footer-social-info">
                  <span className="footer-social-platform">GitHub</span>
                </div>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Dandi Pratama
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            title={lang === "id" ? "Kembali ke Atas" : "Back to Top"}
          >
            <span>{lang === "id" ? "Kembali ke Atas" : "Back to Top"}</span>
            <span className="back-to-top-icon-wrap">
              <ArrowUp size={14} className="back-to-top-arrow" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

