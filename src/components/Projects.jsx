import React from 'react';
import config from '../config';

function Projects() {
  const projects = config.projects;
  const archive = config.archive || [];

  const featured = projects.find((p) => p.featured) || projects[0];
  const listProjects = projects.filter((p) => p !== featured);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">02.</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <p className="section-intro reveal">
          Selected work and software experiments. Flat, list-based inventory.
        </p>

        {/* Featured Project: One flat bordered block */}
        {featured && (
          <div className="featured-block reveal">
            <div className="featured-block-header">
              <span className="featured-badge">Featured</span>
              <span className="featured-date">{featured.date}</span>
            </div>
            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-subtitle">{featured.subtitle}</p>
            <p className="featured-desc">{featured.description}</p>
            <div className="featured-tags">
              {featured.tags.map((tag, tIdx) => (
                <span className="tag-mono" key={tIdx}>{tag}</span>
              ))}
            </div>
            <div className="featured-links">
              {featured.live && (
                <a
                  href={featured.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-mono link-primary"
                >
                  Live Demo ↗
                </a>
              )}
              {featured.github && (
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-mono"
                >
                  Code ↗
                </a>
              )}
            </div>
          </div>
        )}

        {/* Other Projects + Archive as Continuous List Rows */}
        <div className="project-rows-table reveal">
          {listProjects.map((project, idx) => (
            <div className="project-list-row" key={idx}>
              <div className="project-row-date">{project.date}</div>
              <div className="project-row-body">
                <h4 className="project-row-title">{project.title}</h4>
                <p className="project-row-desc">{project.description}</p>
                <div className="project-row-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span className="tag-mono" key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-row-links">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-mono link-primary"
                  >
                    Live ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-mono"
                  >
                    Code ↗
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Archive rows in the exact same row style */}
          {archive.map((item, aIdx) => (
            <div className="project-list-row archive-list-row" key={`arch-${aIdx}`}>
              <div className="project-row-date">{item.year}</div>
              <div className="project-row-body">
                <h4 className="project-row-title">{item.project}</h4>
                <p className="project-row-desc">Built with: {item.builtWith}</p>
                <div className="project-row-tags">
                  <span className="tag-mono">Archive</span>
                </div>
              </div>
              <div className="project-row-links">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-mono"
                  aria-label={`Code for ${item.project}`}
                >
                  Code ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
