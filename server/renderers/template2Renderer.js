// Server-side renderer for Template2 (creative template)
'use strict';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderSkills(skills) {
  if (!Array.isArray(skills)) return '';
  return skills.map((s, i) => {
    const level = typeof s.level === 'number' ? s.level : 75;
    const icon = (s.category || '').includes('Design') ? '🎨' : (s.category || '').includes('Motion') ? '🎬' : (s.category || '').includes('Specialization') ? '⭐' : (s.category || '').includes('Theory') ? '📚' : '💻';
    return `
      <div class="creative-card skill-orb" style="border-radius:20px;box-shadow:0 15px 30px rgba(0,0,0,0.1);padding:20px;text-align:center;background:white;margin-bottom:16px;overflow:hidden">
        <div style="font-size:2rem;margin-bottom:12px">${escapeHtml(icon)}</div>
        <div style="font-weight:700;color:#2c3e50;margin-bottom:8px">${escapeHtml(s.name)}</div>
        <div style="margin-bottom:12px">
          <div style="height:8px;border-radius:4px;background:#f1f5f9;overflow:hidden;">
            <div style="width:${escapeHtml(level)}%;height:100%;background:linear-gradient(90deg,#ff6b6b,#feca57)"></div>
          </div>
        </div>
        <div style="font-weight:700;color:#2c3e50;margin-bottom:6px">${escapeHtml(level)}%</div>
        <div style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">${escapeHtml(s.category||'')}</div>
      </div>
    `;
  }).join('');
}

