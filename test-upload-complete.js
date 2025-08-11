const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testCompleteFlow() {
    const baseURL = 'http://localhost:5001';
    let token = '';
    
    console.log('🚀 COMPREHENSIVE UPLOAD & PUBLISH TEST\n');
    
    try {
        // Step 1: Login
        console.log('1️⃣ Logging in...');
        const loginResponse = await axios.post(`${baseURL}/api/user/login`, {
            email: 'test@example.com',
            password: 'testpassword123'
        });
        
        token = loginResponse.data.accessToken;
        console.log('✅ Login successful, token received');
        
        // Step 2: Create test files
        console.log('\n2️⃣ Creating test files...');
        
        // Create test image (1x1 pixel PNG)
        const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAHZHc8lIgAAAABJRU5ErkJggg==', 'base64');
        const testImagePath = path.join(__dirname, 'test-image.png');
        fs.writeFileSync(testImagePath, testImageBuffer);
        
        // Create test PDF
        const testPDFBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000173 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n229\n%%EOF');
        const testPDFPath = path.join(__dirname, 'test-resume.pdf');
        fs.writeFileSync(testPDFPath, testPDFBuffer);
        
        console.log('✅ Test files created');
        
        // Step 3: Test profile image upload
        console.log('\n3️⃣ Testing profile image upload...');
        
        const profileFormData = new FormData();
        profileFormData.append('profileImage', fs.createReadStream(testImagePath));
        
        const profileUploadResponse = await axios.post(`${baseURL}/api/upload/profile-image`, profileFormData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...profileFormData.getHeaders()
            }
        });
        
        console.log('✅ Profile image upload successful:', profileUploadResponse.data.message);
        
        // Step 4: Test resume PDF upload
        console.log('\n4️⃣ Testing resume PDF upload...');
        
        const resumeFormData = new FormData();
        resumeFormData.append('resume', fs.createReadStream(testPDFPath));
        
        const resumeUploadResponse = await axios.post(`${baseURL}/api/upload/resume`, resumeFormData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...resumeFormData.getHeaders()
            }
        });
        
        console.log('✅ Resume PDF upload successful:', resumeUploadResponse.data.message);
        
        // Step 5: Test project image upload
        console.log('\n5️⃣ Testing project image upload...');
        
        const projectFormData = new FormData();
        projectFormData.append('projectImage', fs.createReadStream(testImagePath));
        
        const projectUploadResponse = await axios.post(`${baseURL}/api/upload/project-image`, projectFormData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...projectFormData.getHeaders()
            }
        });
        
        console.log('✅ Project image upload successful:', projectUploadResponse.data.message);
        
        // Step 6: Save portfolio with uploaded files
        console.log('\n6️⃣ Saving portfolio with uploaded files...');
        
        const portfolioData = {
            templateId: 'template1',
            data: {
                name: 'Test User Portfolio',
                title: 'Full Stack Developer',
                email: 'test@example.com',
                about: 'This is a test portfolio with uploaded files',
                profileImage: profileUploadResponse.data.fileUrl,
                resume: resumeUploadResponse.data.fileUrl,
                skills: [
                    { name: 'JavaScript', level: 90 },
                    { name: 'React', level: 85 },
                    { name: 'Node.js', level: 80 }
                ],
                projects: [
                    {
                        title: 'Test Project',
                        description: 'A test project with uploaded image',
                        image: projectUploadResponse.data.fileUrl,
                        liveUrl: 'https://example.com',
                        githubUrl: 'https://github.com/example/test'
                    }
                ],
                experience: [
                    {
                        company: 'Test Company',
                        position: 'Developer',
                        duration: '2023 - Present',
                        description: 'Working on awesome projects'
                    }
                ]
            }
        };
        
        const saveResponse = await axios.post(`${baseURL}/api/portfolio/save`, portfolioData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Portfolio saved successfully:', saveResponse.data.message);
        console.log('📋 Portfolio slug:', saveResponse.data.portfolio.slug);
        
        // Step 7: Publish portfolio
        console.log('\n7️⃣ Publishing portfolio...');
        
        const publishResponse = await axios.post(`${baseURL}/api/portfolio/publish`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Portfolio published successfully!');
        console.log('🌐 Published URL:', publishResponse.data.publishedUrl);
        
        // Step 8: Test the published portfolio
        console.log('\n8️⃣ Testing published portfolio...');
        
        const publishedResponse = await axios.get(publishResponse.data.publishedUrl);
        console.log('✅ Published portfolio is accessible');
        console.log('📄 Response size:', publishedResponse.data.length, 'characters');
        
        // Clean up test files
        fs.unlinkSync(testImagePath);
        fs.unlinkSync(testPDFPath);
        console.log('🧹 Cleanup completed');
        
        console.log('\n🎉 ALL TESTS PASSED! Your upload and publish functionality is working perfectly!');
        console.log('🔗 Visit your published portfolio at:', publishResponse.data.publishedUrl);
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        // Clean up test files if they exist
        try {
            fs.unlinkSync(path.join(__dirname, 'test-image.png'));
            fs.unlinkSync(path.join(__dirname, 'test-resume.pdf'));
        } catch (e) {}
    }
}

testCompleteFlow();