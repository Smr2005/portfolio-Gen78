const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../model/User");
const Portfolio = require("../model/Portfolio");
const Feedback = require("../model/Feedback");
const { verifyAccessToken } = require("../webToken/jwt");

// Get user profile with portfolios
router.get("/profile", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.payload.aud;
    
    // Get user details
    const user = await User.findById(userId).select('-password -resetToken -expireToken');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user's portfolios
    const portfolios = await Portfolio.find({ userId })
      .sort({ updatedAt: -1 })
      .select('slug templateId isPublished publishedAt data.name data.title views createdAt updatedAt');

    // Get user's feedback
    const feedbacks = await Feedback.find({ userId })
      .sort({ createdAt: -1 })
      .select('rating subject message category status createdAt adminResponse');

    // Calculate stats
    const stats = {
      totalPortfolios: portfolios.length,
      publishedPortfolios: portfolios.filter(p => p.isPublished).length,
      totalViews: portfolios.reduce((sum, p) => sum + (p.views || 0), 0),
      totalFeedbacks: feedbacks.length,
      joinedDate: user.createdAt
    };

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      portfolios,
      feedbacks,
      stats
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.put("/profile", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.payload.aud;
    const { name } = req.body;

    if (!name || name.length < 5) {
      return res.status(400).json({ error: "Name must be at least 5 characters long" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    ).select('-password -resetToken -expireToken');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete portfolio
router.delete("/portfolio/:portfolioId", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.payload.aud;
    const { portfolioId } = req.params;

    const portfolio = await Portfolio.findOne({ _id: portfolioId, userId });
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found or you don't have permission to delete it" });
    }

    await Portfolio.findByIdAndDelete(portfolioId);
    
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Portfolio delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Submit feedback
router.post("/feedback", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.payload.aud;
    const { rating, subject, message, category } = req.body;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    if (!subject || subject.length < 5 || subject.length > 200) {
      return res.status(400).json({ error: "Subject must be between 5 and 200 characters" });
    }
    if (!message || message.length < 10 || message.length > 1000) {
      return res.status(400).json({ error: "Message must be between 10 and 1000 characters" });
    }

    // Get user details
    const user = await User.findById(userId).select('name email');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const feedback = new Feedback({
      userId,
      userName: user.name,
      userEmail: user.email,
      rating,
      subject,
      message,
      category: category || 'general'
    });

    await feedback.save();

    res.status(201).json({ 
      message: "Feedback submitted successfully! Thank you for your input.",
      feedback: {
        id: feedback._id,
        rating: feedback.rating,
        subject: feedback.subject,
        message: feedback.message,
        category: feedback.category,
        status: feedback.status,
        createdAt: feedback.createdAt
      }
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user's feedback
router.get("/feedback", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.payload.aud;
    
    const feedbacks = await Feedback.find({ userId })
      .sort({ createdAt: -1 })
      .select('rating subject message category status createdAt adminResponse');

    res.json({ feedbacks });
  } catch (error) {
    console.error("Feedback fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get portfolio analytics
router.get("/portfolio/:portfolioId/analytics", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.payload.aud;
    const { portfolioId } = req.params;

    const portfolio = await Portfolio.findOne({ _id: portfolioId, userId })
      .select('views lastViewed publishedAt isPublished createdAt updatedAt data.name');

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found or you don't have permission to view it" });
    }

    // Calculate days since published
    const daysSincePublished = portfolio.publishedAt 
      ? Math.floor((Date.now() - portfolio.publishedAt) / (1000 * 60 * 60 * 24))
      : 0;

    const analytics = {
      totalViews: portfolio.views || 0,
      lastViewed: portfolio.lastViewed,
      publishedAt: portfolio.publishedAt,
      daysSincePublished,
      isPublished: portfolio.isPublished,
      averageViewsPerDay: daysSincePublished > 0 ? Math.round((portfolio.views || 0) / daysSincePublished) : 0
    };

    res.json({ analytics });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;