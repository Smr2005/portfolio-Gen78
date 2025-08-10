const express = require("express");
const passport = require("passport");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const cors = require("cors");
const path = require("path");
//ROUTES
const authRoute = require("./routes/auth");
const portfolioRoute = require("./routes/portfolio");
const uploadRoute = require("./routes/upload");

//MODELS
require("./model/User");
require("./model/Portfolio");
require("./model/Feedback");

//CHORE
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Enable CORS for frontend communication
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = process.env.NODE_ENV === 'production' || process.env.PORT
            ? ["https://portfolio-gen-i1bg.onrender.com"]
            : ["http://localhost:3000", "http://localhost:3001"];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(null, true); // Allow all origins for now to debug
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token', 'x-admin-secret', 'x-admin-username', 'x-admin-password', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
}));

//mongo connect
console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully");
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("⚠️  Server will continue without database connection");
    // Don't exit, continue without database for now
});

// useCreateIndex is deprecated in Mongoose 6+

// Handle MongoDB connection events
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//
// Cookie session temporarily disabled
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey],
//     })
// );
// OAuth temporarily disabled for basic functionality
// app.use(passport.initialize());
// app.use(passport.session());
// require("./SERVICES/passport");
// require("./routes/oauth")(app);
//

const {
    verifyAccessToken
} = require("./webToken/jwt");
const { upload } = require("./SERVICES/fileUploadService");
dotenv.config();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Handle preflight requests
app.options('*', cors());

//Route Middleware For Login And Signup routes
app.use("/api/user", authRoute);

//Route Middleware For Portfolio routes
app.use("/api/portfolio", portfolioRoute);

//Route Middleware For File Upload routes
app.use("/api/upload", uploadRoute);

//Route Middleware For Admin routes
const adminRoute = require("./routes/admin");
app.use("/api/admin", adminRoute);

//Route Middleware For User Profile routes
const userProfileRoute = require("./routes/userProfile");
app.use("/api/user-profile", userProfileRoute);

// Note: Files are now stored in MongoDB as base64 data, no longer serving static files from uploads directory

// Admin cleanup interface
app.get("/admin-cleanup", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-cleanup.html'));
});

// Admin simple interface (new simplified version)
app.get("/admin-simple", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-simple.html'));
});

// Admin secure interface (completely secure - no content before login)
app.get("/admin-secure", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-secure.html'));
});

// Admin test interface
app.get("/admin-test", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-test.html'));
});

// API health check route (moved after API routes)
app.get("/api/health", async (req, res, next) => {
    res.json({ 
        status: "Portfolio Generator Backend is running!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        cors_origin: req.headers.origin
    });
});

// Test upload endpoint without authentication
app.post("/api/test-upload", upload.single('testFile'), (req, res) => {
    res.json({
        message: "Test upload endpoint working",
        file: req.file ? "File received" : "No file",
        headers: req.headers
    });
});

