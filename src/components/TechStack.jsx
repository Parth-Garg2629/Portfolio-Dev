import React from 'react';
import { Terminal, Laptop, Wrench } from 'lucide-react';
import config from '../config';

const techCategories = [
  {
    category: 'AI & APIs',
    techs: [
      { name: 'Gemini API', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg' },
      { name: 'Claude API', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg' },
      { name: 'OpenAI API', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg' },
      { name: 'Groq API', logo: null },
      { name: 'REST APIs', logo: null },
      { name: 'Prompt Eng.', logo: null }
    ]
  },
  {
    category: 'Frontend',
    techs: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' }
    ]
  },
  {
    category: 'Backend & DB',
    techs: [
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
    ]
  },
  {
    category: 'Tools & DevOps',
    techs: [
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
      { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' }
    ]
  },
  {
    category: 'Languages',
    techs: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'SQL', logo: null }
    ]
  }
];

function TechStack() {
  const uses = config.uses || [];

  return (
    <section className="section" id="tech-stack">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">04.</span>
          <h2 className="section-title">Tech Stack</h2>
        </div>

        <p className="techstack-subtext reveal stagger-1">
          Languages, libraries, frameworks, and developer tools powering my projects.
        </p>

        <div className="techstack-wrapper reveal">
          {techCategories.map((cat, cIdx) => (
            <div className="techstack-category" key={cIdx}>
              <h3 className="techstack-category-title">
                {cat.category}
              </h3>
              <div className="techstack-grid">
                {cat.techs.map((tech, tIdx) => (
                  <div className="tech-pill" key={tIdx}>
                    {tech.logo ? (
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="tech-logo"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement.querySelector('.tech-logo-fallback');
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="tech-logo-fallback"
                      style={{ display: tech.logo ? 'none' : 'flex' }}
                    >
                      {tech.name.charAt(0)}
                    </div>
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* My Setup / Uses List (Part D6b) */}
        {uses.length > 0 && (
          <div className="uses-section reveal stagger-3">
            <div className="uses-header">
              <Laptop size={18} className="uses-icon" />
              <h3 className="uses-title">My Setup &amp; Daily Drivers</h3>
            </div>
            <div className="uses-grid">
              {uses.map((item, uIdx) => (
                <div className="uses-card" key={uIdx}>
                  <span className="uses-category">// {item.category}</span>
                  <span className="uses-tool">{item.tool}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TechStack;
