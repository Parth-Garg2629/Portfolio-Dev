import React from 'react';
import config from '../config';

function WebPresence() {
  const { linkedinUrl, githubUrl, leetcodeUsername, email } = config.personal;

  const presenceLinks = [
    {
      title: 'LinkedIn',
      sub: 'CONNECT',
      href: linkedinUrl,
      meta: 'linkedin.com/in/raghvendra-singh'
    },
    {
      title: 'GitHub',
      sub: 'COMMIT',
      href: githubUrl,
      meta: 'github.com/Chronix6996'
    },
    ...(leetcodeUsername
      ? [
          {
            title: 'LeetCode',
            sub: 'COMPETE',
            href: `https://leetcode.com/u/${leetcodeUsername}`,
            meta: `leetcode.com/${leetcodeUsername}`
          }
        ]
      : []),
    {
      title: 'Email',
      sub: 'REACH OUT',
      href: `mailto:${email}`,
      meta: email
    }
  ];

  return (
    <section className="section" id="web-presence">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">07.</span>
          <h2 className="section-title">Web Presence</h2>
        </div>

        <p className="section-intro reveal">
          Profiles and contact endpoints across the network.
        </p>

        <div className="presence-flat-grid reveal">
          {presenceLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="presence-flat-card"
            >
              <div className="presence-card-topline">
                <span className="presence-card-sub">{item.sub}</span>
                <span className="presence-arrow">↗</span>
              </div>
              <div className="presence-card-title">{item.title}</div>
              <div className="presence-card-meta">{item.meta}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WebPresence;
