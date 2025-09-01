/* SSR renderer that renders the actual React component for Template2 using ReactDOMServer */
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  extensions: ['.js', '.jsx']
});

const path = require('path');
const { createRequire } = require('module');

// create a require() that resolves modules from the client/ folder so react and bootstrap resolve correctly
const clientRequire = createRequire(path.resolve(__dirname, '..', '..', 'client', 'package.json'));
const React = clientRequire('react');
const ReactDOMServer = clientRequire('react-dom/server');

// require the client component using the clientRequire so all imports resolve from client/node_modules
const Template2 = clientRequire(path.resolve(__dirname, '..', '..', 'client', 'src', 'templates', 'Template2.js')).default;

function renderTemplate2SSR(data, options = {}) {
  const element = React.createElement(Template2, { isPreview: false, userData: data });
  const inner = ReactDOMServer.renderToString(element);

  // Minimal head and injection for hydration
  const head = `\n    <meta charset="utf-8">\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n    <title>${data.name || ''} — ${data.title || ''}</title>\n    <link rel=\"stylesheet\" href=\"/templates/template2.css\">\n  `;

  const hydrateScript = `\n    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(data)};</script>\n    ${options.hydrate && options.clientBundleUrl ? `<script src=\"${options.clientBundleUrl}\"></script>` : ''}\n  `;

  return `<!doctype html><html lang=\"en\"><head>${head}</head><body><div id=\"root\">${inner}</div>${hydrateScript}</body></html>`;
}

module.exports = { renderTemplate2SSR };
