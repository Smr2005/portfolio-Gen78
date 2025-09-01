const path = require('path');
const { createRequire } = require('module');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const clientPkg = path.resolve(projectRoot, 'client', 'package.json');
    const clientRequire = createRequire(clientPkg);

    // Load SSR renderer we added
    const ssr = require(path.resolve(projectRoot, 'server', 'renderers', 'template3Renderer-ssr.js'));

    // Minimal test data
    const data = {
      name: 'Smoke Test User',
      title: 'Smoke Tester',
      about: 'This is a smoke test.'
    };

    // Render via our SSR renderer
    const ssrHtml = ssr.renderTemplate3SSR(data, { hydrate: false });

    // Ensure inlined CSS is present in head
    if (!/professionalSlide/.test(ssrHtml)) {
      console.error('FAILED: inlined CSS keyframes not found in SSR output');
      process.exit(1);
    }

    // Extract inner markup produced by SSR (inside div#root)
    const match = ssrHtml.match(/<div id="root">([\s\S]*?)<\/div>/i);
    if (!match) {
      console.error('FAILED: Could not find <div id="root"> in SSR output');
      process.exit(1);
    }
    const ssrInner = match[1];

    // Now render the real client component directly using client react-dom/server
    const React = clientRequire('react');
    const ReactDOMServer = clientRequire('react-dom/server');
    const Template3 = clientRequire(path.resolve(projectRoot, 'client', 'src', 'templates', 'Template3.js')).default;

    const element = React.createElement(Template3, { isPreview: false, userData: data });
    const directInner = ReactDOMServer.renderToString(element);

    // Normalize whitespace for comparison
    const normalize = s => s.replace(/\s+/g, ' ').trim();

    if (normalize(ssrInner) !== normalize(directInner)) {
      console.error('FAILED: SSR renderer output does not match direct component render.');
      // Print short diffs
      console.error('--- SSR (excerpt) ---');
      console.error(ssrInner.slice(0, 800));
      console.error('--- DIRECT (excerpt) ---');
      console.error(directInner.slice(0, 800));
      process.exit(1);
    }

    console.log('PASS: SSR renderer matches direct React render and includes inlined CSS.');
    process.exit(0);
  } catch (err) {
    console.error('ERROR running smoke test:', err);
    process.exit(2);
  }
})();