function renderProjects(projects) {
  if (!Array.isArray(projects)) return '';
  return projects.map((p, idx) => `
    <div class="creative-card project-showcase" style="border-radius:25px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08);margin-bottom:24px;background:white">
      ${p.image ? `<div style="height:280px;overflow:hidden"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" style="width:100%;height:280px;object-fit:cover"/></div>` : ''}
      <div style="padding:24px">
        <div style="margin-bottom:10px">
          <span style="background:#e2e8f0;color:#475569;padding:6px 12px;border-radius:12px;margin-right:8px;font-size:0.8rem">${escapeHtml(p.client||'')}</span>
          <span style="background:#fef3c7;color:#92400e;padding:6px 12px;border-radius:12px;font-size:0.8rem">${escapeHtml(p.year||'')}</span>
        </div>
        <h3 style="font-size:1.8rem;font-weight:800;color:#2c3e50;margin-bottom:8px">${escapeHtml(p.title)}</h3>
        <p style="color:#64748b;line-height:1.7;margin-bottom:16px">${escapeHtml(p.description||'')}</p>
        ${Array.isArray(p.awards) && p.awards.length ? `<div style="margin-bottom:12px">${p.awards.map(a=>`<span style="background:linear-gradient(45deg,#fbbf24,#f59e0b);color:white;padding:5px 10px;border-radius:12px;margin-right:6px;font-size:0.8rem">${escapeHtml(a)}</span>`).join('')}</div>` : ''}
        ${p.metrics ? `<div style="background:#f1f5f9;padding:12px;border-radius:12px;margin-bottom:12px">${Object.entries(p.metrics).map(([k,v])=>`<div style="text-align:center;padding:6px"><div style="font-weight:800;color:#2c3e50">${escapeHtml(v)}</div><div style="font-size:0.8rem;color:#64748b;text-transform:uppercase;letter-spacing:1px">${escapeHtml(k)}</div></div>`).join('')}</div>` : ''}
        ${Array.isArray(p.tech) ? `<div style="margin-bottom:12px">${p.tech.map(t=>`<span style="background:#e2e8f0;color:#475569;padding:6px 10px;border-radius:12px;margin-right:6px;font-size:0.8rem">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${p.liveLink?`<a href="${escapeHtml(p.liveLink)}" style="background:linear-gradient(45deg,#ff6b6b,#feca57);color:white;padding:10px 18px;border-radius:25px;text-decoration:none;font-weight:600">🚀 Live Project</a>`:''}
          ${p.behanceLink?`<a href="${escapeHtml(p.behanceLink)}" style="border-radius:25px;padding:10px 18px;text-decoration:none;border:1px solid #e2e8f0;color:#475569;font-weight:600">🎨 Behance</a>`:''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderExperience(experience) {
  if (!Array.isArray(experience)) return '';
  return experience.map((exp, index) => `
    <div style="border-radius:25px;box-shadow:0 15px 35px rgba(0,0,0,0.08);overflow:hidden;margin-bottom:20px;background:white">
      <div style="padding:24px;display:flex;gap:20px;align-items:center">
        <div style="flex:1">
          <div style="display:inline-block;background:linear-gradient(45deg,${index%2===0? '#ff6b6b,#feca57':'#48dbfb,#ff9ff3'}) ;color:white;padding:6px 15px;border-radius:15px;font-size:0.8rem;font-weight:600;margin-bottom:8px;text-transform:uppercase">${escapeHtml(exp.duration||'')}</div>
          <h4 style="color:#2c3e50;font-weight:800;margin:0 0 8px">${escapeHtml(exp.position||'')}</h4>
          <h5 style="color:#e74c3c;font-weight:600;margin:0 0 12px">${escapeHtml(exp.company||'')} • ${escapeHtml(exp.location||'')}</h5>
          <p style="color:#64748b;line-height:1.7;margin:0">${escapeHtml(exp.description||'')}</p>
        </div>
        <div style="width:140px;text-align:center">
          <div style="width:100px;height:100px;border-radius:50%;background:linear-gradient(45deg,${index%2===0? '#ff6b6b,#feca57':'#48dbfb,#ff9ff3'});display:flex;align-items:center;justify-content:center;color:white;font-size:2.6rem">${index===0?'🎨':index===1?'✨':'🚀'}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCerts(certs) {
  if (!Array.isArray(certs)) return '';
  return certs.map(c => `
    <div style="border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.08);padding:20px;text-align:center;background:white">
      <div style="font-size:3.5rem;margin-bottom:12px">${escapeHtml(c.logo||'📜')}</div>
      <div style="font-weight:700;color:#2c3e50;margin-bottom:6px">${escapeHtml(c.name||'')}</div>
      <div style="color:#64748b;margin-bottom:8px">${escapeHtml(c.issuer||'')}</div>
      <div style="background:linear-gradient(45deg,${Math.random()>0.5? '#ff6b6b,#feca57':'#48dbfb,#ff9ff3'});color:white;padding:8px 15px;border-radius:15px;display:inline-block">${escapeHtml(c.date||'')}</div>
    </div>
  `).join('');
}

function renderTemplate2(data, options = {}) {
  const name = escapeHtml(data.name || '');
  const title = escapeHtml(data.title || '');
  const about = escapeHtml(data.about || '');
  const profileImage = escapeHtml(data.profileImage || '');
  const cssLink = options.cssPath || '/templates/template2.css';

  const head = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${name} — ${title}</title>
    <link rel="stylesheet" href="${cssLink}">
    <style>
      /* Minimal reset used by preview (keeps published self-contained) */
      body{font-family:Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;margin:0;background:#fdf6e3;color:#2c3e50}
      .container{max-width:1100px;margin:0 auto;padding:28px}
      @media(max-width:900px){.hero-inner{flex-direction:column}}

      /* Preview animation classes and responsive helpers */
      @keyframes creativeFloat { 0%,100%{ transform: translateY(0px) rotate(0deg) scale(1);} 25%{ transform: translateY(-15px) rotate(2deg) scale(1.05);} 50%{ transform: translateY(-25px) rotate(-1deg) scale(1.1);} 75%{ transform: translateY(-10px) rotate(1deg) scale(1.05);} }
      @keyframes colorShift { 0%{ filter: hue-rotate(0deg);} 25%{ filter: hue-rotate(90deg);} 50%{ filter: hue-rotate(180deg);} 75%{ filter: hue-rotate(270deg);} 100%{ filter: hue-rotate(360deg);} }
      @keyframes morphShape { 0%,100%{ border-radius: 50% 30% 70% 40%; transform: rotate(0deg);} 25%{ border-radius: 30% 70% 40% 50%; transform: rotate(90deg);} 50%{ border-radius: 70% 40% 50% 30%; transform: rotate(180deg);} 75%{ border-radius: 40% 50% 30% 70%; transform: rotate(270deg);} }
      @keyframes slideInCreative { 0%{ transform: translateX(-100px) rotateY(-45deg) scale(0.8); opacity:0;} 100%{ transform: translateX(0) rotateY(0deg) scale(1); opacity:1;} }

      .creative-card{ transform-style: preserve-3d; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .creative-card:hover{ transform: rotateY(15deg) rotateX(10deg) translateZ(30px) scale(1.05); box-shadow: 0 30px 60px rgba(0,0,0,0.2); }
      .skill-orb{ transform-style: preserve-3d; transition: all 0.3s ease; animation: creativeFloat 6s ease-in-out infinite; }
      .skill-orb:hover{ transform: translateZ(20px) rotateY(180deg) scale(1.2); animation-play-state: paused; }
      .project-showcase{ transform-style: preserve-3d; transition: all 0.5s ease; }
      .project-showcase:hover{ transform: perspective(1000px) rotateX(10deg) rotateY(5deg) translateZ(20px); }

      @media (max-width: 768px){
        .creative-card:hover, .skill-orb:hover, .project-showcase:hover{ transform: none !important; }
        .skill-orb{ animation: none !important; }
        h1{ font-size: 2rem !important; }
        h2{ font-size: 1.5rem !important; }
        .container{ padding-left: 15px !important; padding-right: 15px !important; }
        .btn{ width: 100% !important; margin-bottom: 0.5rem !important; }
        nav{ padding: 0.5rem 0 !important; }
      }

      @media (max-width: 480px){
        h1{ font-size: 1.75rem !important; }
        h2{ font-size: 1.25rem !important; }
        .container{ padding-left: 10px !important; padding-right: 10px !important; }
        .btn{ font-size: 0.9rem !important; padding: 0.6rem 1rem !important; }
        section{ padding: 60px 0 !important; }
      }
    </style>
  `;

  const skillsHtml = renderSkills(data.skills || []);
  const projectsHtml = renderProjects(data.projects || []);
  const expHtml = renderExperience(data.experience || []);
  const certsHtml = renderCerts(data.certifications || []);

  const hydrateScript = `
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(data)};</script>
    ${options.hydrate && options.clientBundleUrl ? `<script src="${options.clientBundleUrl}"></script>` : ''}
  `;

  const body = `
    <div class="container">
      <nav style="position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,107,107,0.2);z-index:1000;padding:1rem 0">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
          <div style="font-size:1.8rem;font-weight:700;background:linear-gradient(45deg,#ff6b6b,#feca57);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${name}</div>
          <div style="display:flex;gap:1rem;align-items:center">
            <a href="#about" style="color:#2c3e50;text-decoration:none;font-weight:500">About</a>
            <a href="#experience" style="color:#2c3e50;text-decoration:none;font-weight:500">Experience</a>
            <a href="#portfolio" style="color:#2c3e50;text-decoration:none;font-weight:500">Portfolio</a>
            <a href="#skills" style="color:#2c3e50;text-decoration:none;font-weight:500">Skills</a>
            <a href="#contact" style="color:#2c3e50;text-decoration:none;font-weight:500">Contact</a>
            <a href="#resume" style="background:linear-gradient(45deg,#ff6b6b,#feca57);border-radius:25px;padding:8px 20px;color:white;text-decoration:none;font-weight:600">Resume</a>
          </div>
        </div>
      </nav>

      <section style="background:linear-gradient(45deg,#ff6b6b,#feca57,#48dbfb,#ff9ff3);min-height:100vh;position:relative;overflow:hidden;padding-top:100px;border-radius:12px;margin-top:70px">
        <div style="display:flex;gap:18px;align-items:center">
          <div style="flex:1;background:rgba(255,255,255,0.95);padding:32px;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,0.15);backdrop-filter:blur(20px)">
            <div style="display:inline-block;background:linear-gradient(45deg,#ff6b6b,#feca57);color:white;padding:8px 20px;border-radius:20px;font-weight:600;margin-bottom:16px;text-transform:uppercase">Creative Professional</div>
            <h1 style="font-size:2.5rem;font-weight:800;color:#2c3e50;margin:12px 0">${name}</h1>
            <h2 style="color:#e74c3c;font-style:italic;font-weight:400;margin-bottom:16px">${title}</h2>
            <p style="color:#34495e;line-height:1.8;margin-bottom:20px">${about}</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              <a href="#portfolio" style="background:linear-gradient(45deg,#e74c3c,#f39c12);color:white;padding:12px 25px;border-radius:30px;text-decoration:none;font-weight:600">🎨 View Portfolio</a>
              <a href="#contact" style="border:2px solid #e74c3c;color:#e74c3c;padding:10px 23px;border-radius:30px;text-decoration:none;font-weight:600">💬 Let's Talk</a>
            </div>
            <div style="display:flex;gap:18px;margin-top:18px">
              ${data.behance?`<a href="${escapeHtml(data.behance)}" style="color:#e74c3c;font-size:1.8rem;text-decoration:none">🎨</a>`:''}
              ${data.dribbble?`<a href="${escapeHtml(data.dribbble)}" style="color:#e74c3c;font-size:1.8rem;text-decoration:none">🏀</a>`:''}
              ${data.linkedin?`<a href="${escapeHtml(data.linkedin)}" style="color:#e74c3c;font-size:1.8rem;text-decoration:none">💼</a>`:''}
            </div>
          </div>
          <div style="width:400px;text-align:center">
            ${profileImage?`<div style="position:relative;width:350px;height:350px;margin:0 auto"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:350px;height:350px;background:linear-gradient(45deg,rgba(255,255,255,0.2),rgba(255,255,255,0.1));border-radius:50%"></div><img src="${profileImage}" alt="${name}" style="width:300px;height:300px;border-radius:50%;object-fit:cover;border:8px solid rgba(255,255,255,0.3);box-shadow:0 25px 50px rgba(0,0,0,0.2);z-index:2;position:relative"/></div>`:''}
          </div>
        </div>
      </section>

      <section id="about" style="padding:80px 0;background:white">
        <div style="text-align:center;margin-bottom:32px">
          <h2 style="font-size:2.5rem;font-weight:800;color:#2c3e50;margin-bottom:8px">About Me</h2>
          <div style="width:80px;height:6px;background:linear-gradient(45deg,#ff6b6b,#feca57);margin:0 auto;border-radius:3px"></div>
        </div>
        <div style="max-width:900px;margin:0 auto;text-align:center;color:#64748b;font-size:1.1rem">${about}</div>
      </section>

      <section id="experience" style="padding:40px 0;background:#f8fafc">
        <div style="max-width:1000px;margin:0 auto">${expHtml}</div>
      </section>

      <section id="skills" style="padding:40px 0;background:white">
        <div style="max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px">${skillsHtml}</div>
      </section>

      <section id="portfolio" style="padding:40px 0;background:#f8fafc">
        <div style="max-width:1000px;margin:0 auto">${projectsHtml}</div>
      </section>

      <section id="certs" style="padding:40px 0;background:white">
        <div style="max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">${certsHtml}</div>
      </section>

      <section id="contact" style="padding:60px 0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-align:center">
        <div style="font-size:4rem;margin-bottom:20px">💌</div>
        <h2 style="font-size:2rem;font-weight:800;margin-bottom:12px">Let's Create Something Amazing</h2>
        <p style="font-size:1.1rem;opacity:0.9">Ready to bring your creative vision to life? Let's collaborate and make magic happen!</p>
        <div style="display:flex;justify-content:center;gap:24px;margin:24px 0;flex-wrap:wrap">
          <div style="background:rgba(255,255,255,0.2);padding:18px;border-radius:16px">📧<div style="font-weight:600">${escapeHtml(data.email||'')}</div></div>
          <div style="background:rgba(255,255,255,0.2);padding:18px;border-radius:16px">📱<div style="font-weight:600">${escapeHtml(data.phone||'')}</div></div>
          <div style="background:rgba(255,255,255,0.2);padding:18px;border-radius:16px">📍<div style="font-weight:600">${escapeHtml(data.location||'')}</div></div>
        </div>
        <a href="mailto:${escapeHtml(data.email||'')}" style="background:rgba(255,255,255,0.2);border:2px solid white;color:white;padding:12px 30px;border-radius:30px;text-decoration:none;font-weight:600">🚀 Start a Project</a>
      </section>

    </div>
    ${hydrateScript}
  `;

  return `<!doctype html><html lang="en"><head>${head}</head><body>${body}</body></html>`;
}

module.exports = { renderTemplate2 };
