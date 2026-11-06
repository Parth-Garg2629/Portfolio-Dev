import React from 'react';
import { GraduationCap, Briefcase, GitBranch, ExternalLink, Milestone, CheckCircle2 } from 'lucide-react';
import config from '../config';

function Experience() {
  const experiences = config.experience;
  const journey = config.journey || [];

  const getFallbackIcon = (type) => {
    switch (type) {
      case 'Education':
        return GraduationCap;
      case 'Leadership':
        return Briefcase;
      default:
        return GitBranch;
    }
  };

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">03.</span>
          <h2 className="section-title">Experience</h2>
        </div>

        <p className="experience-subtext reveal stagger-1">
          Academic foundation, engineering leadership, and campus community stewardship.
        </p>

        <div className="exp-cards-list">
          {experiences.map((exp, idx) => {
            const Icon = getFallbackIcon(exp.type);
            return (
              <div className="exp-card reveal" key={idx}>
                <div className="exp-card-left">
                  <div className="exp-emoji">{exp.emoji || '💼'}</div>
                  <div className="exp-period-badge">{exp.period}</div>
                  <div className="exp-type-label">{exp.type}</div>
                </div>

                <div className="exp-card-right">
                  <div className="exp-card-header">
                    <div>
                      <h3 className="exp-role">{exp.role}</h3>
                      <p className="exp-org">{exp.org}</p>
                    </div>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exp-link-btn"
                        aria-label={`External link for ${exp.role}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  <p className="exp-desc">{exp.description}</p>

                  <ul className="exp-highlights">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="exp-highlight-item">
                        <span className="exp-bullet">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="exp-tags">
                    {exp.tags.map((tag, tIdx) => (
                      <span className="tag" key={tIdx}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Journey Milestone List (Part D6a) */}
        {journey.length > 0 && (
          <div className="journey-section reveal stagger-3">
            <div className="journey-header">
              <Milestone size={18} className="journey-icon" />
              <h3 className="journey-title">Journey &amp; Milestones</h3>
            </div>
            <div className="journey-timeline">
              {journey.map((item, jIdx) => (
                <div className="journey-item" key={jIdx}>
                  <div className="journey-marker">
                    <span className="journey-dot" />
                    {jIdx < journey.length - 1 && <span className="journey-line" />}
                  </div>
                  <div className="journey-content">
                    <span className="journey-year">{item.year}</span>
                    <span className="journey-text">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
