import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { Mail, MapPin, Send, CheckCircle2, Clock, Copy, Check, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

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

      const gridTrigger = el.querySelector('.contact-layout-grid');

      // ── Info card slides in from left ──
      const infoCard = el.querySelector('.contact-info-card');
      if (infoCard) {
        gsap.fromTo(infoCard,
          { opacity: 0, x: -45 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
        // Info card heading & subtitle
        const infoHeadings = infoCard.querySelectorAll('h2, h3, h4, .contact-heading, .contact-subtitle');
        if (infoHeadings.length) {
          gsap.fromTo(infoHeadings,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out',
              scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
        // Contact info items (email, location, etc)
        const contactItems = infoCard.querySelectorAll('.contact-info-item, .info-item, li');
        if (contactItems.length) {
          gsap.fromTo(contactItems,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out',
              scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
        // Social links
        const socialLinks = infoCard.querySelectorAll('.social-link, .contact-social a, a');
        if (socialLinks.length) {
          gsap.fromTo(socialLinks,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, delay: 0.4, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
      }

      // ── Form card slides in from right ──
      const formCard = el.querySelector('.contact-form-card');
      if (formCard) {
        gsap.fromTo(formCard,
          { opacity: 0, x: 45 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
        // Form labels
        const labels = formCard.querySelectorAll('label, .form-label');
        if (labels.length) {
          gsap.fromTo(labels,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.25, ease: 'power2.out',
              scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
        // Form inputs
        const inputs = formCard.querySelectorAll('input, textarea, select');
        if (inputs.length) {
          gsap.fromTo(inputs,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, delay: 0.3, ease: 'power2.out',
              scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
        // Submit button
        const submitBtn = formCard.querySelector('button[type="submit"], .submit-btn');
        if (submitBtn) {
          gsap.fromTo(submitBtn,
            { opacity: 0, y: 18, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.45, ease: 'back.out(1.5)',
              scrollTrigger: { trigger: gridTrigger, start: 'top 85%', toggleActions: 'play none none reverse' }
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, t]);


  // EMAIL TUJUAN ANDA:
  const recipientEmail = "dandipratamapku04@gmail.com";

  // Web3Forms Endpoint:
  const contactEndpoint = "https://api.web3forms.com/submit"; 

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Validasi format email secara presisi
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset error email jika user mulai mengetik email yang valid
    if (name === "email" && emailInvalid) {
      if (validateEmail(value)) {
        setEmailInvalid(false);
        setErrorMessage("");
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.email.trim() && !validateEmail(formData.email)) {
      setEmailInvalid(true);
      setErrorMessage(
        lang === "id"
          ? "Format email tidak valid! Masukkan alamat email yang benar (contoh: nama@example.com)"
          : "Invalid email format! Please enter a valid email address (e.g. name@example.com)"
      );
    } else if (formData.email.trim() && validateEmail(formData.email)) {
      setEmailInvalid(false);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi Kelengkapan Kolom Wajib
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(
        lang === "id"
          ? "Mohon lengkapi kolom Nama, Email, dan Pesan sebelum mengirim."
          : "Please fill in the Name, Email, and Message fields before submitting."
      );
      setSubmitted(false);
      return;
    }

    // 2. Validasi Format Email
    if (!validateEmail(formData.email)) {
      setEmailInvalid(true);
      setErrorMessage(
        lang === "id"
          ? "Format email tidak valid! Masukkan alamat email yang benar (contoh: nama@example.com)"
          : "Invalid email format! Please enter a valid email address (e.g. name@example.com)"
      );
      setSubmitted(false);
      return;
    }

    // Email Valid: bersihkan pesan error dan mulai kirim
    setEmailInvalid(false);
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (contactEndpoint) {
        const payload = {
          access_key: "30c47ce2-538a-4713-a07c-2e28680005a2",
          subject: formData.subject || `Pesan dari ${formData.name}`,
          from_name: formData.name,
          email: formData.email.trim(),
          message: formData.message,
          template: "basic", 
        };

        const response = await fetch(contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setSubmitted(true);
          setErrorMessage("");
          setEmailInvalid(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          throw new Error("Gagal mengirim via API Web3Forms");
        }
      } else {
        const mailSubject = encodeURIComponent(formData.subject || `Pesan dari Portofolio: ${formData.name}`);
        const mailBody = encodeURIComponent(
          `Nama: ${formData.name}\nEmail Pengirim: ${formData.email.trim()}\n\nPesan:\n${formData.message}`
        );

        window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
        setSubmitted(true);
        setErrorMessage("");
        setEmailInvalid(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
      setErrorMessage(
        lang === "id"
          ? "Terjadi kendala saat mengirim pesan. Silakan coba lagi atau kirim langsung ke email Dandi."
          : "Failed to send message. Please try again or reach out directly via email."
      );
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 7000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.intro}</p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-card-title">
                {lang === "id" ? "Informasi Kontak Langsung" : "Direct Contact Details"}
              </h3>
              <p className="contact-card-desc">
                {lang === "id"
                  ? "Saya selalu terbuka untuk diskusi peluang karier Software Engineering, kolaborasi proyek, maupun tanya jawab teknis."
                  : "I am always open to discussing software engineering opportunities, project collaboration, or technical discussions."}
              </p>

              <div className="contact-methods-list">
                {/* Email Item with 1-click copy */}
                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="method-text-wrap">
                    <span className="method-label">Email</span>
                    <a href={`mailto:${recipientEmail}`} className="method-value email-link">
                      {recipientEmail}
                    </a>
                  </div>
                  <button
                    type="button"
                    className="copy-email-btn"
                    onClick={handleCopyEmail}
                    title={copied ? "Tersalin!" : "Salin Email"}
                  >
                    {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="method-text-wrap">
                    <span className="method-label">{lang === "id" ? "Lokasi" : "Location"}</span>
                    <span className="method-value">{t.contact.locationVal || "Pekanbaru, Riau, Indonesia"}</span>
                  </div>
                </div>

                {/* Availability Note */}
                <div className="contact-method-item">
                  <div className="method-icon-box">
                    <Clock size={18} />
                  </div>
                  <div className="method-text-wrap">
                    <span className="method-label">{lang === "id" ? "Waktu Respon" : "Response Time"}</span>
                    <span className="method-value">{lang === "id" ? "Aktif (Maksimal 24 jam)" : "Active (Within 24 hours)"}</span>
                  </div>
                </div>
              </div>

              <div className="contact-status-box">
                <span className="status-dot"></span>
                <span>{lang === "id" ? "Siap bergabung segera (Full-time / Contract)" : "Available immediately (Full-time / Contract)"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              {submitted && (
                <div className="contact-success-banner" role="alert">
                  <CheckCircle2 size={18} className="success-icon" />
                  <span>
                    {lang === "id" 
                      ? "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi Dandi."
                      : "Your message was successfully sent! Thank you for reaching out to Dandi."}
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="contact-error-banner" role="alert">
                  <AlertCircle size={18} className="error-icon" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">{t.contact.nameLabel}</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">{t.contact.emailLabel}</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="text"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleEmailBlur}
                      placeholder={t.contact.emailPlaceholder}
                      className={emailInvalid ? "input-error" : ""}
                      aria-invalid={emailInvalid}
                    />
                    {emailInvalid && (
                      <span className="form-error-msg">
                        <AlertCircle size={12} />
                        <span>
                          {lang === "id"
                            ? "Format email tidak valid (contoh: nama@example.com)"
                            : "Invalid email format (e.g. name@example.com)"}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">{t.contact.subjectLabel}</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">{t.contact.messageLabel}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                  <Send size={16} />
                  <span>{isSubmitting ? (lang === "id" ? "Mengirim..." : "Sending...") : t.contact.sendBtn}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

