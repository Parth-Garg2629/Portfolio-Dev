import React, { useState, useEffect } from 'react';
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
        {/* Large CHRONIX wordmark: flat solid muted colour, amber on hover */}
        <div className="footer-brand-section">
          <h2 className="footer-brand-title">{brand}</h2>
          <p className="footer-tagline">{tagline}</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-left">
            <p className="footer-credit">
              Designed &amp; built by {name}
              {repoStats && (
                <span className="footer-repo-stats">
                  &middot; {repoStats.stars} stars &middot; {repoStats.forks} forks
                </span>
              )}
            </p>
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} {brand} &middot; Kota, Rajasthan, India
            </p>
          </div>

          <div className="footer-right">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-mono"
            >
              GitHub ↗
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-mono"
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${email}`}
              className="footer-link-mono"
            >
              Email ↗
            </a>
            <button
              onClick={scrollToTop}
              className="footer-link-mono footer-top-btn"
              aria-label="Scroll to top"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
