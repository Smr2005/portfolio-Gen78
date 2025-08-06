const router = require("express").Router();
const multer = require('multer');
const { verifyAccessToken } = require("../webToken/jwt");
const Portfolio = require("../model/Portfolio");

// Configure multer for memory storage (files stored in memory, not disk)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profileImage' || file.fieldname === 'projectImage' || file.fieldname === 'certImage') {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  } else if (file.fieldname === 'resume') {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resume'), false);
    }
  } else {
    cb(new Error('Unknown file field'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (increased for base64 storage)
  },
  fileFilter: fileFilter
});

// Utility function to convert file to base64 data URL
function fileToDataUrl(file) {
  const base64 = file.buffer.toString('base64');
  return `data:${file.mimetype};base64,${base64}`;
}

// Upload profile image
router.post("/profile-image", verifyAccessToken, upload.single('profileImage'), async (req, res) => {
  try {
    console.log("=== PROFILE IMAGE UPLOAD START ===");
    
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File details:", {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert file to base64 data URL
    const dataUrl = fileToDataUrl(req.file);
    
    // Find and update the user's portfolio with the image data
    let portfolio = await Portfolio.findOne({ userId: req.payload.aud });
    
    if (!portfolio) {
      // Create a basic portfolio if it doesn't exist
      portfolio = new Portfolio({
        userId: req.payload.aud,
        templateId: 'template1',
        data: {
          name: 'Your Name',
          title: 'Your Title',
          email: 'your.email@example.com',
          profileImageData: req.file.buffer.toString('base64'),
          profileImageType: req.file.mimetype
        }
      });
    } else {
      // Update existing portfolio
      portfolio.data.profileImageData = req.file.buffer.toString('base64');
      portfolio.data.profileImageType = req.file.mimetype;
    }
    
    // Set the profileImage field to the data URL for immediate use
    portfolio.data.profileImage = dataUrl;
    
    await portfolio.save();
    
    console.log("Profile image saved to MongoDB successfully");
    
    res.json({
      message: "Profile image uploaded and saved successfully",
      fileUrl: dataUrl,
      filename: `profile-${Date.now()}.${req.file.mimetype.split('/')[1]}`
    });
    
  } catch (error) {
    console.error("Profile image upload error:", error);
    res.status(500).json({ error: "Failed to upload profile image" });
  }
});

// Upload resume
router.post("/resume", verifyAccessToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Resume upload - File details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert file to base64 data URL
    const dataUrl = fileToDataUrl(req.file);
    
    // Find and update the user's portfolio with the resume data
    let portfolio = await Portfolio.findOne({ userId: req.payload.aud });
    
    if (!portfolio) {
      // Create a basic portfolio if it doesn't exist
      portfolio = new Portfolio({
        userId: req.payload.aud,
        templateId: 'template1',
        data: {
          name: 'Your Name',
          title: 'Your Title',
          email: 'your.email@example.com',
          resumeData: req.file.buffer.toString('base64'),
          resumeType: req.file.mimetype
        }
      });
    } else {
      // Update existing portfolio
      portfolio.data.resumeData = req.file.buffer.toString('base64');
      portfolio.data.resumeType = req.file.mimetype;
    }
    
    // Set the resume field to the data URL for immediate use
    portfolio.data.resume = dataUrl;
    
    await portfolio.save();
    
    console.log("Resume saved to MongoDB successfully");
    
    res.json({
      message: "Resume uploaded and saved successfully",
      fileUrl: dataUrl,
      filename: `resume-${Date.now()}.pdf`
    });
    
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ error: "Failed to upload resume" });
  }
});

// Upload project image
router.post("/project-image", verifyAccessToken, upload.single('projectImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Project image upload - File details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert file to base64 data URL
    const dataUrl = fileToDataUrl(req.file);
    
    console.log("Project image saved to MongoDB successfully");
    
    res.json({
      message: "Project image uploaded successfully",
      fileUrl: dataUrl,
      filename: `project-${Date.now()}.${req.file.mimetype.split('/')[1]}`,
      imageData: req.file.buffer.toString('base64'),
      imageType: req.file.mimetype
    });
    
  } catch (error) {
    console.error("Project image upload error:", error);
    res.status(500).json({ error: "Failed to upload project image" });
  }
});

// Upload certificate image
router.post("/certificate-image", verifyAccessToken, upload.single('certImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Certificate image upload - File details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Convert file to base64 data URL
    const dataUrl = fileToDataUrl(req.file);
    
    console.log("Certificate image saved to MongoDB successfully");
    
    res.json({
      message: "Certificate image uploaded successfully",
      fileUrl: dataUrl,
      filename: `cert-${Date.now()}.${req.file.mimetype.split('/')[1]}`,
      imageData: req.file.buffer.toString('base64'),
      imageType: req.file.mimetype
    });
    
  } catch (error) {
    console.error("Certificate image upload error:", error);
    res.status(500).json({ error: "Failed to upload certificate image" });
  }
});

module.exports = router;