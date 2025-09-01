const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const ssrPath = path.resolve(projectRoot, 'server', 'renderers', 'template6Renderer-ssr.js');
    const ssr = require(ssrPath);

    const data = {
      name: 'Sim User',
      title: 'Sim Title',
    };

    const html = ssr.renderTemplate6SSR(data, { meta: { title: 'Sim Template6' } }, false);

    const outDir = path.resolve(projectRoot, 'test', 'snapshots');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.resolve(outDir, 'template6-published.html');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('Snapshot saved to:', outPath);
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(2);
  }
})();
