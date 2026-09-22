import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";
import banner1 from "../assets/bannerapk(proyek1).png";
import banner2 from "../assets/bannerAbsensiku(proyek2).png";
import banner3 from "../assets/banner(proyek3).png";
import banner4 from "../assets/bannnersioplas(proyek4).png";
import { Eye, X, ArrowUpRight, FolderGit2 } from "lucide-react";

const CATEGORIES = [
  { id: "Backend", key: "backend", defaultLabel: "Backend" },
  { id: "Full Stack Developer", key: "fullstack", defaultLabel: "Full Stack Developer"},
  { id: "AI Engineer", key: "ai", defaultLabel: "AI Engineer"},
  { id: "Mobile Developer", key: "mobile", defaultLabel: "Mobile Developer"},
];

function Projects() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsMeta = [
    {
      id: "eyemate",
      categories: ["AI Engineer", "Mobile Developer", "Backend", "Full Stack Developer"],
      tech: ["Python", "YOLOv8", "FastAPI", "Flutter", "SQLite", "Key-Gemini-Flash", "Ngrok"],
      color: "#2563eb",
      image: banner1,
    },
    {
      id: "absensiku",
      categories: ["Backend", "Mobile Developer"],
      tech: ["javascript", "Golang", "MySQL", "XAMPP"],
      color: "#0284c7",
      image: banner2,
    },
    {
      id: "kopi-kenangan",
      categories: ["Full Stack Developer"],
      tech: ["html", "css", "javascript"],
      color: "#059669",
      image: banner3,
    },
    {
      id: "sioplas",
      categories: ["Backend"],
      tech: ["Laravel", "php", "css", "Golang", "XAMPP", "MySQL"],
      color: "#d97706",
      image: banner4,
    },
  ];

  const allProjects = (t.projects.items || []).map((proj, idx) => {
    const meta = projectsMeta.find((m) => m.id === proj.id) || projectsMeta[idx] || projectsMeta[0];
    return {
      ...proj,
      meta,
    };
  });

  const getCategoryCount = (catId) => {
    if (catId === "all") return allProjects.length;
    return allProjects.filter((item) => item.meta.categories.includes(catId)).length;
  };

  const filteredProjects = activeCategory === "all"
    ? allProjects
    : allProjects.filter((item) => item.meta.categories.includes(activeCategory));

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.projects.title}</h2>
          {t.projects.subtitle && (
            <p className="section-subtitle">{t.projects.subtitle}</p>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="project-categories-wrapper">
          <div className="project-categories-bar" role="tablist" aria-label="Project Categories">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const label = cat.id === "all"
                ? (t.projects.allCategory || cat.defaultLabel)
                : (t.projects.categories?.[cat.key] || cat.defaultLabel);
              const count = getCategoryCount(cat.id);

              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  className={`category-btn ${isActive ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="category-btn-text">{label}</span>
                  <span className="category-btn-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty-state">
            <FolderGit2 size={32} className="empty-icon" />
            <p>{t.projects.emptyState || "Tidak ada proyek dalam kategori ini."}</p>
          </div>
        ) : (
          <div className="projects-grid" key={activeCategory}>
            {filteredProjects.map((item) => {
              const { meta } = item;
              return (
                <div className="project-card" key={item.id || item.title}>
                  <div className="project-card-left">
                    <div
                      className="project-banner-container clickable-banner"
                      onClick={() => setSelectedProject(item)}
                      title={lang === "id" ? "Klik untuk melihat detail proyek" : "Click to view project details"}
                    >
                      {meta.image ? (
                        <img src={meta.image} alt={item.title} className="project-banner-img" loading="lazy" />
                      ) : (
                        <div className="project-placeholder-wrap">
                          <FolderGit2 size={36} />
                        </div>
                      )}
                      <div className="banner-overlay-hint">
                        <Eye size={15} />
                        <span>{lang === "id" ? "Lihat Detail" : "View Details"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="project-card-right">
                    {/* Category badges */}
                    <div className="project-category-badges">
                      {meta.categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`project-category-badge ${activeCategory === cat ? "active-badge" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCategory(cat);
                          }}
                          title={`Filter: ${cat}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <h3
                      className="project-title clickable-title"
                      onClick={() => setSelectedProject(item)}
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight size={16} className="title-arrow-icon" />
                    </h3>
                    <p className="project-desc">{item.desc}</p>
                    
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
        )}
      </div>

      {/* Project Modal Popup */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              title="Tutup"
            >
              <X size={18} />
            </button>

            <div className="project-modal-media">
              {selectedProject.meta.image ? (
                <img
                  src={selectedProject.meta.image}
                  alt={selectedProject.title}
                  className="project-modal-img"
                />
              ) : (
                <div className="project-modal-placeholder">
                  <FolderGit2 size={48} />
                </div>
              )}
            </div>

            <div className="project-modal-info">
              <div className="project-category-badges" style={{ marginBottom: "12px" }}>
                {selectedProject.meta.categories.map((cat) => (
                  <span key={cat} className="project-category-badge active-badge">
                    {cat}
                  </span>
                ))}
              </div>

              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.desc}</p>

              <div className="project-modal-tech-section">
                <h4 className="tech-heading">{lang === "id" ? "Teknologi yang Digunakan" : "Technologies Used"}</h4>
                <div className="project-tech">
                  {selectedProject.meta.tech.map((tech) => (
                    <span className="tech-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;

