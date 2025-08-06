const router = require("express").Router();
const User = require("../model/User");
const Portfolio = require("../model/Portfolio");

// Form model might not exist or have issues, so let's handle it safely
let Form;
try {
  Form = require("../model/Form");
} catch (error) {
  console.log("Form model not available:", error.message);
  Form = null;
}

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: "whatlead",
  password: "Lead@006789"
};

// Admin secret for legacy support
const ADMIN_SECRET = process.env.MIGRATION_SECRET || "migrate-urls-portfolio-2024";

// Middleware to verify admin access (supports both methods)
const verifyAdmin = (req, res, next) => {
  // Method 1: Check for admin credentials in headers
  const adminUsername = req.headers['x-admin-username'];
  const adminPassword = req.headers['x-admin-password'];
  
  if (adminUsername && adminPassword) {
    if (adminUsername === ADMIN_CREDENTIALS.username && adminPassword === ADMIN_CREDENTIALS.password) {
      return next();
    } else {
      return res.status(403).json({ 
        error: "Invalid admin credentials.",
        hint: "Check your username and password"
      });
    }
  }
  
  // Method 2: Check for legacy admin secret (backward compatibility)
  const adminSecret = req.headers['x-admin-secret'] || req.query.secret;
  
  if (adminSecret === ADMIN_SECRET) {
    return next();
  }
  
  // No valid authentication found
  return res.status(403).json({ 
    error: "Unauthorized. Admin access required.",
    hint: "Provide admin credentials (x-admin-username & x-admin-password) or legacy secret"
  });
};

// Admin login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Username and password are required" 
      });
    }
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple session token (in production, use JWT or proper session management)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      res.json({
        message: "✅ Admin login successful",
        success: true,
        sessionToken,
        credentials: {
          username: ADMIN_CREDENTIALS.username,
          password: ADMIN_CREDENTIALS.password
        },
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(401).json({ 
        error: "Invalid credentials",
        hint: "Check your username and password"
      });
    }
    
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ 
      error: "Login failed",
      details: error.message 
    });
  }
});

// Get database statistics
router.get("/stats", verifyAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const portfolioCount = await Portfolio.countDocuments();
    const formCount = Form ? await Form.countDocuments() : 0;
    
    // Get sample users (without passwords)
    const sampleUsers = await User.find({}, { password: 0, resetToken: 0 }).limit(10);
    
    // Get portfolios with user info
    const portfoliosWithUsers = await Portfolio.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          'user.password': 0,
          'user.resetToken': 0,
          'data.profileImageData': 0,
          'data.resumeData': 0,
          'data.projects.imageData': 0,
          'data.certifications.imageData': 0
        }
      },
      { $limit: 10 }
    ]);
    
    res.json({
      message: "Database Statistics",
      counts: {
        users: userCount,
        portfolios: portfolioCount,
        forms: formCount
      },
      sampleUsers,
      samplePortfolios: portfoliosWithUsers,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to get database stats" });
  }
});

// Delete all test/demo users and their data
router.delete("/cleanup-test-users", verifyAdmin, async (req, res) => {
  try {
    console.log("🧹 Starting test user cleanup...");
    
    // Get all users first for logging
    const allUsers = await User.find({}, { password: 0, resetToken: 0 });
    console.log(`Found ${allUsers.length} users in database`);
    
    // Get all portfolios for logging
    const allPortfolios = await Portfolio.find({});
    console.log(`Found ${allPortfolios.length} portfolios in database`);
    
    // Delete all portfolios first (to maintain referential integrity)
    const portfolioDeleteResult = await Portfolio.deleteMany({});
    console.log(`🗑️ Deleted ${portfolioDeleteResult.deletedCount} portfolios`);
    
    // Delete all users
    const userDeleteResult = await User.deleteMany({});
    console.log(`🗑️ Deleted ${userDeleteResult.deletedCount} users`);
    
    // Delete all forms (if any)
    const formDeleteResult = Form ? await Form.deleteMany({}) : { deletedCount: 0 };
    console.log(`🗑️ Deleted ${formDeleteResult.deletedCount} forms`);
    
    // Verify cleanup
    const remainingUsers = await User.countDocuments();
    const remainingPortfolios = await Portfolio.countDocuments();
    const remainingForms = Form ? await Form.countDocuments() : 0;
    
    const cleanupSummary = {
      message: "✅ Test user cleanup completed successfully",
      deleted: {
        users: userDeleteResult.deletedCount,
        portfolios: portfolioDeleteResult.deletedCount,
        forms: formDeleteResult.deletedCount
      },
      remaining: {
        users: remainingUsers,
        portfolios: remainingPortfolios,
        forms: remainingForms
      },
      deletedUsers: allUsers.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      })),
      timestamp: new Date().toISOString()
    };
    
    console.log("🎉 Cleanup completed:", cleanupSummary);
    res.json(cleanupSummary);
    
  } catch (error) {
    console.error("❌ Cleanup error:", error);
    res.status(500).json({ 
      error: "Failed to cleanup test users",
      details: error.message 
    });
  }
});

// Delete specific user by email (safer option)
router.delete("/user/:email", verifyAdmin, async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    console.log(`🎯 Deleting specific user: ${email}`);
    
    // Find the user first
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Delete user's portfolio
    const portfolioDeleteResult = await Portfolio.deleteMany({ userId: user._id });
    console.log(`🗑️ Deleted ${portfolioDeleteResult.deletedCount} portfolios for user ${email}`);
    
    // Delete the user
    const userDeleteResult = await User.deleteOne({ _id: user._id });
    console.log(`🗑️ Deleted user: ${email}`);
    
    res.json({
      message: `✅ User ${email} and associated data deleted successfully`,
      deleted: {
        user: userDeleteResult.deletedCount,
        portfolios: portfolioDeleteResult.deletedCount
      },
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ User deletion error:", error);
    res.status(500).json({ 
      error: "Failed to delete user",
      details: error.message 
    });
  }
});

// Backup database before cleanup (optional)
router.get("/backup-data", verifyAdmin, async (req, res) => {
  try {
    console.log("💾 Creating database backup...");
    
    const users = await User.find({}, { password: 0, resetToken: 0 });
    const portfolios = await Portfolio.find({});
    const forms = Form ? await Form.find({}) : [];
    
    const backup = {
      timestamp: new Date().toISOString(),
      counts: {
        users: users.length,
        portfolios: portfolios.length,
        forms: forms.length
      },
      data: {
        users,
        portfolios,
        forms
      }
    };
    
    res.json({
      message: "✅ Database backup created",
      backup
    });
    
  } catch (error) {
    console.error("❌ Backup error:", error);
    res.status(500).json({ 
      error: "Failed to create backup",
      details: error.message 
    });
  }
});

module.exports = router;