#!/bin/bash
set -e

echo "Installing backend dependencies..."
npm install

echo "Installing frontend dependencies..."
cd client
rm -f yarn.lock
rm -rf node_modules
npm install --legacy-peer-deps

echo "Updating browserslist database..."
npx browserslist@latest --update-db

echo "Building frontend with legacy OpenSSL..."
npm run build:legacy

echo "Build completed successfully!"