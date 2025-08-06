const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  templateId: {
    type: String,
    required: true,
    enum: ['template1', 'template2', 'template3', 'template4', 'template5', 'template6']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  data: {
    // Personal Information
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
    profileImage: String,
    resume: String,
    about: String,
    
    // Experience
    experience: [{
      company: String,
      position: String,
      duration: String,
      location: String,
      description: String,
      achievements: [String]
    }],
    
    // Education
    education: [{
      institution: String,
      degree: String,
      field: String,
      duration: String,
      location: String,
      gpa: String,
      description: String
    }],
    
    // Skills
    skills: [{
      name: String,
      level: Number,
      category: String
    }],
    
    // Projects
    projects: [{
      title: String,
      description: String,
      tech: [String],
      github: String,
      demo: String,
      image: String,
      featured: Boolean,
      metrics: {
        users: String,
        performance: String,
        impact: String
      }
    }],
    
    // Certifications
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      url: String,
      image: String
    }],
    
    // Internships
    internships: [{
      company: String,
      position: String,
      duration: String,
      location: String,
      description: String,
      achievements: [String]
    }],
    
    // Additional fields for specific templates
    philosophy: String,
    achievements: [String],
    languages: [String],
    interests: [String],
    publications: [{
      title: String,
      publication: String,
      date: String,
      url: String
    }]
  },
  
  // SEO and metadata
  meta: {
    title: String,
    description: String,
    keywords: [String]
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  lastViewed: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
PortfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

// Generate slug from name if not provided
PortfolioSchema.pre('save', function(next) {
  if (!this.slug && this.data.name) {
    this.slug = this.data.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Math.random().toString(36).substr(2, 6);
  }
  next();
});

// Index for better performance
PortfolioSchema.index({ userId: 1 });
PortfolioSchema.index({ slug: 1 });
PortfolioSchema.index({ isPublished: 1 });

module.exports = mongoose.model("Portfolio", PortfolioSchema);