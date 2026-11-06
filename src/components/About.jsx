import React, { useState } from 'react';
import config from '../config';

function About() {
  const [mode, setMode] = useState('short'); // Default short for everyone
  const { short, long, tags } = config.about;

  return (
    <section className="section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-label">01.</span>
          <h2 className="section-title">About Me</h2>
        </div>

        {/* Content Layout */}
        <div className="about-layout reveal">
          {/* Mode Toggle styled like CLI flags */}
          <div className="about-toggle-bar">
            <span className="about-toggle-label">view:</span>
            <button
              type="button"
              className={`cli-toggle-btn ${mode === 'short' ? 'active' : ''}`}
              onClick={() => setMode('short')}
              aria-label="View short summary"
            >
              [ --short ]
            </button>
            <button
              type="button"
              className={`cli-toggle-btn ${mode === 'long' ? 'active' : ''}`}
              onClick={() => setMode('long')}
              aria-label="View full description"
            >
              [ --long ]
            </button>
          </div>

          <div className="about-content-body">
            {mode === 'short' ? (
              <p className="about-text about-text--short">{short}</p>
            ) : (
              long.map((paragraph, pIdx) => (
                <p className="about-text" key={pIdx}>
                  {paragraph}
                </p>
              ))
            )}
          </div>

          {/* Tags Container */}
          <div className="about-tags">
            {tags.map((tag, tIdx) => (
              <span className="tag" key={tIdx}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
