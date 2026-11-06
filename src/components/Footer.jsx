import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Star, GitFork } from 'lucide-react';
import config from '../config';

function Footer() {
  const { brand, tagline, name, email, githubUrl, linkedinUrl, portfolioRepo } = config.personal;
  const [repoStats, setRepoStats] = useState(null);

  useEffect(() => {
    if (!portfolioRepo) return;
    let isMounted = true;
    fetch(`https://api.github.com/repos/${portfolioRepo}`)
      .then((res) => {
        if (!res.ok) throw new Error('Repo fetch failed');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setRepoStats({
            stars: data.stargazers_count,
            forks: data.forks_count
          });
        }
      })
      .catch(() => {
        // Silently omit counts on error
        if (isMounted) setRepoStats(null);
      });

    return () => {
      isMounted = false;
    };
  }, [portfolioRepo]);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Large CHRONIX wordmark header */}
        <div className="footer-brand-section">
          <h2 className="footer-brand-title">{brand}</h2>
          <p className="footer-tagline">{tagline}</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          {/* Left copyright notice + live GitHub repo stats */}
          <div className="footer-left">
            <p className="footer-credit">
              Designed &amp; built by {name}
              {repoStats && (
                <span className="footer-repo-stats">
                  <span className="footer-stat-pill" title="GitHub Stars">
                    <Star size={12} /> {repoStats.stars}
                  </span>
                  <span className="footer-stat-pill" title="GitHub Forks">
                    <GitFork size={12} /> {repoStats.forks}
                  </span>
                </span>
              )}
            </p>
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} {brand} &middot; All rights reserved.
            </p>
          </div>

          {/* Right social icons and back to top */}
          <div className="footer-right">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${email}`}
              className="footer-social-link"
              aria-label="Send Email"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <button
              onClick={scrollToTop}
              className="footer-social-link scroll-top-btn"
              aria-label="Scroll to top"
              title="Scroll to Top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
