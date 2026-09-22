import FoldText from '../fitur-gsap/FoldText';
import { useLanguage } from '../context/LanguageContext';
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

function About() {  
  const { lang, t } = useLanguage(); 

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
    <section id="about" className="section about-section">
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


