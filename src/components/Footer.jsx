import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import git from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const emailAddress = "dandipratamapku04@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <h3 className="footer-logo">
              Dandi <span className="gradient-text">Pratama</span>
            </h3>
            <p className="footer-tagline">
              Software Engineer | Backend & Mobile Developer
            </p>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-title">Contact & Location</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-icon">📧</span>
                <span className="footer-text">{emailAddress}</span>
              </li>
              <li>
                <span className="footer-icon">📍</span>
                <span className="footer-text">{t.contact.locationVal}</span>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="footer-col">
            <h4 className="footer-title">Social Profiles</h4>
            <div className="footer-social-links">
              <a
                href="https://www.linkedin.com/in/dandi-pratama-5352ba3a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <img src={linkedin} alt="LinkedIn" className="social-icon-img" /> LinkedIn ↗
              </a>
              <a
                href="https://github.com/DandiPratama2116"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <img src={git} alt="GitHub" className="social-icon-img" /> GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">{t.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
