const path = require('path');
const fs = require('fs');
const express = require('express');
const { renderTemplate4SSR } = require(path.resolve(__dirname, '..', 'server', 'renderers', 'template4Renderer-ssr.js'));

const projectRoot = path.resolve(__dirname, '..');
const app = express();
const port = 3002;

const data = {
  name: 'Sim Publish User',
  title: 'Simulated Publish Test',
  about: 'Snapshot for hydration test',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
};

let clientBundleUrl = null;
try {
  const manifest = require(path.resolve(projectRoot, 'client', 'build', 'asset-manifest.json'));
  clientBundleUrl = manifest.files && (manifest.files['main.js'] || manifest.files['static/js/main.js']) ? (manifest.files['main.js'] || manifest.files['static/js/main.js']) : null;
  if (clientBundleUrl && !clientBundleUrl.startsWith('/')) clientBundleUrl = '/' + clientBundleUrl.replace(/^\//, '');
} catch (e) {
  clientBundleUrl = null;
}

const html = renderTemplate4SSR(data, { hydrate: !!clientBundleUrl, clientBundleUrl: clientBundleUrl });

const buildDir = path.resolve(projectRoot, 'client', 'build');
if (fs.existsSync(buildDir)) app.use('/', express.static(buildDir));

app.get('/portfolio/test', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(html);
});

app.get('/__shutdown', (req, res) => {
  res.send('shutting down');
  server.close(() => process.exit(0));
});

const server = app.listen(port, () => {
  console.log('Serve-publish-template4 running on http://localhost:' + port);
});
