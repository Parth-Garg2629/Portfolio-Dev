import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );
    sections.forEach((s) => sectionObserver.observe(s));
    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'github-activity', label: 'GitHub' },
    { id: 'ask-me', label: 'Ask Me' },
    { id: 'web-presence', label: 'Network' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={handleLogoClick}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">chronix</span>
          <span className="logo-bracket"> /&gt;</span>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="btn btn-primary nav-cta"
              onClick={(e) => handleLinkClick(e, 'contact')}
            >
              Hire Me
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '12px' }}>
            <button
              className="btn btn-primary nav-cta"
              style={{ width: '100%' }}
              onClick={(e) => handleLinkClick(e, 'contact')}
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
