const axios = require('axios');

async function testAPI() {
    const baseURL = 'http://localhost:5001';
    
    console.log('🔍 Testing API endpoints...\n');
    
    // Test 1: Health check
    try {
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${baseURL}/api/health`);
        console.log('✅ Health check passed:', healthResponse.data);
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
        return;
    }
    
    // Test 2: Test registration (temporary test user)
    try {
        console.log('\n2. Testing user registration...');
        const registerData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'testpassword123'
        };
        
        const registerResponse = await axios.post(`${baseURL}/api/user/register`, registerData);
        console.log('✅ Registration passed:', registerResponse.data);
    } catch (error) {
        console.log('⚠️  Registration might have failed (user may already exist):', error.response?.data || error.message);
    }
    
    // Test 3: Test login
    try {
        console.log('\n3. Testing user login...');
        const loginData = {
            email: 'test@example.com',
            password: 'testpassword123'
        };
        
        const loginResponse = await axios.post(`${baseURL}/api/user/login`, loginData);
        console.log('✅ Login passed:', loginResponse.data);
        
        const token = loginResponse.data.accessToken;
        console.log('🎫 Token received:', token ? 'Yes' : 'No');
        
        if (token) {
            // Test 4: Test authenticated endpoint
            console.log('\n4. Testing authenticated upload endpoint...');
            
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };
            
            try {
                const uploadResponse = await axios.post(`${baseURL}/api/upload/profile-image`, {}, { headers });
                console.log('Upload response:', uploadResponse.data);
            } catch (uploadError) {
                console.log('⚠️  Upload test result:', uploadError.response?.data || uploadError.message);
            }
            
            // Test 5: Test portfolio save
            console.log('\n5. Testing portfolio save...');
            
            const portfolioData = {
                templateId: 'template1',
                data: {
                    name: 'Test User',
                    title: 'Test Developer',
                    email: 'test@example.com',
                    about: 'This is a test portfolio'
                }
            };
            
            try {
                const portfolioResponse = await axios.post(`${baseURL}/api/portfolio/save`, portfolioData, { 
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    } 
                });
                console.log('✅ Portfolio save passed:', portfolioResponse.data);
                
                // Test 6: Test portfolio publish
                console.log('\n6. Testing portfolio publish...');
                const publishResponse = await axios.post(`${baseURL}/api/portfolio/publish`, {}, { 
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    } 
                });
                console.log('✅ Portfolio publish passed:', publishResponse.data);
                
            } catch (portfolioError) {
                console.log('❌ Portfolio operation failed:', portfolioError.response?.data || portfolioError.message);
            }
        }
        
    } catch (error) {
        console.log('❌ Login failed:', error.response?.data || error.message);
    }
}

testAPI().then(() => {
    console.log('\n🏁 API testing completed');
    process.exit(0);
}).catch(error => {
    console.error('💥 Test script error:', error);
    process.exit(1);
});