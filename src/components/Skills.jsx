import reactIcon from "../assets/reactjs.png";
import vueIcon from "../assets/vuejs.png";
import viteIcon from "../assets/Vite.js.png";
import flutterIcon from "../assets/flutter.png";
import pythonIcon from "../assets/python.png";
import jsIcon from "../assets/javascript.png";
import javaIcon from "../assets/java.png";
import golangIcon from "../assets/golong.png";
import fastApiIcon from "../assets/FastAPI.png";
import laravelIcon from "../assets/Laravel.png";
import mysqlIcon from "../assets/mysql.png";
import mongoIcon from "../assets/mongodb.png";
import dockerIcon from "../assets/Docker.png";
import xamppIcon from "../assets/xampp.png";

import { useLanguage } from "../context/LanguageContext";

function Skills() {
  const { t } = useLanguage();

  const leftSkills = [
    { name: "React", icon: reactIcon },
    { name: "Vue.js", icon: vueIcon },
    { name: "Vite", icon: viteIcon },
    { name: "Flutter", icon: flutterIcon },
    { name: "Python", icon: pythonIcon },
    { name: "JavaScript", icon: jsIcon },
    { name: "Java", icon: javaIcon },
    { name: "XAMPP", icon: xamppIcon },
  ];

  const rightSkills = [
    { name: "Golang", icon: golangIcon },
    { name: "FastAPI", icon: fastApiIcon },
    { name: "Laravel", icon: laravelIcon },
    { name: "MySQL", icon: mysqlIcon },
    { name: "MongoDB", icon: mongoIcon },
    { name: "Docker", icon: dockerIcon },
    { name: "SQLite", icon: "🗄️" },
    { name: "YOLOv8", icon: "🤖" },
  ];

  const renderIcon = (icon, name) => {
    if (typeof icon === "string" && (icon.includes("/") || icon.includes("."))) {
      return <img src={icon} alt={name} className="hub-node-icon-img" />;
    }
    return icon;
  };

  // SVG Paths definitions for skills
  const leftPaths = [
    "M 120 45 C 300 45, 350 262, 500 262",
    "M 120 107 C 300 107, 350 262, 500 262",
    "M 120 169 C 300 169, 350 262, 500 262",
    "M 120 231 C 300 231, 350 262, 500 262",
    "M 120 293 C 300 293, 350 262, 500 262",
    "M 120 355 C 300 355, 350 262, 500 262",
    "M 120 417 C 300 417, 350 262, 500 262",
    "M 120 479 C 300 479, 350 262, 500 262",
  ];

  const rightPaths = [
    "M 500 262 C 650 262, 700 45, 880 45",
    "M 500 262 C 650 262, 700 107, 880 107",
    "M 500 262 C 650 262, 700 169, 880 169",
    "M 500 262 C 650 262, 700 231, 880 231",
    "M 500 262 C 650 262, 700 293, 880 293",
    "M 500 262 C 650 262, 700 355, 880 355",
    "M 500 262 C 650 262, 700 417, 880 417",
    "M 500 262 C 650 262, 700 479, 880 479",
  ];

  return (
    <section id="skills" className="section skills-section">
      {/* Aesthetic Background Decor */}
      <div className="section-bg-decor">
        <div className="decor-blob skills-blob-1"></div>
        <div className="decor-blob skills-blob-2"></div>
        <div className="decor-grid-pattern"></div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header">
          <h2 className="section-title">{t.skills.title}</h2>
        </div>

        {/* Tech Stack Interactive Hub */}
        <div className="skills-hub-wrapper">
          <svg className="skills-connections-svg" preserveAspectRatio="none" viewBox="0 0 1000 524">
            {/* Left connection lines */}
            {leftPaths.map((pathD, idx) => (
              <g key={`left-${idx}`}>
                <path id={`path-left-${idx}`} d={pathD} className="hub-line" />
                {/* Glowing energy particle 1 */}
                <circle r="5" className="energy-particle">
                  <animateMotion
                    dur={`${4.5 + idx * 0.4}s`}
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>
                {/* Glowing energy particle 2 (staggered) */}
                <circle r="3.5" className="energy-particle particle-secondary">
                  <animateMotion
                    dur={`${4.5 + idx * 0.4}s`}
                    begin={`${2.25 + idx * 0.2}s`}
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>
              </g>
            ))}

            {/* Right connection lines (reverse direction towards center) */}
            {rightPaths.map((pathD, idx) => {
              const outerY = 45 + idx * 62;
              const reversePathD = `M 880 ${outerY} C 700 ${outerY}, 650 262, 500 262`;
              return (
                <g key={`right-${idx}`}>
                  <path id={`path-right-${idx}`} d={pathD} className="hub-line" />
                  {/* Glowing energy particle 1 */}
                  <circle r="5" className="energy-particle">
                    <animateMotion
                      dur={`${4.5 + idx * 0.4}s`}
                      repeatCount="indefinite"
                      path={reversePathD}
                    />
                  </circle>
                  {/* Glowing energy particle 2 (staggered) */}
                  <circle r="3.5" className="energy-particle particle-secondary">
                    <animateMotion
                      dur={`${4.5 + idx * 0.4}s`}
                      begin={`${2.25 + idx * 0.2}s`}
                      repeatCount="indefinite"
                      path={reversePathD}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          <div className="skills-hub-container">
            {/* Left Side Nodes */}
            <div className="hub-side hub-left">
              {leftSkills.map((skill) => (
                <div className="hub-node" key={skill.name} title={skill.name}>
                  <span className="hub-node-icon">{renderIcon(skill.icon, skill.name)}</span>
                  <span className="hub-node-name">{skill.name}</span>
                </div>
              ))}
            </div>

            {/* Center Node */}
            <div className="hub-center">
              <div className="hub-center-card">
                <span className="hub-center-text">Skills</span>
              </div>
            </div>

            {/* Right Side Nodes */}
            <div className="hub-side hub-right">
              {rightSkills.map((skill) => (
                <div className="hub-node" key={skill.name} title={skill.name}>
                  <span className="hub-node-icon">{renderIcon(skill.icon, skill.name)}</span>
                  <span className="hub-node-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keahlian Kerja & Kolaborasi Tim */}
        <div className="team-skills-wrapper">
          <h3 className="sub-section-title">{t.skills.teamTitle}</h3>
          <div className="team-skills-grid">
            {t.skills.team.map((item, idx) => (
              <div className="team-skill-card" key={idx}>
                <div className="team-skill-top">
                  <span className="team-skill-icon">{item.icon}</span>
                  <span className="team-skill-badge">{item.badge}</span>
                </div>
                <h4 className="team-skill-title">{item.title}</h4>
                <div className="team-skill-exp">
                  <span className="exp-label">{t.skills.expLabel}</span>
                  <span className="exp-value">{item.experience}</span>
                </div>
                <p className="team-skill-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