// Test data storage endpoint
app.get("/api/test-data-storage", (req, res) => {
    const testData = {
        profileImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...", // Sample base64 data
        resume: "data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO8w6...", // Sample base64 data
        projects: [
            {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                title: "Test Project"
            }
        ]
    };
    
    res.json({
        message: "Files are now stored as base64 data URLs in MongoDB",
        storageType: "MongoDB Base64",
        sampleData: testData,
        environment: process.env.NODE_ENV || 'development',
        backendUrl: process.env.BACKEND_URL,
        advantages: [
            "No file system dependencies",
            "Works on any hosting platform",
            "No file persistence issues",
            "All data in one database"
        ]
    });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
    // Serve static files from React build
    const buildPath = path.join(__dirname, 'client/build');
    console.log('Serving static files from:', buildPath);
    console.log('Directory exists:', require('fs').existsSync(buildPath));
    
    app.use(express.static(buildPath));
    
    // Add explicit file serving for common assets
    app.get('/static/*', (req, res, next) => {
        const filePath = path.join(buildPath, req.path);
        console.log('Serving static file:', filePath);
        if (require('fs').existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
}

// Public route to serve published portfolios as HTML
app.get("/portfolio/:slug", async (req, res) => {
    try {
        const Portfolio = require("./model/Portfolio");
        const { slug } = req.params;
        
        const portfolio = await Portfolio.findOne({ slug, isPublished: true });
        
        if (!portfolio) {
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
        
        // Increment view count
        portfolio.views += 1;
        portfolio.lastViewed = new Date();
        await portfolio.save();
        
        // Generate HTML page with portfolio data
        const portfolioHtml = generatePortfolioHTML(portfolio);
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
            </body>
            </html>
        `);
    }
});

// Utility function to get the correct base URL
function getBaseUrl() {
    return process.env.BACKEND_URL || 
           (process.env.NODE_ENV === 'production' || process.env.PORT 
             ? 'https://portfolio-gen-i1bg.onrender.com' 
             : 'http://localhost:5000');
}

// Utility function to get the correct frontend URL
function getFrontendUrl() {
    return process.env.FRONTEND_URL || 
           (process.env.NODE_ENV === 'production' || process.env.PORT 
             ? 'https://portfolio-gen-i1bg.onrender.com' 
             : 'http://localhost:3000');
}

// Helper function to ensure data URLs are properly formatted (files are now stored as base64 data URLs)
function ensureDataUrls(data) {
    // Files are now stored as data URLs (data:image/jpeg;base64,xxx), no conversion needed
    // This function is kept for backward compatibility with any existing URL-based data
    const productionUrl = process.env.BACKEND_URL || 'https://portfolio-gen-i1bg.onrender.com';
    const localhostPattern = /http:\/\/localhost:\d+/g;
    
    let dataString = JSON.stringify(data);
    dataString = dataString.replace(localhostPattern, productionUrl);
    
    return JSON.parse(dataString);
}

// Function to generate HTML for portfolio
function generatePortfolioHTML(portfolio) {
    let { data, meta, templateId } = portfolio;
    
    // Ensure data URLs are properly formatted (backward compatibility)
    if (process.env.NODE_ENV === 'production' || process.env.PORT) {
        data = ensureDataUrls(data);
    }
    
    // Generate HTML based on template ID
    switch(templateId) {
        case 'template1':
            return generateTemplate1HTML(data, meta);
        case 'template2':
            return generateTemplate2HTML(data, meta);
        case 'template3':
            return generateTemplate3HTML(data, meta);
        case 'template4':
            return generateTemplate4HTML(data, meta);
        case 'template5':
            return generateTemplate5HTML(data, meta);
        case 'template6':
            return generateTemplate6HTML(data, meta);
        default:
            return generateTemplate1HTML(data, meta);
    }
}

function generateTemplate1HTML(data, meta) {
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta.title || data.name + ' - Portfolio'}</title>
    <meta name="description" content="${meta.description || 'Portfolio of ' + data.name}">
    <meta name="keywords" content="${meta.keywords ? meta.keywords.join(', ') : ''}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${meta.title || data.name + ' - Portfolio'}">
    <meta property="og:description" content="${meta.description || 'Portfolio of ' + data.name}">
    <meta property="og:image" content="${data.profileImage || ''}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${meta.title || data.name + ' - Portfolio'}">
    <meta property="twitter:description" content="${meta.description || 'Portfolio of ' + data.name}">
    <meta property="twitter:image" content="${data.profileImage || ''}">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .portfolio-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 0; }
        .profile-img { width: 150px; height: 150px; border-radius: 50%; border: 5px solid white; }
        .section-title { color: #333; margin-bottom: 30px; font-weight: 700; }
        .skill-item { background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px; }
        .project-card { border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); }
        .footer { background: #333; color: white; padding: 40px 0; margin-top: 50px; }
        .powered-by { text-align: center; padding: 20px; background: #f8f9fa; color: #666; }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="portfolio-header text-center">
        <div class="container">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" class="profile-img mb-4">` : ''}
            <h1 class="display-4 mb-3">${data.name}</h1>
            <h2 class="h4 mb-4">${data.title}</h2>
            ${data.about ? `<p class="lead">${data.about}</p>` : ''}
            <div class="mt-4">
                ${data.email ? `<a href="mailto:${data.email}" class="btn btn-outline-light me-2"><i class="fas fa-envelope"></i> Email</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="btn btn-outline-light me-2"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="btn btn-outline-light me-2"><i class="fab fa-github"></i> GitHub</a>` : ''}
                ${data.website ? `<a href="${data.website}" target="_blank" class="btn btn-outline-light"><i class="fas fa-globe"></i> Website</a>` : ''}
            </div>
        </div>
    </div>

    <!-- Skills Section -->
    ${data.skills && data.skills.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title text-center">Skills</h2>
            <div class="row">
                ${data.skills.map(skill => `
                    <div class="col-md-4 mb-3">
                        <div class="skill-item">
                            <h5>${skill.name}</h5>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${skill.level}%">${skill.level}%</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Experience Section -->
    ${data.experience && data.experience.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center">Experience</h2>
            ${data.experience.map(exp => `
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${exp.position}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${exp.company} • ${exp.duration}</h6>
                                ${exp.location ? `<p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${exp.location}</p>` : ''}
                                ${exp.description ? `<p class="card-text">${exp.description}</p>` : ''}
                                ${exp.achievements && exp.achievements.length > 0 ? `
                                    <ul>
                                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <!-- Projects Section -->
    ${data.projects && data.projects.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title text-center">Projects</h2>
            <div class="row">
                ${data.projects.map(project => `
                    <div class="col-md-6 mb-4">
                        <div class="card project-card h-100">
                            ${project.image ? `<img src="${project.image}" class="card-img-top" alt="${project.title}">` : ''}
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                ${project.tech && project.tech.length > 0 ? `
                                    <div class="mb-3">
                                        ${project.tech.map(tech => `<span class="badge bg-secondary me-1">${tech}</span>`).join('')}
                                    </div>
                                ` : ''}
                                <div>
                                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-primary btn-sm me-2">Live Demo</a>` : ''}
                                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-outline-secondary btn-sm">GitHub</a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Education Section -->
    ${data.education && data.education.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center">Education</h2>
            ${data.education.map(edu => `
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${edu.degree} ${edu.field ? 'in ' + edu.field : ''}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${edu.institution} • ${edu.duration}</h6>
                                ${edu.location ? `<p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${edu.location}</p>` : ''}
                                ${edu.gpa ? `<p class="text-muted">GPA: ${edu.gpa}</p>` : ''}
                                ${edu.description ? `<p class="card-text">${edu.description}</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <!-- Certifications Section -->
    ${data.certifications && data.certifications.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title text-center">Certifications</h2>
            <div class="row">
                ${data.certifications.map(cert => `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body text-center">
                                <div class="mb-3">
                                    <i class="fas fa-certificate fa-3x text-warning"></i>
                                </div>
                                <h5 class="card-title">${cert.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${cert.issuer}</h6>
                                ${cert.date ? `<p class="text-muted"><i class="fas fa-calendar"></i> ${cert.date}</p>` : ''}
                                ${cert.url ? `<a href="${cert.url}" target="_blank" class="btn btn-outline-primary btn-sm">View Certificate</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Internships Section -->
    ${data.internships && data.internships.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center">Internships & Early Experience</h2>
            ${data.internships.map(internship => `
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-3">
                                    <i class="fas fa-rocket fa-2x text-primary me-3"></i>
                                    <div>
                                        <h5 class="card-title mb-1">${internship.position}</h5>
                                        <h6 class="card-subtitle text-muted">${internship.company} • ${internship.duration}</h6>
                                    </div>
                                </div>
                                ${internship.location ? `<p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${internship.location}</p>` : ''}
                                ${internship.description ? `<p class="card-text">${internship.description}</p>` : ''}
                                ${internship.achievements && internship.achievements.length > 0 ? `
                                    <div>
                                        <h6 class="fw-bold">Key Achievements:</h6>
                                        <ul>
                                            ${internship.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="footer">
        <div class="container text-center">
            <h5>${data.name}</h5>
            <p>${data.title}</p>
            <div class="mb-3">
                ${data.email ? `<a href="mailto:${data.email}" class="text-white me-3"><i class="fas fa-envelope"></i></a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="text-white me-3"><i class="fab fa-linkedin"></i></a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="text-white me-3"><i class="fab fa-github"></i></a>` : ''}
                ${data.website ? `<a href="${data.website}" target="_blank" class="text-white"><i class="fas fa-globe"></i></a>` : ''}
            </div>
        </div>
    </footer>

    <!-- Powered By -->
    <div class="powered-by">
        <small>Powered by <a href="${getFrontendUrl()}" target="_blank">Portfolio Generator</a></small>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

function generateTemplate2HTML(data, meta) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Creative Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Creative Portfolio of ' + data.name}">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .creative-header { 
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            color: white; 
            padding: 100px 0; 
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .profile-img { width: 180px; height: 180px; border-radius: 50%; border: 6px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .creative-card { border: none; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: all 0.3s; overflow: hidden; }
        .creative-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .skill-badge { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none; }
        .section-title { color: #2c3e50; font-weight: 800; margin-bottom: 40px; position: relative; }
        .section-title::after { content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 60px; height: 4px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 2px; }
    </style>
</head>
<body>
    <!-- Creative Header -->
    <div class="creative-header text-center">
        <div class="container">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" class="profile-img mb-4">` : ''}
            <h1 class="display-3 mb-3 fw-bold">${data.name}</h1>
            <h2 class="h3 mb-4">${data.title}</h2>
            ${data.about ? `<p class="lead fs-5">${data.about}</p>` : ''}
            <div class="mt-5">
                ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg me-3 mb-2"><i class="fas fa-envelope"></i> Contact</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="btn btn-outline-light btn-lg me-3 mb-2"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="btn btn-outline-light btn-lg me-3 mb-2"><i class="fab fa-github"></i> GitHub</a>` : ''}
            </div>
        </div>
    </div>

    <!-- Skills Section -->
    ${data.skills && data.skills.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title text-center">Creative Skills</h2>
            <div class="row">
                ${data.skills.map(skill => `
                    <div class="col-md-4 mb-4">
                        <div class="creative-card p-4 text-center h-100">
                            <h5 class="mb-3">${skill.name}</h5>
                            <div class="progress mb-3" style="height: 10px;">
                                <div class="progress-bar skill-badge" style="width: ${skill.level}%"></div>
                            </div>
                            <span class="badge skill-badge">${skill.level}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Projects Section -->
    ${data.projects && data.projects.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center">Creative Projects</h2>
            <div class="row">
                ${data.projects.map(project => `
                    <div class="col-lg-6 mb-5">
                        <div class="creative-card h-100">
                            ${project.image ? `<img src="${project.image}" class="card-img-top" style="height: 250px; object-fit: cover;" alt="${project.title}">` : ''}
                            <div class="card-body p-4">
                                <h5 class="card-title fw-bold">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                ${project.tech && project.tech.length > 0 ? `
                                    <div class="mb-3">
                                        ${project.tech.map(tech => `<span class="badge skill-badge me-2 mb-2">${tech}</span>`).join('')}
                                    </div>
                                ` : ''}
                                <div class="d-flex gap-2">
                                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-primary">View Live</a>` : ''}
                                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-outline-primary">GitHub</a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Experience Section -->
    ${data.experience && data.experience.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title text-center">Experience</h2>
            ${data.experience.map(exp => `
                <div class="creative-card mb-4 p-4">
                    <div class="row">
                        <div class="col-md-8">
                            <h4 class="fw-bold">${exp.position}</h4>
                            <h5 class="text-primary">${exp.company}</h5>
                            <p class="text-muted">${exp.duration} • ${exp.location || ''}</p>
                            <p>${exp.description}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="creative-header text-center py-4">
        <div class="container">
            <p class="mb-0">&copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.</p>
            <small class="d-block mt-2">Powered by <a href="${getFrontendUrl()}" target="_blank" class="text-white">Portfolio Generator</a></small>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

function generateTemplate3HTML(data, meta) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Business Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Business Portfolio of ' + data.name}">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        body { font-family: 'Georgia', serif; line-height: 1.6; }
        .business-header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 80px 0; }
        .profile-img { width: 160px; height: 160px; border-radius: 10px; border: 4px solid white; }
        .business-card { border: 1px solid #e9ecef; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
        .section-title { color: #1e3c72; font-weight: 700; border-bottom: 3px solid #2a5298; padding-bottom: 10px; }
        .achievement-item { background: #f8f9fa; border-left: 4px solid #2a5298; padding: 15px; margin-bottom: 15px; }
    </style>
</head>
<body>
    <div class="business-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4 text-center">
                    ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" class="profile-img">` : ''}
                </div>
                <div class="col-md-8">
                    <h1 class="display-4 fw-bold">${data.name}</h1>
                    <h2 class="h3 mb-3">${data.title}</h2>
                    ${data.about ? `<p class="lead">${data.about}</p>` : ''}
                    <div class="mt-4">
                        ${data.email ? `<a href="mailto:${data.email}" class="btn btn-outline-light me-2"><i class="fas fa-envelope"></i> ${data.email}</a>` : ''}
                        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline-light me-2"><i class="fas fa-phone"></i> ${data.phone}</a>` : ''}
                        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="btn btn-outline-light"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>

    ${data.experience && data.experience.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title mb-4">Professional Experience</h2>
            ${data.experience.map(exp => `
                <div class="business-card p-4 mb-4">
                    <div class="row">
                        <div class="col-md-9">
                            <h4 class="fw-bold text-primary">${exp.position}</h4>
                            <h5>${exp.company}</h5>
                            <p class="text-muted">${exp.duration} • ${exp.location || ''}</p>
                            <p>${exp.description}</p>
                            ${exp.achievements && exp.achievements.length > 0 ? `
                                <div class="mt-3">
                                    <h6>Key Achievements:</h6>
                                    ${exp.achievements.map(achievement => `
                                        <div class="achievement-item">${achievement}</div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${data.skills && data.skills.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title mb-4">Core Competencies</h2>
            <div class="row">
                ${data.skills.map(skill => `
                    <div class="col-md-6 mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="fw-semibold">${skill.name}</span>
                            <span class="badge bg-primary">${skill.level}%</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-primary" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <footer class="bg-dark text-white py-4">
        <div class="container text-center">
            <p class="mb-0">&copy; ${new Date().getFullYear()} ${data.name}. Professional Portfolio.</p>
            <small class="d-block mt-2">Powered by <a href="${getFrontendUrl()}" target="_blank" class="text-white">Portfolio Generator</a></small>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

function generateTemplate4HTML(data, meta) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Minimal Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Minimal Portfolio of ' + data.name}">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.8; }
        .minimal-header { background: #fff; color: #333; padding: 100px 0; border-bottom: 1px solid #eee; }
        .profile-img { width: 120px; height: 120px; border-radius: 50%; filter: grayscale(100%); }
        .minimal-section { padding: 60px 0; }
        .section-title { font-weight: 300; font-size: 2rem; margin-bottom: 40px; color: #333; }
        .minimal-card { border: none; border-bottom: 1px solid #eee; padding: 30px 0; }
        .skill-bar { height: 2px; background: #333; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="minimal-header text-center">
        <div class="container">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" class="profile-img mb-4">` : ''}
            <h1 class="display-5 fw-light mb-3">${data.name}</h1>
            <h2 class="h4 fw-light text-muted mb-4">${data.title}</h2>
            ${data.about ? `<p class="lead fw-light" style="max-width: 600px; margin: 0 auto;">${data.about}</p>` : ''}
            <div class="mt-5">
                ${data.email ? `<a href="mailto:${data.email}" class="text-decoration-none text-dark me-4">${data.email}</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="text-decoration-none text-dark me-4">LinkedIn</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="text-decoration-none text-dark">GitHub</a>` : ''}
            </div>
        </div>
    </div>

    ${data.projects && data.projects.length > 0 ? `
    <section class="minimal-section">
        <div class="container">
            <h2 class="section-title text-center">Selected Work</h2>
            ${data.projects.map(project => `
                <div class="minimal-card">
                    <div class="row">
                        <div class="col-md-8">
                            <h4 class="fw-light">${project.title}</h4>
                            <p class="text-muted">${project.description}</p>
                            ${project.demo || project.github ? `
                                <div class="mt-3">
                                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="text-decoration-none text-dark me-4">View Project</a>` : ''}
                                    ${project.github ? `<a href="${project.github}" target="_blank" class="text-decoration-none text-dark">Source Code</a>` : ''}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${data.skills && data.skills.length > 0 ? `
    <section class="minimal-section bg-light">
        <div class="container">
            <h2 class="section-title text-center">Skills</h2>
            <div class="row">
                ${data.skills.map(skill => `
                    <div class="col-md-6 mb-4">
                        <div class="d-flex justify-content-between">
                            <span>${skill.name}</span>
                            <span class="text-muted">${skill.level}%</span>
                        </div>
                        <div class="skill-bar" style="width: ${skill.level}%"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <footer class="text-center py-5">
        <div class="container">
            <p class="text-muted">&copy; ${new Date().getFullYear()} ${data.name}</p>
            <small class="text-muted">Powered by <a href="${getFrontendUrl()}" target="_blank" class="text-muted">Portfolio Generator</a></small>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

function generateTemplate5HTML(data, meta) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Developer Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Developer Portfolio of ' + data.name}">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        body { 
            font-family: 'Courier New', monospace; 
            background: #0d1117; 
            color: #c9d1d9; 
            line-height: 1.6; 
        }
        .terminal-header { 
            background: #161b22; 
            border: 1px solid #30363d; 
            border-radius: 6px; 
            padding: 40px; 
            margin: 20px 0; 
        }
        .terminal-prompt { color: #58a6ff; }
        .terminal-text { color: #7ee787; }
        .terminal-card { 
            background: #161b22; 
            border: 1px solid #30363d; 
            border-radius: 6px; 
            padding: 20px; 
            margin: 20px 0; 
        }
        .code-block { 
            background: #0d1117; 
            border: 1px solid #30363d; 
            border-radius: 6px; 
            padding: 15px; 
            font-family: 'Courier New', monospace; 
        }
        a { color: #58a6ff; text-decoration: none; }
        a:hover { color: #79c0ff; }
    </style>
</head>
<body>
    <div class="container">
        <div class="terminal-header">
            <div class="mb-3">
                <span class="terminal-prompt">$</span> <span class="terminal-text">whoami</span>
            </div>
            <h1 class="h2 mb-3">${data.name}</h1>
            <div class="mb-3">
                <span class="terminal-prompt">$</span> <span class="terminal-text">cat role.txt</span>
            </div>
            <h2 class="h4 mb-4">${data.title}</h2>
            ${data.about ? `
                <div class="mb-3">
                    <span class="terminal-prompt">$</span> <span class="terminal-text">cat about.md</span>
                </div>
                <p>${data.about}</p>
            ` : ''}
            <div class="mt-4">
                <span class="terminal-prompt">$</span> <span class="terminal-text">ls contacts/</span><br>
                ${data.email ? `<a href="mailto:${data.email}" class="me-3">${data.email}</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" class="me-3">github.com</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">linkedin.com</a>` : ''}
            </div>
        </div>

        ${data.skills && data.skills.length > 0 ? `
        <div class="terminal-card">
            <div class="mb-3">
                <span class="terminal-prompt">$</span> <span class="terminal-text">cat skills.json</span>
            </div>
            <div class="code-block">
                {<br>
                ${data.skills.map((skill, index) => `
                    &nbsp;&nbsp;"${skill.name}": "${skill.level}%"${index < data.skills.length - 1 ? ',' : ''}<br>
                `).join('')}
                }
            </div>
        </div>
        ` : ''}

        ${data.projects && data.projects.length > 0 ? `
        <div class="terminal-card">
            <div class="mb-3">
                <span class="terminal-prompt">$</span> <span class="terminal-text">ls projects/</span>
            </div>
            ${data.projects.map(project => `
                <div class="code-block mb-3">
                    <div class="mb-2">
                        <strong>${project.title}/</strong>
                    </div>
                    <div class="mb-2"># ${project.description}</div>
                    ${project.tech && project.tech.length > 0 ? `
                        <div class="mb-2">
                            <span class="terminal-text">Tech:</span> ${project.tech.join(', ')}
                        </div>
                    ` : ''}
                    <div>
                        ${project.demo ? `<a href="${project.demo}" target="_blank">[Live Demo]</a> ` : ''}
                        ${project.github ? `<a href="${project.github}" target="_blank">[Source Code]</a>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${data.experience && data.experience.length > 0 ? `
        <div class="terminal-card">
            <div class="mb-3">
                <span class="terminal-prompt">$</span> <span class="terminal-text">cat experience.log</span>
            </div>
            ${data.experience.map(exp => `
                <div class="code-block mb-3">
                    <div><strong>${exp.position}</strong> @ ${exp.company}</div>
                    <div class="text-muted">${exp.duration} | ${exp.location || ''}</div>
                    <div class="mt-2">${exp.description}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        <div class="terminal-card text-center">
            <div class="mb-3">
                <span class="terminal-prompt">$</span> <span class="terminal-text">echo "Thanks for visiting!"</span>
            </div>
            <p>&copy; ${new Date().getFullYear()} ${data.name}</p>
            <small>Powered by <a href="${getFrontendUrl()}" target="_blank">Portfolio Generator</a></small>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

function generateTemplate6HTML(data, meta) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Marketing Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Marketing Portfolio of ' + data.name}">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        body { font-family: 'Arial', sans-serif; }
        .marketing-header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 100px 0; 
            position: relative;
            overflow: hidden;
        }
        .marketing-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }
        .profile-img { width: 150px; height: 150px; border-radius: 50%; border: 5px solid white; }
        .marketing-card { 
            border: none; 
            border-radius: 15px; 
            box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
            transition: all 0.3s; 
            overflow: hidden;
        }
        .marketing-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.15); }
        .section-title { 
            color: #333; 
            font-weight: 700; 
            margin-bottom: 40px; 
            position: relative;
            text-align: center;
        }
        .metric-card { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            border-radius: 15px; 
            padding: 30px; 
            text-align: center; 
        }
        .campaign-badge { 
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4); 
            color: white; 
            border: none; 
            padding: 8px 16px; 
            border-radius: 20px; 
        }
    </style>
</head>
<body>
    <div class="marketing-header text-center position-relative">
        <div class="container">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" class="profile-img mb-4">` : ''}
            <h1 class="display-4 mb-3 fw-bold">${data.name}</h1>
            <h2 class="h3 mb-4">${data.title}</h2>
            ${data.about ? `<p class="lead fs-5" style="max-width: 700px; margin: 0 auto;">${data.about}</p>` : ''}
            <div class="mt-5">
                ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg me-3 mb-2"><i class="fas fa-envelope"></i> Get In Touch</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="btn btn-outline-light btn-lg me-3 mb-2"><i class="fab fa-linkedin"></i> Connect</a>` : ''}
            </div>
        </div>
    </div>

    ${data.projects && data.projects.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title">Marketing Campaigns & Projects</h2>
            <div class="row">
                ${data.projects.map(project => `
                    <div class="col-lg-6 mb-4">
                        <div class="marketing-card h-100">
                            ${project.image ? `<img src="${project.image}" class="card-img-top" style="height: 250px; object-fit: cover;" alt="${project.title}">` : ''}
                            <div class="card-body p-4">
                                <h5 class="card-title fw-bold">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                ${project.tech && project.tech.length > 0 ? `
                                    <div class="mb-3">
                                        ${project.tech.map(tech => `<span class="campaign-badge me-2 mb-2">${tech}</span>`).join('')}
                                    </div>
                                ` : ''}
                                <div class="d-flex gap-2">
                                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-primary">View Campaign</a>` : ''}
                                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-outline-primary">Case Study</a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.skills && data.skills.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title">Marketing Expertise</h2>
            <div class="row">
                ${data.skills.map(skill => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="marketing-card p-4 text-center h-100">
                            <div class="mb-3">
                                <i class="fas fa-chart-line fa-3x text-primary"></i>
                            </div>
                            <h5 class="fw-bold">${skill.name}</h5>
                            <div class="progress mb-3" style="height: 8px;">
                                <div class="progress-bar bg-primary" style="width: ${skill.level}%"></div>
                            </div>
                            <span class="campaign-badge">${skill.level}% Proficiency</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.experience && data.experience.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title">Professional Experience</h2>
            ${data.experience.map(exp => `
                <div class="marketing-card mb-4 p-4">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h4 class="fw-bold text-primary">${exp.position}</h4>
                            <h5>${exp.company}</h5>
                            <p class="text-muted">${exp.duration} • ${exp.location || ''}</p>
                            <p>${exp.description}</p>
                            ${exp.achievements && exp.achievements.length > 0 ? `
                                <div class="mt-3">
                                    <h6>Key Results:</h6>
                                    ${exp.achievements.map(achievement => `
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-trophy text-warning me-2"></i>
                                            <span>${achievement}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <footer class="marketing-header text-center py-5">
        <div class="container">
            <h3 class="mb-3">Ready to Drive Results Together?</h3>
            <p class="lead mb-4">Let's discuss how I can help grow your business.</p>
            ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg">Start a Conversation</a>` : ''}
            <div class="mt-4">
                <p>&copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.</p>
                <small>Powered by <a href="${getFrontendUrl()}" target="_blank" class="text-white">Portfolio Generator</a></small>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

// Serve admin cleanup interface
app.get('/admin-cleanup', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-cleanup.html'));
});

// Handle React routing for all non-API routes in production
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        const indexPath = path.join(__dirname, 'client/build', 'index.html');
        console.log('Attempting to serve React app from:', indexPath);
        console.log('File exists:', require('fs').existsSync(indexPath));
        
        if (require('fs').existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            // Fallback if build files don't exist
            console.error('React build files not found!');
            res.status(500).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Application Error</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
                        .error-container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        .error-code { font-size: 72px; color: #e74c3c; margin-bottom: 20px; }
                        .error-message { font-size: 24px; color: #333; margin-bottom: 20px; }
                        .error-details { color: #666; margin-bottom: 30px; }
                        .retry-btn { background: #3498db; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
                        .retry-btn:hover { background: #2980b9; }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <div class="error-code">🚧</div>
                        <div class="error-message">Application is Starting Up</div>
                        <div class="error-details">
                            The application is currently building or starting up.<br>
                            This usually takes 2-5 minutes on first deployment.
                        </div>
                        <button class="retry-btn" onclick="window.location.reload()">
                            🔄 Refresh Page
                        </button>
                        <br><br>
                        <small>Build path: ${indexPath}</small>
                    </div>
                    
                    <script>
                        // Auto-refresh every 30 seconds
                        setTimeout(() => {
                            window.location.reload();
                        }, 30000);
                    </script>
                </body>
                </html>
            `);
        }
    });
}

// Error handling middleware - must be placed AFTER routes
app.use((err, req, res, next) => {
    console.error("Error middleware caught:", err);
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server up and running on port ${PORT}`));