import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Mail, MapPin, Send, CheckCircle2, Clock, Copy, Check } from "lucide-react";


function Contact() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // EMAIL TUJUAN ANDA:
  const recipientEmail = "dandipratamapku04@gmail.com";

  // Web3Forms Endpoint:
  const contactEndpoint = "https://api.web3forms.com/submit"; 

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      if (contactEndpoint) {
        const payload = {
          access_key: "30c47ce2-538a-4713-a07c-2e28680005a2",
          subject: formData.subject || `Pesan dari ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
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
          setFormData({ name: "", email: "", subject: "", message: "" });
        }
      } else {
        const mailSubject = encodeURIComponent(formData.subject || `Pesan dari Portofolio: ${formData.name}`);
        const mailBody = encodeURIComponent(
          `Nama: ${formData.name}\nEmail Pengirim: ${formData.email}\n\nPesan:\n${formData.message}`
        );

        window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="section contact-section">
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
                      ? "Pesan Anda berhasil terkirim langsung ke email Dandi! Terima kasih telah menghubungi."
                      : "Your message was successfully sent to Dandi! Thank you for reaching out."}
                  </span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
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
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                    />
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

