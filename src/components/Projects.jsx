import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import banner1 from "../assets/bannerapk(proyek1).png";
import banner2 from "../assets/bannerAbsensiku(proyek2).png";
import banner3 from "../assets/banner(proyek3).png";
import banner4 from "../assets/bannnersioplas(proyek4).png";
import DepthCarousel from "../fitur-gsap/DepthCarousel";
import { X, ArrowUpRight, FolderGit2, Layers, Code2, ExternalLink, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const sectionRef = useRef(null);
  const detailRef = useRef(null);
  const prevIndexRef = useRef(null);

  const projectsMeta = [
    {
      id: "eyemate",
      categories: ["AI Engineer", "Mobile Developer", "Backend", "Full Stack Developer"],
      tech: ["Python", "YOLOv8", "FastAPI", "Flutter", "SQLite", "Gemini-Flash", "Ngrok"],
      color: "#2563eb",
      image: banner1,
    },
    {
      id: "absensiku",
      categories: ["Backend", "Mobile Developer"],
      tech: ["JavaScript", "Golang", "MySQL", "XAMPP"],
      color: "#0284c7",
      image: banner2,
    },
    {
      id: "kopi-kenangan",
      categories: ["Full Stack Developer"],
      tech: ["HTML", "CSS", "JavaScript"],
      color: "#059669",
      image: banner3,
    },
    {
      id: "sioplas",
      categories: ["Backend"],
      tech: ["Laravel", "PHP", "CSS", "Golang", "XAMPP", "MySQL"],
      color: "#d97706",
      image: banner4,
    },
  ];

  const allProjects = (t.projects?.items || []).map((proj, idx) => {
    const meta = projectsMeta.find((m) => m.id === proj.id) || projectsMeta[idx] || projectsMeta[0];
    return { ...proj, meta };
  });

  // Carousel items
  const carouselItems = allProjects.map((p) => ({
    image: p.meta.image,
    alt: p.title,
    label: p.title,
  }));

  const activeProject = allProjects[activeIndex] || null;

  // Animate detail panel when active project changes
  useEffect(() => {
    const el = detailRef.current;
    if (!el || !activeProject) return;
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;

    gsap.fromTo(el,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }
    );
    // Stagger inner elements
    const items = el.querySelectorAll(".proj-detail-badge, .proj-detail-title, .proj-detail-desc, .proj-detail-tech-wrap, .proj-detail-cta");
    gsap.fromTo(items,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, delay: 0.08, ease: "power2.out" }
    );
  }, [activeIndex, activeProject]);

  // Section entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const sectionTitle = el.querySelector(".section-title");
      if (sectionTitle) {
        gsap.fromTo(sectionTitle,
          { opacity: 0, y: 28, skewX: -3 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: sectionTitle, start: "top 88%", toggleActions: "play none none reverse" }
          }
        );
      }
      const carouselWrap = el.querySelector(".projects-carousel-wrap");
      if (carouselWrap) {
        gsap.fromTo(carouselWrap,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: carouselWrap, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      }
      const detailWrap = el.querySelector(".projects-detail-wrap");
      if (detailWrap) {
        gsap.fromTo(detailWrap,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: detailWrap, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">{t.projects?.title}</h2>
          {t.projects?.subtitle && (
            <p className="section-subtitle">{t.projects.subtitle}</p>
          )}
        </div>

        {allProjects.length === 0 ? (
          <div className="projects-empty-state">
            <FolderGit2 size={32} className="empty-icon" />
            <p>{t.projects?.emptyState || "Tidak ada proyek."}</p>
          </div>
        ) : (
          <div className="projects-split-layout">
            {/* LEFT — Depth Carousel */}
            <div className="projects-carousel-wrap">
              <div className="projects-carousel-inner">
                <DepthCarousel
                  items={carouselItems}
                  cardWidth={280}
                  cardHeight={340}
                  depth={180}
                  spread={72}
                  tilt={20}
                  tiltDirection="right"
                  perspective={1200}
                  visibleCards={3}
                  falloff={0.22}
                  blur={5}
                  duration={650}
                  ease="power3.out"
                  autoplay
                  autoplayDelay={3800}
                  loop
                  showControls
                  showIndicators
                  onChange={(idx) => setActiveIndex(idx)}
                />
              </div>
              {/* Click hint */}
              <p className="carousel-hint">
                {lang === "id"
                  ? "← Geser atau klik panah untuk menelusuri proyek"
                  : "← Swipe or click arrows to browse projects"}
              </p>
            </div>

            {/* RIGHT — Detail Panel */}
            <div className="projects-detail-wrap">
              {activeProject ? (
                <div className="proj-detail-panel" ref={detailRef}>
                  {/* Category badges */}
                  <div className="proj-detail-badges">
                    {activeProject.meta.categories.map((cat) => (
                      <span key={cat} className="proj-detail-badge">{cat}</span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="proj-detail-title">{activeProject.title}</h3>

                  {/* Desc */}
                  <p className="proj-detail-desc">{activeProject.desc}</p>

                  {/* Tech Stack */}
                  <div className="proj-detail-tech-wrap">
                    <div className="proj-detail-tech-label">
                      <Code2 size={14} />
                      <span>{lang === "id" ? "Teknologi" : "Tech Stack"}</span>
                    </div>
                    <div className="proj-detail-tags">
                      {activeProject.meta.tech.map((tech) => (
                        <span className="proj-detail-tag" key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="proj-detail-cta">
                    <button
                      className="btn btn-primary proj-detail-btn"
                      onClick={() => setModalProject(activeProject)}
                    >
                      <Layers size={16} />
                      <span>{lang === "id" ? "Lihat Selengkapnya" : "View Details"}</span>
                    </button>
                  </div>

                  {/* Project counter */}
                  <div className="proj-detail-counter">
                    <span className="counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
                    <span className="counter-sep">/</span>
                    <span className="counter-total">{String(allProjects.length).padStart(2, "0")}</span>
                  </div>
                </div>
              ) : (
                <div className="proj-detail-empty">
                  <FolderGit2 size={36} />
                  <p>{lang === "id" ? "Pilih proyek dari carousel" : "Select a project from the carousel"}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL DETAIL ── */}
      {modalProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setModalProject(null)}
        >
          <div
            className="project-modal-content project-modal-v2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="project-modal-close"
              onClick={() => setModalProject(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="project-modal-media">
              {modalProject.meta.image ? (
                <img
                  src={modalProject.meta.image}
                  alt={modalProject.title}
                  className="project-modal-img"
                />
              ) : (
                <div className="project-modal-placeholder">
                  <FolderGit2 size={48} />
                </div>
              )}
              {/* Color accent bar */}
              <div
                className="modal-color-bar"
                style={{ background: modalProject.meta.color }}
              />
            </div>

            {/* Modal Info */}
            <div className="project-modal-info">
              {/* Category */}
              <div className="project-category-badges" style={{ marginBottom: "12px" }}>
                {modalProject.meta.categories.map((cat) => (
                  <span key={cat} className="project-category-badge active-badge">{cat}</span>
                ))}
              </div>

              <h2 className="modal-project-title">{modalProject.title}</h2>
              <p className="modal-project-desc">{modalProject.desc}</p>

              {/* Details list */}
              {modalProject.details?.length > 0 && (
                <div className="modal-details-list">
                  <h4 className="modal-section-label">
                    {lang === "id" ? "Fitur & Kontribusi" : "Features & Contributions"}
                  </h4>
                  <ul>
                    {modalProject.details.map((d, i) => (
                      <li key={i}>
                        <ChevronRight size={14} className="detail-icon" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech stack */}
              <div className="project-modal-tech-section">
                <h4 className="modal-section-label">
                  {lang === "id" ? "Teknologi yang Digunakan" : "Technologies Used"}
                </h4>
                <div className="project-tech">
                  {modalProject.meta.tech.map((tech) => (
                    <span className="tech-tag" key={tech}>{tech}</span>
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
