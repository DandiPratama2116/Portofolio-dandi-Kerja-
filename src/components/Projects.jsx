import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import banner1 from "../assets/bannerapk(proyek1).png";
import banner2 from "../assets/bannerAbsensiku(proyek2).png";
import banner3 from "../assets/banner(proyek3).png";
import banner4 from "../assets/bannnersioplas(proyek4).png";


function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsMeta = [
    {
      tech: ["Python", "YOLOv8", "FastAPI", "Flutter", "SQLite","Key-Gemini-Flash","Ngrok"],
      color: "#aa3bff",
      image: banner1,
    },
    {
      tech: ["javascript", "Golang", "MySQL","XAMPP"],
      color: "#2563eb",
      image: banner2,
    },
    {
      tech: ["html", "css", "javascript"],
      color: "#10b981",
      image: banner3,
    },
    {
      tech: ["Laravel","php", "css", "Golang","XAMPP", "MySQL"],
      color: "#f59e0b",
      image: banner4,
    },
  ];

  return (
    <section id="projects" className="section projects-section">
      {/* Aesthetic Background Decor */}
      <div className="section-bg-decor">
        <div className="decor-blob projects-blob-1"></div>
        <div className="decor-blob projects-blob-2"></div>
        <div className="decor-grid-pattern"></div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header">
          <h2 className="section-title">{t.projects.title}</h2>
        </div>

        <div className="projects-grid">
          {t.projects.items.map((proj, idx) => {
            const meta = projectsMeta[idx] || projectsMeta[0];
            return (
              <div className="project-card" key={proj.title}>
                <div className="project-card-left">
                  <div 
                    className="project-banner-container clickable-banner" 
                    onClick={() => setSelectedProject({ proj, meta })}
                  >
                    {meta.image ? (
                      <img src={meta.image} alt={proj.title} className="project-banner-img" />
                    ) : (
                      <div
                        className="project-emoji-wrap"
                        style={{ background: `${meta.color}15`, borderColor: `${meta.color}30` }}
                      >
                        <span className="project-emoji">{meta.emoji}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="project-card-right">
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="project-tech">
                    {meta.tech.map((tech) => (
                      <span className="tech-tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Modal Popup */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>
            <div className="project-modal-media">
              {selectedProject.meta.image ? (
                <img src={selectedProject.meta.image} alt={selectedProject.proj.title} className="project-modal-img" />
              ) : (
                <div
                  className="project-modal-emoji"
                  style={{ background: `${selectedProject.meta.color}15`, borderColor: `${selectedProject.meta.color}30` }}
                >
                  <span className="project-emoji">{selectedProject.meta.emoji}</span>
                </div>
              )}
            </div>
            <div className="project-modal-info">
              <h2>{selectedProject.proj.title}</h2>
              <p>{selectedProject.proj.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
