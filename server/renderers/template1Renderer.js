// Server-side renderer for Template1
// Produces a static HTML string from portfolio data.
'use strict';

function escapeHtml(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderSkills(skills) {
  if (!Array.isArray(skills)) return '';
  return skills.map(s => `
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-weight:600">${escapeHtml(s.name)}<span style="opacity:.7">${escapeHtml(s.level || '')}%</span></div>
      <div style="background:#e6eefc;border-radius:8px;height:10px;overflow:hidden;margin-top:6px"><div style="width:${escapeHtml(s.level || 0)}%;background:#667eea;height:100%"></div></div>
    </div>
  `).join('');
}

function renderProjects(projects) {
  if (!Array.isArray(projects)) return '';
  return projects.map(p => `
    <article style="border-radius:10px;box-shadow:0 10px 20px rgba(2,6,23,0.06);overflow:hidden;margin-bottom:18px;background:white">
      ${p.image ? `<div style="height:200px;background:#f3f4f6"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" style="width:100%;height:200px;object-fit:cover"/></div>` : ''}
      <div style="padding:16px">
        <h3 style="margin:0 0 6px 0">${escapeHtml(p.title)}</h3>
        <p style="margin:0 0 8px 0;color:#475569">${escapeHtml(p.description || '')}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${(p.tech||[]).map(t => `<span style="background:#eef2ff;padding:6px 8px;border-radius:6px;font-size:13px">${escapeHtml(t)}</span>`).join('')}</div>
      </div>
    </article>
  `).join('');
}

function renderCerts(certs) {
  if (!Array.isArray(certs)) return '';
  return certs.map(c => `
    <div style="border-radius:8px;border:1px solid #eef2ff;padding:12px;background:white;margin-bottom:12px">
      <div style="font-weight:600">${escapeHtml(c.name)}</div>
      <div style="color:#64748b;font-size:13px">${escapeHtml(c.issuer)} • ${escapeHtml(c.date)}</div>
    </div>
  `).join('');
}

function renderTemplate1(data, options = {}) {
  const name = escapeHtml(data.name || '');
  const title = escapeHtml(data.title || '');
  const about = escapeHtml(data.about || '');
  const email = escapeHtml(data.email || '');
  const profileImage = escapeHtml(data.profileImage || '');

  // Link to shared CSS under /templates/template1.css served from server/public
  const cssLink = options.cssPath || '/templates/template1.css';
  const head = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${name} - ${title}</title>
    <meta name="description" content="${escapeHtml(data.meta?.description || '')}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="${cssLink}">
  `;

  const skillsHtml = renderSkills(data.skills || []);
  const projectsHtml = renderProjects(data.projects || []);
  const certsHtml = renderCerts(data.certifications || []);

  // Attach serialized data for optional hydration
  const serialized = JSON.stringify(data || {});

  const hydrateScript = `
    <script>window.__PORTFOLIO_DATA__ = ${serialized};</script>
    ${options.hydrate && options.clientBundleUrl ? `<script src="${options.clientBundleUrl}"></script>` : ''}
  `;

  const body = `
    <div class="container">
      <header style="margin-bottom:18px">
        <h1 style="margin:0;font-size:22px">${name}</h1>
        <div style="color:#64748b">${title}</div>
      </header>

      <section class="hero">
        <div class="grid">
          <div>
            <h2 style="margin-top:0">Hi, I'm ${name}</h2>
            <p style="max-width:70%">${about}</p>
            <div style="margin-top:12px"><a href="mailto:${email}" style="color:white;text-decoration:underline">Contact</a></div>
          </div>
          <div style="text-align:center">
            ${profileImage ? `<img src="${profileImage}" alt="${name}" style="width:320px;height:320px;object-fit:cover;border-radius:12px;box-shadow:0 20px 40px rgba(2,6,23,0.08)"/>` : ''}
          </div>
        </div>
      </section>

      <main style="margin-top:18px;display:grid;grid-template-columns:2fr 1fr;gap:18px">
        <div>
          <section>
            <h3>Experience</h3>
            ${(data.experience || []).map(exp => `
              <div style="margin-bottom:12px;padding:12px;border-radius:10px;background:white;box-shadow:0 6px 18px rgba(2,6,23,0.04)">
                <div style="font-weight:700">${escapeHtml(exp.position || '')} • ${escapeHtml(exp.company || '')}</div>
                <div style="color:#6b7280;font-size:13px">${escapeHtml(exp.duration||'')} • ${escapeHtml(exp.location||'')}</div>
                <p style="margin:8px 0 0 0;color:#334155">${escapeHtml(exp.description||'')}</p>
              </div>
            `).join('')}
          </section>

          <section style="margin-top:18px">
            <h3>Projects</h3>
            ${projectsHtml}
          </section>
        </div>
        <aside>
          <section style="margin-bottom:14px">
            <h4 style="margin-bottom:8px">Skills</h4>
            <div style="background:transparent;padding:8px">${skillsHtml}</div>
          </section>

          <section style="margin-bottom:14px">
            <h4 style="margin-bottom:8px">Certifications</h4>
            ${certsHtml}
          </section>
        </aside>
      </main>
    </div>
  ${hydrateScript}
  `;

  return `<!doctype html><html lang="en"><head>${head}</head><body>${body}</body></html>`;
}

module.exports = { renderTemplate1 };
