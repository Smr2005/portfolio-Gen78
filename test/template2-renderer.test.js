const { renderTemplate2 } = require('../server/renderers/template2Renderer');
const assert = require('assert');

function run() {
  const sample = {
    name: 'Bob',
    title: 'Designer',
    about: 'About Bob',
    profileImage: 'https://example.com/bob.jpg',
    skills: [{ name: 'Design', level: 88 }],
    projects: [{ title: 'DesignWork', description: 'Desc', tech: ['Figma'] }],
    certifications: [{ name: 'Design Cert', issuer: 'Issuer', date: '2024' }]
  };

  const html = renderTemplate2(sample, { cssPath: '/templates/template2.css', hydrate: false });

  assert(html.includes('Bob'), 'Name must appear');
  assert(html.includes('Designer'), 'Title must appear');
  assert(html.includes('DesignWork'), 'Project must appear');

  console.log('Template2 renderer test passed');
}

run();
