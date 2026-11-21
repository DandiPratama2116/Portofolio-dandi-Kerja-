import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  FileText, 
  Briefcase, 
  Calendar, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Palette, 
  Award,
  Code2,
  Sparkles,
  Download,
  Rocket
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function About() {  
  const { lang, t } = useLanguage(); 
  const sectionRef = useRef(null);

  // Typewriter effect states matching reference headline
  const [typedText, setTypedText] = useState("");
  const [traitIndex, setTraitIndex] = useState(0);
  const [traitAnimClass, setTraitAnimClass] = useState("trait-anim-in");

  const traits = [
    "Problem Solver",
    "Clean Architecture",
    "Backend Specialist",
    "Fast Learner",
    "System Thinker"
  ];

  const handleNextTrait = () => {
    if (traitAnimClass === "trait-anim-out") return;
    setTraitAnimClass("trait-anim-out");
    setTimeout(() => {
      setTraitIndex((prev) => (prev + 1) % traits.length);
      setTraitAnimClass("trait-anim-in");
    }, 320);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTraitAnimClass("trait-anim-out");
      setTimeout(() => {
        setTraitIndex((prev) => (prev + 1) % traits.length);
        setTraitAnimClass("trait-anim-in");
      }, 320);
    }, 3400);

    return () => clearInterval(timer);
  }, [traits.length]);

  useEffect(() => {
    const phrases = [
        "Backend Engineer",
        "Software Developer",
        "API Architect",
        "Tech Enthusiast"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 1900);
          return;
        }
        timeoutId = setTimeout(type, 90);
      } else {
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutId = setTimeout(type, 450);
          return;
        }
        timeoutId = setTimeout(type, 45);
      }
    };

    timeoutId = setTimeout(type, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ── Section header ──
      const headerGroup = el.querySelector('.about-header-group');
      if (headerGroup) {
        gsap.fromTo(headerGroup,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: headerGroup, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Main Bento Card ──
      const bentoCard = el.querySelector('.about-bento-card');
      if (bentoCard) {
        gsap.fromTo(bentoCard,
          { opacity: 0, y: 32, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: bentoCard, start: 'top 86%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Experience heading ──
      const expHeading = el.querySelector('.experience-heading');
      const expSubheading = el.querySelector('.experience-subheading');
      if (expHeading) {
        gsap.fromTo(expHeading,
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: expHeading, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }
      if (expSubheading) {
        gsap.fromTo(expSubheading,
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.6, delay: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: expSubheading, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Timeline entries ──
      const timelineEntries = el.querySelectorAll('.timeline-entry');
      timelineEntries.forEach((entry) => {
        gsap.fromTo(entry,
          { opacity: 0, x: -35 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: entry, start: 'top 87%', toggleActions: 'play none none reverse' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, t]);

  const getExperienceIcon = (role, type, icon) => {
    const roleLower = (role || "").toLowerCase();
    const typeLower = (type || "").toLowerCase();

    if (roleLower.includes("backend") || roleLower.includes("developer") || icon === "💻") {
      return <Code2 size={18} />;
    }
    if (roleLower.includes("design") || typeLower.includes("design") || icon === "🎨") {
      return <Palette size={18} />;
    }
    return <Briefcase size={18} />;
  };

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        {/* Section Header matching reference: small tag on top + large typewriter headline */}
        <div className="section-header about-header-group">
          <div className="about-tag-badge">
            {lang === "id" ? "TENTANG SAYA" : "ABOUT ME"}
          </div>
          <h2 className="section-title about-typewriter-headline">
            <span className="headline-static">Problem Solver. </span>
            <span className="headline-dynamic">{typedText}</span>
            <span className="headline-cursor" aria-hidden="true">|</span>
          </h2>
        </div>

        <div className="about-content">
          {/* Main Container: Seamless background, no outer box border */}
          <div className="about-main-wrapper">
            {/* Subtle background ambient waves */}
            <div className="about-card-waves" aria-hidden="true">
              <svg viewBox="0 0 1200 360" preserveAspectRatio="none" className="about-waves-svg">
                <path d="M0,140 C320,260 460,50 740,160 C980,250 1080,70 1200,120 L1200,360 L0,360 Z" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.06" />
                <path d="M0,200 C280,90 500,290 800,110 C1020,10 1120,220 1200,180 L1200,360 L0,360 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.04" />
              </svg>
            </div>

            {/* Split Layout: Foto di Kiri, Teks & Stats di Samping (Kanan) */}
            <div className="about-split-layout">
              {/* Kolom Kiri: Foto Profil Lingkaran */}
              <div className="about-photo-col">
                <div className="about-avatar-wrapper">
                  <img
                    src="/fotowisuda.png"
                    alt="Dandi Pratama, S.T."
                    className="about-avatar-img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Kolom Kanan: Nama, Stats diatas teks, Paragraf teks, Unduh CV */}
              <div className="about-info-col">
                {/* Nama Lengkap + Verified Badge */}
                <div className="about-name-row">
                  <h3 className="about-name-text">DANDI PRATAMA, S.T.</h3>
                  <span className="about-verified-badge" title="Verified Professional" aria-label="Verified">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#2563eb" />
                      <path d="M7.5 12.2L10.5 15.2L16.5 9.2" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                {/* Stats Row diletakkan persis DI ATAS teks tentang */}
                <div className="about-stats-row">
                  <div className="about-stat-col">
                    <span className="stat-col-label">{lang === "id" ? "MASA STUDI" : "STUDY DURATION"}</span>
                    <span className="stat-col-val">&lt; 4 Thn</span>
                  </div>
                  <div className="about-stat-col">
                    <span className="stat-col-label">{lang === "id" ? "IPK (GPA)" : "GPA"}</span>
                    <span className="stat-col-val">3.46 / 4.00</span>
                  </div>
                  <div className="about-stat-col">
                    <span className="stat-col-label">{lang === "id" ? "PROYEK" : "PROJECTS"}</span>
                    <span className="stat-col-val">7+</span>
                  </div>
                  <div className="about-stat-col">
                    <span className="stat-col-label">{lang === "id" ? "SERTIFIKAT" : "CERTIFICATES"}</span>
                    <span className="stat-col-val">11+</span>
                  </div>
                </div>

                {/* Paragraf Teks Tentang di samping foto */}
                <div className="about-bio-wrap">
                  <p className="about-bio-text">
                    {t.about.paragraph}
                  </p>

                  {/* Unduh CV dengan border rapi */}
                  <div className="about-resume-row">
                    <a
                      href="/CV_DandiPratama_BE.pdf"
                      download="CV_DandiPratama_BE.pdf"
                      className="about-cv-bordered-btn"
                      title={lang === "id" ? "Unduh CV Dandi Pratama (PDF)" : "Download Resume (PDF)"}
                    >
                      <span>{lang === "id" ? "Unduh CV saya" : "Download my resume"}</span>
                      <Download size={14} className="cv-btn-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Baris Bawah: CURRENTLY di Kiri, Animated TRAIT di Kanan */}
            <div className="about-bottom-row">
              <div className="about-currently-block">
                <span className="currently-label">CURRENTLY</span>
                <div className="currently-items-grid">
                  <div className="currently-item">
                    <div className="currently-icon-box">
                      <Code2 size={16} />
                    </div>
                    <div className="currently-item-text">
                      <strong className="currently-title">Building</strong>
                      <span className="currently-desc">{lang === "id" ? "Backend APIs & Database Systems" : "Backend APIs & Database Systems"}</span>
                    </div>
                  </div>

                  <div className="currently-item">
                    <div className="currently-icon-box">
                      <Sparkles size={16} />
                    </div>
                    <div className="currently-item-text">
                      <strong className="currently-title">Exploring</strong>
                      <span className="currently-desc">{lang === "id" ? "Golang & RESTful API Development" : "Golang & RESTful API Development"}</span>
                    </div>
                  </div>

                  <div className="currently-item">
                    <div className="currently-icon-box">
                      <Rocket size={16} />
                    </div>
                    <div className="currently-item-text">
                      <strong className="currently-title">Learning</strong>
                      <span className="currently-desc">{lang === "id" ? "System Design & Cloud Deployment" : "System Design & Cloud Deployment"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trait Card dengan Animasi Masuk dan Keluar */}
              <div 
                className="about-trait-container" 
                onClick={handleNextTrait} 
                role="button" 
                tabIndex={0} 
                title={lang === "id" ? "Klik untuk ganti trait" : "Click to flip trait"}
              >
                <div className="trait-card-deck">
                  <div className="trait-back-card" aria-hidden="true"></div>
                  <div className={`trait-front-card ${traitAnimClass}`}>
                    <span className="trait-header-tag">TRAIT</span>
                    <h4 className="trait-title-text">{traits[traitIndex]}</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Highlights Strip */}
            {t.about.highlights && (
              <div className="about-highlights-strip">
                {t.about.highlights.map((item, idx) => (
                  <div className="highlight-pill-item" key={idx}>
                    <span className="highlight-pill-icon">{item.icon}</span>
                    <div className="highlight-pill-text">
                      <span className="highlight-pill-title">{item.title}</span>
                      <span className="highlight-pill-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Work Experience Vertical Timeline (Preserved) */}
          {t.about.experiences && (
            <div className="about-experience-section" id="experience">
              <div className="experience-header">
                <h3 className="experience-heading">{t.about.experienceTitle || "Pengalaman Kerja"}</h3>
                {t.about.experienceSubtitle && (
                  <p className="experience-subheading">{t.about.experienceSubtitle}</p>
                )}
              </div>

              <div className="timeline-container">
                <div className="timeline-spine" aria-hidden="true"></div>

                <div className="timeline-list">
                  {t.about.experiences.map((exp, idx) => (
                    <div className={`timeline-entry ${idx === 0 ? "is-latest" : ""}`} key={idx}>
                      {/* Timeline Left Rail: Milestone Node */}
                      <div className="timeline-milestone">
                        <div className="timeline-node-circle">
                          {getExperienceIcon(exp.role, exp.type, exp.icon)}
                        </div>
                        {idx === 0 && <span className="timeline-pulse-ring" aria-hidden="true"></span>}
                      </div>

                      {/* Timeline Main Card */}
                      <div className="timeline-card">
                        <div className="timeline-card-top">
                          <div className="timeline-badges-row">
                            <span className="timeline-period-chip">
                              <Calendar size={13} />
                              <span>{exp.period}</span>
                            </span>
                            {exp.type && (
                              <span className="timeline-type-chip">{exp.type}</span>
                            )}
                          </div>

                          <h4 className="timeline-role">{exp.role}</h4>

                          <div className="timeline-entity-row">
                            <span className="entity-company">
                              <Building2 size={15} />
                              <span>{exp.company}</span>
                            </span>
                            {exp.location && (
                              <span className="entity-location">
                                <MapPin size={14} />
                                <span>{exp.location}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {exp.desc && (
                          <p className="timeline-summary">{exp.desc}</p>
                        )}

                        {exp.details && exp.details.length > 0 && (
                          <div className="timeline-details-block">
                            <h5 className="timeline-details-title">
                              {lang === "id" ? "Tanggung Jawab & Kontribusi:" : "Key Responsibilities & Contributions:"}
                            </h5>
                            <ul className="timeline-bullets">
                              {exp.details.map((detail, dIdx) => (
                                <li key={dIdx} className="timeline-bullet-item">
                                  <CheckCircle2 size={15} className="bullet-check-icon" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {exp.skills && exp.skills.length > 0 && (
                          <div className="timeline-stack-row">
                            <span className="stack-label">Tech Stack:</span>
                            <div className="timeline-tags">
                              {exp.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="timeline-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;


