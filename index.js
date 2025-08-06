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

//CHORE
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Enable CORS for frontend communication
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ["https://portfolio-generator-xxxx.onrender.com"] // Replace with your actual Render URL
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}));

//mongo connect
console.log("Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
dotenv.config();
app.use(express.json());

//just a demo route - authentication temporarily disabled
app.get("/", async (req, res, next) => {
    res.send("Portfolio Generator Backend is running!");
});

//Route Middleware For Login And Signup routes
app.use("/api/user", authRoute);

//Route Middleware For Portfolio routes
app.use("/api/portfolio", portfolioRoute);

//Route Middleware For File Upload routes
app.use("/api/upload", uploadRoute);

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Public route to serve published portfolios as HTML
app.get("/portfolio/:slug", async (req, res) => {
    try {
        const Portfolio = require("./model/Portfolio");
        const { slug } = req.params;
        
        const portfolio = await Portfolio.findOne({ slug, isPublished: true });
        
        if (!portfolio) {
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
                    <a href="http://localhost:3000">Create Your Own Portfolio</a>
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

// Function to generate HTML for portfolio
function generatePortfolioHTML(portfolio) {
    const { data, meta, templateId } = portfolio;
    
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
        <small>Powered by <a href="http://localhost:3000" target="_blank">Portfolio Generator</a></small>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
}

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
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