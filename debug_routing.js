// Debug script to check routing
console.log('=== DEBUGGING ROUTING ISSUE ===');

// Check if servers are running
const axios = require('axios');

async function checkServers() {
    try {
        console.log('1. Checking backend server...');
        const backendResponse = await axios.get('http://localhost:5000');
        console.log('✅ Backend server is running');
        
        console.log('2. Checking frontend server...');
        const frontendResponse = await axios.get('http://localhost:3000');
        console.log('✅ Frontend server is running');
        
        console.log('3. Checking API endpoints...');
        
        // Test registration
        const testEmail = `debug${Date.now()}@example.com`;
        const registerResponse = await axios.post('http://localhost:3000/api/user/register', {
            name: 'Debug User',
            email: testEmail,
            password: 'debugpass123'
        });
        
        console.log('✅ Registration endpoint works');
        console.log('Token received:', !!registerResponse.data.accessToken);
        
        console.log('\n=== ROUTING DEBUG COMPLETE ===');
        console.log('All servers and endpoints are working correctly.');
        console.log('The blank screen issue is likely in the React component.');
        
        console.log('\n🔧 TROUBLESHOOTING STEPS:');
        console.log('1. Open browser developer tools (F12)');
        console.log('2. Check Console tab for JavaScript errors');
        console.log('3. Check Network tab for failed requests');
        console.log('4. Look for any red error messages');
        
    } catch (error) {
        console.error('❌ Server check failed:');
        console.error('Error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('🔧 Server is not running. Please start the servers:');
            console.error('Backend: npm start (in root directory)');
            console.error('Frontend: npm start (in client directory)');
        }
    }
}

checkServers();