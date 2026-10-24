import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import foto from "../assets/fotodandi.png";
import { useLanguage } from "../context/LanguageContext";
import { FileDown, ArrowRight, Terminal } from "lucide-react";

function Hero({ scrollTo }) {
  const { lang, t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Badge from top
      const badge = el.querySelector('.hero-badge');
      if (badge) {
        gsap.fromTo(badge,
          { opacity: 0, y: -18, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
        );
      }

      // Title with skew dramatic reveal
      const title = el.querySelector('.hero-title');
      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 40, skewX: -6 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.85, delay: 0.1, ease: 'power3.out' }
        );
      }

      // Title highlight word
      const highlight = el.querySelector('.hero-title-highlight');
      if (highlight) {
        gsap.fromTo(highlight,
          { opacity: 0, letterSpacing: '-0.12em' },
          { opacity: 1, letterSpacing: '-0.04em', duration: 0.7, delay: 0.3, ease: 'power2.out' }
        );
      }

      // Subtitle
      const subtitle = el.querySelector('.hero-subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.35, ease: 'power2.out' }
        );
      }

      // Meta row items
      const metaItems = el.querySelectorAll('.hero-meta-item');
      if (metaItems.length) {
        gsap.fromTo(metaItems,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, delay: 0.45, ease: 'power2.out' }
        );
      }

      // CTA buttons
      const buttons = el.querySelectorAll('.hero-buttons .btn');
      if (buttons.length) {
        gsap.fromTo(buttons,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, delay: 0.55, ease: 'back.out(1.5)' }
        );
      }

      // Profile card spring pop
      const rightCard = el.querySelector('.profile-card');
      if (rightCard) {
        gsap.fromTo(rightCard,
          { opacity: 0, y: 45, scale: 0.88, rotate: 2 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1, delay: 0.2, ease: 'back.out(1.6)' }
        );
        // Inner card elements stagger
        const cardInner = rightCard.querySelectorAll('.profile-spec-item, .avatar-frame, .profile-card-details');
        if (cardInner.length) {
          gsap.fromTo(cardInner,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.55, ease: 'power2.out' }
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, [lang, t]);


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
    <section id="home" ref={heroRef} className="hero">
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
                <div className="profile-card-title-wrap">
                  <Terminal size={12} className="card-terminal-icon" />
                  <span className="profile-card-title">developer_profile.ts</span>
                </div>
                <span className="profile-active-tag">● available</span>
              </div>

              <div className="profile-card-body">
                <div className="avatar-frame">
                  <img src={foto} alt="Dandi Pratama, S.T." className="avatar-photo" />
                </div>

                <div className="profile-card-details">
                  <div className="profile-spec-list">
                    <div className="profile-spec-item">
                      <span className="spec-label">{lang === "id" ? "Spesialisasi" : "Focus"}</span>
                      <span className="spec-value">Backend & Full Stack</span>
                    </div>
                    <div className="profile-spec-item">
                      <span className="spec-label">{lang === "id" ? "Pendidikan" : "Education"}</span>
                      <span className="spec-value">Teknik Informatika</span>
                    </div>
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

