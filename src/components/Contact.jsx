import React, { useState } from 'react';
import config from '../config';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

function Contact() {
  const { name: ownerName, email: ownerEmail, githubUsername, githubUrl, linkedinUrl, location } = config.personal;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const isConfigured = Boolean(WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) return;

    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setStatus('idle');
  };

  const infoItems = [
    { label: "GITHUB", value: githubUsername, href: githubUrl },
    { label: "LINKEDIN", value: "raghvendra-singh", href: linkedinUrl },
    { label: "EMAIL", value: ownerEmail, href: `mailto:${ownerEmail}` },
    { label: "LOCATION", value: location, href: null }
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-label">08.</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <p className="section-intro reveal">
          Direct communication line for projects, internships, and engineering queries.
        </p>

        <div className="contact-grid reveal">
          {/* Form */}
          <div className="contact-left">
            {!isConfigured ? (
              <div className="contact-unconfigured-card">
                <h3 className="unconfigured-heading">Contact Form Offline</h3>
                <p className="unconfigured-subtext">
                  The contact form is currently unconfigured. Send an email directly:
                </p>
                <a href={`mailto:${ownerEmail}`} className="btn btn-primary" style={{ marginTop: '16px' }}>
                  Email {ownerEmail}
                </a>
              </div>
            ) : status === 'success' ? (
              <div className="contact-success-card">
                <h3 className="success-heading">Message Sent</h3>
                <p className="success-subtext">
                  Thank you for reaching out. {ownerName} will respond shortly.
                </p>
                <a href="#" className="success-link" onClick={handleResetForm}>
                  Send another message
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="form-input"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="form-input"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject line"
                    required
                    className="form-input"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    className="form-input form-textarea"
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact-error-msg">
                    Failed to send message. Please email directly.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Info Column */}
          <div className="contact-right">
            <div className="contact-info-list">
              {infoItems.map((item, idx) => (
                <div className="contact-flat-card" key={idx}>
                  <span className="contact-info-label">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-info-link"
                    >
                      {item.value} ↗
                    </a>
                  ) : (
                    <span className="contact-info-val">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
