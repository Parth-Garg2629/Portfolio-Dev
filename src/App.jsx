import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

  // Intersection Observer for subtle below-fold reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
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

      {/* Fixed Side Rails (Desktop 1024px+) */}
      <SideRails />

      <Navbar />

      <main>
        <Hero />
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
