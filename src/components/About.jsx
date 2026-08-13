import FoldText from '../fitur-gsap/FoldText';
import { useLanguage } from '../context/LanguageContext';

function About({ scrollTo }) {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about-section">
      {/* Aesthetic Background Decor Shapes */}
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
        </div>
      </div>
    </section>
  );
}

export default About;
