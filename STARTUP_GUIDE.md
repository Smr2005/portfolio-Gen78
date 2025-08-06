# 🚀 Portfolio Generator - Startup Guide

## Quick Start (Fixed Upload & Publish Issues)

### 1. Start the Backend Server

```bash
# In the root directory
npm start
```

**Expected output:**
```
✅ Connected to MongoDB successfully
Portfolio Generator Backend is running!
Server running on port 5000
```

### 2. Start the Frontend Server

```bash
# In a new terminal, go to client directory
cd client
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

### 3. Test the Fixed Functionality

#### Option A: Use the Web Interface
1. Go to http://localhost:3000
2. Register/Login with your account
3. Go to Templates and click "Use this Template"
4. **Upload Profile Picture** → Should work now ✅
5. Fill in your portfolio data
6. **Click Save** → Should work now ✅
7. **Click 🚀 Publish** → Should work now ✅
8. **Check your email** → Beautiful notification sent ✅

#### Option B: Run the Test Script
```bash
# Test the fixes
node test_fixed_upload_publish.js
```

## 🔧 What Was Fixed

### ❌ Previous Issues:
1. **File upload failed** → "File upload failed. Please try again."
2. **Publish failed** → "Network error. Please try again."

### ✅ Fixes Applied:

#### 1. **Fixed File Upload URLs**
```javascript
// Before (incorrect):
fetch('/api/upload/profile-image', ...)

// After (correct):
fetch('http://localhost:5000/api/upload/profile-image', ...)
```

#### 2. **Fixed Publish Endpoint URL**
```javascript
// Before (incorrect):
fetch('/api/portfolio/publish', ...)

// After (correct):
fetch('http://localhost:5000/api/portfolio/publish', ...)
```

#### 3. **Added Certificate Image Upload**
- Added `/api/upload/certificate-image` endpoint
- Updated file filter to handle `certImage` field
- Fixed certificate image upload in UI

#### 4. **Fixed Save Endpoint URL**
```javascript
// Before (incorrect):
fetch('/api/portfolio/save', ...)

// After (correct):
fetch('http://localhost:5000/api/portfolio/save', ...)
```

## 📧 Email Configuration (Optional)

To enable email notifications when publishing:

### 1. Create `.env` file in root directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail Setup:
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this password in `EMAIL_PASS`

### 3. Test Email:
```bash
node test_publish_with_email.js
```

## 🎯 Complete User Flow (Now Working)

### Step 1: Portfolio Building
1. **Register/Login** → ✅ Working
2. **Choose Template** → ✅ Working
3. **Upload Profile Picture** → ✅ **FIXED**
4. **Fill Personal Info** → ✅ Working
5. **Add Skills with Levels** → ✅ Working
6. **Add Projects with Images** → ✅ **FIXED**
7. **Add Experience** → ✅ Working
8. **Add Education** → ✅ Working
9. **Add Certifications with Images** → ✅ **FIXED**
10. **Add Internships** → ✅ Working

### Step 2: Save & Publish
1. **Click Save** → ✅ **FIXED**
2. **Click 🚀 Publish** → ✅ **FIXED**
3. **Receive Email Notification** → ✅ Working
4. **Share Portfolio URL** → ✅ Working

## 🌐 Published Portfolio Features

Your published portfolio will have:
- ✅ **Professional Design** with Bootstrap styling
- ✅ **Responsive Layout** for all devices
- ✅ **SEO Optimized** with meta tags
- ✅ **Social Media Preview** with Open Graph tags
- ✅ **Clickable Links** (GitHub, demo, LinkedIn, etc.)
- ✅ **Downloadable Resume** if uploaded
- ✅ **View Counter** and analytics
- ✅ **Custom URL** (yoursite.com/portfolio/your-slug)

## 🎉 Success Indicators

### When Everything is Working:
1. **File Upload**: "Profile image uploaded successfully"
2. **Save**: "Portfolio saved successfully!"
3. **Publish**: "🎉 Portfolio Published Successfully!"
4. **Email**: Beautiful HTML email with portfolio link
5. **Public Access**: Portfolio visible at published URL

### If Still Having Issues:
1. **Check Backend Server**: Should be running on port 5000
2. **Check Frontend Server**: Should be running on port 3000
3. **Check Console**: Look for error messages
4. **Check Network Tab**: Verify API calls are going to localhost:5000

## 📞 Support

If you encounter any issues:
1. Check both servers are running
2. Check browser console for errors
3. Check backend terminal for error logs
4. Verify MongoDB connection is working
5. Test with the provided test scripts

**Your Portfolio Generator is now fully functional with file uploads and publish functionality!** 🚀