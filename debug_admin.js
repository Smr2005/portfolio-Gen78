const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'x-admin-secret', 'x-admin-username', 'x-admin-password', 'Accept', 'Origin', 'X-Requested-With']
}));

app.use(express.json());

// Connect to MongoDB
console.log("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully");
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
});

// Load models
const User = require("./model/User");
const Portfolio = require("./model/Portfolio");

// Admin routes
const adminRoute = require("./routes/admin");
app.use("/api/admin", adminRoute);

// Test endpoint
app.get("/test", async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const portfolioCount = await Portfolio.countDocuments();
        
        res.json({
            message: "Test endpoint working",
            database: {
                connected: mongoose.connection.readyState === 1,
                users: userCount,
                portfolios: portfolioCount
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Test failed",
            details: error.message
        });
    }
});

// Serve admin HTML
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + '/admin-cleanup.html');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Debug server running on port ${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
    console.log(`Test endpoint: http://localhost:${PORT}/test`);
});