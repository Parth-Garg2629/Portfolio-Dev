import React, { useState, useEffect } from 'react';
import { GitFork, Linkedin, ArrowDown, FileText, ArrowRight } from 'lucide-react';
import config from '../config';

function Hero() {
  const { typewriterWords, stats } = config.hero;
  const { name, githubUrl, linkedinUrl, resumePath, availability } = config.personal;

  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  const words = typewriterWords && typewriterWords.length > 0
    ? typewriterWords
    : ["Full-Stack Developer", "Programmer"];

  useEffect(() => {
    const currentWord = words[wordIndex];
    if (!currentWord) return;
    
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        setSpeed(100);
        
        if (text === currentWord) {
          setIsDeleting(true);
          setSpeed(2000); // Wait 2s before deleting
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        setSpeed(50);
        
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setSpeed(500); // Wait 0.5s before starting next word
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, speed, wordIndex, words]);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const nameParts = name.split(' ');
  const firstName = nameParts[0] || 'Raghvendra';
  const lastName = nameParts.slice(1).join(' ') || 'Singh';

  return (
    <section className="hero-section" id="hero">
      {/* Background Effects */}
      <div className="grid-bg-wrapper"></div>
      <div className="glow-orb hero-glow"></div>

      <div className="container hero-container">
        {/* Availability Badge */}
        <div className="availability-badge reveal">
          <span className="green-dot-pulse"></span>
          <span>{availability}</span>
        </div>

        {/* Name */}
        <h1 className="hero-name reveal stagger-1">
          {firstName} <br className="mobile-only" />
          <span className="gradient-text">{lastName}</span>
        </h1>

        {/* Terminal Typing Line */}
        <div className="typing-container reveal stagger-2">
          <span className="typing-prefix">&gt;&nbsp;</span>
          <span className="typing-text">{text}</span>
          <span className="typing-cursor"></span>
        </div>

        {/* Bio */}
        <p className="hero-bio reveal stagger-3">
          CS student at IIIT Kota building production-ready, AI-powered products. Currently exploring multi-agent architectures, scalable backends, and shipping clean software that solves real problems.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas reveal stagger-4">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FileText size={18} />
            View Resume
          </a>
          <button
            className="btn btn-outline"
            onClick={(e) => scrollToSection(e, 'projects')}
          >
            Projects
            <ArrowRight size={16} />
          </button>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            aria-label="GitHub Profile"
          >
            <GitFork size={18} />
            GitHub
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>

        {/* Stats Strip */}
        <div className="stats-strip reveal stagger-5">
          {stats.map((st, idx) => (
            <div className="stat-item" key={idx}>
              <span className="stat-value">{st.value}</span>
              <span className="stat-label">// {st.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <a
          href="#about"
          className="scroll-hint"
          onClick={(e) => scrollToSection(e, 'about')}
          aria-label="Scroll down to About"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}

export default Hero;
