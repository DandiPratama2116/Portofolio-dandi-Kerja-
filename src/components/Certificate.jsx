import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { 
  ExternalLink, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Eye, 
  X, 
  Tag, 
  CheckCircle2,
  FileText
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Certificate() {
  const { lang, t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);
  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);

  const certData = t.certificates || {
    title: "Sertifikat & Lisensi",
    subtitle: "Daftar sertifikasi profesional, pelatihan industri, dan pencapaian kompetensi teknologi",
    items: []
  };

  const allItems = certData.items || [];

  // GSAP animation on mount
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate Section Title & Header
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
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  // Animate cards whenever lang or allItems change
  useEffect(() => {
    if (!cardsGridRef.current) return;
    const cards = cardsGridRef.current.querySelectorAll(".cert-card");
    if (cards.length) {
      gsap.fromTo(cards,
        { opacity: 0, y: 24 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.45, 
          stagger: 0.06, 
          ease: "power2.out" 
        }
      );
    }
  }, [lang, allItems.length]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

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

        {/* Certificates Grid */}
        <div className="cert-grid" ref={cardsGridRef}>
          {allItems.map((cert) => (
            <div className="cert-card" key={cert.id}>
              {/* Certificate Image Frame */}
              <div 
                className="cert-img-container" 
                onClick={() => setSelectedCert(cert)}
                tabIndex={0}
                role="button"
                aria-label={`Preview ${cert.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCert(cert);
                  }
                }}
              >
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="cert-thumbnail" 
                  loading="lazy" 
                />
                <div className="cert-issuer-badge">
                  <span>{cert.issuer}</span>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="cert-body">
                <div className="cert-meta-row">
                  {cert.date && (
                    <span className="cert-meta-item">
                      <Calendar size={13} />
                      <span>{cert.date}</span>
                    </span>
                  )}
                  {cert.hours && (
                    <span className="cert-meta-item">
                      <Clock size={13} />
                      <span>{cert.hours}</span>
                    </span>
                  )}
                </div>

                <h3 
                  className="cert-title" 
                  onClick={() => setSelectedCert(cert)}
                  title={cert.title}
                >
                  {cert.title}
                </h3>

                <p className="cert-desc">{cert.desc}</p>

                {/* Tags */}
                {cert.tags && cert.tags.length > 0 && (
                  <div className="cert-tags">
                    {cert.tags.slice(0, 3).map((tag, tIdx) => (
                      <span className="cert-tag" key={tIdx}>
                        {tag}
                      </span>
                    ))}
                    {cert.tags.length > 3 && (
                      <span className="cert-tag-more">
                        +{cert.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Actions */}
                <div className="cert-actions">
                  <button 
                    type="button" 
                    className="cert-btn cert-btn-preview"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <Eye size={15} />
                    <span>{certData.previewLabel || "Preview"}</span>
                  </button>

                  {cert.pdf && (
                    <a 
                      href={cert.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cert-btn cert-btn-pdf"
                      title={certData.viewOriginal || "Buka PDF Asli"}
                    >
                      <FileText size={15} />
                      <span>PDF</span>
                      <ExternalLink size={12} className="cert-ext-icon" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail / Fullscreen Modal */}
      {selectedCert && (
        <div 
          className="cert-modal-backdrop" 
          onClick={() => setSelectedCert(null)}
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
                <span className="cert-modal-issuer">{selectedCert.issuer}</span>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
              </div>
              <button 
                type="button" 
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="cert-modal-body">
              {/* Image Preview */}
              <div className="cert-modal-img-wrap">
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
                      <span>{certData.issuedBy || "Penerbit"}</span>
                    </span>
                    <span className="meta-cell-value">{selectedCert.issuer}</span>
                  </div>

                  {selectedCert.date && (
                    <div className="modal-meta-cell">
                      <span className="meta-cell-label">
                        <Calendar size={14} />
                        <span>{certData.dateLabel || "Tanggal"}</span>
                      </span>
                      <span className="meta-cell-value">{selectedCert.date}</span>
                    </div>
                  )}

                  {selectedCert.hours && (
                    <div className="modal-meta-cell">
                      <span className="meta-cell-label">
                        <Clock size={14} />
                        <span>{certData.hoursLabel || "Durasi"}</span>
                      </span>
                      <span className="meta-cell-value">{selectedCert.hours}</span>
                    </div>
                  )}

                  {selectedCert.credential && (
                    <div className="modal-meta-cell">
                      <span className="meta-cell-label">
                        <CheckCircle2 size={14} />
                        <span>{certData.credentialLabel || "Kredensial"}</span>
                      </span>
                      <span className="meta-cell-value font-mono">{selectedCert.credential}</span>
                    </div>
                  )}
                </div>

                {selectedCert.desc && (
                  <div className="cert-modal-desc-block">
                    <p>{selectedCert.desc}</p>
                  </div>
                )}

                {/* Tags in modal */}
                {selectedCert.tags && selectedCert.tags.length > 0 && (
                  <div className="cert-modal-tags">
                    <span className="modal-tags-label">
                      <Tag size={13} />
                      <span>Skills & Topics:</span>
                    </span>
                    <div className="modal-tag-chips">
                      {selectedCert.tags.map((tag, idx) => (
                        <span className="cert-tag" key={idx}>{tag}</span>
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
                onClick={() => setSelectedCert(null)}
              >
                {certData.closeLabel || "Tutup"}
              </button>

              {selectedCert.pdf && (
                <a 
                  href={selectedCert.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-btn-primary"
                >
                  <FileText size={16} />
                  <span>{certData.viewOriginal || "Buka Dokumen PDF Asli"}</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificate;
