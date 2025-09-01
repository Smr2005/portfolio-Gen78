const path = require('path');

function renderTemplate6HTML(data, meta, clientBundleUrl) {
  try {
    require('@babel/register')({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    });
  } catch (e) {}

  const { createRequire } = require('module');
  const clientRequire = createRequire(path.resolve(process.cwd(), 'client', 'package.json'));
  const React = clientRequire('react');
  const ReactDOMServer = clientRequire('react-dom/server');

  const templatePath = path.resolve(process.cwd(), 'client', 'src', 'templates', 'Template6.js');
  const tpl = clientRequire(templatePath);
  const Template6 = tpl && tpl.default ? tpl.default : tpl;
  const inlineCss = tpl && tpl.TEMPLATE6_INLINE_CSS ? tpl.TEMPLATE6_INLINE_CSS : '';

  const element = React.createElement(Template6, { isPreview: false, userData: data });
  const bodyHtml = ReactDOMServer.renderToString(element);

  const head = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${(meta && meta.title) ? meta.title : (data && data.name ? data.name + ' - Portfolio' : 'Portfolio')}</title>
    <meta name="description" content="${(meta && meta.description) ? meta.description : (data && data.name ? 'Portfolio of ' + data.name : '')}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>${inlineCss}</style>
  `;

  const hydrationScript = clientBundleUrl ? `
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(data)};</script>
    <script src="${clientBundleUrl}" defer></script>
  ` : `
    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(data)};</script>
  `;

  const html = `<!doctype html>
  <html lang="en">
  <head>${head}</head>
  <body>
    <div id="root">${bodyHtml}</div>
    ${hydrationScript}
  </body>
  </html>`;

  return html;
}

module.exports = renderTemplate6HTML;
module.exports.renderTemplate6SSR = renderTemplate6HTML;
