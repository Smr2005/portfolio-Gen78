const path = require('path');
const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const rendererPath = path.resolve(projectRoot, 'server', 'renderers', 'template4Renderer-ssr.js');
    const { renderTemplate4SSR } = require(rendererPath);

    // Minimal data to render
    const data = {
      name: 'Sim Publish User',
      title: 'Simulated Publish Test',
      about: 'Snapshot for end-to-end test',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    };

    // Attempt to locate client build manifest for hydrate bundle
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

    const html = renderTemplate4SSR(data, { hydrate: !!clientBundleUrl, clientBundleUrl: clientBundleUrl });

    // Start a small server to serve client/build and the rendered page
    const app = express();
    const port = 3002;

    const buildDir = path.resolve(projectRoot, 'client', 'build');
    if (fs.existsSync(buildDir)) {
      app.use('/', express.static(buildDir));
    }

    app.get('/portfolio/test', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.send(html);
    });

    const server = app.listen(port, async () => {
      console.log('Sim server running on http://localhost:' + port);

      // Fetch the page to snapshot
      const resp = await fetch(`http://localhost:${port}/portfolio/test`);
      const body = await resp.text();

      const snapshotDir = path.resolve(projectRoot, 'test', 'snapshots');
      if (!fs.existsSync(snapshotDir)) fs.mkdirSync(snapshotDir, { recursive: true });
      const snapshotPath = path.resolve(snapshotDir, 'template4-published.html');
      fs.writeFileSync(snapshotPath, body, 'utf8');

      console.log('Snapshot saved to:', snapshotPath);

      const excerpt = body.slice(0, 800);
      console.log('\n--- Excerpt (first 800 chars) ---\n', excerpt);

      // Shutdown server
      server.close(() => {
        console.log('Sim server stopped');
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Error running publish sim for template4:', err);
    process.exit(2);
  }
})();
