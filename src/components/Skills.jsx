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

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { Users, GitBranch, BrainCircuit, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ── Section title ──
      const sectionTitle = el.querySelector('.section-title');
      if (sectionTitle) {
        gsap.fromTo(sectionTitle,
          { opacity: 0, y: 28, skewX: -3 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: sectionTitle, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Section description/subtitle ──
      const sectionDesc = el.querySelector('.section-description, .section-subtitle, .section-desc');
      if (sectionDesc) {
        gsap.fromTo(sectionDesc,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, delay: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: sectionDesc, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Hub nodes from left ──
      const leftNodes = el.querySelectorAll('.hub-left .hub-node');
      const rightNodes = el.querySelectorAll('.hub-right .hub-node');
      const centerCard = el.querySelector('.hub-center-card');
      const hubTrigger = el.querySelector('.skills-hub-wrapper');

      if (leftNodes.length) {
        gsap.fromTo(leftNodes,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: hubTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
        // Animate node labels
        const leftLabels = el.querySelectorAll('.hub-left .hub-node .node-label, .hub-left .hub-node span');
        if (leftLabels.length) {
          gsap.fromTo(leftLabels,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.25, ease: 'power2.out',
              scrollTrigger: { trigger: hubTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
      }

      if (rightNodes.length) {
        gsap.fromTo(rightNodes,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: hubTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
        const rightLabels = el.querySelectorAll('.hub-right .hub-node .node-label, .hub-right .hub-node span');
        if (rightLabels.length) {
          gsap.fromTo(rightLabels,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.25, ease: 'power2.out',
              scrollTrigger: { trigger: hubTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
      }

      // ── Center card pop ──
      if (centerCard) {
        gsap.fromTo(centerCard,
          { opacity: 0, scale: 0.7, rotate: -4 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.8)',
            scrollTrigger: { trigger: hubTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
        // Center card inner text
        const centerTexts = centerCard.querySelectorAll('h3, p, span, .hub-title, .hub-sub');
        if (centerTexts.length) {
          gsap.fromTo(centerTexts,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out',
              scrollTrigger: { trigger: hubTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
      }

      // ── Team Skills Cards ──
      const teamCards = el.querySelectorAll('.team-skill-card');
      if (teamCards.length) {
        gsap.fromTo(teamCards,
          { opacity: 0, y: 40, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el.querySelector('.team-skills-grid'), start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
        // Card headings and text inside each team card
        teamCards.forEach((card) => {
          const texts = card.querySelectorAll('h3, h4, p, span:not(.icon-wrap)');
          if (texts.length) {
            gsap.fromTo(texts,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.2, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 87%', toggleActions: 'play none none reverse' }
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);


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

  const getTeamIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Users size={20} className="team-icon-svg" />;
      case 1:
        return <GitBranch size={20} className="team-icon-svg" />;
      case 2:
        return <BrainCircuit size={20} className="team-icon-svg" />;
      case 3:
      default:
        return <Clock size={20} className="team-icon-svg" />;
    }
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
    <section id="skills" ref={sectionRef} className="section skills-section">
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
          <div className="team-skills-header">
            <h3 className="sub-section-title">{t.skills.teamTitle}</h3>
          </div>
          <div className="team-skills-grid">
            {t.skills.team.map((item, idx) => (
              <div className="team-skill-card" key={idx}>
                <div className="team-skill-top">
                  <div className="team-skill-icon-box">
                    {getTeamIcon(idx)}
                  </div>
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
