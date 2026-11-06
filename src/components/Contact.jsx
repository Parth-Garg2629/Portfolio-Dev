import React, { useState } from 'react';
import { Send, CheckCircle, Github, Linkedin, Mail, MapPin, AlertCircle } from 'lucide-react';
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
    if (!isConfigured) {
      return;
    }

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
      // Auto-revert error to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setStatus('idle');
  };

  const infoCards = [
    {
      icon: <Github size={20} />,
      label: "GITHUB",
      value: githubUsername,
      href: githubUrl
    },
    {
      icon: <Linkedin size={20} />,
      label: "LINKEDIN",
      value: "Connect with me",
      href: linkedinUrl
    },
    {
      icon: <Mail size={20} />,
      label: "EMAIL",
      value: ownerEmail,
      href: `mailto:${ownerEmail}`
    },
    {
      icon: <MapPin size={20} />,
      label: "LOCATION",
      value: location,
      href: null
    }
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-label">08.</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <p className="contact-subtext reveal stagger-1">
          Open to internship roles, freelance projects, and interesting collaborations.
        </p>

        {/* Layout Column */}
        <div className="contact-grid">
          {/* Left Column: Form or Unconfigured Graceful State */}
          <div className="contact-left reveal stagger-2">
            {!isConfigured ? (
              <div className="contact-unconfigured-card">
                <AlertCircle size={40} className="unconfigured-icon" />
                <h3 className="unconfigured-heading">Contact Form Offline</h3>
                <p className="unconfigured-subtext">
                  The contact form is not configured yet. Please email me directly instead:
                </p>
                <a href={`mailto:${ownerEmail}`} className="btn btn-primary" style={{ marginTop: '16px' }}>
                  <Mail size={16} />
                  Email {ownerEmail}
                </a>
              </div>
            ) : status === 'success' ? (
              <div className="contact-success-card">
                <CheckCircle size={48} className="success-icon" />
                <h3 className="success-heading">Message Sent!</h3>
                <p className="success-subtext">
                  Thank you for reaching out. {ownerName} will get back to you as soon as possible.
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
                    placeholder="Project inquiry / Opportunity / Feedback"
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
                    placeholder="What's on your mind?"
                    required
                    className="form-input form-textarea"
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact-error-msg">
                    Failed to send message. Please try again or email directly.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary contact-submit-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Info Cards */}
          <div className="contact-right reveal stagger-3">
            <div className="info-cards-list">
              {infoCards.map((card, idx) => {
                const CardWrapper = card.href ? 'a' : 'div';
                const wrapperProps = card.href
                  ? {
                      href: card.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "contact-info-card interactive"
                    }
                  : { className: "contact-info-card" };

                return (
                  <CardWrapper key={idx} {...wrapperProps}>
                    <div className="contact-info-icon-wrapper">
                      {card.icon}
                    </div>
                    <div className="contact-info-details">
                      <span className="contact-info-label">{card.label}</span>
                      <span className="contact-info-value">{card.value}</span>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
