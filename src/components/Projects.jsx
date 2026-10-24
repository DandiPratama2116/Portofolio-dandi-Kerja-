import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import DepthCarousel from "../fitur-gsap/DepthCarousel";
import { X, FolderGit2, Layers, Code2, ChevronRight, Sparkles, Zap, Smartphone, Monitor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sectionRef = useRef(null);
  const detailRef = useRef(null);
  const prevIndexRef = useRef(null);
  const modalContentRef = useRef(null);

  const projectsMeta = [
    {
      id: "eyemate",
      categories: ["AI Engineer", "Mobile Developer", "Backend", "Full Stack Developer"],
      tech: ["Python", "YOLOv8", "FastAPI", "Flutter", "SQLite", "Gemini-Flash", "Ngrok"],
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
      image: "/project dandi/EyeMate.png",
      gallery: [
        { label: "Mobile App Screen", src: "/project dandi/EyeMate.png", type: "mobile" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#181a20",
    },
    {
      id: "absensiku",
      categories: ["Backend", "Mobile Developer"],
      tech: ["JavaScript", "Golang", "MySQL", "XAMPP"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #06b6d4)",
      image: "/project dandi/Absensiku.png",
      gallery: [
        { label: "Mobile Login Screen", src: "/project dandi/Absensiku.png", type: "mobile" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#ffffff",
    },
    {
      id: "kopi-kenangan",
      categories: ["Full Stack Developer", "Frontend"],
      tech: ["HTML", "CSS", "JavaScript"],
      color: "#b45309",
      gradient: "linear-gradient(135deg, #78350f, #d97706)",
      image: "/project dandi/Coffe-Shop.png",
      gallery: [
        { label: "Web Landing Page", src: "/project dandi/Coffe-Shop.png", type: "web" },
        { label: "Mobile Order View", src: "/project dandi/CoffeShop-Order.png", type: "mobile" }
      ],
      fit: "cover",
      position: "top left",
      bg: "#1c140e",
    },
    {
      id: "sioplas",
      categories: ["Backend", "Web System"],
      tech: ["Laravel", "PHP", "CSS", "Golang", "XAMPP", "MySQL"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
      image: "/project dandi/Sioplas.png",
      gallery: [
        { label: "Portal Login KKP", src: "/project dandi/Sioplas.png", type: "web" }
      ],
      fit: "contain",
      position: "center",
      bg: "#ffffff",
      padding: "24px 16px",
    },
    {
      id: "webnesa",
      categories: ["Full Stack Developer", "Frontend"],
      tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
      image: "/project dandi/WebNesa.png",
      gallery: [
        { label: "Agency Showcase", src: "/project dandi/WebNesa.png", type: "web" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#0f172a",
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
    fit: p.meta.fit,
    position: p.meta.position,
    bg: p.meta.bg,
    padding: p.meta.padding,
  }));

  const activeProject = allProjects[activeIndex] || null;

  // Open modal with animation
  const openModal = useCallback((project) => {
    setModalProject(project);
    setModalActiveImage(project.meta.image);
    setIsModalVisible(true);
  }, []);

  // Close modal with animation
  const closeModal = useCallback(() => {
    const content = modalContentRef.current;
    if (content) {
      gsap.to(content, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setIsModalVisible(false);
          setModalProject(null);
          setModalActiveImage(null);
        },
      });
    } else {
      setIsModalVisible(false);
      setModalProject(null);
      setModalActiveImage(null);
    }
  }, []);

  // Modal entrance animation
  useEffect(() => {
    if (isModalVisible && modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.05 }
      );
    }
  }, [isModalVisible]);

  // Animate detail panel when active project changes
  useEffect(() => {
    const el = detailRef.current;
    if (!el || !activeProject) return;
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;

    // Animate the accent line color
    const accentLine = el.querySelector(".proj-detail-accent-line");
    if (accentLine) {
      gsap.to(accentLine, {
        background: activeProject.meta.gradient,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    gsap.fromTo(
      el,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
    );
    // Stagger inner elements
    const items = el.querySelectorAll(
      ".proj-detail-badge, .proj-detail-title, .proj-detail-desc, .proj-detail-tech-wrap, .proj-detail-cta, .proj-detail-counter"
    );
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.1, ease: "power3.out" }
    );
  }, [activeIndex, activeProject]);

  // Section entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Header animation
      const headerEl = el.querySelector(".projects-section-header");
      if (headerEl) {
        gsap.fromTo(
          headerEl,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: headerEl, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Carousel wrap
      const carouselWrap = el.querySelector(".projects-carousel-wrap");
      if (carouselWrap) {
        gsap.fromTo(
          carouselWrap,
          { opacity: 0, x: -60, rotateY: 5 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: carouselWrap, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Detail wrap
      const detailWrap = el.querySelector(".projects-detail-wrap");
      if (detailWrap) {
        gsap.fromTo(
          detailWrap,
          { opacity: 0, x: 60, rotateY: -5 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: detailWrap, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Floating orbs
      const orbs = el.querySelectorAll(".projects-floating-orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: `random(-20, 20)`,
          x: `random(-15, 15)`,
          duration: 4 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      {/* Floating ambient orbs */}
      <div className="projects-ambient-layer" aria-hidden="true">
        <div
          className="projects-floating-orb projects-orb-1"
          style={{ background: activeProject?.meta.gradient || "linear-gradient(135deg, #2563eb, #7c3aed)" }}
        />
        <div
          className="projects-floating-orb projects-orb-2"
          style={{ background: activeProject?.meta.gradient || "linear-gradient(135deg, #0284c7, #06b6d4)" }}
        />
      </div>

      <div className="container">
        {/* Header */}
        <div className="section-header projects-section-header">
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
                  cardWidth={290}
                  cardHeight={360}
                  radius={16}
                  depth={175}
                  spread={74}
                  tilt={18}
                  tiltDirection="right"
                  perspective={1200}
                  visibleCards={3}
                  falloff={0.22}
                  blur={4}
                  duration={650}
                  ease="power3.out"
                  autoplay
                  autoplayDelay={4000}
                  loop
                  showControls
                  showIndicators
                  onChange={(idx) => setActiveIndex(idx)}
                />
              </div>
              {/* Click hint */}
              <p className="carousel-hint">
                <Zap size={12} />
                {lang === "id"
                  ? "Geser atau klik panah untuk menelusuri proyek"
                  : "Swipe or click arrows to browse projects"}
              </p>
            </div>

            {/* RIGHT — Detail Panel (Glassmorphism) */}
            <div className="projects-detail-wrap">
              {activeProject ? (
                <div className="proj-detail-panel" ref={detailRef}>
                  {/* Accent gradient line */}
                  <div
                    className="proj-detail-accent-line"
                    style={{ background: activeProject.meta.gradient }}
                  />

                  {/* Project counter — top right */}
                  <div className="proj-detail-counter">
                    <span className="counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
                    <span className="counter-sep">/</span>
                    <span className="counter-total">{String(allProjects.length).padStart(2, "0")}</span>
                  </div>

                  {/* Category badges */}
                  <div className="proj-detail-badges">
                    {activeProject.meta.categories.map((cat) => (
                      <span
                        key={cat}
                        className="proj-detail-badge"
                        style={{ borderColor: activeProject.meta.color + "55", color: activeProject.meta.color }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="proj-detail-title">{activeProject.title}</h3>

                  {/* Desc */}
                  <p className="proj-detail-desc">{activeProject.desc}</p>

                  {/* Tech Stack */}
                  <div className="proj-detail-tech-wrap">
                    <div className="proj-detail-tech-label">
                      <Code2 size={13} />
                      <span>{lang === "id" ? "Teknologi" : "Tech Stack"}</span>
                    </div>
                    <div className="proj-detail-tags">
                      {activeProject.meta.tech.map((tech) => (
                        <span className="proj-detail-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="proj-detail-cta">
                    <button
                      className="btn btn-primary proj-detail-btn"
                      onClick={() => openModal(activeProject)}
                    >
                      <Layers size={15} />
                      <span>{lang === "id" ? "Lihat Selengkapnya" : "View Details"}</span>
                    </button>
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
      {modalProject && isModalVisible && (
        <div className="project-modal-backdrop" onClick={closeModal}>
          <div
            className="project-modal-content project-modal-v2"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="project-modal-close" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div
              className="project-modal-media"
              style={{
                background: modalProject.meta.bg || "var(--bg-subtle)",
              }}
            >
              {modalActiveImage ? (
                <img
                  src={modalActiveImage}
                  alt={modalProject.title}
                  className={`project-modal-img ${
                    modalActiveImage.includes("Coffe-Shop.png") || modalActiveImage.includes("WebNesa.png")
                      ? "is-landscape"
                      : "is-portrait"
                  }`}
                />
              ) : (
                <div className="project-modal-placeholder">
                  <FolderGit2 size={48} />
                </div>
              )}
              {/* Gradient accent bar */}
              <div
                className="modal-color-bar"
                style={{ background: modalProject.meta.gradient }}
              />
              <div className="modal-image-overlay" />
            </div>

            {/* Gallery view switcher if project has multiple screenshots */}
            {modalProject.meta.gallery?.length > 1 && (
              <div className="modal-gallery-switcher">
                <span className="gallery-switch-label">
                  {lang === "id" ? "Pilihan Tampilan:" : "Views:"}
                </span>
                {modalProject.meta.gallery.map((gItem, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-switch-btn ${modalActiveImage === gItem.src ? "active" : ""}`}
                    onClick={() => setModalActiveImage(gItem.src)}
                  >
                    {gItem.type === "mobile" ? <Smartphone size={13} /> : <Monitor size={13} />}
                    <span>{gItem.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Modal Info */}
            <div className="project-modal-info">
              {/* Category badges */}
              <div className="project-category-badges">
                {modalProject.meta.categories.map((cat) => (
                  <span
                    key={cat}
                    className="project-category-badge active-badge"
                    style={{
                      borderColor: modalProject.meta.color + "55",
                      color: modalProject.meta.color,
                      background: modalProject.meta.color + "12",
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <h2 className="modal-project-title">{modalProject.title}</h2>
              <p className="modal-project-desc">{modalProject.desc}</p>

              {/* Details list */}
              {modalProject.details?.length > 0 && (
                <div className="modal-details-list">
                  <h4 className="modal-section-label">
                    <Sparkles size={13} />
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
                  <Code2 size={13} />
                  {lang === "id" ? "Teknologi yang Digunakan" : "Technologies Used"}
                </h4>
                <div className="project-tech">
                  {modalProject.meta.tech.map((tech) => (
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

