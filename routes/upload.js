const router = require("express").Router();
const { upload } = require("../SERVICES/fileUploadService");
const { verifyAccessToken } = require("../webToken/jwt");
const path = require('path');

// Upload profile image
router.post("/profile-image", verifyAccessToken, (req, res) => {
  console.log("=== PROFILE IMAGE UPLOAD REQUEST ===");
  console.log("Headers:", req.headers);
  console.log("User ID:", req.payload?.aud);
  
  upload.single('profileImage')(req, res, (err) => {
    try {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: err.message || "File upload failed" });
      }
      
      if (!req.file) {
        console.error("No file received in request");
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("File uploaded successfully:", req.file.filename);
      
      const baseUrl = process.env.NODE_ENV === 'production' || process.env.PORT 
        ? 'https://portfolio-gen-i1bg.onrender.com' 
        : 'http://localhost:5000';
      const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
      
      console.log("Returning file URL:", fileUrl);
      
      res.json({
        message: "Profile image uploaded successfully",
        fileUrl: fileUrl,
        filename: req.file.filename
      });
    } catch (error) {
      console.error("Profile image upload error:", error);
      res.status(500).json({ error: "Failed to upload profile image" });
    }
  });
});

// Upload resume
router.post("/resume", verifyAccessToken, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = process.env.NODE_ENV === 'production' || process.env.PORT 
      ? 'https://portfolio-gen-i1bg.onrender.com' 
      : 'http://localhost:5000';
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

    const baseUrl = process.env.NODE_ENV === 'production' || process.env.PORT 
      ? 'https://portfolio-gen-i1bg.onrender.com' 
      : 'http://localhost:5000';
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

    const baseUrl = process.env.NODE_ENV === 'production' || process.env.PORT 
      ? 'https://portfolio-gen-i1bg.onrender.com' 
      : 'http://localhost:5000';
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