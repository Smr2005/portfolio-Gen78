const express = require('express');
const router = express.Router();
const { renderTemplate1 } = require('../server/renderers/template1Renderer');

// Simple GET to return a sample rendered Template1 HTML
router.get('/render/template1', (req, res) => {
  const sample = req.query && Object.keys(req.query).length ? req.query : {
    name: 'Sample User',
    title: 'Full Stack Developer',
    about: 'This is a sample portfolio generated for testing server-side rendering.',
    email: 'sample@example.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    skills: [{ name: 'React', level: 90 }, { name: 'Node.js', level: 85 }],
    projects: [{ title: 'Demo Project', description: 'Demo description', tech: ['React','Node'] }],
    certifications: [{ name: 'Demo Cert', issuer: 'Issuer', date: '2025' }]
  };

  try {
    const html = renderTemplate1(sample, { cssPath: '/templates/template1.css', hydrate: false });
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    console.error('Debug renderer error:', err);
    res.status(500).send('Renderer error');
  }
});

// POST endpoint to render with provided JSON body
router.post('/render/template1', (req, res) => {
  try {
    const data = req.body || {};
    const html = renderTemplate1(data, { cssPath: '/templates/template1.css', hydrate: !!req.query.hydrate, clientBundleUrl: req.query.clientBundleUrl });
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    console.error('Debug renderer POST error:', err);
    res.status(500).send('Renderer error');
  }
});

module.exports = router;
