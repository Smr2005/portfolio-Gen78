const { renderTemplate1 } = require('../server/renderers/template1Renderer');
const assert = require('assert');

function run() {
  const sample = {
    name: 'Alice',
    title: 'Engineer',
    about: 'About Alice',
    email: 'alice@example.com',
    profileImage: 'https://example.com/alice.jpg',
    skills: [{ name: 'JS', level: 90 }],
    projects: [{ title: 'Proj', description: 'Desc', tech: ['React'] }],
    certifications: [{ name: 'Cert', issuer: 'Issuer', date: '2025' }]
  };

  const html = renderTemplate1(sample, { cssPath: '/templates/template1.css', hydrate: false });

  // Basic assertions
  assert(html.includes('Alice'), 'Name must appear in rendered HTML');
  assert(html.includes('Engineer'), 'Title must appear');
  assert(html.includes('About Alice'), 'About must appear');
  assert(html.includes('https://example.com/alice.jpg'), 'Profile image URL present');
  assert(html.includes('JS'), 'Skill present');

  console.log('Renderer test passed');
}

run();
