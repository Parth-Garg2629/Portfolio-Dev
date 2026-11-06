import React, { useState } from 'react';
import { Brain, Code2, Layers, Zap } from 'lucide-react';
import config from '../config';

function About() {
  const [mode, setMode] = useState('short'); // Default short for everyone
  const { short, long, tags, traits } = config.about;

  const traitIcons = [
    <Brain className="about-card-icon" size={24} key="brain" />,
    <Code2 className="about-card-icon" size={24} key="code" />,
    <Layers className="about-card-icon" size={24} key="layers" />,
    <Zap className="about-card-icon" size={24} key="zap" />
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-label">01.</span>
          <h2 className="section-title">About Me</h2>
        </div>

        {/* Content Layout */}
        <div className="about-grid">
          {/* Left Text Column */}
          <div className="about-left reveal">
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

          {/* Right Grid Column */}
          <div className="about-right grid-2x2 reveal stagger-2">
            {traits.map((card, index) => (
              <div className="about-card" key={index}>
                <div className="about-card-icon-wrapper">
                  {traitIcons[index % traitIcons.length]}
                </div>
                <h3 className="about-card-title">{card.title}</h3>
                <p className="about-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
