/* SSR renderer that renders the actual React component for Template3 using ReactDOMServer */
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
const Template3 = clientRequire(path.resolve(__dirname, '..', '..', 'client', 'src', 'templates', 'Template3.js')).default;

function renderTemplate3SSR(data, options = {}) {
  const element = React.createElement(Template3, { isPreview: false, userData: data });
  const inner = ReactDOMServer.renderToString(element);

  // Inline the same CSS the client injects so SSR matches the preview exactly
  const head = `\n    <meta charset="utf-8">\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n    <title>${data.name || ''} — ${data.title || ''}</title>\n    <style>\n      @keyframes professionalSlide {\n        0% { transform: translateX(-50px) rotateY(-15deg); opacity: 0; }\n        100% { transform: translateX(0) rotateY(0deg); opacity: 1; }\n      }\n      \n      @keyframes businessFloat {\n        0%, 100% { transform: translateY(0px) rotateX(0deg); }\n        50% { transform: translateY(-10px) rotateX(2deg); }\n      }\n      \n      @keyframes dataVisualization {\n        0% { transform: scaleY(0.3); }\n        50% { transform: scaleY(1); }\n        100% { transform: scaleY(0.8); }\n      }\n      \n      @keyframes professionalGlow {\n        0%, 100% { box-shadow: 0 5px 15px rgba(30,60,114,0.2); }\n        50% { box-shadow: 0 10px 30px rgba(30,60,114,0.4); }\n      }\n      \n      .business-card {\n        transform-style: preserve-3d;\n        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n        animation: professionalGlow 3s ease-in-out infinite;\n      }\n      \n      .business-card:hover {\n        transform: rotateY(8deg) rotateX(4deg) translateZ(15px) scale(1.02);\n        box-shadow: 0 25px 50px rgba(30,60,114,0.3);\n      }\n      \n      .metric-card {\n        transform-style: preserve-3d;\n        transition: all 0.3s ease;\n      }\n      \n      .metric-card:hover {\n        transform: translateZ(10px) rotateX(5deg);\n      }\n      \n      .skill-progress {\n        transform-style: preserve-3d;\n        transition: all 0.3s ease;\n      }\n      \n      .skill-progress:hover {\n        transform: translateZ(5px) scale(1.05);\n      }\n      \n      .project-showcase {\n        transform-style: preserve-3d;\n        transition: all 0.5s ease;\n      }\n      \n      .project-showcase:hover {\n        transform: perspective(1000px) rotateX(5deg) rotateY(3deg) translateZ(10px);\n      }\n      \n      /* Mobile Responsive Styles */\n      @media (max-width: 768px) {\n        .business-card:hover,\n        .metric-card:hover,\n        .skill-progress:hover,\n        .project-showcase:hover {\n          transform: none !important;\n        }\n        \n        .business-card {\n          animation: none !important;\n        }\n        \n        h1 {\n          font-size: 2rem !important;\n        }\n        \n        h2 {\n          font-size: 1.5rem !important;\n        }\n        \n        h3 {\n          font-size: 1.25rem !important;\n        }\n        \n        .container {\n          padding-left: 15px !important;\n          padding-right: 15px !important;\n        }\n        \n        .btn {\n          width: 100% !important;\n          margin-bottom: 0.5rem !important;\n        }\n        \n        nav {\n          padding: 0.5rem 0 !important;\n        }\n        \n        section {\n          padding: 60px 0 !important;\n        }\n      }\n      \n      @media (max-width: 480px) {\n        h1 {\n          font-size: 1.75rem !important;\n        }\n        \n        h2 {\n          font-size: 1.25rem !important;\n        }\n        \n        h3 {\n          font-size: 1.1rem !important;\n        }\n        \n        .container {\n          padding-left: 10px !important;\n          padding-right: 10px !important;\n        }\n        \n        .btn {\n          font-size: 0.9rem !important;\n          padding: 0.6rem 1rem !important;\n        }\n        \n        .card {\n          padding: 1rem !important;\n        }\n      }\n    </style>\n  `;

  const hydrateScript = `\n    <script>window.__PORTFOLIO_DATA__ = ${JSON.stringify(data)};</script>\n    ${options.hydrate && options.clientBundleUrl ? `<script src=\"${options.clientBundleUrl}\"></script>` : ''}\n  `;

  return `<!doctype html><html lang=\"en\"><head>${head}</head><body><div id=\"root\">${inner}</div>${hydrateScript}</body></html>`;
}

module.exports = { renderTemplate3SSR };
