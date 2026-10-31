import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import DepthCarousel from "../fitur-gsap/DepthCarousel";
import { 
  X, 
  FolderGit2, 
  Layers, 
  Code2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Zap, 
  Smartphone, 
  Monitor, 
  Images, 
  Maximize2, 
  Eye,
  Camera,
  Award
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("project");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(null);
  const [modalActiveCaption, setModalActiveCaption] = useState("");
  const [modalTab, setModalTab] = useState("details"); // "details" | "gallery"
  const [isFullscreenPhoto, setIsFullscreenPhoto] = useState(false);
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
        { label: "Mobile App Screen", src: "/project dandi/EyeMate.png", type: "mobile", caption: "Antarmuka aplikasi mobile EyeMate pendeteksi objek real-time untuk tunanetra" },
        { label: "AI Object Detection", src: "/project dandi/EyeMate.png", type: "mobile", caption: "Deteksi objek real-time berbasis YOLOv8 terintegrasi panduan audio" }
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
        { label: "Mobile Login Screen", src: "/project dandi/Absensiku.png", type: "mobile", caption: "Tampilan autentikasi mobile sistem presensi Absensiku dengan Geo-tagging" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#ffffff",
    },
    {
      id: "Coffeshop-pku",
      categories: ["Full Stack Developer"],
      tech: ["React.Js", "Golang", "MySQL", "XAMPP"],
      color: "#b45309",
      gradient: "linear-gradient(135deg, #78350f, #d97706)",
      image: "/project dandi/Coffe-Shop.png",
      gallery: [
        { label: "Web Landing Page", src: "/project dandi/Coffe-Shop.png", type: "web", caption: "Landing page desktop coffee shop dan katalog menu makanan/minuman" },
        { label: "Mobile Order View", src: "/project dandi/CoffeShop-Order.png", type: "mobile", caption: "Tampilan responsif sistem pemesanan pesanan via smartphone" }
      ],
      fit: "cover",
      position: "top left",
      bg: "#1c140e",
    },
    {
      id: "sioplas",
      categories: ["Backend", "Web System"],
      tech: ["Laravel", "Golang", "XAMPP", "MySQL"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
      image: "/project dandi/Sioplas.png",
      gallery: [
        { label: "Portal Login KKP", src: "/project dandi/Sioplas.png", type: "web", caption: "Portal autentikasi sistem pelaporan triwulan Balai Karantina Perikanan Pekanbaru" }
      ],
      fit: "contain",
      position: "center",
      bg: "#ffffff",
      padding: "24px 16px",
    },
    {
      id: "webnesa",
      categories: ["Full Stack Developer", "Frontend"],
      tech: ["Laravel"],
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
      image: "/project dandi/WebNesa.png",
      gallery: [
        { label: "Agency Showcase", src: "/project dandi/WebNesa.png", type: "web", caption: "Showcase beranda agensi jasa pembuatan website dan teknologi WebNesa" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#0f172a",
    },
    {
      id: "kafe-shukufuku",
      categories: ["Frontend", "Web Landing Page"],
      tech: ["TypeScript (.tsx)", "React", "CSS3", "Responsive Design"],
      color: "#b47b48",
      gradient: "linear-gradient(135deg, #b47b48, #d4976a)",
      image: "/project dandi/Kafe-Shukufuku.png",
      gallery: [
        { label: "Halaman Web / Landing Page", src: "/project dandi/Kafe-Shukufuku.png", type: "web", caption: "Landing page minimalis khas Jepang Kafe Shukufuku Specialty Coffee" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#f8f6f0",
    },
    {
      id: "uiux-pertamina",
      categories: ["UI/UX Design", "System Design"],
      tech: ["Figma"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #2563eb)",
      image: "/project dandi/UI:UX Pertamina.png",
      gallery: [
        { label: "Portal CS & Chatbot Pertamina", src: "/project dandi/UI:UX Pertamina.png", type: "web", caption: "Rancangan antarmuka portal CS & Chatbot virtual PT Pertamina RU II Dumai" },
        { label: "Sertifikat Magang Pertamina", src: "/certificates/pertamina-internship.jpg", type: "web", caption: "Sertifikat resmi Praktik Kerja Lapangan (PKL) di PT Kilang Pertamina Internasional RU II Dumai" }
      ],
      fit: "cover",
      position: "top center",
      bg: "#0c1a2e",
    }
  ];

  // Foto Dokumentasi dari folder public/Dokumentasi Dandi
  const DOKUMENTASI_PHOTOS = useMemo(() => [
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.00.jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.00 (1).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01.jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (1).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (2).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (4).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (5).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (6).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (7).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (8).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (9).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (10).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (11).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (12).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (13).jpeg",
    "/Dokumentasi Dandi/WhatsApp Image 2026-10-31 at 17.35.01 (14).jpeg",
  ], []);

  // Membagi 17 foto ke dalam 4 kolom staggered seperti referensi gambar
  const docsColumns = useMemo(() => {
    const cols = [[], [], [], []];
    DOKUMENTASI_PHOTOS.forEach((src, idx) => {
      cols[idx % 4].push({ src, originalIndex: idx });
    });
    return cols;
  }, [DOKUMENTASI_PHOTOS]);

  const [docsLightboxIndex, setDocsLightboxIndex] = useState(null);

  const allProjects = useMemo(() => {
    return (t.projects?.items || []).map((proj, idx) => {
      const meta = projectsMeta.find((m) => m.id === proj.id) || projectsMeta[idx] || projectsMeta[0];
      return { ...proj, meta };
    });
  }, [t.projects]);

  // Carousel items untuk Project
  const carouselItems = useMemo(() => {
    return allProjects.map((p) => ({
      image: p.meta.image,
      alt: p.title,
      fit: p.meta.fit,
      position: p.meta.position,
      bg: p.meta.bg,
      padding: p.meta.padding,
    }));
  }, [allProjects]);

  const activeProject = allProjects[activeIndex] || allProjects[0] || null;

  // Handle category tab change
  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    setActiveIndex(0);
  };

  // Open modal with animation
  const openModal = useCallback((project, initialTab = "details") => {
    setModalProject(project);
    const initialImg = project.meta.image || project.meta.gallery?.[0]?.src || null;
    const initialCap = project.meta.gallery?.find((g) => g.src === initialImg)?.caption || "";
    setModalActiveImage(initialImg);
    setModalActiveCaption(initialCap);
    setModalTab(initialTab);
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
          setModalActiveCaption("");
          setIsFullscreenPhoto(false);
        },
      });
    } else {
      setIsModalVisible(false);
      setModalProject(null);
      setModalActiveImage(null);
      setModalActiveCaption("");
      setIsFullscreenPhoto(false);
    }
  }, []);

  // Photo switching in gallery tab
  const handleSelectGalleryPhoto = (photoItem) => {
    setModalActiveImage(photoItem.src);
    setModalActiveCaption(photoItem.caption || photoItem.label || "");
  };

  const currentGalleryIndex = useMemo(() => {
    if (!modalProject?.meta.gallery?.length) return 0;
    const idx = modalProject.meta.gallery.findIndex((g) => g.src === modalActiveImage);
    return idx >= 0 ? idx : 0;
  }, [modalProject, modalActiveImage]);

  const handlePrevPhoto = () => {
    if (!modalProject?.meta.gallery?.length) return;
    const gallery = modalProject.meta.gallery;
    const prevIdx = currentGalleryIndex <= 0 ? gallery.length - 1 : currentGalleryIndex - 1;
    handleSelectGalleryPhoto(gallery[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (!modalProject?.meta.gallery?.length) return;
    const gallery = modalProject.meta.gallery;
    const nextIdx = currentGalleryIndex >= gallery.length - 1 ? 0 : currentGalleryIndex + 1;
    handleSelectGalleryPhoto(gallery[nextIdx]);
  };

  // Keyboard navigation & ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (docsLightboxIndex !== null) {
          setDocsLightboxIndex(null);
        } else if (isFullscreenPhoto) {
          setIsFullscreenPhoto(false);
        } else if (isModalVisible) {
          closeModal();
        }
      } else if (docsLightboxIndex !== null) {
        if (e.key === "ArrowLeft") {
          setDocsLightboxIndex((prev) => (prev - 1 + DOKUMENTASI_PHOTOS.length) % DOKUMENTASI_PHOTOS.length);
        } else if (e.key === "ArrowRight") {
          setDocsLightboxIndex((prev) => (prev + 1) % DOKUMENTASI_PHOTOS.length);
        }
      }
    };
    if (isModalVisible || isFullscreenPhoto || docsLightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalVisible, isFullscreenPhoto, docsLightboxIndex, closeModal, DOKUMENTASI_PHOTOS.length]);

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

      // Filter bar animation
      const filterBar = el.querySelector(".projects-filter-bar");
      if (filterBar) {
        gsap.fromTo(
          filterBar,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: filterBar, start: "top 88%", toggleActions: "play none none reverse" },
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

        {/* Category Filter Pills Bar: Cukup 2 Kategori (Project, Dokumentasi) - LETAK DI TENGAH */}
        {t.projects?.categories && (
          <div className="projects-filter-wrapper">
            <div className="projects-two-tabs" role="tablist">
              {Object.entries(t.projects.categories).map(([key, label]) => {
                const count = key === "docs" ? DOKUMENTASI_PHOTOS.length : allProjects.length;

                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === key}
                    className={`project-filter-pill ${selectedCategory === key ? "is-active" : ""}`}
                    onClick={() => handleCategoryChange(key)}
                  >
                    {key === "docs" ? (
                      <Images size={15} className="filter-pill-icon" />
                    ) : (
                      <Layers size={15} className="filter-pill-icon" />
                    )}
                    <span>{label}</span>
                    <span className="filter-pill-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── KONTEN DOKUMENTASI VS PROJECT ── */}
        {selectedCategory === "docs" ? (
          <div className="docs-gallery-wrapper animate-fade-in">
            <div className="docs-gallery-grid">
              {DOKUMENTASI_PHOTOS.map((src, idx) => (
                <div
                  key={idx}
                  className="docs-photo-card"
                  onClick={() => setDocsLightboxIndex(idx)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={src}
                    alt="Dokumentasi"
                    className="docs-photo-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── TAMPILAN PROJECT: 3D DEPTH CAROUSEL + DETAIL PANEL ── */
          <div className="projects-split-layout">
            {/* LEFT — Depth Carousel */}
            <div className="projects-carousel-wrap">
              <div className="projects-carousel-inner">
                <DepthCarousel
                  key={`carousel-${selectedCategory}`}
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

                  {/* Header Row: Badges (kiri) & Counter (kanan) sejajar dan rapi */}
                  <div className="proj-detail-header-row">
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

                    <div className="proj-detail-counter">
                      <span className="counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
                      <span className="counter-sep">/</span>
                      <span className="counter-total">{String(allProjects.length).padStart(2, "0")}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="proj-detail-title">{activeProject.title}</h3>

                  {/* Desc */}
                  <p className="proj-detail-desc">{activeProject.desc}</p>

                  {/* Tech Stack */}
                  <div className="proj-detail-tech-wrap">
                    <div className="proj-detail-tech-label">
                      <Code2 size={13} />
                      <span>{lang === "id" ? "Teknologi & Fokus" : "Technologies & Focus"}</span>
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
                      onClick={() => openModal(activeProject, "details")}
                    >
                      <Layers size={15} />
                      <span>{lang === "id" ? "Lihat Detail" : "View Details"}</span>
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
            {/* Modal Top Bar */}
            <div className="modal-header-bar">
              {modalProject.id.startsWith("dokumentasi") ? (
                <div className="modal-header-title-simple">
                  <span className="gallery-koleksi-badge">
                    <Camera size={13} />
                    <span>{lang === "id" ? "Kumpulan Foto Dokumentasi" : "Photo Documentation"}</span>
                  </span>
                </div>
              ) : (
                <div className="modal-header-title-simple">
                  <span 
                    className="project-category-badge active-badge" 
                    style={{ 
                      borderColor: modalProject.meta.color + "55", 
                      color: modalProject.meta.color,
                      background: modalProject.meta.color + "12"
                    }}
                  >
                    {modalProject.meta.categories[0] || "Project"}
                  </span>
                </div>
              )}

              <button className="project-modal-close" onClick={closeModal} aria-label="Close" title="Tutup Modal (ESC)">
                <X size={18} />
              </button>
            </div>

            {/* IF CODING PROJECT: CLEAN DETAILS VIEW */}
            {!modalProject.id.startsWith("dokumentasi") && (
              <div className="modal-tab-body modal-tab-details animate-fade-in">
                {/* Modal Photo Media without extra borders */}
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
                        modalActiveImage.includes("Coffe-Shop.png") ||
                        modalActiveImage.includes("WebNesa.png") ||
                        modalActiveImage.includes("Kafe-Shukufuku.png") ||
                        modalActiveImage.includes("UI:UX Pertamina.png")
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

                {/* Quick view switcher if project has multiple screenshots */}
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
                        onClick={() => handleSelectGalleryPhoto(gItem)}
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
                        {lang === "id" ? "Fitur & Poin Utama" : "Key Highlights & Contributions"}
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

                  {/* Switch to gallery footer CTA */}
                  <div className="modal-footer-cta">
                    <button
                      type="button"
                      className="btn btn-secondary modal-open-gallery-btn"
                      onClick={() => setModalTab("gallery")}
                    >
                      <Images size={15} />
                      <span>{t.projects?.modalTabs?.allPhotos || "Kumpulan Foto & Galeri"}</span>
                      <span className="cta-gallery-count">{modalProject.meta.gallery?.length || 1}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: KUMPULAN FOTO & GALERI VIEW */}
            {modalTab === "gallery" && (
              <div className="modal-tab-body modal-tab-gallery animate-fade-in">
                {/* Gallery Stage Header Info */}
                <div className="gallery-stage-topbar">
                  <div className="gallery-stage-title-wrap">
                    <span className="gallery-koleksi-badge">
                      <Camera size={13} />
                      {t.projects?.modalTabs?.gallery || "Kumpulan Foto"}
                    </span>
                    <h3 className="gallery-current-label">
                      {modalProject.meta.gallery?.[currentGalleryIndex]?.label || modalProject.title}
                    </h3>
                  </div>

                  <div className="gallery-stage-actions">
                    <span className="gallery-counter-pill">
                      {lang === "id" 
                        ? `Foto ${currentGalleryIndex + 1} dari ${modalProject.meta.gallery?.length || 1}` 
                        : `Photo ${currentGalleryIndex + 1} of ${modalProject.meta.gallery?.length || 1}`}
                    </span>
                    <button
                      type="button"
                      className="gallery-btn-action"
                      onClick={() => setIsFullscreenPhoto(true)}
                      title={t.projects?.modalTabs?.viewFullscreen || "Perbesar"}
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Framed Photo Main Viewport */}
                <div 
                  className="modal-photo-stage framed-photo-media"
                  style={{ background: modalProject.meta.bg || "#05060a" }}
                >
                  {modalActiveImage ? (
                    <img
                      src={modalActiveImage}
                      alt={modalProject.meta.gallery?.[currentGalleryIndex]?.label || modalProject.title}
                      className="modal-photo-main-img"
                    />
                  ) : (
                    <div className="modal-photo-empty">
                      <Images size={48} />
                      <p>{lang === "id" ? "Foto tidak tersedia" : "No photo available"}</p>
                    </div>
                  )}

                  {/* Navigation Arrow Left / Right */}
                  {modalProject.meta.gallery?.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="modal-photo-nav-arrow arrow-prev"
                        onClick={handlePrevPhoto}
                        aria-label="Foto Sebelumnya"
                        title={t.projects?.modalTabs?.prevPhoto || "Foto Sebelumnya"}
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button
                        type="button"
                        className="modal-photo-nav-arrow arrow-next"
                        onClick={handleNextPhoto}
                        aria-label="Foto Selanjutnya"
                        title={t.projects?.modalTabs?.nextPhoto || "Foto Selanjutnya"}
                      >
                        <ChevronRight size={22} />
                      </button>
                    </>
                  )}

                  {/* Bottom accent gradient bar */}
                  <div
                    className="modal-color-bar"
                    style={{ background: modalProject.meta.gradient }}
                  />
                </div>

                {/* Photo Description / Caption */}
                {modalActiveCaption && (
                  <div className="modal-photo-caption-box">
                    <span className="caption-dot" style={{ background: modalProject.meta.color }} />
                    <p className="caption-text">{modalActiveCaption}</p>
                  </div>
                )}

                {/* Thumbnails Collection Grid / Strip */}
                <div className="modal-photo-thumbnails-section">
                  <div className="thumbnails-header">
                    <span className="thumbnails-header-title">
                      {lang === "id" ? "Pilih Foto / Screenshot:" : "Select Photo / Screenshot:"}
                    </span>
                    <span className="thumbnails-header-count">
                      {modalProject.meta.gallery?.length || 1} {t.projects?.modalTabs?.photoCount || "foto"}
                    </span>
                  </div>

                  <div className="modal-photo-thumbnails-grid">
                    {(modalProject.meta.gallery || []).map((photoItem, idx) => {
                      const isActive = modalActiveImage === photoItem.src;
                      return (
                        <div
                          key={idx}
                          className={`modal-thumb-card ${isActive ? "is-active" : ""}`}
                          onClick={() => handleSelectGalleryPhoto(photoItem)}
                        >
                          <div className="modal-thumb-img-wrap">
                            <img
                              src={photoItem.src}
                              alt={photoItem.label}
                              className="modal-thumb-img"
                              loading="lazy"
                            />
                            {isActive && (
                              <div className="modal-thumb-active-badge">
                                <Eye size={12} />
                              </div>
                            )}
                          </div>
                          <span className="modal-thumb-label">{photoItem.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FULLSCREEN LIGHTBOX FOR PHOTOS ── */}
      {isFullscreenPhoto && modalActiveImage && (
        <div className="modal-fullscreen-overlay" onClick={() => setIsFullscreenPhoto(false)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="fullscreen-close-btn"
              onClick={() => setIsFullscreenPhoto(false)}
              aria-label="Tutup Layar Penuh"
              title="Tutup (ESC)"
            >
              <X size={22} />
            </button>

            {modalProject?.meta.gallery?.length > 1 && (
              <>
                <button
                  type="button"
                  className="fullscreen-nav-btn prev"
                  onClick={handlePrevPhoto}
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  className="fullscreen-nav-btn next"
                  onClick={handleNextPhoto}
                  aria-label="Selanjutnya"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="fullscreen-image-wrapper">
              <img
                src={modalActiveImage}
                alt={modalProject?.title || "Foto Proyek"}
                className="fullscreen-img"
              />
            </div>

            {modalActiveCaption && (
              <div className="fullscreen-caption">
                <p>{modalActiveCaption}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LIGHTBOX DOKUMENTASI FULLSCREEN (MURNI FOTO, TANPA KETERANGAN) ── */}
      {docsLightboxIndex !== null && (
        <div className="docs-lightbox-overlay" onClick={() => setDocsLightboxIndex(null)}>
          <div className="docs-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="docs-lightbox-close"
              onClick={() => setDocsLightboxIndex(null)}
              aria-label="Tutup Layar Penuh"
              title="Tutup (ESC)"
            >
              <X size={24} />
            </button>

            {DOKUMENTASI_PHOTOS.length > 1 && (
              <>
                <button
                  type="button"
                  className="docs-lightbox-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDocsLightboxIndex((prev) => (prev - 1 + DOKUMENTASI_PHOTOS.length) % DOKUMENTASI_PHOTOS.length);
                  }}
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  type="button"
                  className="docs-lightbox-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDocsLightboxIndex((prev) => (prev + 1) % DOKUMENTASI_PHOTOS.length);
                  }}
                  aria-label="Selanjutnya"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="docs-lightbox-image-wrap">
              <img
                src={DOKUMENTASI_PHOTOS[docsLightboxIndex]}
                alt="Dokumentasi"
                className="docs-lightbox-img"
              />
            </div>

            <div className="docs-lightbox-counter">
              <span>{docsLightboxIndex + 1} / {DOKUMENTASI_PHOTOS.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;


