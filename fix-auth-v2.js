const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});

// Import User model
const User = require('./model/User');

async function fixAuth() {
    try {
        console.log('🔧 Fixing authentication (v2)...');
        
        // Clear existing test users
        await User.deleteMany({ email: { $in: ['test@example.com', 'demo@example.com'] } });
        console.log('🗑️  Cleared existing test users');
        
        // Create test user - let the User model handle password hashing via pre-save hook
        const testUser = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'testpassword123' // This will be automatically hashed by the pre-save hook
        });
        
        await testUser.save();
        console.log('✅ Test user created successfully');
        
        // Create demo user
        const demoUser = new User({
            name: 'Demo User',
            email: 'demo@example.com',
            password: 'demo123' // This will be automatically hashed by the pre-save hook
        });
        
        await demoUser.save();
        console.log('✅ Demo user created successfully');
        
        // Test password validation
        console.log('\n🧪 Testing password validation...');
        const savedTestUser = await User.findOne({ email: 'test@example.com' });
        const isPasswordValid = await savedTestUser.isValidPassword('testpassword123');
        console.log('Password validation result:', isPasswordValid ? '✅ Valid' : '❌ Invalid');
        
        console.log('\n📋 User credentials for testing:');
        console.log('Test User: test@example.com / testpassword123');
        console.log('Demo User: demo@example.com / demo123');
        
        mongoose.connection.close();
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error);
        mongoose.connection.close();
        process.exit(1);
    }
}

fixAuth();