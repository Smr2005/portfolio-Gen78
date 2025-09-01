const { renderTemplate1 } = require('../server/renderers/template1Renderer');
const manifest = require('../client/build/asset-manifest.json');
const frontend = 'http://localhost:3000';
const url = frontend + manifest.files['main.js'];
const sample = {
  name: 'Test User',
  title: 'Developer',
  about: 'This is a test about',
  email: 'test@example.com',
  profileImage: 'https://example.com/img.png',
  skills: [{ name: 'JS', level: 90 }],
  projects: [],
  experience: []
};

const html = renderTemplate1(sample, { cssPath: '/templates/template1.css', hydrate: true, clientBundleUrl: url });
const injected = html.includes(url);
const dataMatch = html.match(/window\.__PORTFOLIO_DATA__\s*=\s*(\{[\s\S]*?\})\s*;/);
if (!injected) console.log('INJECT_FAIL'); else console.log('INJECT_OK');
if (dataMatch) {
  try {
    const parsed = JSON.parse(dataMatch[1]);
    console.log(parsed.name === sample.name ? 'DATA_OK' : 'DATA_MISMATCH');
  } catch (e) {
    console.log('DATA_PARSE_ERROR');
  }
} else console.log('DATA_MISSING');
