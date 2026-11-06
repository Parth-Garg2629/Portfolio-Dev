import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Archive, Calendar } from 'lucide-react';
import config from '../config';

function getInitials(title) {
  return title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function Projects() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  const projects = config.projects;
  const archive = config.archive || [];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !lineRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrolled = Math.max(0, windowHeight - rect.top);
      const progress = Math.min(scrolled / (sectionHeight + windowHeight * 0.5), 1);
      setLineHeight(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">02.</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <p className="projects-subtext reveal stagger-1">
          Highlighted applications engineered with modern frontend frameworks, scalable backends, and AI integrations.
        </p>

        <div className="proj-timeline">
          {/* Animated vertical track bar */}
          <div className="proj-timeline-track">
            <div
              className="proj-timeline-fill"
              ref={lineRef}
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {/* Project entries */}
          <div className="proj-list">
            {projects.map((project, idx) => (
              <div className="proj-item reveal" key={idx}>
                <div className="proj-dot" />
                <div className={`proj-card ${project.featured ? 'proj-card--featured' : ''}`}>
                  {/* Magic UI animated border beam placeholder */}
                  {project.featured && <div className="border-beam" aria-hidden="true" />}

                  {/* Thumbnail / Gradient Initials Tile */}
                  {project.image ? (
                    <div className="proj-thumb-wrapper">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="proj-thumb"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <div className="proj-initial-tile">
                      <span className="proj-initial-text">{getInitials(project.title)}</span>
                      {project.date && (
                        <span className="proj-initial-meta">
                          <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                          {project.date}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="proj-card-inner">
                    <div className="proj-card-top">
                      <span className="proj-number">{project.number}</span>
                      {project.featured && (
                        <span className="proj-featured-badge">⭐ Featured Project</span>
                      )}
                    </div>

                    <h3 className="proj-title">{project.title}</h3>
                    <p className="proj-subtitle">{project.subtitle}</p>
                    <p className="proj-desc">{project.description}</p>

                    <div className="proj-tags">
                      {project.tags.map((tag, tIdx) => (
                        <span className="tag" key={tIdx}>{tag}</span>
                      ))}
                    </div>

                    {/* Clear Button Hierarchy: Live Demo = primary amber, Code = outline */}
                    <div className="proj-links">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary proj-btn"
                        >
                          <ExternalLink size={15} /> Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline proj-btn"
                        >
                          <Github size={15} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Archive (Part D3) */}
        {archive.length > 0 && (
          <div className="archive-section reveal stagger-3">
            <div className="archive-header">
              <Archive size={18} className="archive-icon" />
              <h3 className="archive-title">Project Archive</h3>
              <span className="archive-badge">{archive.length} Older Works</span>
            </div>
            <div className="archive-table-container">
              <table className="archive-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Project</th>
                    <th>Built With</th>
                    <th style={{ textAlign: 'right' }}>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {archive.map((item, aIdx) => (
                    <tr key={aIdx} className="archive-row">
                      <td className="archive-year">{item.year}</td>
                      <td className="archive-project-name">{item.project}</td>
                      <td className="archive-tech">{item.builtWith}</td>
                      <td style={{ textAlign: 'right' }}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-link-btn"
                          aria-label={`View ${item.project} on GitHub`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
