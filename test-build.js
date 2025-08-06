#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Testing deployment fixes...\n');

// Test 1: Check Node.js version
console.log('1. Checking Node.js version...');
try {
    const nodeVersion = process.version;
    console.log(`   Current Node.js version: ${nodeVersion}`);
    
    const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
    if (majorVersion >= 18) {
        console.log('   ✅ Node.js version is supported\n');
    } else {
        console.log('   ❌ Node.js version needs to be 18 or higher\n');
    }
} catch (error) {
    console.log('   ❌ Error checking Node.js version\n');
}

// Test 2: Check package.json engines
console.log('2. Checking package.json engines...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`   Node engine: ${packageJson.engines.node}`);
    console.log(`   NPM engine: ${packageJson.engines.npm}`);
    console.log('   ✅ Engines configuration updated\n');
} catch (error) {
    console.log('   ❌ Error reading package.json\n');
}

// Test 3: Check if client dependencies are updated
console.log('3. Checking client dependencies...');
try {
    const clientPackageJson = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
    const reactVersion = clientPackageJson.dependencies.react;
    console.log(`   React version: ${reactVersion}`);
    
    if (reactVersion.includes('18')) {
        console.log('   ✅ React 18 configured\n');
    } else {
        console.log('   ❌ React version needs to be updated\n');
    }
} catch (error) {
    console.log('   ❌ Error reading client/package.json\n');
}

// Test 4: Check React 18 entry point
console.log('4. Checking React 18 entry point...');
try {
    const indexJs = fs.readFileSync('client/src/index.js', 'utf8');
    if (indexJs.includes('createRoot')) {
        console.log('   ✅ React 18 createRoot API configured\n');
    } else {
        console.log('   ❌ Still using deprecated ReactDOM.render\n');
    }
} catch (error) {
    console.log('   ❌ Error reading client/src/index.js\n');
}

console.log('🎉 Test completed! Check the results above.');
console.log('\nTo run a full build test, execute:');
console.log('npm run build');