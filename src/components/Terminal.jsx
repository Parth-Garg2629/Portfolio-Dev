import React, { useState, useRef, useEffect } from 'react';
import config from '../config';

const THEMES = ['amber', 'hacker', 'matrix', 'dracula', 'tokyo-night'];

const COMMANDS = [
  'help',
  'whoami',
  'about',
  'projects',
  'skills',
  'experience',
  'social',
  'github',
  'resume',
  'contact',
  'email',
  'date',
  'clear',
  'theme',
  'sudo'
];

function Terminal() {
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: "Welcome to CHRONIX terminal. Type 'help' to see available commands."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Set initial theme from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('chronix-theme') || 'amber';
    if (THEMES.includes(saved)) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const handleCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { type: 'input', content: '' }]);
      return;
    }

    // Append to command history for arrow navigation
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (cmd) {
      case 'help':
        output = [
          'AVAILABLE COMMANDS:',
          '  whoami         - View bio, role, college, and location',
          '  about          - Read owner overview summary',
          '  projects       - List portfolio projects (type project # or name for details)',
          '  skills         - View languages, frontend, backend, tools, and AI',
          '  experience     - Academic milestones and leadership roles',
          '  social         - List social network and presence links',
          '  github         - Open GitHub profile in new tab',
          '  resume         - Open resume PDF in new tab',
          '  contact        - Scroll to contact section',
          '  email          - Display owner email address',
          '  theme <name>   - Switch theme: amber, hacker, matrix, dracula, tokyo-night',
          '  date           - Show current timestamp',
          '  clear          - Clear terminal screen'
        ].join('\n');
        break;

      case 'whoami':
        output = `${config.personal.name} (${config.personal.brand})\nRole:     ${config.personal.role}\nCollege:  ${config.personal.college}\nLocation: ${config.personal.location}\nStatus:   ${config.personal.availability}`;
        break;

      case 'about':
        output = config.about.short;
        break;

      case 'projects':
        if (args.length > 0) {
          const query = args.join(' ').toLowerCase();
          const target = config.projects.find(
            (p) => p.number === query || p.number === `0${query}` || p.title.toLowerCase().includes(query)
          );
          if (target) {
            output = `[${target.number}] ${target.title} — ${target.subtitle}\nTech Stack:  ${target.tags.join(', ')}\nDescription: ${target.description}\nCode:        ${target.github}${target.live ? `\nLive Demo:   ${target.live}` : ''}`;
          } else {
            output = `Project '${args.join(' ')}' not found. Type 'projects' to see all list.`;
          }
        } else {
          output = config.projects
            .map((p) => `  ${p.number}. ${p.title} — ${p.subtitle}`)
            .join('\n') + `\n\nType 'projects <number>' (e.g. 'projects 1') for full project details.`;
        }
        break;

      case '1':
      case '2':
      case '3':
      case '4': {
        const num = `0${cmd}`;
        const target = config.projects.find((p) => p.number === num);
        if (target) {
          output = `[${target.number}] ${target.title} — ${target.subtitle}\nTech Stack:  ${target.tags.join(', ')}\nDescription: ${target.description}\nCode:        ${target.github}${target.live ? `\nLive Demo:   ${target.live}` : ''}`;
        }
        break;
      }

      case 'skills':
        output = [
          'LANGUAGES: C++, Python, Java, JavaScript, SQL',
          'FRONTEND:  React 18, HTML5, CSS3, Vite',
          'BACKEND:   Node.js, Express.js, REST APIs, Socket.io',
          'DATABASES: PostgreSQL, MongoDB, Supabase, SQLite',
          'TOOLS:     Git, GitHub, Docker, Postman, Figma, Vercel',
          'AI:        Google Gemini API, Claude API, OpenAI API, Groq'
        ].join('\n');
        break;

      case 'experience':
        output = config.experience
          .map((e) => `[${e.period}] ${e.role} @ ${e.org}\n  ${e.highlights.join(' | ')}`)
          .join('\n\n');
        break;

      case 'social':
        output = [
          `GitHub:   ${config.personal.githubUrl}`,
          `LinkedIn: ${config.personal.linkedinUrl}`,
          `Email:    ${config.personal.email}`
        ].join('\n');
        break;

      case 'github':
        window.open(config.personal.githubUrl, '_blank', 'noopener,noreferrer');
        output = `Opening GitHub: ${config.personal.githubUrl} ...`;
        break;

      case 'resume':
        window.open(config.personal.resumePath, '_blank', 'noopener,noreferrer');
        output = `Opening Resume: ${config.personal.resumePath} ...`;
        break;

      case 'contact': {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          output = 'Scrolling to contact section...';
        } else {
          output = `Reach out directly at ${config.personal.email}`;
        }
        break;
      }

      case 'email':
        output = config.personal.email;
        break;

      case 'date':
        output = new Date().toLocaleString();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'theme': {
        if (args.length === 0) {
          const current = document.documentElement.getAttribute('data-theme') || 'amber';
          output = `Current theme: ${current}\nAvailable themes: ${THEMES.join(', ')}\nUsage: theme <name> (e.g. 'theme hacker')`;
        } else {
          const chosen = args[0].toLowerCase();
          if (THEMES.includes(chosen)) {
            document.documentElement.setAttribute('data-theme', chosen);
            localStorage.setItem('chronix-theme', chosen);
            output = `Theme switched to '${chosen}'.`;
          } else {
            output = `Unknown theme '${chosen}'. Available themes: ${THEMES.join(', ')}`;
          }
        }
        break;
      }

      case 'sudo':
        output = 'Permission denied: nice try.';
        break;

      default:
        // Match project title if typed directly
        const matchedProj = config.projects.find(
          (p) => p.title.toLowerCase() === trimmed.toLowerCase()
        );
        if (matchedProj) {
          output = `[${matchedProj.number}] ${matchedProj.title} — ${matchedProj.subtitle}\nTech Stack:  ${matchedProj.tags.join(', ')}\nDescription: ${matchedProj.description}\nCode:        ${matchedProj.github}${matchedProj.live ? `\nLive Demo:   ${matchedProj.live}` : ''}`;
        } else {
          output = `Command not found: ${cmd}. Type 'help'.`;
        }
        break;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', content: trimmed },
      { type: 'output', content: output }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;

      if (current.startsWith('theme ')) {
        const sub = current.slice(6).trim();
        const themeMatch = THEMES.find((t) => t.startsWith(sub));
        if (themeMatch) {
          setInputVal(`theme ${themeMatch}`);
        }
        return;
      }

      const match = COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const chips = ['help', 'whoami', 'projects', 'theme hacker', 'clear'];

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-window-buttons">
          <span className="term-dot term-dot--red" />
          <span className="term-dot term-dot--yellow" />
          <span className="term-dot term-dot--green" />
        </div>
        <div className="terminal-title">visitor@chronix:~</div>
        <div className="terminal-status">bash 5.2</div>
      </div>

      <div className="terminal-screen">
        {history.map((line, idx) => (
          <div key={idx} className={`terminal-line ${line.type}`}>
            {line.type === 'input' ? (
              <span className="terminal-cmd-display">
                <span className="terminal-prompt">visitor@chronix:~$</span> {line.content}
              </span>
            ) : (
              <pre className="terminal-output-text">{line.content}</pre>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="terminal-input-row">
          <span className="terminal-prompt">visitor@chronix:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-real-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <span className="terminal-blinking-cursor" />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Suggestion Chips under Terminal */}
      <div className="terminal-chips-bar" onClick={(e) => e.stopPropagation()}>
        <span className="terminal-chip-label">Suggestions:</span>
        {chips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            className="terminal-chip"
            onClick={() => handleCommand(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Terminal;
