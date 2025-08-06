# 🚀 Deploy Portfolio Generator to Render

## Complete Step-by-Step Deployment Guide

### 📋 Prerequisites

1. **GitHub Account** - To store your code
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - For database (already configured)
4. **Gmail App Password** - For email notifications (already configured)

---

## 🔧 Step 1: Prepare Your Code for Deployment

### 1.1 Create Production Environment Variables

Create a `.env.production` file for production settings:

```env
# Production Environment Variables
NODE_ENV=production
MONGO_URI=mongodb+srv://shaiksameershubhan:Lead0089@cluster1.6cjc24b.mongodb.net/portfolio_generator?retryWrites=true&w=majority&appName=Cluster1
ACCESS_TOKEN_SECRET=07f2ab66b79076b3be0acb92779a1fa7604f3a5d2cc45019c3ed48d4a860132e2db47879b410cd3c762aaba65dda934efcd3b72f924b1c5119b054154a7ecfaa
REFRESH_TOKEN_SECRET=2612ef0d37786e7ce44ee52d09a9597cbf254cf4f17205d261acc2f7377232ce661f3ee2dcb8be4268dd127e4971d8ce0c8464ed0e9785ab3ddf75d8cfbf2974
EMAIL_USER=shaiksameershubhan71@gmail.com
EMAIL_PASSWORD=sambkvdcvxqfqkdu
PORT=5000
```

### 1.2 Update package.json for Production

Add build and start scripts:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "cd client && npm install && npm run build",
    "heroku-postbuild": "npm run build"
  }
}
```

### 1.3 Create Render Configuration Files

Create `render.yaml` in root directory:

```yaml
services:
  - type: web
    name: portfolio-generator
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        fromDatabase:
          name: portfolio-db
          property: connectionString
      - key: ACCESS_TOKEN_SECRET
        generateValue: true
      - key: REFRESH_TOKEN_SECRET
        generateValue: true
      - key: EMAIL_USER
        value: shaiksameershubhan71@gmail.com
      - key: EMAIL_PASSWORD
        value: sambkvdcvxqfqkdu
```

---

## 📁 Step 2: Prepare File Structure

### 2.1 Update index.js for Production

Add static file serving for React build:

```javascript
// Add this after other middleware
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
```

### 2.2 Update CORS for Production

Update CORS configuration in index.js:

```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ["https://your-app-name.onrender.com"] 
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true
}));
```

---

## 🌐 Step 3: Push to GitHub

### 3.1 Initialize Git Repository

```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit - Portfolio Generator"
```

### 3.2 Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name: `portfolio-generator`
4. Description: `Professional Portfolio Generator with Email Notifications`
5. Make it **Public** (required for free Render deployment)
6. Click "Create Repository"

### 3.3 Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio-generator.git
git branch -M main
git push -u origin main
```

---

## 🚀 Step 4: Deploy to Render

### 4.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### 4.2 Create New Web Service

1. **Dashboard** → **New** → **Web Service**
2. **Connect Repository**: Select `portfolio-generator`
3. **Configure Service**:

#### Basic Settings:
- **Name**: `portfolio-generator`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Runtime**: `Node`

#### Build & Deploy Settings:
- **Build Command**: `npm install && cd client && npm install && npm run build`
- **Start Command**: `npm start`

#### Advanced Settings:
- **Auto-Deploy**: `Yes`

### 4.3 Configure Environment Variables

In Render dashboard, go to **Environment** tab and add:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://shaiksameershubhan:Lead0089@cluster1.6cjc24b.mongodb.net/portfolio_generator?retryWrites=true&w=majority&appName=Cluster1
ACCESS_TOKEN_SECRET=07f2ab66b79076b3be0acb92779a1fa7604f3a5d2cc45019c3ed48d4a860132e2db47879b410cd3c762aaba65dda934efcd3b72f924b1c5119b054154a7ecfaa
REFRESH_TOKEN_SECRET=2612ef0d37786e7ce44ee52d09a9597cbf254cf4f17205d261acc2f7377232ce661f3ee2dcb8be4268dd127e4971d8ce0c8464ed0e9785ab3ddf75d8cfbf2974
EMAIL_USER=shaiksameershubhan71@gmail.com
EMAIL_PASSWORD=sambkvdcvxqfqkdu
PORT=5000
```

### 4.4 Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Your app will be available at: `https://portfolio-generator-xxxx.onrender.com`

---

## 🔧 Step 5: Post-Deployment Configuration

### 5.1 Update Frontend API URLs

