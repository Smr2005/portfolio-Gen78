// Minimal restored server to validate Template 1 rendering and unblock work.
const express = require('express');
const app = express();

function getFrontendUrl() {
  return process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://portfolio-gen-i1bg.onrender.com' : 'http://localhost:3000');
}

function generateTemplate1HTML(data = {}, meta = {}) {
  const name = data.name || 'Sample User';
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${meta.title || name + ' - Portfolio'}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body{font-family:Inter,Segoe UI,system-ui;background:#f8fafc}
    header{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:80px 0;text-align:center}
    img.profile{width:150px;height:150px;object-fit:cover;border:5px solid #fff}
  </style>
</head>
<body>
  <header>
    <div class="container">
      ${data.profileImage ? `<img class="profile" src="${data.profileImage}" alt="${name}">` : ''}
      <h1>${name}</h1>
      <p>${data.title || ''}</p>
    </div>
  </header>
  <main class="container py-5">
    <h2>About</h2>
    <p>${data.about || ''}</p>
    ${data.skills && data.skills.length ? `<h3>Skills</h3><div class="row">${data.skills.map(s=>`<div class="col-md-4"><div class="p-3 border mb-3"><strong>${s.name||s}</strong>${s.level?`<div class="progress mt-2"><div class="progress-bar" style="width:${s.level}%;background:linear-gradient(90deg,#667eea,#764ba2)">${s.level}%</div></div>`:''}</div></div>`).join('')}</div>` : ''}
  </main>
  <footer style="background:#222;color:#fff;padding:30px;text-align:center">&copy; ${new Date().getFullYear()} ${name} — <a href="${getFrontendUrl()}" style="color:#bbb">Portfolio Generator</a></footer>
</body>
</html>`;
}

app.get('/portfolio/test', (req, res) => {
  const sample = {
    name: 'Sample User',
    title: 'Marketing Specialist',
    about: 'I build growth-focused marketing campaigns and data-driven creative.',
    profileImage: '',
    skills: [{ name: 'SEO', level: 90 }, { name: 'Growth', level: 85 }]
  };
  res.send(generateTemplate1HTML(sample, { title: 'Sample Portfolio' }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
