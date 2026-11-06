import React from 'react';
import { Github, Linkedin, Mail, Code } from 'lucide-react';
import config from '../config';

function SideRails() {
  const { githubUrl, linkedinUrl, leetcodeUsername, email } = config.personal;

  return (
    <div className="side-rails-container" aria-hidden="true">
      {/* Left Rail: Social Icons */}
      <div className="side-rail side-rail--left">
        <ul className="side-rail-list">
          <li>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="side-rail-link"
            >
              <Github size={18} />
            </a>
          </li>
          <li>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="side-rail-link"
            >
              <Linkedin size={18} />
            </a>
          </li>
          {leetcodeUsername && (
            <li>
              <a
                href={`https://leetcode.com/u/${leetcodeUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                className="side-rail-link"
              >
                <Code size={18} />
              </a>
            </li>
          )}
          <li>
            <a
              href={`mailto:${email}`}
              aria-label="Email Raghvendra Singh"
              className="side-rail-link"
            >
              <Mail size={18} />
            </a>
          </li>
        </ul>
        <div className="side-rail-line" />
      </div>

      {/* Right Rail: Vertical Email */}
      <div className="side-rail side-rail--right">
        <a
          href={`mailto:${email}`}
          className="side-rail-email"
          aria-label={`Email ${email}`}
        >
          {email}
        </a>
        <div className="side-rail-line" />
      </div>
    </div>
  );
}

export default SideRails;
