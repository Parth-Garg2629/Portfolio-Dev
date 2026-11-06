import React from 'react';
import config from '../config';

const techCategories = [
  {
    category: 'AI & APIs',
    techs: ['Gemini API', 'Claude API', 'OpenAI API', 'Groq', 'REST APIs', 'Prompt Engineering']
  },
  {
    category: 'Frontend',
    techs: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Vite']
  },
  {
    category: 'Backend & DB',
    techs: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Supabase', 'Docker', 'SQLite']
  },
  {
    category: 'Tools & DevOps',
    techs: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Figma', 'Postman']
  },
  {
    category: 'Languages',
    techs: ['C++', 'Python', 'Java', 'SQL']
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

        <p className="section-intro reveal">
          Languages, frameworks, systems, and tools I build with.
        </p>

        {/* Categories as Plain Text Config Lines */}
        <div className="tech-text-block reveal">
          {techCategories.map((cat, cIdx) => (
            <div className="tech-config-line" key={cIdx}>
              <span className="tech-category-label">// {cat.category}</span>
              <span className="tech-category-items">
                {cat.techs.join(', ')}
              </span>
            </div>
          ))}
        </div>

        {/* My Setup / Uses in the Same Text Style */}
        {uses.length > 0 && (
          <div className="uses-text-section reveal">
            <h4 className="uses-title">// Daily Drivers</h4>
            <div className="uses-text-block">
              {uses.map((item, uIdx) => (
                <div className="uses-text-line" key={uIdx}>
                  <span className="uses-label">{item.category}:</span>
                  <span className="uses-val">{item.tool}</span>
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
