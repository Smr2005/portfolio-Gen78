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
            console.log('Generating Template3 with data:', { name: data.name, templateId });
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

// ...existing code...
function generateTemplate1HTML(data, meta) {
    // Helper for badges
    function badge(text, color = "#667eea") {
        return `<span style="background:${color};color:white;padding:5px 15px;border-radius:20px;font-size:0.9rem;font-weight:600;margin-right:8px;">${text}</span>`;
    }
    // Helper for icons
    function skillIcon(category) {
        return category === 'Frontend' ? '🎨' :
            category === 'Backend' ? '⚙️' :
            category === 'Database' ? '🗄️' :
            category === 'Cloud' ? '☁️' :
            category === 'DevOps' ? '🚀' : '💻';
    }
    // Helper for project status color
    function statusColor(status) {
        return status === 'Live' ? '#10b981' : '#f59e0b';
    }
    // Helper for featured badge
    function featuredBadge(featured) {
        return featured ? `<div style="position:absolute;top:15px;left:15px;background:#667eea;color:white;padding:5px 15px;border-radius:20px;font-size:0.8rem;font-weight:600;">Featured</div>` : '';
    }
    // Helper for metrics
    function metricsBlock(metrics) {
        if (!metrics) return '';
        return `<div style="background:#f1f5f9;padding:1rem;border-radius:10px;margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-around;text-align:center;">
                ${Object.entries(metrics).map(([k,v])=>`
                    <div>
                        <div style="font-weight:700;color:#1e293b">${v}</div>
                        <div style="font-size:0.8rem;color:#64748b;text-transform:capitalize">${k}</div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }
    // Helper for progress bar
    function progressBar(level) {
        return `<div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-bottom:1rem;">
            <div style="width:${level}%;height:100%;background:linear-gradient(90deg,#667eea,#764ba2);"></div>
        </div>`;
    }
    // Helper for 3D card
    function card3d(content, style = '') {
        return `<div style="border:none;box-shadow:0 10px 30px rgba(0,0,0,0.1);border-radius:15px;${style}" class="card-3d">${content}</div>`;
    }
    // Helper for section title
    function sectionTitle(title) {
        return `<div class="text-center mb-5">
            <h2 style="font-size:3rem;font-weight:700;color:#1e293b;margin-bottom:1rem;">${title}</h2>
            <div style="width:60px;height:4px;background:#667eea;margin:0 auto"></div>
        </div>`;
    }
    // Helper for social links
    function socialLinks(data) {
        return `<div style="display:flex;gap:1rem;">
            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" rel="noopener" style="color:white;font-size:1.5rem;opacity:0.8;">💼</a>` : ''}
            ${data.github ? `<a href="${data.github}" target="_blank" rel="noopener" style="color:white;font-size:1.5rem;opacity:0.8;">🔗</a>` : ''}
            ${data.website ? `<a href="${data.website}" target="_blank" rel="noopener" style="color:white;font-size:1.5rem;opacity:0.8;">🌐</a>` : ''}
        </div>`;
    }
    // Helper for certifications
    function certBlock(cert) {
        return `<div style="border:none;box-shadow:0 15px 35px rgba(0,0,0,0.1);border-radius:15px;height:100%;padding:2rem;text-align:center;">
            <div style="width:80px;height:80px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem auto;font-size:2rem;animation:float3d 5s ease-in-out infinite;">🏆</div>
            <h5 style="color:#1e293b;font-weight:700;margin-bottom:1rem;font-size:1.1rem;">${cert.name}</h5>
            <p style="color:#64748b;margin-bottom:1rem;">${cert.issuer}</p>
            <div style="margin-bottom:1rem;">${badge(cert.date,'#10b981')}</div>
            <div style="font-size:0.8rem;color:#94a3b8;margin-bottom:1rem;">Valid until: ${cert.validUntil || ''}</div>
            ${cert.verifyLink ? `<a href="${cert.verifyLink}" target="_blank" style="display:inline-block;padding:5px 15px;border:1px solid #667eea;border-radius:20px;color:#667eea;text-decoration:none;font-size:0.9rem;">Verify Certificate</a>` : ''}
        </div>`;
    }
    // Helper for education
    function eduBlock(edu) {
        return `<div style="border:none;box-shadow:0 15px 35px rgba(0,0,0,0.1);border-radius:15px;height:100%;padding:2rem;">
            <div style="width:80px;height:80px;background:linear-gradient(135deg,#10b981,#059669);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem auto;font-size:2rem;animation:float3d 5s ease-in-out infinite;">🎓</div>
            <h5 style="color:#1e293b;font-weight:700;margin-bottom:0.5rem;font-size:1.2rem;">${edu.degree}</h5>
            <h6 style="color:#667eea;font-weight:600;margin-bottom:1rem;">${edu.institution}</h6>
            <div style="margin-bottom:1rem;">${badge(edu.duration,'#3b82f6')}${edu.gpa ? badge('GPA: '+edu.gpa,'#10b981') : ''}</div>
            ${edu.location ? `<p style="color:#64748b;margin-bottom:1rem;font-size:0.9rem;">📍 ${edu.location}</p>` : ''}
            ${edu.description ? `<p style="color:#64748b;margin-bottom:1rem;">${edu.description}</p>` : ''}
            ${edu.field ? `<p style="color:#64748b;font-size:0.9rem;"><strong>Field:</strong> ${edu.field}</p>` : ''}
        </div>`;
    }
    // Helper for internship
    function internshipBlock(intern) {
        return `<div style="border:none;box-shadow:0 15px 35px rgba(0,0,0,0.1);border-radius:15px;height:100%;padding:2rem;">
            <div style="width:80px;height:80px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem auto;font-size:2rem;animation:float3d 5s ease-in-out infinite;">🚀</div>
            <h5 style="color:#1e293b;font-weight:700;margin-bottom:0.5rem;font-size:1.2rem;">${intern.position}</h5>
            <h6 style="color:#667eea;font-weight:600;margin-bottom:1rem;">${intern.company}</h6>
            <div style="margin-bottom:1rem;">${badge(intern.duration,'#8b5cf6')}</div>
            ${intern.location ? `<p style="color:#64748b;margin-bottom:1rem;font-size:0.9rem;">📍 ${intern.location}</p>` : ''}
            <p style="color:#64748b;margin-bottom:1.5rem;">${intern.description}</p>
            ${intern.achievements && intern.achievements.length ? `<div><h6 style="color:#1e293b;font-weight:600;margin-bottom:0.5rem;">Key Achievements:</h6>
                <ul style="color:#64748b;padding-left:1.2rem;">${intern.achievements.map(a=>`<li style="margin-bottom:0.3rem;">${a}</li>`).join('')}</ul></div>` : ''}
        </div>`;
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Portfolio of ' + data.name}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Inter',sans-serif;background:#f8fafc; }
        .card-3d { transition:transform 0.3s; }
        .card-3d:hover { transform:rotateY(10deg) rotateX(5deg) translateZ(20px); }
        @keyframes float3d { 0%,100%{transform:translateY(0) rotateX(0) rotateY(0);}25%{transform:translateY(-10px) rotateX(5deg) rotateY(5deg);}50%{transform:translateY(-20px) rotateX(0) rotateY(10deg);}75%{transform:translateY(-10px) rotateX(-5deg) rotateY(5deg);} }
        @media (max-width:768px){ .card-3d:hover{transform:none;} }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background:rgba(30,41,59,0.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#" style="font-size:1.5rem;">${data.name}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#experience">Experience</a></li>
                    <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#certifications">Certifications</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;color:white;padding-top:80px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:20%;left:10%;width:100px;height:100px;background:rgba(255,255,255,0.1);border-radius:20px;animation:float3d 8s ease-in-out infinite;transform-style:preserve-3d;"></div>
        <div style="position:absolute;bottom:20%;right:15%;width:80px;height:80px;background:rgba(255,255,255,0.08);border-radius:50%;animation:float3d 6s ease-in-out infinite reverse;"></div>
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <div style="animation:slideIn3d 1s ease-out;">
                        <h1 style="font-size:3.5rem;font-weight:700;margin-bottom:1rem;text-shadow:2px 2px 4px rgba(0,0,0,0.3);">Hi, I'm ${data.name}</h1>
                        <h2 style="font-size:1.8rem;margin-bottom:2rem;opacity:0.9;font-weight:400;">${data.title}</h2>
                        <p style="font-size:1.2rem;margin-bottom:2rem;opacity:0.8;line-height:1.6;">${data.about}</p>
                        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem;">
                            <a href="#projects" class="btn btn-light btn-lg" style="font-weight:600;padding:12px 30px;border-radius:25px;">View My Work</a>
                            <a href="#contact" class="btn btn-outline-light btn-lg" style="font-weight:600;padding:12px 30px;border-radius:25px;">Get In Touch</a>
                        </div>
                        ${socialLinks(data)}
                    </div>
                </div>
                <div class="col-md-6 text-center">
                    <div class="profile-3d" style="width:350px;height:350px;margin:0 auto;position:relative;">
                        <img src="${data.profileImage}" alt="${data.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;border:8px solid rgba(255,255,255,0.2);box-shadow:0 20px 40px rgba(0,0,0,0.3);">
                        <div style="position:absolute;bottom:20px;right:20px;background:#10b981;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem;border:4px solid white;animation:float3d 4s ease-in-out infinite;">✓</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" style="padding:100px 0;background:white;">
        <div class="container">
            ${sectionTitle('About Me')}
            ${card3d(`
                <div style="padding:3rem;text-align:center;">
                    <p style="font-size:1.2rem;line-height:1.8;color:#64748b;">${data.about}</p>
                    <div class="row mt-4 text-center">
                        <div class="col-md-3"><div style="font-size:2rem;margin-bottom:0.5rem;">📍</div><div style="font-weight:600;color:#1e293b;">${data.location}</div></div>
                        <div class="col-md-3"><div style="font-size:2rem;margin-bottom:0.5rem;">💼</div><div style="font-weight:600;color:#1e293b;">5+ Years</div></div>
                        <div class="col-md-3"><div style="font-size:2rem;margin-bottom:0.5rem;">🏆</div><div style="font-weight:600;color:#1e293b;">50+ Projects</div></div>
                        <div class="col-md-3"><div style="font-size:2rem;margin-bottom:0.5rem;">⭐</div><div style="font-weight:600;color:#1e293b;">Top Rated</div></div>
                    </div>
                </div>
            `)}
        </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" style="padding:100px 0;background:#f8fafc;">
        <div class="container">
            ${sectionTitle('Professional Experience')}
            <div class="row">
                <div class="col-lg-10 mx-auto">
                    ${(data.experience||[]).map(exp=>card3d(`
                        <div style="padding:2.5rem;">
                            <div class="row">
                                <div class="col-md-8">
                                    <h4 style="color:#1e293b;font-weight:700;margin-bottom:0.5rem;">${exp.position}</h4>
                                    <h5 style="color:#667eea;font-weight:600;margin-bottom:1rem;">${exp.company} • ${exp.location}</h5>
                                    <p style="color:#64748b;line-height:1.6;margin-bottom:1.5rem;">${exp.description}</p>
                                    ${exp.achievements ? `<div><h6 style="color:#1e293b;font-weight:600;margin-bottom:1rem;">Key Achievements:</h6><ul style="color:#64748b;">${exp.achievements.map(a=>`<li style="margin-bottom:0.5rem;">${a}</li>`).join('')}</ul></div>` : ''}
                                </div>
                                <div class="col-md-4 text-end">${badge(exp.duration)}</div>
                            </div>
                        </div>
                    `,'margin-bottom:2rem;')).join('')}
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" style="padding:100px 0;background:white;">
        <div class="container">
            ${sectionTitle('Technical Skills')}
            <div class="row">
                ${(data.skills||[]).map(skill=>`
                    <div class="col-md-6 col-lg-3 mb-4">
                        ${card3d(`
                            <div style="text-align:center;padding:2rem;">
                                <div style="font-size:2.5rem;margin-bottom:1rem;animation:float3d 4s ease-in-out infinite;">${skillIcon(skill.category)}</div>
                                <h5 style="color:#1e293b;font-weight:600;margin-bottom:1rem;">${skill.name}</h5>
                                ${progressBar(skill.level)}
                                <small style="color:#64748b;font-weight:600;">${skill.level}% Proficiency</small>
                                <div style="margin-top:0.5rem;font-size:0.8rem;color:#94a3b8;">${skill.category}</div>
                            </div>
                        `)}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" style="padding:100px 0;background:#f8fafc;">
        <div class="container">
            ${sectionTitle('Featured Projects')}
            <div class="row">
                ${(data.projects||[]).map(project=>`
                    <div class="col-lg-6 mb-5">
                        <div style="border:none;box-shadow:0 20px 40px rgba(0,0,0,0.1);border-radius:20px;overflow:hidden;height:100%;position:relative;" class="card-3d">
                            <div style="position:relative;">
                                <img src="${project.image}" alt="${project.title}" style="width:100%;height:250px;object-fit:cover;">
                                <div style="position:absolute;top:15px;right:15px;background:${statusColor(project.status)};color:white;padding:5px 15px;border-radius:20px;font-size:0.8rem;font-weight:600;">${project.status}</div>
                                ${featuredBadge(project.featured)}
                            </div>
                            <div style="padding:2.5rem;">
                                <div style="font-size:1.5rem;font-weight:700;color:#1e293b;margin-bottom:1rem;">${project.title}</div>
                                <div style="color:#64748b;line-height:1.6;margin-bottom:1.5rem;">${project.description}</div>
                                <div style="margin-bottom:1.5rem;display:flex;flex-wrap:wrap;gap:0.5rem;">
                                    ${(Array.isArray(project.tech)?project.tech:[]).map(tech=>`<span style="background:#e2e8f0;color:#475569;font-size:0.8rem;padding:5px 10px;border-radius:15px;">${tech}</span>`).join('')}
                                </div>
                                ${metricsBlock(project.metrics)}
                                <div style="display:flex;gap:1rem;">
                                    ${(project.demo||project.liveLink)?`<a href="${project.demo||project.liveLink}" target="_blank" class="btn btn-primary" style="background:linear-gradient(135deg,#667eea,#764ba2);border:none;border-radius:25px;padding:8px 20px;font-weight:600;">🚀 Live Demo</a>`:''}
                                    ${(project.github||project.githubLink)?`<a href="${project.github||project.githubLink}" target="_blank" class="btn btn-outline-secondary" style="border-radius:25px;padding:8px 20px;font-weight:600;">📂 Code</a>`:''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Certifications Section -->
    ${(data.certifications && data.certifications.length) ? `
    <section id="certifications" style="padding:100px 0;background:white;">
        <div class="container">
            ${sectionTitle('Certifications & Credentials')}
            <div class="row">
                ${data.certifications.map(cert=>`<div class="col-md-6 col-lg-4 mb-4">${certBlock(cert)}</div>`).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Education Section -->
    <section id="education" style="padding:100px 0;background:#f8fafc;">
        <div class="container">
            ${sectionTitle('Education')}
            <div class="row">
                ${(data.education||[]).map(edu=>`<div class="col-md-6 mb-4">${eduBlock(edu)}</div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Internships Section -->
    ${(data.internships && data.internships.length) ? `
    <section id="internships" style="padding:100px 0;background:white;">
        <div class="container">
            ${sectionTitle('Internships & Early Experience')}
            <div class="row">
                ${data.internships.map(intern=>`<div class="col-md-6 mb-4">${internshipBlock(intern)}</div>`).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Contact Section -->
    <section id="contact" style="padding:100px 0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto text-center">
                    <h2 style="font-size:3rem;font-weight:700;margin-bottom:2rem;">Let's Work Together</h2>
                    <p style="font-size:1.3rem;margin-bottom:3rem;opacity:0.9;">Ready to bring your ideas to life? Let's discuss your next project.</p>
                    <div style="display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;margin-bottom:3rem;">
                        <div class="card-3d" style="text-align:center;"><div style="font-size:2.5rem;margin-bottom:1rem;">📧</div><div style="font-weight:600;font-size:1.1rem;">${data.email}</div></div>
                        <div class="card-3d" style="text-align:center;"><div style="font-size:2.5rem;margin-bottom:1rem;">📱</div><div style="font-weight:600;font-size:1.1rem;">${data.phone}</div></div>
                        <div class="card-3d" style="text-align:center;"><div style="font-size:2.5rem;margin-bottom:1rem;">📍</div><div style="font-weight:600;font-size:1.1rem;">${data.location}</div></div>
                    </div>
                    <a href="mailto:${data.email}" class="btn btn-light btn-lg" style="font-weight:600;padding:15px 40px;border-radius:30px;font-size:1.1rem;">Start a Conversation</a>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}
// ...existing code...
function generateTemplate2HTML(data, meta) {
  // Helper for creative badge
  function creativeBadge(text, color = "#ff6b6b") {
    return `<span style="background:linear-gradient(45deg,${color},#feca57,#48dbfb,#ff9ff3);color:white;padding:7px 18px;border-radius:20px;font-size:1rem;font-weight:700;margin-right:8px;text-transform:uppercase;letter-spacing:1px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">${text}</span>`;
  }
  // Helper for social icons
  function socialIcons(data) {
    return `<div style="display:flex;gap:1.2rem;margin-top:1.5rem;">
      ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" title="LinkedIn" style="font-size:1.7rem;color:#0077b5;text-decoration:none;">💼</a>` : ''}
      ${data.behance ? `<a href="${data.behance}" target="_blank" title="Behance" style="font-size:1.7rem;color:#1769ff;text-decoration:none;">🎨</a>` : ''}
      ${data.dribbble ? `<a href="${data.dribbble}" target="_blank" title="Dribbble" style="font-size:1.7rem;color:#ea4c89;text-decoration:none;">🏀</a>` : ''}
      ${data.website ? `<a href="${data.website}" target="_blank" title="Website" style="font-size:1.7rem;color:#222;text-decoration:none;">🌐</a>` : ''}
    </div>`;
  }
  // Helper for section title
  function sectionTitle(title) {
    return `<h2 style="font-weight:800;color:#2c3e50;margin-bottom:32px;text-align:center;letter-spacing:1px;text-shadow:1px 1px 6px rgba(0,0,0,0.07);">${title}</h2>`;
  }
  // Helper for creative card
  function creativeCard(content, style = '') {
    return `<div style="border:none;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.08);transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);overflow:hidden;position:relative;${style}">${content}</div>`;
  }
  // Helper for skill orb
  function skillOrb(skill) {
    return `<span style="background:linear-gradient(45deg,#ff6b6b,#4ecdc4);color:white;border:none;border-radius:50px;padding:10px 20px;margin:8px;display:inline-block;font-weight:600;box-shadow:0 8px 25px rgba(255,107,107,0.18);font-size:1rem;">
      ${skill.name || skill}${skill.level ? ` <span style="font-size:0.85em;opacity:0.7;">${skill.level}%</span>` : ''}
    </span>`;
  }
  // Helper for project tech badges
  function techBadges(tech) {
    if (!tech) return '';
    return tech.map(t => `<span style="background:linear-gradient(45deg,#ff6b6b,#4ecdc4);color:white;border-radius:50px;padding:8px 16px;margin:4px;display:inline-block;font-size:0.95rem;font-weight:500;">${t}</span>`).join('');
  }

  // HERO SECTION
  const heroSection = `
  <section style="background:linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);min-height:100vh;position:relative;overflow:hidden;padding-top:100px;">
    <div style="position:absolute;top:10%;left:5%;width:150px;height:150px;background:rgba(255,255,255,0.15);border-radius:50%;animation:morphShape 8s ease-in-out infinite;"></div>
    <div style="position:absolute;bottom:10%;right:8%;width:120px;height:120px;background:rgba(255,255,255,0.12);border-radius:50%;animation:morphShape 10s ease-in-out infinite reverse;"></div>
    <div class="container h-100 d-flex align-items-center">
      <div class="row w-100 align-items-center">
        <div class="col-lg-6">
          <div>
            ${creativeBadge('Creative Professional')}
            <h1 style="font-size:3.2rem;font-weight:800;margin-bottom:1rem;color:white;text-shadow:2px 2px 8px rgba(0,0,0,0.08);letter-spacing:1px;">
              ${data.name}
            </h1>
            <h2 style="font-size:1.5rem;color:#fffbe7;margin-bottom:1.5rem;font-style:italic;font-weight:400;text-shadow:1px 1px 4px rgba(0,0,0,0.08);">
              ${data.title}
            </h2>
            <div style="margin-bottom:2rem;">
              <a href="mailto:${data.email}" class="btn btn-light" style="font-weight:600;padding:12px 30px;border-radius:25px;margin-right:1rem;">✉️ Email</a>
              <a href="${data.linkedin || '#'}" class="btn btn-outline-light" style="font-weight:600;padding:12px 30px;border-radius:25px;">💼 LinkedIn</a>
            </div>
            ${socialIcons(data)}
          </div>
        </div>
        <div class="col-lg-6 text-center">
          <div style="position:relative;display:inline-block;">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width:180px;height:180px;border-radius:50%;border:6px solid white;box-shadow:0 10px 30px rgba(0,0,0,0.18);object-fit:cover;animation:morphShape 15s ease-in-out infinite;">` : ''}
            <div style="position:absolute;bottom:18px;right:18px;background:linear-gradient(45deg,#10b981,#34d399);width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:1.3rem;font-weight:bold;box-shadow:0 8px 20px rgba(16,185,129,0.18);">✓</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  // ABOUT SECTION
  const aboutSection = data.about ? `
    <section style="background:#fffbe7;padding:60px 0;">
      <div class="container">
        ${sectionTitle('About')}
        <div class="row justify-content-center">
          <div class="col-lg-8">
            ${creativeCard(`<p style="font-size:1.2rem;line-height:2;color:#444;margin-bottom:0;">${data.about}</p>`, 'padding:2.5rem;text-align:center;')}
          </div>
        </div>
      </div>
    </section>
  ` : '';

  // EXPERIENCE SECTION
  const experienceSection = data.experience && data.experience.length > 0 ? `
    <section style="background:#f8fafc;padding:60px 0;">
      <div class="container">
        ${sectionTitle('Experience')}
        <div class="row">
          ${data.experience.map(exp => `
            <div class="col-md-6 mb-4">
              ${creativeCard(`
                <h4 style="font-weight:700;color:#2c3e50;">${exp.position}</h4>
                <h5 style="color:#ff6b6b;font-weight:600;">${exp.company}</h5>
                <p style="color:#888;">${exp.duration} ${exp.location ? `• ${exp.location}` : ''}</p>
                <p style="color:#444;">${exp.description || ''}</p>
                ${exp.achievements && exp.achievements.length > 0 ? `
                  <ul style="color:#64748b;margin-top:1rem;">
                    ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                  </ul>
                ` : ''}
              `, 'padding:2rem;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // INTERNSHIPS SECTION
  const internshipsSection = data.internships && data.internships.length > 0 ? `
    <section style="background:#feca57;padding:60px 0 40px 0;">
      <div class="container">
        ${sectionTitle('Internships')}
        <div class="row">
          ${data.internships.map(intern => `
            <div class="col-md-6 mb-4">
              ${creativeCard(`
                <h4 style="font-weight:700;color:#2c3e50;">${intern.position}</h4>
                <h5 style="color:#48dbfb;font-weight:600;">${intern.company}</h5>
                <p style="color:#888;">${intern.duration} ${intern.location ? `• ${intern.location}` : ''}</p>
                <p style="color:#444;">${intern.description || ''}</p>
                ${intern.achievements && intern.achievements.length > 0 ? `
                  <ul style="color:#64748b;margin-top:1rem;">
                    ${intern.achievements.map(ach => `<li>${ach}</li>`).join('')}
                  </ul>
                ` : ''}
              `, 'padding:2rem;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // EDUCATION SECTION
  const educationSection = data.education && data.education.length > 0 ? `
    <section style="background:#fffbe7;padding:60px 0;">
      <div class="container">
        ${sectionTitle('Education')}
        <div class="row">
          ${data.education.map(edu => `
            <div class="col-md-6 mb-4">
              ${creativeCard(`
                <h4 style="font-weight:700;color:#2c3e50;">${edu.degree}</h4>
                <h5 style="color:#ff6b6b;font-weight:600;">${edu.institution}</h5>
                <p style="color:#888;">${edu.duration} ${edu.gpa ? `• GPA: ${edu.gpa}` : ''}</p>
                ${edu.description ? `<p style="color:#444;">${edu.description}</p>` : ''}
              `, 'padding:2rem;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // SKILLS SECTION
  const skillsSection = data.skills && data.skills.length > 0 ? `
    <section style="background:#f8fafc;padding:60px 0;">
      <div class="container">
        ${sectionTitle('Skills')}
        <div class="row">
          ${data.skills.map(skill => `
            <div class="col-md-4 mb-4">
              ${creativeCard(`
                <h5 style="color:#2c3e50;font-weight:700;">${skill.name}</h5>
                <div style="background:#f8f9fa;height:12px;border-radius:10px;margin-bottom:1rem;">
                  <div style="width:${skill.level}%;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);height:100%;border-radius:10px;transition:width 2s ease-in-out;"></div>
                </div>
                ${skillOrb(skill)}
              `, 'padding:2rem;text-align:center;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // PROJECTS SECTION
  const projectsSection = data.projects && data.projects.length > 0 ? `
    <section style="background:#feca57;padding:60px 0;">
      <div class="container">
        ${sectionTitle('Projects')}
        <div class="row">
          ${data.projects.map(project => `
            <div class="col-lg-6 mb-5">
              <div style="border:none;border-radius:20px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);transition:all 0.5s ease;position:relative;background:white;">
                ${project.image ? `<img src="${project.image}" style="width:100%;height:220px;object-fit:cover;border-top-left-radius:20px;border-top-right-radius:20px;">` : ''}
                <div style="padding:2rem;">
                  <h5 style="font-weight:700;color:#2c3e50;font-size:1.3rem;">${project.title}</h5>
                  <p style="color:#555;line-height:1.6;">${project.description}</p>
                  ${project.tech && project.tech.length > 0 ? `<div style="margin-bottom:1rem;">${techBadges(project.tech)}</div>` : ''}
                  <div style="display:flex;gap:1rem;">
                    ${project.demo || project.liveLink ? `<a href="${project.demo || project.liveLink}" target="_blank" style="background:linear-gradient(45deg,#ff6b6b,#4ecdc4);color:white;border:none;border-radius:25px;padding:10px 25px;font-weight:600;text-decoration:none;">🚀 Live</a>` : ''}
                    ${project.github || project.githubLink ? `<a href="${project.github || project.githubLink}" target="_blank" style="border:1.5px solid #bbb;border-radius:25px;padding:10px 25px;font-weight:600;text-decoration:none;color:#222;">📂 Code</a>` : ''}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CERTIFICATIONS SECTION
  const certificationsSection = data.certifications && data.certifications.length > 0 ? `
    <section style="background:#f8fafc;padding:60px 0;">
      <div class="container">
        ${sectionTitle('Certifications')}
        <div class="row">
          ${data.certifications.map(cert => `
            <div class="col-md-6 col-lg-4 mb-4">
              ${creativeCard(`
                <div style="width:60px;height:60px;background:linear-gradient(45deg,#ff6b6b,#4ecdc4);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem auto;font-size:1.5rem;">🏆</div>
                <h5 style="font-weight:700;">${cert.name}</h5>
                <p style="color:#888;">${cert.issuer}</p>
                <p style="font-size:0.95rem;">${cert.date}</p>
                ${cert.validUntil ? `<p style="font-size:0.95rem;color:#10b981;">Valid until: ${cert.validUntil}</p>` : ''}
                ${cert.verifyLink ? `<a href="${cert.verifyLink}" target="_blank" style="display:inline-block;margin-top:0.5rem;" class="btn btn-outline-primary btn-sm">Verify</a>` : ''}
              `, 'padding:2rem;text-align:center;height:100%;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CONTACT SECTION
  const contactSection = `
    <section style="background:linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);padding:60px 0;color:white;">
      <div class="container text-center">
        <h3 style="font-size:2.5rem;font-weight:bold;margin-bottom:1rem;">Ready to Create Together?</h3>
        <p style="font-size:1.2rem;margin-bottom:2rem;opacity:0.9;">Let's discuss your next creative project.</p>
        ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg" style="font-size:1.1rem;padding:15px 40px;">✉️ Start the Conversation</a>` : ''}
        <div style="margin-top:3rem;">
          <p style="opacity:0.8;margin:0;">&copy; ${new Date().getFullYear()} ${data.name} - Creative Portfolio</p>
          <small style="opacity:0.6;">Powered by <a href="#" target="_blank" style="color:rgba(255,255,255,0.8);">Portfolio Generator</a></small>
        </div>
      </div>
    </section>
  `;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Creative Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Creative Portfolio of ' + data.name}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      @keyframes morphShape { 0%,100%{border-radius:50% 30% 70% 40%;transform:rotate(0deg);}25%{border-radius:30% 70% 40% 50%;transform:rotate(90deg);}50%{border-radius:70% 40% 50% 30%;transform:rotate(180deg);}75%{border-radius:40% 50% 30% 70%;transform:rotate(270deg);} }
      body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin:0; padding:0; background:#f8fafc; }
      .btn-outline-light { border:2px solid #fff !important; color:#fff !important; }
      .btn-outline-light:hover { background:#fff !important; color:#ff6b6b !important; }
      .btn-light:hover { background:#feca57 !important; color:#fff !important; }
      @media (max-width: 768px) {
        h1 { font-size:2rem !important; }
        h2 { font-size:1.1rem !important; }
        .col-lg-6, .col-md-6, .col-md-4 { flex: 0 0 100%; max-width: 100%; }
      }
    </style>
  </head>
  <body>
    ${heroSection}
    ${aboutSection}
    ${experienceSection}
    ${internshipsSection}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}
    ${certificationsSection}
    ${contactSection}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `;
}
// ...existing code...
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
        body { 
            font-family: 'Georgia', serif; 
            line-height: 1.6; 
            overflow-x: hidden;
        }
        
        /* ENHANCED BUSINESS PROFESSIONAL ANIMATIONS - MATCHING REACT TEMPLATE */
        @keyframes professionalSlide {
            0% { transform: translateX(-50px) rotateY(-15deg); opacity: 0; }
            100% { transform: translateX(0) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes businessFloat {
            0%, 100% { transform: translateY(0px) rotateX(0deg); }
            50% { transform: translateY(-10px) rotateX(2deg); }
        }
        
        @keyframes dataVisualization {
            0% { transform: scaleY(0.3); }
            50% { transform: scaleY(1); }
            100% { transform: scaleY(0.8); }
        }
        
        @keyframes professionalGlow {
            0%, 100% { box-shadow: 0 5px 15px rgba(30,60,114,0.2); }
            50% { box-shadow: 0 10px 30px rgba(30,60,114,0.4); }
        }
        
        @keyframes progressGrow {
            0% { width: 0% !important; }
        }
        
        .business-header { 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); 
            color: white; 
            padding: 80px 0;
            position: relative;
            overflow: hidden;
        }
        
        .business-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
            animation: shimmer 4s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .profile-img { 
            width: 160px; 
            height: 160px; 
            border-radius: 0 !important; 
            border: 4px solid white;
            transition: all 0.3s ease;
            animation: subtleFloat 4s ease-in-out infinite;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            object-fit: cover;
        }
        
        .profile-img:hover {
            transform: scale(1.1) rotateY(5deg);
            border-color: #ffd700;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation-play-state: paused;
        }
        
        .business-card { 
            border: 1px solid #e9ecef; 
            border-radius: 15px; 
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            animation: professionalGlow 3s ease-in-out infinite;
            position: relative;
            overflow: hidden;
        }
        
        .business-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(30, 60, 114, 0.02), rgba(42, 82, 152, 0.02));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .business-card:hover::before {
            opacity: 1;
        }
        
        .business-card:hover { 
            transform: rotateY(8deg) rotateX(4deg) translateZ(15px) scale(1.02);
            box-shadow: 0 25px 50px rgba(30,60,114,0.3);
            border-color: #2a5298;
        }
        
        .section-title { 
            color: #1e3c72; 
            font-weight: 700; 
            border-bottom: 3px solid #2a5298; 
            padding-bottom: 10px;
            animation: professionalSlide 1s ease-out;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #1e3c72, #2a5298);
            animation: progressGrow 2s ease-out forwards;
        }
        
        .achievement-item { 
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            border-left: 4px solid #2a5298; 
            padding: 20px; 
            margin-bottom: 15px;
            border-radius: 8px;
            transition: all 0.3s ease;
            animation: professionalSlide 1s ease-out;
            position: relative;
        }
        
        .achievement-item:hover {
            transform: translateX(10px);
            border-left-color: #1e3c72;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .achievement-item::before {
            content: '✓';
            position: absolute;
            left: -2px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: #2a5298;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }
        
        .btn {
            border-radius: 8px;
            padding: 12px 24px;
            font-weight: 600;
            transition: all 0.3s ease;
            transform-style: preserve-3d;
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        
        .progress {
            height: 10px;
            border-radius: 5px;
            background: #f8f9fa;
            overflow: hidden;
        }
        
        .progress-bar {
            background: linear-gradient(90deg, #1e3c72, #2a5298);
            transition: width 2s ease-in-out;
            animation: progressGrow 2s ease-out;
        }
        
        /* MOBILE OPTIMIZATIONS */
        @media (max-width: 768px) {
            .business-card:hover,
            .achievement-item:hover {
                transform: none !important;
            }
            
            .profile-img {
                animation: none !important;
            }
            
            .profile-img:hover {
                transform: scale(1.05) !important;
            }
            
            .business-card:hover {
                transform: translateY(-3px) !important;
            }
        }
        
        .fade-in-minimal {
            animation: professionalSlide 1s ease-out;
        }
    </style>
</head>
<body>
    <!-- Professional Navigation -->
    <nav style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(30, 60, 114, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255,255,255,0.1);
        z-index: 1000;
        padding: 1rem 0;
    ">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: white;
                ">
                    ${data.name}
                </div>
                <div style="display: flex; gap: 2rem; align-items: center;">
                    <a href="#about" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">About</a>
                    <a href="#experience" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">Experience</a>
                    <a href="#projects" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">Projects</a>
                    <a href="#skills" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">Expertise</a>
                    <a href="#contact" style="color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500;">Contact</a>
                    <button class="btn" style="
                        background: linear-gradient(135deg, #64b5f6, #42a5f5);
                        border: none;
                        border-radius: 6px;
                        padding: 8px 20px;
                        font-weight: 600;
                        color: white;
                    ">
                        Resume
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Professional Hero Section -->
    <section style="
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        min-height: 100vh;
        position: relative;
        padding-top: 100px;
    ">
        <!-- Professional Background Pattern -->
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%);
            background-size: 60px 60px;
            background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
        "></div>
        
        <div class="container h-100 d-flex align-items-center position-relative">
            <div class="row w-100 align-items-center">
                <div class="col-lg-7">
                    <div style="
                        background: rgba(255,255,255,0.1);
                        padding: 4rem;
                        border-radius: 15px;
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255,255,255,0.2);
                        animation: professionalSlide 1s ease-out;
                    ">
                        <div style="
                            display: inline-block;
                            background: rgba(100,181,246,0.2);
                            color: #64b5f6;
                            padding: 8px 20px;
                            border-radius: 6px;
                            font-size: 0.9rem;
                            font-weight: 600;
                            margin-bottom: 1.5rem;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            border: 1px solid rgba(100,181,246,0.3);
                        ">
                            Senior Business Consultant
                        </div>
                        <h1 style="
                            font-size: 4rem;
                            font-weight: 300;
                            margin-bottom: 1rem;
                            letter-spacing: -1px;
                            line-height: 1.1;
                        ">
                            ${data.name}
                        </h1>
                        <h2 style="
                            font-size: 1.6rem;
                            font-weight: 400;
                            margin-bottom: 2rem;
                            color: #64b5f6;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        ">
                            ${data.title}
                        </h2>
                        <p style="
                            font-size: 1.2rem;
                            line-height: 1.8;
                            margin-bottom: 3rem;
                            opacity: 0.9;
                            max-width: 600px;
                        ">
                            ${data.about || ''}
                        </p>
                        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
                            <a href="#projects" class="btn" style="
                                background: transparent;
                                border: 2px solid #64b5f6;
                                color: #64b5f6;
                                padding: 12px 30px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                border-radius: 6px;
                                text-decoration: none;
                            ">
                                View Case Studies
                            </a>
                            <a href="#contact" class="btn" style="
                                background: #64b5f6;
                                border: 2px solid #64b5f6;
                                color: white;
                                padding: 12px 30px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                border-radius: 6px;
                                text-decoration: none;
                            ">
                                Schedule Consultation
                            </a>
                        </div>
                        <!-- Professional Links -->
                        <div style="display: flex; gap: 1.5rem;">
                            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" rel="noopener noreferrer" style="color: #64b5f6; font-size: 1.5rem; opacity: 0.8; text-decoration: none;">💼</a>` : ''}
                            ${data.website ? `<a href="${data.website}" target="_blank" rel="noopener noreferrer" style="color: #64b5f6; font-size: 1.5rem; opacity: 0.8; text-decoration: none;">🌐</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 text-center">
                    <div style="
                        position: relative;
                        width: 350px;
                        height: 350px;
                        margin: 0 auto;
                    ">
                        <div style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 300px;
                            height: 300px;
                            background: rgba(255,255,255,0.1);
                            border-radius: 15px;
                            animation: businessFloat 6s ease-in-out infinite;
                        "></div>
                        ${data.profileImage ? `
                        <img src="${data.profileImage}" alt="${data.name}" style="
                            position: relative;
                            width: 280px;
                            height: 280px;
                            border-radius: 15px;
                            object-fit: cover;
                            border: 4px solid rgba(255,255,255,0.2);
                            box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                            z-index: 2;
                        ">
                        <div style="
                            position: absolute;
                            bottom: 20px;
                            right: 20px;
                            background: linear-gradient(135deg, #10b981, #34d399);
                            width: 50px;
                            height: 50px;
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 1.5rem;
                            border: 3px solid white;
                            animation: businessFloat 4s ease-in-out infinite reverse;
                            z-index: 3;
                        ">
                            ✓
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

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

    ${data.internships && data.internships.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title mb-4">Internship Experience</h2>
            ${data.internships.map(internship => `
                <div class="business-card p-4 mb-4">
                    <div class="row">
                        <div class="col-md-9">
                            <h4 class="fw-bold text-primary">${internship.position}</h4>
                            <h5>${internship.company}</h5>
                            <p class="text-muted">${internship.duration} • ${internship.location || ''}</p>
                            <p>${internship.description}</p>
                            ${internship.achievements && internship.achievements.length > 0 ? `
                                <div class="mt-3">
                                    <h6>Key Achievements:</h6>
                                    ${internship.achievements.map(achievement => `
                                        <div class="achievement-item">${achievement}</div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <div class="col-md-3 text-center">
                            <div style="
                                width: 80px;
                                height: 80px;
                                background: linear-gradient(135deg, #64b5f6, #42a5f5);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin: 0 auto;
                                font-size: 2rem;
                                animation: businessFloat 6s ease-in-out infinite;
                            ">
                                🚀
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${data.education && data.education.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title mb-4">Education</h2>
            ${data.education.map(edu => `
                <div class="business-card p-4 mb-4">
                    <div class="row">
                        <div class="col-md-9">
                            <h4 class="fw-bold text-primary">${edu.degree}</h4>
                            <h5>${edu.institution || edu.school}</h5>
                            <p class="text-muted">${edu.duration} ${edu.location ? `• ${edu.location}` : ''}</p>
                            ${edu.gpa ? `<p><strong>GPA:</strong> ${edu.gpa}</p>` : ''}
                            ${edu.description ? `<p>${edu.description}</p>` : ''}
                            ${edu.honors ? `<p><strong>Honors:</strong> ${edu.honors}</p>` : ''}
                            ${edu.relevant && edu.relevant.length > 0 ? `
                                <div class="mt-3">
                                    <h6>Relevant Coursework:</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        ${edu.relevant.map(course => `
                                            <span class="badge bg-secondary">${course}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        <div class="col-md-3 text-center">
                            <div style="
                                width: 80px;
                                height: 80px;
                                background: linear-gradient(135deg, #10b981, #34d399);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin: 0 auto;
                                font-size: 2rem;
                                animation: businessFloat 6s ease-in-out infinite;
                            ">
                                🎓
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${data.certifications && data.certifications.length > 0 ? `
    <section class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title mb-4">Professional Certifications</h2>
            <div class="row">
                ${data.certifications.map(cert => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="business-card p-4 h-100 text-center">
                            <div style="
                                width: 60px;
                                height: 60px;
                                background: linear-gradient(135deg, #64b5f6, #42a5f5);
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin: 0 auto 1rem auto;
                                font-size: 1.5rem;
                                animation: businessFloat 6s ease-in-out infinite;
                            ">
                                🏆
                            </div>
                            <h5 class="fw-bold">${cert.name}</h5>
                            <p class="text-muted">${cert.issuer}</p>
                            <p class="small">${cert.date}</p>
                            ${cert.validUntil ? `<p class="small text-success">Valid until: ${cert.validUntil}</p>` : ''}
                            ${cert.verifyLink ? `<a href="${cert.verifyLink}" target="_blank" class="btn btn-outline-primary btn-sm">Verify</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.projects && data.projects.length > 0 ? `
    <section class="py-5">
        <div class="container">
            <h2 class="section-title mb-4">Case Studies & Projects</h2>
            <div class="row">
                ${data.projects.map(project => `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="business-card p-4 h-100">
                            ${project.image ? `
                                <div style="
                                    width: 100%;
                                    height: 200px;
                                    background-image: url('${project.image}');
                                    background-size: cover;
                                    background-position: center;
                                    border-radius: 10px;
                                    margin-bottom: 1rem;
                                    position: relative;
                                    overflow: hidden;
                                ">
                                    <div style="
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                        bottom: 0;
                                        background: linear-gradient(135deg, rgba(30,60,114,0.8), rgba(42,82,152,0.8));
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        opacity: 0;
                                        transition: opacity 0.3s ease;
                                    " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
                                        <span style="color: white; font-size: 1.2rem; font-weight: 600;">View Project</span>
                                    </div>
                                </div>
                            ` : `
                                <div style="
                                    width: 100%;
                                    height: 200px;
                                    background: linear-gradient(135deg, #64b5f6, #42a5f5);
                                    border-radius: 10px;
                                    margin-bottom: 1rem;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 3rem;
                                    animation: businessFloat 6s ease-in-out infinite;
                                ">
                                    💼
                                </div>
                            `}
                            <h5 class="fw-bold">${project.title}</h5>
                            <p class="text-muted small">${project.description}</p>
                            ${project.tech && project.tech.length > 0 ? `
                                <div class="mb-3">
                                    ${project.tech.map(tech => `
                                        <span class="badge bg-primary me-1 mb-1">${tech}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                            <div class="d-flex gap-2">
                                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-outline-primary btn-sm">Live Demo</a>` : ''}
                                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline-secondary btn-sm">GitHub</a>` : ''}
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
  // Helper for section title
  function sectionTitle(title) {
    return `<h2 style="font-weight:700;color:#222;margin-bottom:32px;text-align:center;letter-spacing:1px;border-bottom:2px solid #eee;padding-bottom:10px;">${title}</h2>`;
  }
  // Helper for minimalist card
  function miniCard(content, style = '') {
    return `<div style="background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.04);padding:2rem;margin-bottom:2rem;${style}">${content}</div>`;
  }
  // Helper for skill bar
  function skillBar(skill) {
    return `
      <div style="margin-bottom:1.2rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-weight:600;color:#333;">${skill.name}</span>
          <span style="font-size:0.95em;color:#888;">${skill.level}%</span>
        </div>
        <div style="background:#f1f1f1;height:8px;border-radius:5px;overflow:hidden;">
          <div style="width:${skill.level}%;background:#222;height:100%;border-radius:5px;"></div>
        </div>
      </div>
    `;
  }
  // Helper for project tech badges
  function techBadges(tech) {
    if (!tech) return '';
    return tech.map(t => `<span style="background:#222;color:#fff;border-radius:20px;padding:4px 14px;margin:2px 6px 2px 0;font-size:0.92rem;display:inline-block;">${t}</span>`).join('');
  }

  // HERO SECTION
  const heroSection = `
    <section style="background:#f8fafc;padding:70px 0 40px 0;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-3 text-center">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width:140px;height:140px;object-fit:cover;border-radius:0;box-shadow:0 2px 12px rgba(0,0,0,0.08);margin-bottom:1.5rem;">` : ''}
          </div>
          <div class="col-md-9">
            <h1 style="font-size:2.5rem;font-weight:700;color:#222;margin-bottom:0.5rem;">${data.name}</h1>
            <h3 style="font-size:1.3rem;color:#666;font-weight:400;margin-bottom:1.2rem;">${data.title}</h3>
            <div style="margin-bottom:1.2rem;">
              ${data.email ? `<a href="mailto:${data.email}" style="color:#222;text-decoration:none;margin-right:18px;font-weight:500;">✉️ ${data.email}</a>` : ''}
              ${data.phone ? `<span style="color:#222;margin-right:18px;font-weight:500;">📞 ${data.phone}</span>` : ''}
              ${data.location ? `<span style="color:#222;font-weight:500;">📍 ${data.location}</span>` : ''}
            </div>
            <div style="margin-bottom:1.2rem;">
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color:#0077b5;font-size:1.3rem;margin-right:12px;text-decoration:none;">LinkedIn</a>` : ''}
              ${data.website ? `<a href="${data.website}" target="_blank" style="color:#222;font-size:1.3rem;margin-right:12px;text-decoration:none;">Website</a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // ABOUT SECTION
  const aboutSection = data.about ? `
    <section style="background:#fff;padding:40px 0;">
      <div class="container">
        ${sectionTitle('About')}
        <div class="row justify-content-center">
          <div class="col-lg-8">
            ${miniCard(`<p style="font-size:1.1rem;line-height:2;color:#444;margin-bottom:0;">${data.about}</p>`, 'text-align:center;')}
          </div>
        </div>
      </div>
    </section>
  ` : '';

  // SKILLS SECTION
  const skillsSection = data.skills && data.skills.length > 0 ? `
    <section style="background:#f8fafc;padding:40px 0;">
      <div class="container">
        ${sectionTitle('Skills')}
        <div class="row">
          <div class="col-lg-8 mx-auto">
            ${data.skills.map(skill => skillBar(skill)).join('')}
          </div>
        </div>
      </div>
    </section>
  ` : '';

  // EXPERIENCE SECTION
  const experienceSection = data.experience && data.experience.length > 0 ? `
    <section style="background:#fff;padding:40px 0;">
      <div class="container">
        ${sectionTitle('Experience')}
        <div class="row">
          ${data.experience.map(exp => `
            <div class="col-md-6 mb-4">
              ${miniCard(`
                <h4 style="font-weight:600;color:#222;">${exp.position}</h4>
                <h5 style="color:#222;font-weight:400;">${exp.company}</h5>
                <p style="color:#888;">${exp.duration} ${exp.location ? `• ${exp.location}` : ''}</p>
                <p style="color:#444;">${exp.description || ''}</p>
                ${exp.achievements && exp.achievements.length > 0 ? `
                  <ul style="color:#666;margin-top:1rem;">
                    ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                  </ul>
                ` : ''}
              `)}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // PROJECTS SECTION
  const projectsSection = data.projects && data.projects.length > 0 ? `
    <section style="background:#f8fafc;padding:40px 0;">
      <div class="container">
        ${sectionTitle('Projects')}
        <div class="row">
          ${data.projects.map(project => `
            <div class="col-md-6 mb-4">
              ${miniCard(`
                ${project.image ? `<img src="${project.image}" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:1rem;">` : ''}
                <h5 style="font-weight:600;color:#222;">${project.title}</h5>
                <p style="color:#555;line-height:1.6;">${project.description}</p>
                ${project.tech && project.tech.length > 0 ? `<div style="margin-bottom:1rem;">${techBadges(project.tech)}</div>` : ''}
                <div style="margin-top:1rem;">
                  ${project.demo || project.liveLink ? `<a href="${project.demo || project.liveLink}" target="_blank" style="background:#222;color:#fff;border:none;border-radius:20px;padding:8px 22px;font-weight:500;text-decoration:none;margin-right:8px;">Live</a>` : ''}
                  ${project.github || project.githubLink ? `<a href="${project.github || project.githubLink}" target="_blank" style="border:1.5px solid #222;border-radius:20px;padding:8px 22px;font-weight:500;text-decoration:none;color:#222;">Code</a>` : ''}
                </div>
              `)}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // EDUCATION SECTION
  const educationSection = data.education && data.education.length > 0 ? `
    <section style="background:#fff;padding:40px 0;">
      <div class="container">
        ${sectionTitle('Education')}
        <div class="row">
          ${data.education.map(edu => `
            <div class="col-md-6 mb-4">
              ${miniCard(`
                <h4 style="font-weight:600;color:#222;">${edu.degree}</h4>
                <h5 style="color:#222;font-weight:400;">${edu.institution}</h5>
                <p style="color:#888;">${edu.duration} ${edu.gpa ? `• GPA: ${edu.gpa}` : ''}</p>
                ${edu.description ? `<p style="color:#444;">${edu.description}</p>` : ''}
              `)}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // INTERNSHIPS SECTION
  const internshipsSection = data.internships && data.internships.length > 0 ? `
    <section style="background:#f8fafc;padding:40px 0;">
      <div class="container">
        ${sectionTitle('Internships')}
        <div class="row">
          ${data.internships.map(intern => `
            <div class="col-md-6 mb-4">
              ${miniCard(`
                <h4 style="font-weight:600;color:#222;">${intern.position}</h4>
                <h5 style="color:#222;font-weight:400;">${intern.company}</h5>
                <p style="color:#888;">${intern.duration} ${intern.location ? `• ${intern.location}` : ''}</p>
                <p style="color:#444;">${intern.description || ''}</p>
                ${intern.achievements && intern.achievements.length > 0 ? `
                  <ul style="color:#666;margin-top:1rem;">
                    ${intern.achievements.map(ach => `<li>${ach}</li>`).join('')}
                  </ul>
                ` : ''}
              `)}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CERTIFICATIONS SECTION
  const certificationsSection = data.certifications && data.certifications.length > 0 ? `
    <section style="background:#fff;padding:40px 0;">
      <div class="container">
        ${sectionTitle('Certifications')}
        <div class="row">
          ${data.certifications.map(cert => `
            <div class="col-md-6 col-lg-4 mb-4">
              ${miniCard(`
                <div style="width:48px;height:48px;background:#222;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem auto;font-size:1.3rem;">🏆</div>
                <h5 style="font-weight:600;">${cert.name}</h5>
                <p style="color:#888;">${cert.issuer}</p>
                <p style="font-size:0.95rem;">${cert.date}</p>
                ${cert.validUntil ? `<p style="font-size:0.95rem;color:#10b981;">Valid until: ${cert.validUntil}</p>` : ''}
                ${cert.verifyLink ? `<a href="${cert.verifyLink}" target="_blank" style="display:inline-block;margin-top:0.5rem;" class="btn btn-outline-dark btn-sm">Verify</a>` : ''}
              `, 'text-align:center;height:100%;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CONTACT SECTION
  const contactSection = `
    <section style="background:#222;padding:40px 0;color:white;">
      <div class="container text-center">
        <h3 style="font-size:2rem;font-weight:bold;margin-bottom:1rem;">Let's Connect</h3>
        <p style="font-size:1.1rem;margin-bottom:2rem;opacity:0.9;">Open to new opportunities and collaborations.</p>
        ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg" style="font-size:1.05rem;padding:12px 36px;">✉️ Email Me</a>` : ''}
        <div style="margin-top:2rem;">
          <p style="opacity:0.8;margin:0;">&copy; ${new Date().getFullYear()} ${data.name}</p>
          <small style="opacity:0.6;">Powered by <a href="#" target="_blank" style="color:rgba(255,255,255,0.8);">Portfolio Generator</a></small>
        </div>
      </div>
    </section>
  `;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Minimalist Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Minimalist Portfolio of ' + data.name}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin:0; padding:0; background:#f8fafc; }
      @media (max-width: 768px) {
        h1 { font-size:1.5rem !important; }
        h2 { font-size:1.1rem !important; }
        .col-md-6, .col-lg-4, .col-md-3, .col-md-9, .col-lg-8 { flex: 0 0 100%; max-width: 100%; }
      }
    </style>
  </head>
  <body>
    ${heroSection}
    ${aboutSection}
    ${skillsSection}
    ${experienceSection}
    ${projectsSection}
    ${educationSection}
    ${internshipsSection}
    ${certificationsSection}
    ${contactSection}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `;
}
function generateTemplate5HTML(data, meta) {
  // Helper for terminal section title
  function terminalTitle(title) {
    return `<div style="color:#00ffae;font-weight:700;font-size:1.2rem;margin-bottom:18px;font-family:'Fira Mono', 'Fira Code', monospace;">$ {title}</div>`;
  }
  // Helper for terminal card
  function terminalCard(content, style = '') {
    return `<div style="background:#181c20;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,0.25);padding:2rem;margin-bottom:2rem;color:#e6e6e6;font-family:'Fira Mono','Fira Code',monospace;${style}">${content}</div>`;
  }
  // Helper for skill badge
  function skillBadge(skill) {
    return `<span style="background:#23272b;color:#00ffae;border-radius:16px;padding:6px 16px;margin:4px 6px 4px 0;font-size:0.98rem;display:inline-block;font-family:'Fira Mono','Fira Code',monospace;">${skill.name || skill}${skill.level ? ` <span style="font-size:0.85em;opacity:0.7;">${skill.level}%</span>` : ''}</span>`;
  }
  // Helper for project tech badges
  function techBadges(tech) {
    if (!tech) return '';
    return tech.map(t => `<span style="background:#23272b;color:#00ffae;border-radius:16px;padding:5px 14px;margin:2px 6px 2px 0;font-size:0.92rem;display:inline-block;">${t}</span>`).join('');
  }

  // NAVBAR
  const navbar = `
    <nav style="background:#181c20;padding:1rem 0 0.5rem 0;">
      <div class="container d-flex justify-content-between align-items-center">
        <span style="color:#00ffae;font-family:'Fira Mono','Fira Code',monospace;font-size:1.3rem;font-weight:700;letter-spacing:1px;">&gt;_ Terminal Portfolio</span>
        <div>
          ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color:#00ffae;margin-right:18px;text-decoration:none;font-size:1.1rem;">LinkedIn</a>` : ''}
          ${data.website ? `<a href="${data.website}" target="_blank" style="color:#00ffae;text-decoration:none;font-size:1.1rem;">Website</a>` : ''}
        </div>
      </div>
    </nav>
  `;

  // HERO/INTRO SECTION
  const heroSection = `
    <section style="background:#23272b;padding:60px 0 40px 0;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-3 text-center">
            ${data.profileImage ? `<img src="${data.profileImage}" alt="${data.name}" style="width:120px;height:120px;object-fit:cover;border-radius:10px;box-shadow:0 2px 12px rgba(0,255,174,0.08);margin-bottom:1.5rem;border:3px solid #00ffae;">` : ''}
          </div>
          <div class="col-md-9">
            <div style="color:#00ffae;font-size:1.1rem;font-family:'Fira Mono','Fira Code',monospace;margin-bottom:0.7rem;">$ whoami</div>
            <h1 style="font-size:2.3rem;font-weight:700;color:#fff;margin-bottom:0.5rem;font-family:'Fira Mono','Fira Code',monospace;">${data.name}</h1>
            <h3 style="font-size:1.1rem;color:#00ffae;font-weight:400;margin-bottom:1.2rem;font-family:'Fira Mono','Fira Code',monospace;">${data.title}</h3>
            <div style="margin-bottom:1.2rem;">
              ${data.email ? `<a href="mailto:${data.email}" style="color:#fff;text-decoration:none;margin-right:18px;font-weight:500;">✉️ ${data.email}</a>` : ''}
              ${data.phone ? `<span style="color:#fff;margin-right:18px;font-weight:500;">📞 ${data.phone}</span>` : ''}
              ${data.location ? `<span style="color:#fff;font-weight:500;">📍 ${data.location}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // ABOUT SECTION
  const aboutSection = data.about ? `
    <section style="background:#181c20;padding:40px 0;">
      <div class="container">
        ${terminalTitle('about')}
        ${terminalCard(`<p style="font-size:1.08rem;line-height:2;color:#e6e6e6;margin-bottom:0;">${data.about}</p>`, 'text-align:left;')}
      </div>
    </section>
  ` : '';

  // EXPERIENCE SECTION
  const experienceSection = data.experience && data.experience.length > 0 ? `
    <section style="background:#23272b;padding:40px 0;">
      <div class="container">
        ${terminalTitle('experience')}
        ${data.experience.map(exp => terminalCard(`
          <h4 style="font-weight:600;color:#00ffae;font-size:1.15rem;">${exp.position}</h4>
          <h5 style="color:#fff;font-weight:400;">${exp.company}</h5>
          <p style="color:#aaa;">${exp.duration} ${exp.location ? `| ${exp.location}` : ''}</p>
          <p style="color:#e6e6e6;">${exp.description || ''}</p>
          ${exp.achievements && exp.achievements.length > 0 ? `
            <ul style="color:#00ffae;margin-top:1rem;">
              ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
            </ul>
          ` : ''}
        `)).join('')}
      </div>
    </section>
  ` : '';

  // EDUCATION SECTION
  const educationSection = data.education && data.education.length > 0 ? `
    <section style="background:#181c20;padding:40px 0;">
      <div class="container">
        ${terminalTitle('education')}
        ${data.education.map(edu => terminalCard(`
          <h4 style="font-weight:600;color:#00ffae;">${edu.degree}</h4>
          <h5 style="color:#fff;font-weight:400;">${edu.school || edu.institution}</h5>
          <p style="color:#aaa;">${edu.duration} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''}</p>
          ${edu.description ? `<p style="color:#e6e6e6;">${edu.description}</p>` : ''}
        `)).join('')}
      </div>
    </section>
  ` : '';

  // INTERNSHIPS SECTION
  const internshipsSection = data.internships && data.internships.length > 0 ? `
    <section style="background:#23272b;padding:40px 0;">
      <div class="container">
        ${terminalTitle('internships')}
        ${data.internships.map(intern => terminalCard(`
          <h4 style="font-weight:600;color:#00ffae;">${intern.position}</h4>
          <h5 style="color:#fff;font-weight:400;">${intern.company}</h5>
          <p style="color:#aaa;">${intern.duration} ${intern.location ? `| ${intern.location}` : ''}</p>
          <p style="color:#e6e6e6;">${intern.description || ''}</p>
          ${intern.achievements && intern.achievements.length > 0 ? `
            <ul style="color:#00ffae;margin-top:1rem;">
              ${intern.achievements.map(ach => `<li>${ach}</li>`).join('')}
            </ul>
          ` : ''}
        `)).join('')}
      </div>
    </section>
  ` : '';

  // SKILLS SECTION
  const skillsSection = data.skills && data.skills.length > 0 ? `
    <section style="background:#181c20;padding:40px 0;">
      <div class="container">
        ${terminalTitle('skills')}
        <div>
          ${data.skills.map(skill => skillBadge(skill)).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // PROJECTS SECTION
  const projectsSection = data.projects && data.projects.length > 0 ? `
    <section style="background:#23272b;padding:40px 0;">
      <div class="container">
        ${terminalTitle('projects')}
        ${data.projects.map(project => terminalCard(`
          ${project.image ? `<img src="${project.image}" style="width:100%;height:160px;object-fit:cover;border-radius:8px;margin-bottom:1rem;">` : ''}
          <h5 style="font-weight:600;color:#00ffae;">${project.title}</h5>
          <p style="color:#e6e6e6;line-height:1.6;">${project.description}</p>
          ${project.tech && project.tech.length > 0 ? `<div style="margin-bottom:1rem;">${techBadges(project.tech)}</div>` : ''}
          <div style="margin-top:1rem;">
            ${project.demo || project.liveLink ? `<a href="${project.demo || project.liveLink}" target="_blank" style="background:#00ffae;color:#181c20;border:none;border-radius:16px;padding:8px 22px;font-weight:500;text-decoration:none;margin-right:8px;">Live</a>` : ''}
            ${project.github || project.githubLink ? `<a href="${project.github || project.githubLink}" target="_blank" style="border:1.5px solid #00ffae;border-radius:16px;padding:8px 22px;font-weight:500;text-decoration:none;color:#00ffae;">Code</a>` : ''}
          </div>
        `)).join('')}
      </div>
    </section>
  ` : '';

  // CERTIFICATIONS SECTION
  const certificationsSection = data.certifications && data.certifications.length > 0 ? `
    <section style="background:#181c20;padding:40px 0;">
      <div class="container">
        ${terminalTitle('certifications')}
        <div class="row">
          ${data.certifications.map(cert => `
            <div class="col-md-6 col-lg-4 mb-4">
              ${terminalCard(`
                <div style="width:44px;height:44px;background:#00ffae;color:#181c20;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem auto;font-size:1.2rem;">🏆</div>
                <h5 style="font-weight:600;">${cert.name}</h5>
                <p style="color:#aaa;">${cert.issuer}</p>
                <p style="font-size:0.95rem;">${cert.date}</p>
                ${cert.validUntil ? `<p style="font-size:0.95rem;color:#00ffae;">Valid until: ${cert.validUntil}</p>` : ''}
                ${cert.verifyLink ? `<a href="${cert.verifyLink}" target="_blank" style="display:inline-block;margin-top:0.5rem;" class="btn btn-outline-dark btn-sm">Verify</a>` : ''}
              `, 'text-align:center;height:100%;')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CONTACT SECTION
  const contactSection = `
    <section style="background:#23272b;padding:40px 0;color:#00ffae;">
      <div class="container text-center">
        <h3 style="font-size:2rem;font-weight:bold;margin-bottom:1rem;">Let's Connect</h3>
        <p style="font-size:1.1rem;margin-bottom:2rem;opacity:0.9;">Open to new opportunities and collaborations.</p>
        ${data.email ? `<a href="mailto:${data.email}" class="btn btn-dark btn-lg" style="font-size:1.05rem;padding:12px 36px;background:#00ffae;color:#181c20;border:none;">✉️ Email Me</a>` : ''}
        <div style="margin-top:2rem;">
          <p style="opacity:0.8;margin:0;">&copy; ${new Date().getFullYear()} ${data.name}</p>
          <small style="opacity:0.6;">Powered by <a href="#" target="_blank" style="color:#00ffae;">Portfolio Generator</a></small>
        </div>
      </div>
    </section>
  `;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${meta?.title || data.name + ' - Terminal Portfolio'}</title>
    <meta name="description" content="${meta?.description || 'Terminal Portfolio of ' + data.name}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Fira Mono', 'Fira Code', monospace; margin:0; padding:0; background:#181c20; }
      a { transition:color 0.2s; }
      a:hover { color:#fff !important; }
      .btn-dark:hover { background:#00ffae !important; color:#181c20 !important; }
      @media (max-width: 768px) {
        h1 { font-size:1.5rem !important; }
        h2 { font-size:1.1rem !important; }
        .col-md-6, .col-lg-4, .col-md-3, .col-md-9 { flex: 0 0 100%; max-width: 100%; }
      }
    </style>
  </head>
  <body>
    ${navbar}
    ${heroSection}
    ${aboutSection}
    ${experienceSection}
    ${educationSection}
    ${internshipsSection}
    ${skillsSection}
    ${projectsSection}
    ${certificationsSection}
    ${contactSection}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `;
}

function generateTemplate6HTML(data, meta) {
  // Helper for badge
  function badge(text, color = "#667eea") {
    return `<span style="background:${color};color:white;padding:5px 15px;border-radius:20px;font-size:0.9rem;font-weight:600;margin-right:8px;">${text}</span>`;
  }
  // Helper for project tech badges
  function techBadges(tech) {
    if (!tech) return '';
    return tech.map(t => `<span style="background:linear-gradient(45deg,#f093fb,#f5576c);color:white;border-radius:20px;padding:8px 15px;margin:2px 6px 2px 0;font-size:0.92rem;display:inline-block;">${t}</span>`).join('');
  }

  // HERO SECTION
  const heroSection = `
    <section class="gradient-bg hero-section" style="min-height:100vh;position:relative;overflow:hidden;padding-top:100px;">
      <div class="floating-element floating-1"></div>
      <div class="floating-element floating-2"></div>
      <div class="container h-100 d-flex align-items-center position-relative" style="z-index:2;">
        <div class="row w-100 align-items-center">
          <div class="col-lg-8 slide-up">
            <div class="hero-card">
              <h1 class="hero-title">${data.name}</h1>
              <h2 class="hero-subtitle">${data.title}</h2>
              <div class="hero-info">
                <span><i class="fas fa-map-marker-alt me-2"></i>${data.location}</span>
                <span><i class="fas fa-envelope me-2"></i>${data.email}</span>
                <span><i class="fas fa-phone me-2"></i>${data.phone}</span>
              </div>
              <p class="hero-text">${data.about}</p>
              <div>
                <a href="#projects" class="btn-marketing primary"><i class="fas fa-chart-line me-2"></i>View Campaigns</a>
                <a href="#contact" class="btn-marketing secondary"><i class="fas fa-comments me-2"></i>Let's Talk</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 text-center">
            <div class="profile-container float-animation">
              <img src="${data.profileImage}" alt="${data.name}" class="profile-img" />
            </div>
            <div class="social-links">
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>` : ''}
              ${data.website ? `<a href="${data.website}" target="_blank" class="social-link"><i class="fas fa-globe"></i></a>` : ''}
              ${data.github ? `<a href="${data.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // STATS SECTION
  const statsSection = `
    <section style="padding:80px 0;background:white;">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 mb-4">
            <div class="marketing-card" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;">
              <div style="font-size:3rem;">📈</div>
              <div style="font-size:2.5rem;font-weight:bold;">+300%</div>
              <div>Average Revenue Growth</div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="marketing-card" style="background:linear-gradient(135deg,#f093fb,#f5576c);color:white;">
              <div style="font-size:3rem;">💰</div>
              <div style="font-size:2.5rem;font-weight:bold;">-45%</div>
              <div>Customer Acquisition Cost</div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="marketing-card" style="background:linear-gradient(135deg,#4facfe,#00f2fe);color:white;">
              <div style="font-size:3rem;">🎯</div>
              <div style="font-size:2.5rem;font-weight:bold;">500+</div>
              <div>Qualified Leads Monthly</div>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="marketing-card" style="background:linear-gradient(135deg,#fa709a,#fee140);color:white;">
              <div style="font-size:3rem;">🏆</div>
              <div style="font-size:2.5rem;font-weight:bold;">15+</div>
              <div>Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // EXPERIENCE SECTION
  const experienceSection = data.experience && data.experience.length > 0 ? `
    <section id="experience" style="padding:80px 0;background:#f8f9fa;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="hero-title" style="font-size:3rem;">Professional Experience</h2>
          <p style="font-size:1.2rem;color:#666;">My journey in digital marketing and growth hacking</p>
        </div>
        ${data.experience.map((exp, i) => `
          <div class="marketing-card mb-5" style="background:white;border:none;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.1);overflow:hidden;">
            <div class="row">
              <div class="col-md-8">
                <div style="background:linear-gradient(45deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:1.8rem;font-weight:bold;">${exp.position}</div>
                <h5 style="color:#333;margin-bottom:0.5rem;font-size:1.3rem;">${exp.company}</h5>
                <p style="color:#666;margin-bottom:1.5rem;font-size:1rem;"><i class="fas fa-calendar me-2"></i>${exp.duration} | <i class="fas fa-map-marker-alt ms-2 me-2"></i>${exp.location}</p>
                <p style="color:#555;line-height:1.8;margin-bottom:2rem;font-size:1.1rem;">${exp.description}</p>
                <div>
                  <h6 style="color:#333;margin-bottom:1rem;font-size:1.2rem;font-weight:bold;">🎯 Key Achievements:</h6>
                  <div class="row">
                    ${exp.achievements.map(ach => `<div class="col-md-6 mb-2"><div style="background:linear-gradient(45deg,#667eea,#764ba2);color:white;padding:1rem;border-radius:10px;font-size:0.9rem;"><i class="fas fa-check-circle me-2"></i>${ach}</div></div>`).join('')}
                  </div>
                </div>
              </div>
              <div class="col-md-4 text-center d-flex align-items-center justify-content-center">
                <div style="background:${i===0?'linear-gradient(45deg,#667eea,#764ba2)':'linear-gradient(45deg,#f093fb,#f5576c)'};color:white;padding:2rem;border-radius:20px;font-size:3rem;">${i===0?'🚀':i===1?'📊':'🌟'}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  // SKILLS SECTION
  const skillsSection = data.skills && data.skills.length > 0 ? `
    <section id="skills" style="padding:80px 0;background:white;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="hero-title" style="font-size:3rem;">Marketing Skills & Expertise</h2>
          <p style="font-size:1.2rem;color:#666;">Tools and strategies I use to drive growth</p>
        </div>
        <div class="row">
          ${data.skills.map(skill => `
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="marketing-card" style="background:white;border:1px solid #eee;border-radius:20px;padding:2rem;height:100%;box-shadow:0 5px 15px rgba(0,0,0,0.08);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                  <h5 style="color:#333;margin:0;font-size:1.2rem;font-weight:bold;">${skill.name}</h5>
                  ${badge(skill.category)}
                </div>
                <div class="progress" style="height:10px;background-color:#f0f0f0;border-radius:10px;">
                  <div class="progress-bar" style="width:${skill.level}%;background:linear-gradient(45deg,#667eea,#764ba2);border-radius:10px;"></div>
                </div>
                <div style="text-align:right;margin-top:0.5rem;color:#667eea;font-weight:bold;font-size:1rem;">${skill.level}%</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // PROJECTS SECTION
  const projectsSection = data.projects && data.projects.length > 0 ? `
    <section id="projects" style="padding:80px 0;background:#f8f9fa;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="hero-title" style="font-size:3rem;">Featured Campaigns & Projects</h2>
          <p style="font-size:1.2rem;color:#666;">Successful marketing campaigns that drove real results</p>
        </div>
        <div class="row">
          ${data.projects.map(project => `
            <div class="col-lg-6 mb-5">
              <div class="marketing-card" style="background:white;border:none;border-radius:20px;overflow:hidden;height:100%;box-shadow:0 10px 30px rgba(0,0,0,0.1);">
                <div style="position:relative;">
                  <img src="${project.image}" alt="${project.title}" style="width:100%;height:250px;object-fit:cover;">
                  <span style="position:absolute;top:15px;right:15px;background:${project.status==='Live Campaign'?'linear-gradient(45deg,#667eea,#764ba2)':'linear-gradient(45deg,#f093fb,#f5576c)'};color:white;font-size:0.9rem;padding:8px 15px;border-radius:20px;">${project.status}</span>
                </div>
                <div style="padding:2.5rem;">
                  <div style="font-size:1.5rem;font-weight:700;color:#333;margin-bottom:1rem;">${project.title}</div>
                  <div style="color:#666;line-height:1.8;margin-bottom:2rem;font-size:1rem;">${project.description}</div>
                  ${project.metrics ? `
                    <div style="margin-bottom:2rem;">
                      <h6 style="color:#333;margin-bottom:1rem;font-weight:bold;">📊 Campaign Results:</h6>
                      <div class="row text-center">
                        ${Object.entries(project.metrics).map(([k,v])=>`
                          <div class="col">
                            <div style="background:linear-gradient(45deg,#667eea,#764ba2);color:white;padding:1rem;border-radius:15px;margin-bottom:0.5rem;">
                              <div style="font-size:1.5rem;font-weight:bold;">${v}</div>
                              <div style="font-size:0.9rem;opacity:0.9;text-transform:uppercase;">${k}</div>
                            </div>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:2rem;">
                    ${techBadges(project.tech)}
                  </div>
                  <div style="display:flex;gap:1rem;">
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="btn-marketing primary" style="flex:1;"><i class="fas fa-external-link-alt me-2"></i>View Case Study</a>` : ''}
                    ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn-marketing outline" style="flex:1;"><i class="fab fa-github me-2"></i>Analytics</a>` : ''}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CERTIFICATIONS SECTION
  const certificationsSection = data.certifications && data.certifications.length > 0 ? `
    <section id="certifications" style="padding:80px 0;background:white;">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="hero-title" style="font-size:3rem;">Professional Certifications</h2>
          <p style="font-size:1.2rem;color:#666;">Validated expertise in digital marketing platforms</p>
        </div>
        <div class="row">
          ${data.certifications.map((cert, i) => `
            <div class="col-md-6 col-lg-3 mb-4">
              <div class="marketing-card" style="background:white;border:none;border-radius:20px;height:100%;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,0.1);text-align:center;padding:2rem;">
                <div style="font-size:4rem;margin-bottom:1rem;">${i===0?'🎯':i===1?'📘':i===2?'🚀':'📊'}</div>
                <div style="font-size:1.1rem;font-weight:bold;color:#333;margin-bottom:1rem;line-height:1.4;">${cert.name}</div>
                <p style="color:#667eea;margin-bottom:0.5rem;font-weight:bold;font-size:1rem;">${cert.issuer}</p>
                <p style="color:#666;margin-bottom:0.5rem;font-size:0.9rem;">Issued: ${cert.date}</p>
                <p style="color:#666;margin-bottom:1rem;font-size:0.9rem;">Valid until: ${cert.validUntil}</p>
                <span style="background:linear-gradient(45deg,#667eea,#764ba2);color:white;font-size:0.8rem;padding:8px 15px;border-radius:20px;">Click to verify</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  ` : '';

  // CONTACT SECTION
  const contactSection = `
    <section id="contact" class="gradient-bg text-center" style="padding:60px 0;color:white;">
      <div class="container">
        <h3 style="font-size:2.5rem;font-weight:bold;margin-bottom:1rem;">Ready to Drive Results Together?</h3>
        <p style="font-size:1.2rem;margin-bottom:2rem;opacity:0.9;">Let's discuss how I can help grow your business.</p>
        ${data.email ? `<a href="mailto:${data.email}" class="btn btn-light btn-lg" style="font-size:1.1rem;padding:15px 40px;"><i class="fas fa-envelope me-2"></i>Start the Conversation</a>` : ''}
        <div style="margin-top:3rem;">
          <p style="opacity:0.8;margin:0;">&copy; ${new Date().getFullYear()} ${data.name} - Marketing Portfolio</p>
          <small style="opacity:0.6;">Powered by <a href="#" target="_blank" style="color:rgba(255,255,255,0.8);">Portfolio Generator</a></small>
        </div>
      </div>
    </section>
  `;

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
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      /* (Paste the CSS from your React template here for a perfect match, or use the CSS from the previous answer) */
    </style>
  </head>
  <body>
    ${heroSection}
    ${statsSection}
    ${experienceSection}
    ${skillsSection}
    ${projectsSection}
    ${certificationsSection}
    ${contactSection}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `;
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('ðŸš€ Server running on port ' + PORT);
    console.log('ðŸ“Š Backend URL: http://localhost:' + PORT);
    console.log('ðŸŒ Environment: ' + (process.env.NODE_ENV || 'development'));
});










