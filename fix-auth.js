const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        console.log('🔧 Fixing authentication...');
        
        // Check if test user exists
        let testUser = await User.findOne({ email: 'test@example.com' });
        
        if (testUser) {
            console.log('🗑️  Removing existing test user...');
            await User.deleteOne({ email: 'test@example.com' });
        }
        
        // Create a new test user with proper password hashing
        const hashedPassword = await bcrypt.hash('testpassword123', 10);
        
        testUser = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword
        });
        
        await testUser.save();
        console.log('✅ Test user created successfully');
        
        // Create a regular demo user
        let demoUser = await User.findOne({ email: 'demo@example.com' });
        
        if (demoUser) {
            console.log('🗑️  Removing existing demo user...');
            await User.deleteOne({ email: 'demo@example.com' });
        }
        
        const demoPassword = await bcrypt.hash('demo123', 10);
        
        demoUser = new User({
            name: 'Demo User',
            email: 'demo@example.com',
            password: demoPassword
        });
        
        await demoUser.save();
        console.log('✅ Demo user created successfully');
        
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