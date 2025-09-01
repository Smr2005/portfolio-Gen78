const path = require('path');
const { createRequire } = require('module');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const clientPkg = path.resolve(projectRoot, 'client', 'package.json');
    const clientRequire = createRequire(clientPkg);

    const ssr = require(path.resolve(projectRoot, 'server', 'renderers', 'template5Renderer-ssr.js'));
    const data = { name: 'Smoke Test User', title: 'Tester' };

    const ssrHtml = ssr.renderTemplate5SSR(data, { meta: { title: 'test' } }, false);
    const rootStart = ssrHtml.indexOf('<div id="root">');
    let ssrInner = ssrHtml;
    if (rootStart !== -1) {
      const afterRoot = rootStart + '<div id="root">'.length;
      const hydrateScriptStart = ssrHtml.indexOf('<script>window.__PORTFOLIO_DATA__', afterRoot);
      let endSearchPos = hydrateScriptStart !== -1 ? hydrateScriptStart : ssrHtml.indexOf('</body>', afterRoot);
      if (endSearchPos === -1) endSearchPos = ssrHtml.length;
      const lastClose = ssrHtml.lastIndexOf('</div>', endSearchPos);
      if (lastClose !== -1 && lastClose > afterRoot) {
        ssrInner = ssrHtml.slice(afterRoot, lastClose);
      } else {
        ssrInner = ssrHtml.slice(afterRoot, endSearchPos);
      }
    }

    const React = clientRequire('react');
    const ReactDOMServer = clientRequire('react-dom/server');
    const Template5 = clientRequire(path.resolve(projectRoot, 'client', 'src', 'templates', 'Template5.js'));
    const Template5Comp = Template5 && Template5.default ? Template5.default : Template5;

    const element = React.createElement(Template5Comp, { isPreview: false, userData: data });
    const directInner = ReactDOMServer.renderToString(element);

    const normalize = s => s.replace(/\s+/g, ' ').trim();
    const a = normalize(ssrInner);
    const b = normalize(directInner);

    console.log('lengths:', a.length, b.length);
    if (a === b) {
      console.log('MATCH');
      process.exit(0);
    }

    const len = Math.min(a.length, b.length);
    let idx = -1;
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) { idx = i; break; }
    }
    if (idx === -1) idx = len;

    console.log('first diff index:', idx);
    console.log('context SSR:', a.slice(Math.max(0, idx-80), idx+80));
    console.log('context DIRECT:', b.slice(Math.max(0, idx-80), idx+80));

    console.log('\n--- SSR excerpt (500) ---\n', a.slice(Math.max(0, idx-200), idx+300));
    console.log('\n--- DIRECT excerpt (500) ---\n', b.slice(Math.max(0, idx-200), idx+300));

    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(2);
  }
})();
