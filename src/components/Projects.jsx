import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { 
  X, 
  FolderGit2, 
  Layers, 
  Code2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Maximize2, 
  Camera,
  Target,
  FileCheck2,
  ExternalLink
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(null);
  const [modalActiveCaption, setModalActiveCaption] = useState("");
  const [modalTab, setModalTab] = useState("details"); // "details" | "gallery"
  const [isFullscreenPhoto, setIsFullscreenPhoto] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const modalContentRef = useRef(null);

  // Mouse drag state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Foto Dokumentasi Terintegrasi
  const DOKUMENTASI_PHOTOS = useMemo(() => [
    "/Dokumentasi Dandi/(1Sioplas).jpeg",
    "/Dokumentasi Dandi/(2Sioplas).jpeg",
    "/Dokumentasi Dandi/(3Sioplas).jpeg",
    "/Dokumentasi Dandi/(1Eyemate).jpeg",
    "/Dokumentasi Dandi/(1Pertamina).jpeg",
    "/Dokumentasi Dandi/(Pertamina).jpeg",
    "/Dokumentasi Dandi/UX(Pertamina).jpeg",
    "/Dokumentasi Dandi/Project(1Absensiku).jpeg",
    "/Dokumentasi Dandi/Project(Absensiku).jpeg",
  ], []);

  const galleryItems = [
  {
    src: "/Dokumentasi Dandi/(1Sioplas).jpeg",
    tag: "Backend Development",
    title: "Pengembangan Sistem SIOPLAS",
    caption: "Dokumentasi pengembangan backend dan sistem pelaporan operasional SIOPLAS di Balai Karantina."
  },
  {
    src: "/Dokumentasi Dandi/(2Sioplas).jpeg",
    tag: "System Development",
    title: "Implementasi Sistem SIOPLAS",
    caption: "Dokumentasi proses implementasi fitur dan pengembangan sistem informasi SIOPLAS."
  },
  {
    src: "/Dokumentasi Dandi/(3Sioplas).jpeg",
    tag: "Team Collaboration",
    title: "Kolaborasi Proyek SIOPLAS",
    caption: "Dokumentasi kolaborasi dan koordinasi tim dalam pengembangan aplikasi SIOPLAS."
  },
  {
    src: "/Dokumentasi Dandi/(1Eyemate).jpeg",
    tag: "AI Development",
    title: "Pengembangan Aplikasi EyeMate",
    caption: "Dokumentasi pengembangan aplikasi mobile berbasis AI untuk membantu penyandang gangguan penglihatan."
  },
  {
    src: "/Dokumentasi Dandi/(1Pertamina).jpeg",
    tag: "Industrial Internship",
    title: "Dokumentasi Magang Pertamina",
    caption: "Pengalaman praktik kerja lapangan di PT Kilang Pertamina Internasional RU II Dumai."
  },
  {
    src: "/Dokumentasi Dandi/(Pertamina).jpeg",
    tag: "Field Observation",
    title: "Observasi Operasional Kilang",
    caption: "Dokumentasi kegiatan observasi lingkungan kerja dan operasional di lingkungan kilang Pertamina."
  },
  {
    src: "/Dokumentasi Dandi/UX(Pertamina).jpeg",
    tag: "UI/UX Design",
    title: "Perancangan UI/UX Pertamina",
    caption: "Dokumentasi perancangan prototype antarmuka chatbot untuk mendukung sistem pelaporan internal."
  },
  {
    src: "/Dokumentasi Dandi/Project(1Absensiku).jpeg",
    tag: "Mobile Development",
    title: "Pengembangan Absensiku",
    caption: "Dokumentasi pengembangan aplikasi presensi mobile dengan fitur pencatatan dan verifikasi lokasi."
  },
  {
    src: "/Dokumentasi Dandi/Project(Absensiku).jpeg",
    tag: "Application Testing",
    title: "Implementasi Aplikasi Absensiku",
    caption: "Dokumentasi implementasi dan pengujian fungsionalitas aplikasi presensi."
  }
  ];

  // Metadata Project dengan Hierarki Ukuran & Dokumentasi Terintegrasi
  const projectsMeta = useMemo(() => [
    {
      id: "eyemate",
      size: "large",
      sizeLabel: "Featured • AI & Mobile",
      categories: ["AI Engineer", "Mobile Developer", "Backend", "Full Stack"],
      tech: ["Python", "YOLOv8", "FastAPI", "Flutter", "SQLite", "Gemini-Flash", "Ngrok"],
      color: "#2563eb",
      gradient: "linear-gradient(135deg, #2563eb, #7c3aed)",
      image: "/project dandi/EyeMate.png",
      gallery: [
        {
          label: "Pengembangan Aplikasi EyeMate",
          src: "/Dokumentasi Dandi/(1Eyemate).jpeg",
          type: "photo",
          caption: "Dokumentasi pengembangan aplikasi mobile EyeMate berbasis AI untuk membantu penyandang gangguan penglihatan melalui teknologi pengenalan objek dan panduan suara."
        },
        {
          label: "Testing",
          src: "/Dokumentasi Dandi/(2Eyemate).jpeg",
          type: "mobile",
          caption: "Melakukan testing pada aplikasi EyeMate untuk memastikan fungsionalitas berjalan dengan baik."
        },
        {
          label: "Dokumentasi Aplikasi tersedia di Ios/Android",
          src: "/Dokumentasi Dandi/(3Eyemate).jpeg",
          type: "photo",
          caption: "Membuktikan bahwa aplikasi EyeMate tersedia di Ios dan Android."
        },
      ],
      problem: "Penyandang gangguan penglihatan sering menghadapi hambatan dalam mengenali objek di sekitarnya secara mandiri dan cepat.",
      goal: "Membangun asisten cerdas mobile berbasis model YOLOv8 dan FastAPI yang memberikan panduan suara dan teks secara real-time.",
      fit: "cover",
      bg: "#181a20",
    },
    {
      id: "absensiku",
      size: "medium",
      sizeLabel: "Mobile & Geolocation",
      categories: ["Backend Developer", "Mobile Developer"],
      tech: ["JavaScript", "Golang", "MySQL", "XAMPP", "Geolocation"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #06b6d4)",
      image: "/project dandi/Absensiku.png",
      gallery: [
        { 
          label: "Menentukan Alur", 
          src: "/Dokumentasi Dandi/Project(Absensiku).jpeg", 
          type: "photo", 
          caption: "Menentukan alur dan alur kerja sistem presensi Absensiku" 
        },
        { 
          label: "Dokumentasi", 
          src: "/Dokumentasi Dandi/Project(1Absensiku).jpeg", 
          type: "photo", 
          caption: "Mendokumentasikan proses pembuatan project Absensiku" 
        },
      ],
      problem: "Pencatatan presensi konvensional sulit memvalidasi kehadiran staf di lokasi kerja secara real-time.",
      goal: "Menyediakan aplikasi presensi mobile berbasis koordinat geolokasi dengan backend API cepat menggunakan Go.",
      fit: "cover",
      bg: "#ffffff",
    },
    {
      id: "Coffeshop-pku",
      size: "medium",
      sizeLabel: "Full Stack • Ordering System",
      categories: ["Full Stack Developer", "Web System"],
      tech: ["React.Js", "Golang", "MySQL", "XAMPP", "REST API"],
      color: "#b45309",
      gradient: "linear-gradient(135deg, #78350f, #d97706)",
      image: "/project dandi/Coffe-Shop.png",
      gallery: [
      ],
      problem: "Pelanggan coffee shop sering menghadapi antrean panjang dalam pemesanan saat jam sibuk.",
      goal: "Membangun sistem pemesanan responsif berbasis React dan backend Golang untuk mempercepat transaksi.",
      fit: "cover",
      bg: "#1c140e",
    },
    {
      id: "sioplas",
      size: "large",
      sizeLabel: "Featured • Backend & Capstone",
      categories: ["Backend Developer", "Web System", "Capstone Project"],
      tech: ["Laravel", "Golang", "XAMPP", "MySQL", "RESTful API"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
      image: "/project dandi/Sioplas.png",
      gallery: [
        { 
          label: "Uji Validasi Backend & API", 
          src: "/Dokumentasi Dandi/(3Sioplas).jpeg", 
          type: "photo", 
          caption: "Demonstrasi dan validasi modul backend API bersama tim penguji" 
        },
        { 
          label: "Proses Proyek SIOPLAS", 
          src: "/Dokumentasi Dandi/(1Sioplas).jpeg", 
          type: "photo", 
          caption: "Laporan proses project SIOPLAS" 
        },
        { 
          label: "Proses dalam pembuatan Backend", 
          src: "/Dokumentasi Dandi/(2Sioplas).jpeg", 
          type: "web", 
          caption: "Laporan proses pembuatan backend" 
        },
      ],
      problem: "Proses rekapitulasi data penugasan dan pelaporan operasional sebelumnya memerlukan pencatatan manual yang rentan redundansi.",
      goal: "Mengembangkan backend API yang andal dan terstruktur menggunakan Go (Golang) dan MySQL untuk otomasi alur kerja data.",
      fit: "contain",
      bg: "#ffffff",
      padding: "24px 16px",
    },
    {
      id: "webnesa",
      size: "small",
      sizeLabel: "Agency • Web Showcase",
      categories: ["Full Stack Developer", "Frontend"],
      tech: ["Laravel", "Blade", "Bootstrap", "MySQL"],
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
      image: "/project dandi/WebNesa.png",
      gallery: [
      ],
      problem: "Calon klien agensi membutuhkan kemudahan dalam meninjau portofolio layanan dan paket penawaran pembuatan website.",
      goal: "Merancang portal agensi yang terstruktur dengan navigasi intuitif untuk konversi prospek.",
      fit: "cover",
      bg: "#0f172a",
    },
    {
      id: "kafe-shukufuku",
      size: "small",
      sizeLabel: "Frontend • Specialty Web",
      categories: ["Frontend", "Web Landing Page"],
      tech: ["TypeScript (.tsx)", "React", "CSS3", "Responsive Design"],
      color: "#b47b48",
      gradient: "linear-gradient(135deg, #b47b48, #d4976a)",
      image: "/project dandi/Kafe-Shukufuku.png",
      gallery: [
      ],
      problem: "Brand kuliner specialty membutuhkan representasi digital yang mencerminkan estetika otentik dan ketenangan visual.",
      goal: "Mengembangkan landing page interaktif dengan TypeScript dan CSS modern yang responsif di seluruh layar.",
      fit: "cover",
      bg: "#f8f6f0",
    },
    {
      id: "uiux-pertamina",
      size: "medium",
      sizeLabel: "System Design • Internship",
      categories: ["UI/UX Design", "System Design", "Internship"],
      tech: ["Figma", "Design System", "Chatbot UI", "Prototyping"],
      color: "#0284c7",
      gradient: "linear-gradient(135deg, #0284c7, #2563eb)",
      image: "/project dandi/UI:UX Pertamina.png",
      gallery: [
        { 
          label: "Observasi Fasilitas Kilang Pertamina", 
          src: "/Dokumentasi Dandi/(Pertamina).jpeg", 
          type: "photo", 
          caption: "Observasi operasional dan fasilitas di PT Kilang Pertamina Internasional RU II Dumai" 
        },
        { 
          label: "Magang PT Pertamina RU II Dumai", 
          src: "/Dokumentasi Dandi/(1Pertamina).jpeg", 
          type: "photo", 
          caption: "Sertifikat resmi Praktik Kerja Lapangan (PKL) di PT Kilang Pertamina Internasional RU II Dumai" 
        },
        { 
          label: "Rancangan Portal Chatbot Figma", 
          src: "/Dokumentasi Dandi/UX(Pertamina).jpeg", 
          type: "photo", 
          caption: "Rancangan antarmuka portal CS & Chatbot virtual PT Pertamina RU II Dumai" 
        },
      ],
      problem: "Departemen fasilitas kilang membutuhkan alur pelaporan insiden dan kebutuhan logistik yang cepat tanpa hambatan birokrasi manual.",
      goal: "Merancang antarmuka website berbasis chatbot virtual di Figma dengan usability tinggi untuk operasional internal.",
      fit: "cover",
      bg: "#0c1a2e",
    }
  ], [DOKUMENTASI_PHOTOS]);

  const allProjects = useMemo(() => {
    return (t.projects?.items || []).map((proj, idx) => {
      const meta = projectsMeta.find((m) => m.id === proj.id) || projectsMeta[idx] || projectsMeta[0];
      return { ...proj, meta };
    });
  }, [t.projects, projectsMeta]);

  // Open modal with initial tab
  const openModal = useCallback((project, initialTab = "details") => {
    setModalProject(project);
    const initialImg = project.meta.image || project.meta.gallery?.[0]?.src || null;
    const initialCap = project.meta.gallery?.find((g) => g.src === initialImg)?.caption || "";
    setModalActiveImage(initialImg);
    setModalActiveCaption(initialCap);
    setModalTab(initialTab);
    setIsModalVisible(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    const content = modalContentRef.current;
    if (content) {
      gsap.to(content, {
        opacity: 0,
        y: 24,
        scale: 0.96,
        duration: 0.2,
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
        if (isFullscreenPhoto) {
          setIsFullscreenPhoto(false);
        } else if (isModalVisible) {
          closeModal();
        }
      }
    };
    if (isModalVisible || isFullscreenPhoto) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalVisible, isFullscreenPhoto, closeModal]);

  // Modal entrance animation
  useEffect(() => {
    if (isModalVisible && modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    }
  }, [isModalVisible]);

  // Section entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const headerEl = el.querySelector(".projects-section-header");
      if (headerEl) {
        gsap.fromTo(
          headerEl,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: headerEl, start: "top 88%", toggleActions: "play none none reverse" },
          }
        );
      }

      const sliderWrap = el.querySelector(".projects-gallery-slider-wrap");
      if (sliderWrap) {
        gsap.fromTo(
          sliderWrap,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: sliderWrap, start: "top 86%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  // Slider Mouse Drag Handlers
  const handleMouseDown = (e) => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
    slider.classList.add("is-dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const slider = sliderRef.current;
    if (!slider) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    slider.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDraggingRef.current = false;
    slider.classList.remove("is-dragging");
  };

  // Slider Scroll Listener to update activeIndex accurately
  const handleSliderScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = slider.querySelectorAll(".project-showcase-card");
    if (!cards.length) return;

    const sliderRect = slider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(sliderCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  // Slider Arrow Navigation - Menuju ke Card Tengah
  const scrollToCard = useCallback((index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = slider.querySelectorAll(".project-showcase-card");
    const targetCard = cards[index];
    if (targetCard) {
      const cardOffsetLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const sliderWidth = slider.clientWidth;
      const targetScrollLeft = cardOffsetLeft - (sliderWidth - cardWidth) / 2;
      slider.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  }, []);

  const handlePrevSlide = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1);
    } else {
      scrollToCard(allProjects.length - 1);
    }
  };

  const handleNextSlide = () => {
    if (activeIndex < allProjects.length - 1) {
      scrollToCard(activeIndex + 1);
    } else {
      scrollToCard(0);
    }
  };

  // Project yang sedang aktif / berada di tengah
  const activeProject = useMemo(() => {
    return allProjects[activeIndex] || allProjects[0];
  }, [allProjects, activeIndex]);

  // Dokumentasi foto yang sesuai dengan project yang sedang aktif/tengah
  const activeProjectDocs = useMemo(() => {
    if (!activeProject?.meta?.gallery) return [];
    return activeProject.meta.gallery;
  }, [activeProject]);

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      {/* Floating ambient orbs */}
      <div className="projects-ambient-layer" aria-hidden="true">
        <div className="projects-floating-orb projects-orb-1" />
        <div className="projects-floating-orb projects-orb-2" />
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="section-header projects-section-header">
          <h2 className="section-title">
            {lang === "id" ? "Project & Dokumentasi" : "Projects & Documentation"}
          </h2>
          <p className="section-subtitle">
            {lang === "id"
              ? "Geser atau pilih project di bawah untuk melihat detail serta dokumentasi pengerjaannya."
              : "Scroll or select a project below to explore details and matching work documentation."}
          </p>
        </div>

        {/* ── PROJECT SHOWCASE GALLERY SLIDER (LAYOUT PERSIS REFERENSI) ── */}
        <div className="projects-gallery-slider-wrap">
          {/* Floating Blue Circular Arrow Button Left */}
          <button
            type="button"
            className="proj-float-nav-btn prev"
            onClick={handlePrevSlide}
            aria-label="Previous Project"
            title={lang === "id" ? "Proyek Sebelumnya" : "Previous Project"}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scrollable Gallery Track */}
          <div 
            className="projects-gallery-track" 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onScroll={handleSliderScroll}
          >
            {allProjects.map((proj, idx) => (
              <div 
                key={proj.id}
                className={`project-showcase-card ${activeIndex === idx ? "is-active-center" : ""}`}
                onClick={() => {
                  if (!hasDraggedRef.current) scrollToCard(idx);
                }}
              >
                {/* 1. Gambar Preview Project */}
                <div 
                  className="proj-card-media"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasDraggedRef.current) openModal(proj, "details");
                  }}
                  role="button"
                  tabIndex={0}
                  title={lang === "id" ? "Klik untuk melihat detail" : "Click to view details"}
                >
                  <img 
                    src={proj.meta.image} 
                    alt={proj.title} 
                    className="proj-card-img" 
                    loading="lazy" 
                  />
                  {activeIndex === idx && (
                    <div className="active-center-badge">
                      <Sparkles size={11} />
                      <span>Active Project</span>
                    </div>
                  )}
                </div>

                {/* 2. Card Content Under Preview */}
                <div className="proj-card-body">
                  <h3 className="proj-card-title">{proj.title}</h3>
                  <p className="proj-card-desc">{proj.desc}</p>

                  <button
                    type="button"
                    className="btn-card-detail"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(proj, "details");
                    }}
                  >
                    <span>Details</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Blue Circular Arrow Button Right */}
          <button
            type="button"
            className="proj-float-nav-btn next"
            onClick={handleNextSlide}
            aria-label="Next Project"
            title={lang === "id" ? "Proyek Selanjutnya" : "Next Project"}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* ── FOTO-FOTO DOKUMENTASI SESUAI NAMA PROJECT YANG AKTIF (HANYA GAMBAR) ── */}
        {activeProjectDocs && activeProjectDocs.length > 0 && (
          <div className="projects-docs-section">
            {/* Grid Foto Dokumentasi Sesuai Project */}
            <div key={activeProject?.id || activeIndex} className="docs-photos-grid docs-grid-animated">
              {activeProjectDocs.map((item, idx) => (
                <div
                  key={idx}
                  className="docs-photo-card"
                  onClick={() => {
                    setModalActiveImage(item.src);
                    setModalActiveCaption(item.caption || item.label);
                    setIsFullscreenPhoto(true);
                  }}
                  role="button"
                  tabIndex={0}
                  title={item.caption || item.label}
                >
                  <img src={item.src} alt={item.label || item.caption} className="docs-photo-img" loading="lazy" />
                  <div className="docs-photo-overlay">
                    <h4 className="docs-photo-title">{item.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL DETAIL & DOKUMENTASI TERINTEGRASI ── */}
      {modalProject && isModalVisible && (
        <div className="project-modal-backdrop" onClick={closeModal}>
          <div
            className="project-modal-content project-modal-v3"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="modal-header-bar">
              {/* Modal Tabs Switcher */}
              <div className="modal-tabs-pill" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={modalTab === "details"}
                  className={`modal-tab-btn ${modalTab === "details" ? "is-active" : ""}`}
                  onClick={() => setModalTab("details")}
                >
                  <Layers size={14} />
                  <span>{lang === "id" ? "Overview & Detail" : "Overview & Details"}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={modalTab === "gallery"}
                  className={`modal-tab-btn ${modalTab === "gallery" ? "is-active" : ""}`}
                  onClick={() => setModalTab("gallery")}
                >
                  <Camera size={14} />
                  <span>{lang === "id" ? "Dokumentasi Foto" : "Photo Docs"}</span>
                  <span className="modal-tab-count">{modalProject.meta.gallery?.length || 1}</span>
                </button>
              </div>

              <button className="project-modal-close" onClick={closeModal} aria-label="Close" title="Tutup Modal (ESC)">
                <X size={18} />
              </button>
            </div>

            {/* TAB 1: OVERVIEW & CASE STUDY DETAIL */}
            {modalTab === "details" && (
              <div className="modal-tab-body modal-tab-details animate-fade-in">
                {/* Modal Photo Media Header */}
                <div
                  className="project-modal-media"
                  style={{ background: modalProject.meta.bg || "var(--bg-subtle)" }}
                >
                  {modalActiveImage ? (
                    <img
                      src={modalActiveImage}
                      alt={modalProject.title}
                      className="project-modal-img"
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

                  {/* Problem & Goal Grid */}
                  {(modalProject.meta.problem || modalProject.meta.goal) && (
                    <div className="modal-case-study-grid">
                      {modalProject.meta.problem && (
                        <div className="case-study-card">
                          <div className="case-study-card-header">
                            <Target size={14} className="case-icon" />
                            <h4>{lang === "id" ? "Latar Belakang / Tantangan" : "Problem Statement"}</h4>
                          </div>
                          <p>{modalProject.meta.problem}</p>
                        </div>
                      )}

                      {modalProject.meta.goal && (
                        <div className="case-study-card">
                          <div className="case-study-card-header">
                            <FileCheck2 size={14} className="case-icon" />
                            <h4>{lang === "id" ? "Tujuan & Solusi" : "Goal & Solution"}</h4>
                          </div>
                          <p>{modalProject.meta.goal}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Details list */}
                  {modalProject.details?.length > 0 && (
                    <div className="modal-details-list">
                      <h4 className="modal-section-label">
                        <Sparkles size={13} />
                        <span>{lang === "id" ? "Fitur & Poin Utama Pengerjaan" : "Key Highlights & Contributions"}</span>
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
                      <span>{lang === "id" ? "Teknologi yang Digunakan" : "Technologies Used"}</span>
                    </h4>
                    <div className="project-tech">
                      {modalProject.meta.tech.map((tech) => (
                        <span className="tech-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Integrated Documentation Preview Strip */}
                  {modalProject.meta.gallery?.length > 1 && (
                    <div className="modal-docs-preview-strip">
                      <div className="docs-preview-header">
                        <div className="docs-preview-title">
                          <Camera size={14} />
                          <span>{lang === "id" ? "Dokumentasi Terkait Project Ini" : "Related Project Documentation"}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-view-all-docs"
                          onClick={() => setModalTab("gallery")}
                        >
                          <span>{lang === "id" ? "Buka Galeri Lengkap" : "View Full Gallery"}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      <div className="docs-preview-thumbnails">
                        {modalProject.meta.gallery.map((gItem, gIdx) => (
                          <div 
                            key={gIdx}
                            className="docs-thumb-item"
                            onClick={() => {
                              handleSelectGalleryPhoto(gItem);
                              setModalTab("gallery");
                            }}
                          >
                            <img src={gItem.src} alt={gItem.label || "Docs"} className="docs-thumb-img" />
                            <span className="docs-thumb-badge">{gItem.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: DOKUMENTASI & GALERI FOTO */}
            {modalTab === "gallery" && (
              <div className="modal-tab-body modal-tab-gallery animate-fade-in">
                {/* Gallery Stage Top Bar */}
                <div className="gallery-stage-topbar">
                  <div className="gallery-stage-title-wrap">
                    <span className="gallery-koleksi-badge">
                      <Camera size={13} />
                      {lang === "id" ? "Dokumentasi Foto" : "Photo Documentation"}
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
                      title={lang === "id" ? "Perbesar Foto" : "View Fullscreen"}
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
                      <Camera size={48} />
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
                        title={lang === "id" ? "Foto Sebelumnya" : "Previous Photo"}
                      >
                        <ChevronLeft size={22} />
                      </button>
                      <button
                        type="button"
                        className="modal-photo-nav-arrow arrow-next"
                        onClick={handleNextPhoto}
                        aria-label="Foto Selanjutnya"
                        title={lang === "id" ? "Foto Selanjutnya" : "Next Photo"}
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
                  <div className="modal-photo-caption-bar">
                    <p className="caption-text">{modalActiveCaption}</p>
                  </div>
                )}

                {/* Thumbnails Strip */}
                {modalProject.meta.gallery?.length > 1 && (
                  <div className="modal-photo-strip">
                    {modalProject.meta.gallery.map((gItem, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`modal-photo-thumb ${modalActiveImage === gItem.src ? "is-active" : ""}`}
                        onClick={() => handleSelectGalleryPhoto(gItem)}
                        title={gItem.label || `Foto ${idx + 1}`}
                      >
                        <img src={gItem.src} alt={gItem.label || "thumb"} className="thumb-img" />
                        <span className="thumb-index-num">{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Photo Lightbox (untuk galeri dokumentasi & modal) */}
      {isFullscreenPhoto && modalActiveImage && (
        <div className="photo-fullscreen-backdrop" onClick={() => setIsFullscreenPhoto(false)}>
          <button
            className="fullscreen-close-btn"
            onClick={() => setIsFullscreenPhoto(false)}
            aria-label="Tutup Layar Penuh"
            title="Tutup (ESC)"
          >
            <X size={24} />
          </button>
          <div className="fullscreen-image-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalActiveImage}
              alt="Fullscreen view"
              className="fullscreen-full-img"
            />
            {modalActiveCaption && (
              <div className="fullscreen-caption-bar">
                <p>{modalActiveCaption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
