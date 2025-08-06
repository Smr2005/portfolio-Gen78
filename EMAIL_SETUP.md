# Email Configuration Setup

## 📧 Setting Up Email Notifications for Portfolio Publishing

To enable email notifications when users publish their portfolios, you need to configure email settings.

### 1. Install Nodemailer (if not already installed)

```bash
npm install nodemailer
```

### 2. Create Environment Variables

Create a `.env` file in the root directory (if it doesn't exist) and add:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Gmail Setup (Recommended)

#### Option A: Using Gmail App Password (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this password in `EMAIL_PASS`

#### Option B: Using Gmail with Less Secure Apps (Not Recommended)

1. Go to Google Account settings
2. Security → Less secure app access → Turn on
3. Use your regular Gmail password in `EMAIL_PASS`

### 4. Alternative Email Services

#### Using Outlook/Hotmail:
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Using Custom SMTP:
```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
```

### 5. Test Email Configuration

Run the test script to verify email is working:

```bash
node test_publish_with_email.js
```

### 6. Email Template Features

The email notification includes:

✅ **Professional HTML Design**
- Beautiful responsive layout
- Portfolio statistics
- Direct link to published portfolio

✅ **Social Media Sharing**
- LinkedIn, Twitter, Facebook, WhatsApp buttons
- Pre-filled sharing text

✅ **Portfolio Summary**
- Skills count with proficiency levels
- Projects count with GitHub/demo links
- Experience and education summary

✅ **Professional Tips**
- How to promote the portfolio
- Best practices for sharing
- Analytics monitoring suggestions

✅ **Complete Feature List**
- What's included in the portfolio
- Technical specifications
- SEO and mobile optimization info

### 7. Troubleshooting

#### Common Issues:

1. **"Invalid login" error**
   - Check EMAIL_USER and EMAIL_PASS are correct
   - For Gmail, use App Password instead of regular password

2. **"Connection refused" error**
   - Check internet connection
   - Verify email service is accessible

3. **Email not received**
   - Check spam/junk folder
   - Verify recipient email address
   - Check email service limits

#### Testing Email Locally:

```javascript
// Test email configuration
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'test@example.com',
  subject: 'Test Email',
  text: 'Email configuration is working!'
}, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
```

### 8. Production Deployment

For production, consider using:

- **SendGrid** - Professional email service
- **AWS SES** - Amazon Simple Email Service  
- **Mailgun** - Developer-friendly email API
- **Postmark** - Transactional email service

These services provide better deliverability and analytics than Gmail.

---

## 🎉 Once Configured

Users will receive a beautiful email notification when they publish their portfolio, including:

- 📧 Professional email template
- 🔗 Direct link to their published portfolio
- 📊 Portfolio statistics and summary
- 🌐 Social media sharing buttons
- 💡 Professional tips for promotion
- ✅ Complete feature list

The email enhances the user experience and helps them share their portfolio effectively!