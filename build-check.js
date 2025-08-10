#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔍 Portfolio Generator Build Diagnostic Tool');
console.log('==========================================');

// Check current working directory
console.log('📁 Current working directory:', process.cwd());

// Check if client directory exists
const clientDir = path.join(__dirname, 'client');
console.log('📁 Client directory:', clientDir);
console.log('📁 Client exists:', fs.existsSync(clientDir));

// Check if client/build directory exists
const buildDir = path.join(__dirname, 'client', 'build');
console.log('📁 Build directory:', buildDir);
console.log('📁 Build exists:', fs.existsSync(buildDir));

// Check if index.html exists
const indexPath = path.join(__dirname, 'client', 'build', 'index.html');
console.log('📄 Index.html path:', indexPath);
console.log('📄 Index.html exists:', fs.existsSync(indexPath));

// List client directory contents
if (fs.existsSync(clientDir)) {
    console.log('\n📋 Client directory contents:');
    try {
        const clientFiles = fs.readdirSync(clientDir);
        clientFiles.forEach(file => {
            const filePath = path.join(clientDir, file);
            const isDir = fs.statSync(filePath).isDirectory();
            console.log(`   ${isDir ? '📁' : '📄'} ${file}`);
        });
    } catch (error) {
        console.log('   ❌ Error reading client directory:', error.message);
    }
}

// List build directory contents if it exists
if (fs.existsSync(buildDir)) {
    console.log('\n📋 Build directory contents:');
    try {
        const buildFiles = fs.readdirSync(buildDir);
        buildFiles.forEach(file => {
            const filePath = path.join(buildDir, file);
            const isDir = fs.statSync(filePath).isDirectory();
            const stats = fs.statSync(filePath);
            console.log(`   ${isDir ? '📁' : '📄'} ${file} (${Math.round(stats.size / 1024)}KB)`);
        });
    } catch (error) {
        console.log('   ❌ Error reading build directory:', error.message);
    }
} else {
    console.log('\n❌ Build directory does not exist!');
    console.log('💡 Run "npm run render-build" to create the build directory.');
}

// Environment info
console.log('\n🌍 Environment Information:');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('   PORT:', process.env.PORT || 'not set');
console.log('   __dirname:', __dirname);

console.log('\n✅ Diagnostic complete!');

// Exit with error code if build is missing
if (!fs.existsSync(indexPath)) {
    console.log('\n🚨 CRITICAL: React build files are missing!');
    console.log('🔧 To fix this issue:');
    console.log('   1. Run: npm run render-build');
    console.log('   2. Check for build errors in the logs');
    console.log('   3. Verify client/build/index.html is created');
    process.exit(1);
} else {
    console.log('✅ React build files found - application should work!');
    process.exit(0);
}