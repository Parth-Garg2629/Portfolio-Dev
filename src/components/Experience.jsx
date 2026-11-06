import React from 'react';
import config from '../config';

function Experience() {
  const experiences = config.experience;
  const journey = config.journey || [];

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">03.</span>
          <h2 className="section-title">Experience</h2>
        </div>

        <p className="section-intro reveal">
          Education, technical societies, and campus operations.
        </p>

        {/* Experience Rows */}
        <div className="experience-rows-table reveal">
          {experiences.map((exp, idx) => (
            <div className="exp-list-row" key={idx}>
              <div className="exp-row-period">{exp.period}</div>
              <div className="exp-row-body">
                <div className="exp-row-heading">
                  <h3 className="exp-row-role">{exp.role}</h3>
                  <span className="exp-row-org">{exp.org}</span>
                </div>

                <p className="exp-row-desc">{exp.description}</p>

                <ul className="exp-row-highlights">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="exp-row-highlight">
                      <span className="exp-dash">-</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-row-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span className="tag-mono" key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Milestone List */}
        {journey.length > 0 && (
          <div className="journey-section reveal">
            <h4 className="journey-title">// Journey</h4>
            <div className="journey-list">
              {journey.map((item, jIdx) => (
                <div className="journey-mono-row" key={jIdx}>
                  <span className="journey-mono-year">{item.year}</span>
                  <span className="journey-mono-sep">&mdash;</span>
                  <span className="journey-mono-text">{item.text}</span>
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