Update all API calls in your React app to use the production URL:

```javascript
// In client/src/containers/WorkingBuilder.js
// Replace localhost URLs with your Render URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-app-name.onrender.com' 
    : 'http://localhost:5000';

// Update all fetch calls
fetch(`${API_BASE_URL}/api/portfolio/save`, ...)
fetch(`${API_BASE_URL}/api/portfolio/publish`, ...)
fetch(`${API_BASE_URL}/api/upload/profile-image`, ...)
```

### 5.2 Create Environment Variables for Frontend

Create `client/.env.production`:

```env
REACT_APP_API_URL=https://your-app-name.onrender.com
```

### 5.3 Update API Calls

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

---

## 📧 Step 6: Configure Email for Production

### 6.1 Update Email Templates

Update email templates to use production URLs:

```javascript
// In routes/portfolio.js
const publishedUrl = `https://your-app-name.onrender.com/portfolio/${portfolio.slug}`;
```

### 6.2 Test Email Functionality

After deployment, test:
1. User registration emails
2. Password reset emails
3. Portfolio publication emails

---

## 🎯 Step 7: Final Testing

### 7.1 Test All Features

1. **Registration/Login** ✅
2. **Portfolio Builder** ✅
3. **File Uploads** ✅
4. **Save Portfolio** ✅
5. **Publish Portfolio** ✅
6. **Email Notifications** ✅
7. **Public Portfolio Access** ✅

### 7.2 Performance Optimization

Add to `client/package.json`:

```json
{
  "homepage": ".",
  "scripts": {
    "build": "react-scripts build && echo 'Build completed'"
  }
}
```

---

## 🌟 Step 8: Custom Domain (Optional)

### 8.1 Add Custom Domain

1. **Render Dashboard** → **Settings** → **Custom Domains**
2. Add your domain: `portfoliogenerator.com`
3. Update DNS records as instructed
4. SSL certificate will be automatically generated

### 8.2 Update Environment Variables

Update all URLs to use your custom domain.

---

## 🔍 Step 9: Monitoring & Maintenance

### 9.1 Monitor Logs

- **Render Dashboard** → **Logs** tab
- Monitor for errors and performance issues

### 9.2 Set Up Alerts

- Configure email alerts for deployment failures
- Monitor uptime and response times

### 9.3 Regular Updates

```bash
# To update your deployment
git add .
git commit -m "Update: description of changes"
git push origin main
# Render will automatically redeploy
```

---

## 🎉 Deployment Checklist

### Pre-Deployment:
- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] Database connection verified
- [ ] Email configuration tested

### During Deployment:
- [ ] Render service created
- [ ] Environment variables added
- [ ] Build completed successfully
- [ ] Service is running

### Post-Deployment:
- [ ] Website accessible
- [ ] Registration/login working
- [ ] Portfolio builder functional
- [ ] File uploads working
- [ ] Email notifications sending
- [ ] Published portfolios accessible
- [ ] All features tested

---

## 🚨 Troubleshooting

### Common Issues:

#### Build Failures:
```bash
# Check build logs in Render dashboard
# Common fixes:
npm install --legacy-peer-deps
```

#### Environment Variables:
- Ensure all variables are set in Render dashboard
- No quotes around values
- Check for typos

#### Database Connection:
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string format

#### Email Issues:
- Verify Gmail app password is correct
- Check spam folder for test emails

---

## 📞 Support Resources

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas**: [mongodb.com/atlas](https://mongodb.com/atlas)
- **React Deployment**: [create-react-app.dev/docs/deployment](https://create-react-app.dev/docs/deployment)

---

## 🎯 Expected Result

After successful deployment:

- **Live URL**: `https://your-app-name.onrender.com`
- **Features**: All portfolio generator features working
- **Email**: Beautiful notifications sent on registration and publishing
- **Performance**: Fast loading and responsive design
- **Security**: HTTPS enabled, secure authentication
- **Scalability**: Auto-scaling based on traffic

**Your Portfolio Generator will be live and accessible to users worldwide!** 🌍

---

## 💡 Pro Tips

1. **Free Tier Limitations**: Render free tier sleeps after 15 minutes of inactivity
2. **Cold Starts**: First request after sleep may take 30+ seconds
3. **Upgrade**: Consider paid plan for production use
4. **Monitoring**: Set up uptime monitoring
5. **Backups**: Regular database backups recommended

**Ready to deploy? Follow these steps and your Portfolio Generator will be live on Render!** 🚀