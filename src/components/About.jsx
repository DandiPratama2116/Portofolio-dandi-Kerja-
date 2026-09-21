import FoldText from '../fitur-gsap/FoldText';
import { useLanguage } from '../context/LanguageContext';

function About({ scrollTo }) {  
  const { t } = useLanguage(); 

  return (
    <section id="about" className="section about-section">
      <div className="section-bg-decor">
        <div className="decor-blob about-blob-1"></div>
        <div className="decor-blob about-blob-2"></div>
        <div className="decor-grid-pattern"></div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header">
          <h2 className="section-title">{t.about.title}</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
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
                    <span className="highlight-icon">{item.icon}</span>
                  </div>
                  <div className="highlight-info">
                    <h3 className="highlight-title">{item.title}</h3>
                    <p className="highlight-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Work Experience Straight Line Timeline */}
          {t.about.experiences && (
            <div className="about-experience-section" id="experience">
              <div className="experience-header">
                <div className="experience-badge-pill">
                  <span className="pulse-dot"></span>
                  <span>{t.about.experienceBadge || "Pengalaman Kerja"}</span>
                </div>
                <h3 className="experience-heading">{t.about.experienceTitle || "Pengalaman Kerja"}</h3>
                {t.about.experienceSubtitle && (
                  <p className="experience-subheading">{t.about.experienceSubtitle}</p>
                )}
              </div>

              <div className="experience-timeline">
                {/* Continuous straight line */}
                <div className="timeline-straight-line" aria-hidden="true"></div>

                <div className="timeline-items-list">
                  {t.about.experiences.map((exp, idx) => (
                    <div className="timeline-item" key={idx}>
                      {/* Milestone Node on the Straight Line */}
                      <div className="timeline-node-wrapper">
                        <div className="timeline-node-dot">
                          <span className="timeline-node-icon">{exp.icon || "💼"}</span>
                        </div>
                        {idx === 0 && <span className="timeline-node-pulse" aria-hidden="true"></span>}
                      </div>

                      {/* Timeline Content Card */}
                      <div className="timeline-content-card">
                        <div className="timeline-card-header">
                          <div className="timeline-meta-top">
                            <span className="timeline-period-badge">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              {exp.period}
                            </span>
                            {exp.type && (
                              <span className="timeline-type-badge">{exp.type}</span>
                            )}
                          </div>

                          <h4 className="timeline-role-title">{exp.role}</h4>

                          <div className="timeline-company-info">
                            <span className="company-name">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                              </svg>
                              {exp.company}
                            </span>
                            {exp.location && (
                              <span className="company-location">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                  <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>

                        {exp.desc && (
                          <p className="timeline-card-desc">{exp.desc}</p>
                        )}

                        {exp.details && exp.details.length > 0 && (
                          <ul className="timeline-details-list">
                            {exp.details.map((detail, dIdx) => (
                              <li key={dIdx} className="timeline-detail-item">
                                <span className="detail-bullet-icon" aria-hidden="true">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {exp.skills && exp.skills.length > 0 && (
                          <div className="timeline-skills-wrap">
                            {exp.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="timeline-skill-pill">
                                {skill}
                              </span>
                            ))}
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
