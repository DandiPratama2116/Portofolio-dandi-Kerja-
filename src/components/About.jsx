import FoldText from '../fitur-gsap/FoldText';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useRef } from 'react';
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
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function About() {  
  const { lang, t } = useLanguage(); 
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ── Section title & tag ──
      const sectionTitle = el.querySelector('.section-title');
      if (sectionTitle) {
        gsap.fromTo(sectionTitle,
          { opacity: 0, y: 28, skewX: -3 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: sectionTitle, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── About text card ──
      const aboutTextCard = el.querySelector('.about-text-card');
      if (aboutTextCard) {
        gsap.fromTo(aboutTextCard,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: aboutTextCard, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Stats Cards staggered reveal ──
      const statCards = el.querySelectorAll('.about-stat-card');
      if (statCards.length) {
        gsap.fromTo(statCards,
          { opacity: 0, y: 35, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el.querySelector('.about-stats-grid'), start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Highlights Cards staggered ──
      const highlightCards = el.querySelectorAll('.highlight-card');
      if (highlightCards.length) {
        gsap.fromTo(highlightCards,
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el.querySelector('.about-highlights-grid'), start: 'top 85%', toggleActions: 'play none none reverse' }
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

      // ── Timeline entries (card + text) ──
      const timelineEntries = el.querySelectorAll('.timeline-entry');
      timelineEntries.forEach((entry, i) => {
        // Animate the whole card
        gsap.fromTo(entry,
          { opacity: 0, x: -40, },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: entry, start: 'top 87%', toggleActions: 'play none none reverse' }
          }
        );
        // Animate role title inside
        const role = entry.querySelector('.timeline-role');
        if (role) {
          gsap.fromTo(role,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: 'power2.out',
              scrollTrigger: { trigger: entry, start: 'top 87%', toggleActions: 'play none none reverse' }
            }
          );
        }
        // Animate tech stack tags
        const tags = entry.querySelectorAll('.timeline-tag');
        if (tags.length) {
          gsap.fromTo(tags,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, delay: 0.2, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: entry, start: 'top 87%', toggleActions: 'play none none reverse' }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, t]);


  const getHighlightIcon = (idx) => {
    if (idx === 0) return <GraduationCap size={20} className="highlight-icon-lucide" />;
    if (idx === 1) return <FileText size={20} className="highlight-icon-lucide" />;
    return <Award size={20} className="highlight-icon-lucide" />;
  };

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
        <div className="section-header">
          <h2 className="section-title">{t.about.title}</h2>
        </div>

        <div className="about-content">
          <div className="about-text-card">
            <p className="about-lead">
              <FoldText key={`para-${t.about.title}`} text={t.about.paragraph} splitBy="word" trigger="scroll" hinge="top" duration={0.6} stagger={0.012} />
            </p>
          </div>

          {/* Quick Key Metrics / Stats Row */}
          {t.about.stats && (
            <div className="about-stats-grid">
              {t.about.stats.map((stat, idx) => (
                <div className="about-stat-card" key={idx}>
                  <span className="stat-val">{stat.value}</span>
                  <span className="stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Strengths & Achievements Grid */}
          {t.about.highlights && (
            <div className="about-highlights-grid">
              {t.about.highlights.map((item, idx) => (
                <div className="highlight-card" key={idx}>
                  <div className="highlight-icon-wrap">
                    {getHighlightIcon(idx, item.icon)}
                  </div>
                  <div className="highlight-info">
                    <h3 className="highlight-title">{item.title}</h3>
                    <p className="highlight-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Work Experience Vertical Timeline */}
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
                            {idx === 0 && (
                              <span className="timeline-latest-chip">
                                <Sparkles size={12} />
                                <span>{lang === "id" ? "Terbaru" : "Latest"}</span>
                              </span>
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


