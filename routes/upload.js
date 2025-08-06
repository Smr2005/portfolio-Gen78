const router = require("express").Router();
const { upload } = require("../SERVICES/fileUploadService");
const { verifyAccessToken } = require("../webToken/jwt");
const path = require('path');

// Utility function to get the correct base URL
function getBaseUrl() {
    return process.env.BACKEND_URL || 
           (process.env.NODE_ENV === 'production' || process.env.PORT 
             ? 'https://portfolio-gen-i1bg.onrender.com' 
             : 'http://localhost:5000');
}

// Upload profile image
router.post("/profile-image", verifyAccessToken, (req, res) => {
  console.log("=== PROFILE IMAGE UPLOAD START ===");
  console.log("Headers:", req.headers);
  console.log("Content-Type:", req.get('Content-Type'));
  
  upload.single('profileImage')(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ 
        error: err.message,
        details: "File upload failed during processing"
      });
    }
    
    console.log("File received:", req.file ? "YES" : "NO");
    if (req.file) {
      console.log("File details:", {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        filename: req.file.filename
      });
    }
    
    if (!req.file) {
      console.error("No file in request");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = getBaseUrl();
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    console.log("File uploaded successfully:", fileUrl);
    
    res.json({
      message: "Profile image uploaded successfully",
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  });
});

// Upload resume
router.post("/resume", verifyAccessToken, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = getBaseUrl();
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    res.json({
      message: "Resume uploaded successfully",
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ error: "Failed to upload resume" });
  }
});

// Upload project image
router.post("/project-image", verifyAccessToken, upload.single('projectImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = getBaseUrl();
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    res.json({
      message: "Project image uploaded successfully",
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error("Project image upload error:", error);
    res.status(500).json({ error: "Failed to upload project image" });
  }
});

// Upload certificate image (using same endpoint as project image for now)
router.post("/certificate-image", verifyAccessToken, upload.single('certImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = getBaseUrl();
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    res.json({
      message: "Certificate image uploaded successfully",
      fileUrl: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error("Certificate image upload error:", error);
    res.status(500).json({ error: "Failed to upload certificate image" });
  }
});

module.exports = router;