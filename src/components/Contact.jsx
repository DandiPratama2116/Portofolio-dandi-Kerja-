import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EMAIL TUJUAN ANDA:
  const recipientEmail = "dandipratamapku04@gmail.com";

  // Web3Forms Endpoint:
  const contactEndpoint = "https://api.web3forms.com/submit"; 

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
        // Fallback: Membuka aplikasi Email pengunjung terisi otomatis ke dandipratamapku04@gmail.com
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
      {/* Background Decor Shapes */}
      <div className="section-bg-decor">
        <div className="decor-blob contact-blob-1"></div>
        <div className="decor-blob contact-blob-2"></div>
        <div className="decor-grid-pattern"></div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-header">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="contact-centered-intro">{t.contact.intro}</p>
        </div>

        <div className="contact-form-centered-wrapper">
          {submitted && (
            <div className="contact-success-banner">
              <span>✨</span> Pesan Anda berhasil terkirim langsung ke email Dandi! Terima kasih telah menghubungi.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* 2-Column Row for Name & Email */}
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
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.messagePlaceholder}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary full-width" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : t.contact.sendBtn}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
