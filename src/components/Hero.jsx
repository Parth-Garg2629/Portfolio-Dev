import React, { useState, useEffect } from 'react';
import { GitFork, Linkedin, FileText, ArrowRight } from 'lucide-react';
import config from '../config';

function Hero() {
  const { typewriterWords, stats, bio } = config.hero;
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
      <div className="container hero-container">
        {/* Availability Badge: plain mono text with green dot, no pill background or border */}
        <div className="availability-badge">
          <span className="green-dot"></span>
          <span className="availability-text">{availability}</span>
        </div>

        {/* Name: solid text, surname followed by amber full stop */}
        <h1 className="hero-name">
          {firstName} {lastName}<span className="hero-name-dot">.</span>
        </h1>

        {/* Terminal Typing Line */}
        <div className="typing-container">
          <span className="typing-prefix">&gt;&nbsp;</span>
          <span className="typing-text">{text}</span>
          <span className="typing-cursor"></span>
        </div>

        {/* Bio */}
        <p className="hero-bio">
          {bio}
        </p>

        {/* Buttons in one left row: primary = flat amber fill, dark text; others = hairline outline */}
        <div className="hero-ctas">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FileText size={15} />
            View Resume
          </a>
          <button
            className="btn btn-outline"
            onClick={(e) => scrollToSection(e, 'projects')}
          >
            Projects
            <ArrowRight size={15} />
          </button>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            aria-label="GitHub Profile"
          >
            <GitFork size={15} />
            GitHub
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
        </div>

        {/* Stats: ONE mono line separated by ' / ', small size */}
        <div className="hero-stats-line">
          {stats.map((st, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="stat-separator">/</span>}
              <span className="stat-item-inline">
                <span className="stat-value-inline">{st.value}</span> {st.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
