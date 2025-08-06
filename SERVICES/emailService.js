const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Welcome to Portfolio Generator!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Welcome to Portfolio Generator</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .features { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .feature { margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
            .feature:last-child { border-bottom: none; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Portfolio Generator!</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${userName},</h2>
            
            <p>Thank you for joining Portfolio Generator! We're excited to help you create amazing portfolios.</p>
            
            <div class="features">
              <h3>Here's what you can do next:</h3>
              <div class="feature">• Create your first portfolio</div>
              <div class="feature">• Choose from our beautiful templates</div>
              <div class="feature">• Customize your portfolio to match your style</div>
              <div class="feature">• Share your portfolio with the world</div>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.NODE_ENV === 'production' || process.env.PORT ? 'https://portfolio-gen-i1bg.onrender.com' : 'http://localhost:3000'}/templates" class="button">Get Started</a>
            </div>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p><strong>Happy portfolio building!</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Portfolio Generator.</p>
            <p><a href="https://www.avast.com">Virus-free. www.avast.com</a></p>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    const transporter = createTransporter();
    const baseUrl = process.env.NODE_ENV === 'production' || process.env.PORT 
      ? 'https://portfolio-gen-i1bg.onrender.com' 
      : 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset Request - Portfolio Generator',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Password Reset Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
            .link-box { background: white; padding: 15px; border-radius: 5px; margin: 20px 0; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${userName},</h2>
            
            <p>You have requested to reset your password for your Portfolio Generator account.</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="link-box">
              <a href="${resetUrl}">${resetUrl}</a>
            </div>
            
            <div class="warning">
              <strong>Important:</strong>
              <p>• This link will expire in 1 hour</p>
              <p>• If you did not request this password reset, please ignore this email</p>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Portfolio Generator. Please do not reply to this email.</p>
            <p><a href="https://www.avast.com">Virus-free. www.avast.com</a></p>
          </div>
        </body>
        </html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail
};