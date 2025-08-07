const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  subject: {
    type: String,
    required: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    enum: ['general', 'bug_report', 'feature_request', 'template_feedback', 'user_experience'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  adminResponse: {
    message: String,
    respondedBy: String,
    respondedAt: Date
  }
}, {
  timestamps: true
});

// Index for better performance
FeedbackSchema.index({ userId: 1 });
FeedbackSchema.index({ status: 1 });
FeedbackSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Feedback", FeedbackSchema);