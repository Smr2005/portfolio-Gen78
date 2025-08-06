#!/bin/bash
set -e

echo "Installing backend dependencies..."
npm install

echo "Installing frontend dependencies..."
cd client
npm install

echo "Updating browserslist database..."
npx browserslist@latest --update-db

echo "Building frontend..."
npm run build

echo "Build completed successfully!"