import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import GitHubActivity from './components/GitHubActivity';
import AskMe from './components/AskMe';
import WebPresence from './components/WebPresence';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SideRails from './components/SideRails';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Listener (passive)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to handle reveal-on-scroll animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Ambient Cursor Glow for Desktop (Disabled on touch or reduced motion)
  useEffect(() => {
    // Check if device supports fine hover
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    const move = (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="app-container">
      {/* 3px Top Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <div id="cursor-glow" className="cursor-glow" aria-hidden="true" />

      {/* Fixed Side Rails (Desktop 1024px+) */}
      <SideRails />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <TechStack />
        <GitHubActivity />
        <AskMe />
        <WebPresence />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
