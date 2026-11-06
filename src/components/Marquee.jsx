import React from 'react';
import config from '../config';

function Marquee() {
  const items = config.marquee || [
    "Full-Stack Developer",
    "IIIT Kota CSE '28",
    "React 18 & Vite",
    "Node.js & Express",
    "Docker & PostgreSQL",
    "Gemini & Claude APIs",
    "250+ DSA Solved",
    "Built From Scratch"
  ];

  // Duplicate items for continuous scroll effect
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-content">
        {repeatedItems.map((item, idx) => (
          <span className="marquee-item" key={idx}>
            <span className="marquee-dot">◆</span>
            <span className="marquee-text">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
