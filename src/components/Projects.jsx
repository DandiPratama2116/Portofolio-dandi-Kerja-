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
  const [activeIndex, setActiveIndex] = useState(3); // Default index 3 (SIOPLAS, persis di tengah dari 7 proyek)
  const [globalActiveIndex, setGlobalActiveIndex] = useState(17); // Set tengah (index 17 dari 35 kartu berulang)
  const [modalProject, setModalProject] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(null);
  const [modalActiveCaption, setModalActiveCaption] = useState("");
  const [modalTab, setModalTab] = useState("details"); // "details" | "gallery"
  const [isFullscreenPhoto, setIsFullscreenPhoto] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const modalContentRef = useRef(null);

  // Mouse & Touch drag state + Smooth Momentum Physics
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRafRef = useRef(null);
  const scrollRafRef = useRef(null);
  const cardStepRef = useRef(390);
  const globalActiveIndexRef = useRef(17);

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

  const galleryItems = useMemo(() => [
    {
      src: "/Dokumentasi Dandi/(1Sioplas).jpeg",
      tag: "Backend Development",
      title: lang === "id" ? "Pengembangan Sistem SIOPLAS" : "SIOPLAS System Development",
      caption: lang === "id"
        ? "Dokumentasi pengembangan backend dan sistem pelaporan operasional SIOPLAS di Balai Karantina."
        : "Backend development and operational reporting system documentation for SIOPLAS at the Quarantine Authority."
    },
    {
      src: "/Dokumentasi Dandi/(2Sioplas).jpeg",
      tag: "System Development",
      title: lang === "id" ? "Implementasi Sistem SIOPLAS" : "SIOPLAS System Implementation",
      caption: lang === "id"
        ? "Dokumentasi proses implementasi fitur dan pengembangan sistem informasi SIOPLAS."
        : "Feature implementation and development documentation for the SIOPLAS information system."
    },
    {
      src: "/Dokumentasi Dandi/(3Sioplas).jpeg",
      tag: "Team Collaboration",
      title: lang === "id" ? "Kolaborasi Proyek SIOPLAS" : "SIOPLAS Project Collaboration",
      caption: lang === "id"
        ? "Dokumentasi kolaborasi dan koordinasi tim dalam pengembangan aplikasi SIOPLAS."
        : "Team collaboration and technical coordination documentation for SIOPLAS development."
    },
    {
      src: "/Dokumentasi Dandi/(1Eyemate).jpeg",
      tag: "AI Development",
      title: lang === "id" ? "Pengembangan Aplikasi EyeMate" : "EyeMate Application Development",
      caption: lang === "id"
        ? "Dokumentasi pengembangan aplikasi mobile berbasis AI untuk membantu penyandang gangguan penglihatan."
        : "Documentation of AI-based mobile app development to assist visually impaired individuals."
    },
    {
      src: "/Dokumentasi Dandi/(1Pertamina).jpeg",
      tag: "Industrial Internship",
      title: lang === "id" ? "Dokumentasi Magang Pertamina" : "Pertamina Internship Documentation",
      caption: lang === "id"
        ? "Pengalaman praktik kerja lapangan di PT Kilang Pertamina Internasional RU II Dumai."
        : "Field work internship experience at PT Kilang Pertamina Internasional RU II Dumai."
    },
    {
      src: "/Dokumentasi Dandi/(Pertamina).jpeg",
      tag: "Field Observation",
      title: lang === "id" ? "Observasi Operasional Kilang" : "Refinery Operational Observation",
      caption: lang === "id"
        ? "Dokumentasi kegiatan observasi lingkungan kerja dan operasional di lingkungan kilang Pertamina."
        : "Observation of working environment and technical operations at the Pertamina refinery."
    },
    {
      src: "/Dokumentasi Dandi/UX(Pertamina).jpeg",
      tag: "UI/UX Design",
      title: lang === "id" ? "Perancangan UI/UX Pertamina" : "Pertamina UI/UX Design",
      caption: lang === "id"
        ? "Dokumentasi perancangan prototype antarmuka chatbot untuk mendukung sistem pelaporan internal."
        : "Chatbot interface prototype design to support internal incident and operational reporting."
    },
    {
      src: "/Dokumentasi Dandi/Project(1Absensiku).jpeg",
      tag: "Mobile Development",
      title: lang === "id" ? "Pengembangan Absensiku" : "Absensiku Development",
      caption: lang === "id"
        ? "Dokumentasi pengembangan aplikasi presensi mobile dengan fitur pencatatan dan verifikasi lokasi."
        : "Mobile attendance app development featuring real-time location tracking and verification."
    },
    {
      src: "/Dokumentasi Dandi/Project(Absensiku).jpeg",
      tag: "Application Testing",
      title: lang === "id" ? "Implementasi Aplikasi Absensiku" : "Absensiku Implementation & Testing",
      caption: lang === "id"
        ? "Dokumentasi implementasi dan pengujian fungsionalitas aplikasi presensi."
        : "Implementation testing and functionality verification for the Absensiku mobile attendance system."
    }
  ], [lang]);

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
          label: lang === "id" ? "Pengembangan Aplikasi EyeMate" : "EyeMate App Development",
          src: "/Dokumentasi Dandi/(1Eyemate).jpeg",
          type: "photo",
          caption: lang === "id" 
            ? "Dokumentasi pengembangan aplikasi mobile EyeMate berbasis AI untuk membantu penyandang gangguan penglihatan melalui teknologi pengenalan objek dan panduan suara."
            : "Development documentation for the AI-powered EyeMate mobile app helping visually impaired individuals through real-time object detection and voice guidance."
        },
        {
          label: lang === "id" ? "Pengujian & Validasi" : "Testing & Validation",
          src: "/Dokumentasi Dandi/(2Eyemate).jpeg",
          type: "mobile",
          caption: lang === "id"
            ? "Melakukan testing pada aplikasi EyeMate untuk memastikan fungsionalitas berjalan dengan baik."
            : "Conducting comprehensive testing on EyeMate to ensure optimal multi-device performance."
        },
        {
          label: lang === "id" ? "Dokumentasi Aplikasi di iOS/Android" : "iOS & Android Cross-Platform",
          src: "/Dokumentasi Dandi/(3Eyemate).jpeg",
          type: "photo",
          caption: lang === "id"
            ? "Membuktikan bahwa aplikasi EyeMate tersedia di iOS dan Android."
            : "Cross-platform verification proving EyeMate functionality across both iOS and Android ecosystems."
        },
      ],
      problem: lang === "id"
        ? "Penyandang gangguan penglihatan sering menghadapi hambatan dalam mengenali objek di sekitarnya secara mandiri dan cepat."
        : "Visually impaired individuals frequently face difficulties in identifying surrounding objects quickly and independently.",
      goal: lang === "id"
        ? "Membangun asisten cerdas mobile berbasis model YOLOv8 dan FastAPI yang memberikan panduan suara dan teks secara real-time."
        : "Build an intelligent mobile assistant powered by YOLOv8 and FastAPI that delivers real-time voice and audio scene descriptions.",
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
          label: lang === "id" ? "Menentukan Alur Sistem" : "System Flow Mapping", 
          src: "/Dokumentasi Dandi/Project(Absensiku).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Menentukan alur dan arsitektur kerja sistem presensi Absensiku"
            : "Architecting the workflow and technical structure for the Absensiku mobile attendance system"
        },
        { 
          label: lang === "id" ? "Dokumentasi Pembuatan" : "Build Documentation", 
          src: "/Dokumentasi Dandi/Project(1Absensiku).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Mendokumentasikan proses pembuatan project Absensiku"
            : "Documenting the development lifecycle and endpoint implementation for Absensiku"
        },
      ],
      problem: lang === "id"
        ? "Pencatatan presensi konvensional sulit memvalidasi kehadiran staf di lokasi kerja secara real-time."
        : "Conventional attendance logging struggles to verify actual staff presence at assigned work coordinates in real time.",
      goal: lang === "id"
        ? "Menyediakan aplikasi presensi mobile berbasis koordinat geolokasi dengan backend API cepat menggunakan Go."
        : "Deliver a high-performance geolocation-based mobile attendance application backed by a fast Go RESTful API.",
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
      problem: lang === "id"
        ? "Pelanggan coffee shop sering menghadapi antrean panjang dalam pemesanan saat jam sibuk."
        : "Coffee shop customers frequently experience prolonged queues and wait times during peak order hours.",
      goal: lang === "id"
        ? "Membangun sistem pemesanan responsif berbasis React dan backend Golang untuk mempercepat transaksi."
        : "Develop a responsive ordering system with React and a Golang backend to accelerate order fulfillment.",
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
          label: lang === "id" ? "Uji Validasi Backend & API" : "Backend & API Validation", 
          src: "/Dokumentasi Dandi/(3Sioplas).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Demonstrasi dan validasi modul backend API bersama tim penguji"
            : "Demonstrating and validating backend API modules with testing supervisors"
        },
        { 
          label: lang === "id" ? "Proses Proyek SIOPLAS" : "SIOPLAS Project Process", 
          src: "/Dokumentasi Dandi/(1Sioplas).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Laporan proses project SIOPLAS"
            : "Development and reporting workflow for the SIOPLAS agency platform"
        },
        { 
          label: lang === "id" ? "Proses Pembuatan Backend" : "Backend Engineering", 
          src: "/Dokumentasi Dandi/(2Sioplas).jpeg", 
          type: "web", 
          caption: lang === "id"
            ? "Laporan proses pembuatan backend"
            : "Backend implementation and operational query testing"
        },
      ],
      problem: lang === "id"
        ? "Proses rekapitulasi data penugasan dan pelaporan operasional sebelumnya memerlukan pencatatan manual yang rentan redundansi."
        : "Operational task tracking and reporting previously relied on manual record-keeping prone to human errors and data redundancy.",
      goal: lang === "id"
        ? "Mengembangkan backend API yang andal dan terstruktur menggunakan Go (Golang) dan MySQL untuk otomasi alur kerja data."
        : "Engineer a resilient, structured backend API using Go (Golang) and MySQL to automate operational data workflows.",
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
      problem: lang === "id"
        ? "Calon klien agensi membutuhkan kemudahan dalam meninjau portofolio layanan dan paket penawaran pembuatan website."
        : "Prospective agency clients require a clear, seamless interface to browse digital service tiers and website packages.",
      goal: lang === "id"
        ? "Merancang portal agensi yang terstruktur dengan navigasi intuitif untuk konversi prospek."
        : "Craft an elegant, structured agency showcase with intuitive navigation to drive client inquiries and conversions.",
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
      problem: lang === "id"
        ? "Brand kuliner specialty membutuhkan representasi digital yang mencerminkan estetika otentik dan ketenangan visual."
        : "Specialty culinary brands need a digital storefront that faithfully reflects authentic atmosphere and modern minimalism.",
      goal: lang === "id"
        ? "Mengembangkan landing page interaktif dengan TypeScript dan CSS modern yang responsif di seluruh layar."
        : "Create an interactive, ultra-responsive landing experience using modern CSS and TypeScript across all devices.",
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
          label: lang === "id" ? "Observasi Fasilitas Kilang Pertamina" : "Pertamina Refinery Observation", 
          src: "/Dokumentasi Dandi/(Pertamina).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Observasi operasional dan fasilitas di PT Kilang Pertamina Internasional RU II Dumai"
            : "Operational and facilities observation at PT Kilang Pertamina Internasional RU II Dumai"
        },
        { 
          label: lang === "id" ? "Magang PT Pertamina RU II Dumai" : "Pertamina Internship Certification", 
          src: "/Dokumentasi Dandi/(1Pertamina).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Sertifikat resmi Praktik Kerja Lapangan (PKL) di PT Kilang Pertamina Internasional RU II Dumai"
            : "Official internship certification at PT Kilang Pertamina Internasional RU II Dumai"
        },
        { 
          label: lang === "id" ? "Rancangan Portal Chatbot Figma" : "Figma Chatbot Portal Design", 
          src: "/Dokumentasi Dandi/UX(Pertamina).jpeg", 
          type: "photo", 
          caption: lang === "id"
            ? "Rancangan antarmuka portal CS & Chatbot virtual PT Pertamina RU II Dumai"
            : "Prototype interface for the CS portal and virtual chatbot at PT Pertamina RU II Dumai"
        },
      ],
      problem: lang === "id"
        ? "Departemen fasilitas kilang membutuhkan alur pelaporan insiden dan kebutuhan logistik yang cepat tanpa hambatan birokrasi manual."
        : "Refinery facility departments required a rapid incident reporting and logistics workflow free of manual bureaucratic delay.",
      goal: lang === "id"
        ? "Merancang antarmuka website berbasis chatbot virtual di Figma dengan usability tinggi untuk operasional internal."
        : "Design a highly intuitive virtual chatbot interface prototype in Figma to streamline internal operational reporting.",
      fit: "cover",
      bg: "#0c1a2e",
    }
  ], [DOKUMENTASI_PHOTOS, lang]);

  const allProjects = useMemo(() => {
    return (t.projects?.items || []).map((proj, idx) => {
      const meta = projectsMeta.find((m) => m.id === proj.id) || projectsMeta[idx] || projectsMeta[0];
      return { ...proj, meta };
    });
  }, [t.projects, projectsMeta]);

  // Buat array berulang (5 set) agar slider dapat digeser terus menerus tanpa batas (infinite loop)
  const infiniteProjects = useMemo(() => {
    if (!allProjects.length) return [];
    const sets = [0, 1, 2, 3, 4];
    return sets.flatMap((setIdx) =>
      allProjects.map((p, i) => ({
        ...p,
        setIdx,
        originalIndex: i,
        globalIdx: setIdx * allProjects.length + i,
      }))
    );
  }, [allProjects]);

  // Index proyek tengah di set tengah (set 2, SIOPLAS di index 3 -> 7*2 + 3 = 17)
  const initialCenterIndex = useMemo(() => {
    if (!allProjects.length) return 0;
    return allProjects.length * 2 + Math.floor(allProjects.length / 2);
  }, [allProjects.length]);

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
      // ── Section Header Entrance ──
      const headerTitle = el.querySelector(".projects-section-header .section-title");
      const headerSub = el.querySelector(".projects-section-header .section-subtitle");
      if (headerTitle) {
        gsap.fromTo(headerTitle,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: headerTitle, start: "top 88%", toggleActions: "play none none reverse" }
          }
        );
      }
      if (headerSub) {
        gsap.fromTo(headerSub,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, delay: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: headerSub, start: "top 88%", toggleActions: "play none none reverse" }
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
  }, [lang, t]);

  // Cleanup RAF momentum and scroll listeners on unmount
  useEffect(() => {
    return () => {
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  // Update card metrics (step width) dynamically
  const updateCardMetrics = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = slider.querySelectorAll(".project-showcase-card");
    if (cards.length >= 2) {
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      if (step > 0) cardStepRef.current = step;
    }
  }, []);

  const cancelMomentum = useCallback(() => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  }, []);

  // Slider Mouse & Touch Drag Handlers (Geser mulus tanpa putus-putus dan tanpa jedag-jedag)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const slider = sliderRef.current;
    if (!slider) return;

    cancelMomentum();
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    slider.classList.add("is-dragging");

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const currentX = moveEvent.pageX;
      const deltaX = currentX - lastXRef.current;
      const now = performance.now();
      const dt = now - lastTimeRef.current;

      if (Math.abs(deltaX) > 2) {
        hasDraggedRef.current = true;
      }

      if (dt > 0) {
        const instantVelocity = deltaX / dt;
        velocityRef.current = velocityRef.current * 0.35 + instantVelocity * 0.65;
      }

      lastXRef.current = currentX;
      lastTimeRef.current = now;

      // Delta shift: tidak akan pernah meloncat saat infinite wrap terjadi
      slider.scrollLeft -= deltaX;
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      slider.classList.remove("is-dragging");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      // Inersia momentum halus saat dilepas dengan kecepatan tinggi
      const initVelocity = velocityRef.current;
      if (Math.abs(initVelocity) > 0.2) {
        let v = initVelocity * 14;
        const friction = 0.94;
        const stepMomentum = () => {
          if (Math.abs(v) < 0.3 || isDraggingRef.current) {
            momentumRafRef.current = null;
            return;
          }
          slider.scrollLeft -= v;
          v *= friction;
          momentumRafRef.current = requestAnimationFrame(stepMomentum);
        };
        momentumRafRef.current = requestAnimationFrame(stepMomentum);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleTouchStart = () => {
    cancelMomentum();
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
  };

  const handleTouchMove = () => {
    hasDraggedRef.current = true;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 120);
  };

  // Slider Arrow Navigation - Menuju ke Card Tengah
  const scrollToCard = useCallback((targetGlobalIndex, behavior = "smooth") => {
    const slider = sliderRef.current;
    if (!slider) return;
    cancelMomentum();

    const cards = slider.querySelectorAll(".project-showcase-card");
    const targetCard = cards[targetGlobalIndex];
    if (targetCard) {
      const cardOffsetLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const sliderWidth = slider.clientWidth;
      const targetScrollLeft = cardOffsetLeft - (sliderWidth - cardWidth) / 2;

      if (behavior === "auto") {
        slider.scrollLeft = targetScrollLeft;
      } else {
        slider.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
      globalActiveIndexRef.current = targetGlobalIndex;
      setGlobalActiveIndex(targetGlobalIndex);
      setActiveIndex(targetGlobalIndex % (allProjects.length || 7));
    }
  }, [allProjects.length, cancelMomentum]);

  // Posisikan awal di tengah-tengah pada saat komponen dimuat (Mulai Tengah-tengah)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !allProjects.length) return;

    updateCardMetrics();
    const timer = setTimeout(() => {
      updateCardMetrics();
      scrollToCard(initialCenterIndex, "auto");
    }, 60);

    return () => clearTimeout(timer);
  }, [allProjects.length, initialCenterIndex, scrollToCard, updateCardMetrics]);

  // Jaga posisi card tengah saat ukuran layar berubah
  useEffect(() => {
    const handleResize = () => {
      updateCardMetrics();
      scrollToCard(globalActiveIndexRef.current, "auto");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollToCard, updateCardMetrics]);

  // Slider Scroll Listener dengan RAF throttle & kalkulasi matematis O(1) (Ultra Smooth)
  const handleSliderScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (scrollRafRef.current) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const currentSlider = sliderRef.current;
      if (!currentSlider) return;

      const singleSetCount = allProjects.length;
      if (singleSetCount === 0) return;

      const step = cardStepRef.current || 390;
      const singleSetWidth = step * singleSetCount;

      // 1. Seamless Infinite Loop Wrap tanpa jedag-jedag
      if (currentSlider.scrollLeft >= singleSetWidth * 3.5) {
        currentSlider.scrollLeft -= singleSetWidth;
      } else if (currentSlider.scrollLeft <= singleSetWidth * 0.5) {
        currentSlider.scrollLeft += singleSetWidth;
      }

      // 2. Kalkulasi matematis cepat O(1) untuk menentukan kartu yang tepat di tengah
      const totalCards = singleSetCount * 5;
      const rawIndex = Math.round(currentSlider.scrollLeft / step);
      const closestIndex = Math.max(0, Math.min(totalCards - 1, rawIndex));

      if (closestIndex !== globalActiveIndexRef.current) {
        globalActiveIndexRef.current = closestIndex;
        setGlobalActiveIndex(closestIndex);
        setActiveIndex(closestIndex % singleSetCount);
      }
    });
  }, [allProjects.length]);

  const handlePrevSlide = () => {
    scrollToCard(globalActiveIndex - 1);
  };

  const handleNextSlide = () => {
    scrollToCard(globalActiveIndex + 1);
  };

  // Project yang sedang aktif / berada di tengah
  const activeProject = useMemo(() => {
    return allProjects[activeIndex] || allProjects[Math.floor(allProjects.length / 2)] || allProjects[0];
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleSliderScroll}
          >
            {infiniteProjects.map((proj) => {
              const isCenter = globalActiveIndex === proj.globalIdx;
              return (
                <div 
                  key={`${proj.id}-set-${proj.setIdx}-${proj.globalIdx}`}
                  className={`project-showcase-card ${isCenter ? "is-active-center" : ""}`}
                  onClick={() => {
                    if (!hasDraggedRef.current) scrollToCard(proj.globalIdx);
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
                    {isCenter && (
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
              );
            })}
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

              <button 
                className="project-modal-close" 
                onClick={closeModal} 
                aria-label={lang === "id" ? "Tutup" : "Close"} 
                title={lang === "id" ? "Tutup Modal (ESC)" : "Close Modal (ESC)"}
              >
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
            aria-label={lang === "id" ? "Tutup Layar Penuh" : "Close Fullscreen"}
            title={lang === "id" ? "Tutup (ESC)" : "Close (ESC)"}
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
