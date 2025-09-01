const path = require('path');
const fs = require('fs');
const express = require('express');

const projectRoot = path.resolve(__dirname, '..');
const rendererPath = path.resolve(projectRoot, 'server', 'renderers', 'template5Renderer-ssr.js');
const renderTemplate5 = require(rendererPath);

const app = express();
const port = process.env.SERVE_PORT || 3002;

// Serve client build if available
const buildDir = path.resolve(projectRoot, 'client', 'build');
if (fs.existsSync(buildDir)) {
  app.use('/', express.static(buildDir));
}

app.get('/portfolio/test', (req, res) => {
  const data = {
    name: 'Hydration Smoke User',
    title: 'Hydration Smoke Test',
    about: 'Testing hydration for Template5'
  };

  // Try to locate client bundle URL from asset manifest
  let clientBundleUrl = null;
  try {
    const manifest = require(path.resolve(projectRoot, 'client', 'build', 'asset-manifest.json'));
    clientBundleUrl = manifest.files && (manifest.files['main.js'] || manifest.files['static/js/main.js']) ? (manifest.files['main.js'] || manifest.files['static/js/main.js']) : null;
    if (clientBundleUrl && !clientBundleUrl.startsWith('/')) {
      clientBundleUrl = clientBundleUrl.replace(/^\//, '');
      clientBundleUrl = '/' + clientBundleUrl;
    }
  } catch (e) {
    clientBundleUrl = null;
  }

  const html = renderTemplate5(data, { meta: { title: 'Hydration Smoke' } }, clientBundleUrl);
  res.set('Content-Type', 'text/html');
  res.send(html);
});

let server = null;
app.get('/__shutdown', (req, res) => {
  res.send('shutting down');
  setTimeout(() => {
    if (server) server.close(() => process.exit(0));
    else process.exit(0);
  }, 100);
});

server = app.listen(port, () => {
  console.log('Serve-publish-template5 running on http://localhost:' + port);
});
