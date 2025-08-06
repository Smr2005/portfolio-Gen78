#!/bin/bash
set -e

echo "Installing backend dependencies..."
npm install

echo "Installing frontend dependencies..."
cd client
npm install

echo "Building frontend with legacy OpenSSL provider..."
export NODE_OPTIONS=--openssl-legacy-provider
npm run build

echo "Build completed successfully!"