# 🚀 Quick Deployment Commands

## Step 1: Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Portfolio Generator ready for deployment"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-generator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Render

1. **Go to [render.com](https://render.com)**
2. **Sign up/Login** with GitHub
3. **New → Web Service**
4. **Connect** your `portfolio-generator` repository
5. **Configure**:
   - **Name**: `portfolio-generator`
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `npm start`
6. **Add Environment Variables**:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://shaiksameershubhan:Lead0089@cluster1.6cjc24b.mongodb.net/portfolio_generator?retryWrites=true&w=majority&appName=Cluster1
   ACCESS_TOKEN_SECRET=07f2ab66b79076b3be0acb92779a1fa7604f3a5d2cc45019c3ed48d4a860132e2db47879b410cd3c762aaba65dda934efcd3b72f924b1c5119b054154a7ecfaa
   REFRESH_TOKEN_SECRET=2612ef0d37786e7ce44ee52d09a9597cbf254cf4f17205d261acc2f7377232ce661f3ee2dcb8be4268dd127e4971d8ce0c8464ed0e9785ab3ddf75d8cfbf2974
   EMAIL_USER=shaiksameershubhan71@gmail.com
   EMAIL_PASSWORD=sambkvdcvxqfqkdu
   ```
7. **Deploy**!

## Step 3: Update CORS URL

After deployment, update the CORS URL in `index.js`:
```javascript
origin: process.env.NODE_ENV === 'production' 
    ? ["https://your-actual-render-url.onrender.com"] 
    : ["http://localhost:3000", "http://localhost:3001"],
```

## Step 4: Test Your Live App

Your app will be available at: `https://your-app-name.onrender.com`

Test all features:
- ✅ Registration/Login
- ✅ Portfolio Builder
- ✅ File Uploads
- ✅ Save Portfolio
- ✅ Publish Portfolio
- ✅ Email Notifications

## 🎉 You're Live!

Your Portfolio Generator is now deployed and ready for users worldwide!