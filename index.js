// index.js
// Minimal, safe entrypoint for the portfolio server.
// All server logic lives in index_clean.js to avoid merge conflicts.
'use strict';

try { require('dotenv').config(); } catch (e) {}

process.env.PORT = process.env.PORT || '5000';

const APP_NAME = process.env.APP_NAME || 'portfolio-server';
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`${APP_NAME}: starting (env=${NODE_ENV}, port=${process.env.PORT})`);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  setTimeout(() => process.exit(1), 100);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  setTimeout(() => process.exit(1), 100);
});

try {
  require('./index_clean.js');
} catch (err) {
  console.error('Failed to load ./index_clean.js — aborting.');
  if (err && err.stack) console.error(err.stack);
  process.exit(1);
}