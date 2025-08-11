const express = require("express");
const cors = require("cors");
const { upload } = require("./SERVICES/fileUploadService");
require("./model/User");
require("./model/Portfolio");
require("./model/Feedback");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((error) => console.error("❌ MongoDB connection error:", error.message));

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true); // Allow all origins for testing
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test endpoints
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "Test server running!",
        port: 5001,
        timestamp: new Date().toISOString()
    });
});

app.post("/api/test-upload", upload.single('testFile'), (req, res) => {
    console.log("Upload test - File:", req.file ? "received" : "no file");
    res.json({
        message: "Upload test successful",
        file: req.file ? {
            name: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype
        } : "No file received"
    });
});

// Include the actual routes
const authRoute = require("./routes/auth");
const portfolioRoute = require("./routes/portfolio");
const uploadRoute = require("./routes/upload");

app.use("/api/user", authRoute);
app.use("/api/portfolio", portfolioRoute);
app.use("/api/upload", uploadRoute);

// Utility functions for portfolio serving
function getFrontendUrl() {
    return process.env.FRONTEND_URL || 'http://localhost:3000';
}

function ensureDataUrls(data) {
    return data; // Files are already data URLs
}

// Add portfolio serving route from main index.js
app.get("/portfolio/:slug", async (req, res) => {
    try {
        const Portfolio = require("./model/Portfolio");
        const { slug } = req.params;
        
        console.log(`🔍 Looking for portfolio with slug: ${slug}`);
        
        const portfolio = await Portfolio.findOne({ slug, isPublished: true });
        
        if (!portfolio) {
            console.log(`❌ Portfolio not found: ${slug}`);
            const frontendUrl = getFrontendUrl();
            
            return res.status(404).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Portfolio Not Found</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        .error { color: #e74c3c; }
                    </style>
                </head>
                <body>
                    <h1 class="error">Portfolio Not Found</h1>
                    <p>The portfolio you're looking for doesn't exist or is not published.</p>
                    <a href="${frontendUrl}">Create Your Own Portfolio</a>
                </body>
                </html>
            `);
        }
        
        console.log(`✅ Portfolio found: ${portfolio.data.name}`);
        
        // Increment view count
        portfolio.views += 1;
        portfolio.lastViewed = new Date();
        await portfolio.save();
        
        // Generate simple HTML for testing
        const portfolioHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${portfolio.data.name} - Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f8f9fa; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0; }
        .profile-img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; }
        .section { padding: 60px 0; }
        .skill-bar { background: #e9ecef; height: 10px; border-radius: 5px; overflow: hidden; }
        .skill-progress { background: linear-gradient(45deg, #667eea, #764ba2); height: 100%; }
    </style>
</head>
<body>
    <section class="hero text-center">
        <div class="container">
            ${portfolio.data.profileImage ? `<img src="${portfolio.data.profileImage}" class="profile-img" alt="${portfolio.data.name}">` : ''}
            <h1 class="mb-3">${portfolio.data.name}</h1>
            <h3 class="mb-4">${portfolio.data.title}</h3>
            <p class="lead">${portfolio.data.about || 'Welcome to my portfolio'}</p>
            ${portfolio.data.email ? `<a href="mailto:${portfolio.data.email}" class="btn btn-light btn-lg">Contact Me</a>` : ''}
        </div>
    </section>

    ${portfolio.data.skills && portfolio.data.skills.length ? `
    <section class="section">
        <div class="container">
            <h2 class="text-center mb-5">Skills</h2>
            <div class="row">
                ${portfolio.data.skills.map(skill => `
                    <div class="col-md-6 mb-4">
                        <div class="d-flex justify-content-between mb-2">
                            <span>${skill.name}</span>
                            <span>${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolio.data.projects && portfolio.data.projects.length ? `
    <section class="section bg-white">
        <div class="container">
            <h2 class="text-center mb-5">Projects</h2>
            <div class="row">
                ${portfolio.data.projects.map(project => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100">
                            ${project.image ? `<img src="${project.image}" class="card-img-top" alt="${project.title}" style="height: 200px; object-fit: cover;">` : ''}
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                <div>
                                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn btn-primary btn-sm me-2" target="_blank">Live Demo</a>` : ''}
                                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-outline-primary btn-sm" target="_blank">GitHub</a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolio.data.resume ? `
    <section class="section text-center">
        <div class="container">
            <h2 class="mb-4">Resume</h2>
            <a href="${portfolio.data.resume}" class="btn btn-success btn-lg" target="_blank">
                <i class="fas fa-download me-2"></i>Download Resume
            </a>
        </div>
    </section>
    ` : ''}

    <footer class="bg-dark text-white text-center py-4">
        <div class="container">
            <p class="mb-0">&copy; ${new Date().getFullYear()} ${portfolio.data.name} - Portfolio</p>
            <small class="text-muted">Views: ${portfolio.views || 0}</small>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
        
        res.send(portfolioHtml);
        
    } catch (error) {
        console.error("Serve portfolio error:", error);
        res.status(500).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Error</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <h1>Something went wrong</h1>
                <p>Please try again later.</p>
                <pre>${error.message}</pre>
            </body>
            </html>
        `);
    }
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Test server running on port ${PORT}`);
    console.log(`📊 Backend URL: http://localhost:${PORT}`);
});