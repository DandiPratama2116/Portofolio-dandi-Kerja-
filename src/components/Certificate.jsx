import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { 
  ExternalLink, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  X, 
  Tag, 
  CheckCircle2,
  FileText
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Certificate() {
  const { lang, t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const sectionRef = useRef(null);

  const certData = t.certificates || {
    title: lang === "id" ? "Sertifikat & Lisensi" : "Certificates & Licenses",
    subtitle: lang === "id" 
      ? "Daftar sertifikasi profesional, pelatihan industri, dan pencapaian kompetensi teknologi"
      : "Professional certifications, industry training courses, and verified technical credentials",
    items: []
  };

  const allItems = certData.items || [];  

  // GSAP Entrance Animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const header = el.querySelector(".section-header");
      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: 28 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.75, 
            ease: "power3.out",
            scrollTrigger: { 
              trigger: header, 
              start: "top 88%", 
              toggleActions: "play none none reverse" 
            }
          }
        );
      }

      const cards = el.querySelectorAll(".cert-card");
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 24 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.06, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.querySelector(".cert-grid"),
              start: "top 86%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, t]);  

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isFullscreenImage) {
          setIsFullscreenImage(false);
        } else {
          setSelectedCert(null);
        }
      }
    };
    if (selectedCert || isFullscreenImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert, isFullscreenImage]);

  return (
    <section id="certificate" ref={sectionRef} className="section cert-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{certData.title}</h2>
          {certData.subtitle && (
            <p className="section-subtitle">{certData.subtitle}</p>
          )}
        </div>

        {/* Certificates Grid - Tampilan Bersih, Sederhana & Enak Dilihat */}
        <div className="cert-grid">
          {allItems.map((cert) => (
            <div 
              className="cert-card" 
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
            >
              {/* Certificate Image Frame */}
              <div className="cert-img-container">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="cert-thumbnail" 
                  loading="lazy" 
                />
              </div>

              {/* Certificate Body */}
              <div className="cert-body">
                <div className="cert-header-info">
                  <span className="cert-issuer-text">{cert.issuer}</span>
                  {cert.date && <span className="cert-date-text">{cert.date}</span>}
                </div>

                <h3 className="cert-title" title={cert.title}>
                  {cert.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL TENTANG SERTIFIKAT */}
      {selectedCert && (
        <div 
          className="cert-modal-backdrop" 
          onClick={() => {
            setSelectedCert(null);
            setIsFullscreenImage(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="cert-modal-dialog" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="cert-modal-header">
              <div className="cert-modal-title-group">
                <div className="cert-modal-issuer-badge">
                  <ShieldCheck size={14} />
                  <span>{selectedCert.issuer}</span>
                </div>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
              </div>
              <button 
                type="button" 
                className="cert-modal-close"
                onClick={() => {
                  setSelectedCert(null);
                  setIsFullscreenImage(false);
                }}
                aria-label={lang === "id" ? "Tutup" : "Close"}
                title={lang === "id" ? "Tutup (ESC)" : "Close (ESC)"}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="cert-modal-body">
              {/* Image Preview */}
              <div 
                className="cert-modal-img-wrap"
                onClick={() => setIsFullscreenImage(true)}
              >
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="cert-modal-img" 
                />
              </div>

              {/* Details & Specs */}
              <div className="cert-modal-details">
                <div className="cert-modal-meta-grid">
                  <div className="modal-meta-cell">
                    <span className="meta-cell-label">
                      <ShieldCheck size={14} />
                      <span>{certData.issuedBy || (lang === "id" ? "Penerbit" : "Issuer")}</span>
                    </span>
                    <span className="meta-cell-value">{selectedCert.issuer}</span>
                  </div>

                  {selectedCert.date && (
                    <div className="modal-meta-cell">
                      <span className="meta-cell-label">
                        <Calendar size={14} />
                        <span>{certData.dateLabel || (lang === "id" ? "Tanggal Terbit" : "Issue Date")}</span>
                      </span>
                      <span className="meta-cell-value">{selectedCert.date}</span>
                    </div>
                  )}

                  {selectedCert.hours && (
                    <div className="modal-meta-cell">
                      <span className="meta-cell-label">
                        <Clock size={14} />
                        <span>{certData.hoursLabel || (lang === "id" ? "Durasi Pelatihan" : "Duration")}</span>
                      </span>
                      <span className="meta-cell-value">{selectedCert.hours}</span>
                    </div>
                  )}

                  {selectedCert.credential && (
                    <div className="modal-meta-cell">
                      <span className="meta-cell-label">
                        <CheckCircle2 size={14} />
                        <span>{certData.credentialLabel || (lang === "id" ? "ID Kredensial" : "Credential ID")}</span>
                      </span>
                      <span className="meta-cell-value font-mono">{selectedCert.credential}</span>
                    </div>
                  )}
                </div>

                {selectedCert.desc && (
                  <div className="cert-modal-desc-block">
                    <h4 className="modal-desc-title">
                      {lang === "id" ? "Deskripsi & Materi Kompetensi" : "Description & Competency"}
                    </h4>
                    <p>{selectedCert.desc}</p>
                  </div>
                )}

                {/* Tags in modal */}
                {selectedCert.tags && selectedCert.tags.length > 0 && (
                  <div className="cert-modal-tags">
                    <span className="modal-tags-label">
                      <Tag size={13} />
                      <span>{lang === "id" ? "Keterampilan yang Diverifikasi:" : "Verified Skills:"}</span>
                    </span>
                    <div className="modal-tag-chips">
                      {selectedCert.tags.map((tag, idx) => (
                        <span className="cert-modal-tag" key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="cert-modal-footer">
              <button 
                type="button" 
                className="modal-btn-secondary"
                onClick={() => {
                  setSelectedCert(null);
                  setIsFullscreenImage(false);
                }}
              >
                {certData.closeLabel || (lang === "id" ? "Tutup" : "Close")}
              </button>

              {selectedCert.pdf && (
                <a 
                  href={selectedCert.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-btn-primary"
                >
                  <FileText size={16} />
                  <span>{certData.viewOriginal || (lang === "id" ? "Buka Dokumen PDF Asli" : "View Original PDF")}</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX */}
      {isFullscreenImage && selectedCert && (
        <div 
          className="cert-lightbox-backdrop"
          onClick={() => setIsFullscreenImage(false)}
        >
          <button 
            type="button" 
            className="cert-lightbox-close"
            onClick={() => setIsFullscreenImage(false)}
            aria-label={lang === "id" ? "Tutup Layar Penuh" : "Close Fullscreen"}
            title={lang === "id" ? "Tutup (ESC)" : "Close (ESC)"}
          >
            <X size={24} />
          </button>
          <div className="cert-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedCert.image} 
              alt={selectedCert.title} 
              className="cert-lightbox-img" 
            />
            <div className="cert-lightbox-caption">
              <h4>{selectedCert.title}</h4>
              <p>{selectedCert.issuer} {selectedCert.date ? `• ${selectedCert.date}` : ""}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificate;
