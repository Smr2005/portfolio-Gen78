# 🚀 Portfolio Generator

A comprehensive, professional portfolio generator with email notifications, file uploads, and beautiful templates.

## ✨ Features

### 🎨 Portfolio Builder
- **7 Comprehensive Sections**: Personal Info, Skills, Projects, Experience, Education, Certifications, Internships
- **File Uploads**: Profile pictures, project images, certificates, resumes
- **Real-time Preview**: See your portfolio as you build it
- **Multiple Templates**: Choose from professional designs
- **Responsive Design**: Looks great on all devices

### 📧 Email Notifications
- **Welcome Emails**: Beautiful HTML emails on registration
- **Publication Emails**: Detailed notifications when portfolio is published
- **Social Sharing**: Pre-built sharing buttons for LinkedIn, Twitter, Facebook, WhatsApp
- **Professional Tips**: Guidance on portfolio promotion

### 🌐 Publishing & Sharing
- **One-Click Publishing**: Instant portfolio deployment
- **Custom URLs**: SEO-friendly portfolio URLs
- **Public Access**: Share your portfolio with anyone
- **Analytics**: View counts and engagement tracking
- **SEO Optimized**: Meta tags and Open Graph support

### 🔐 Security & Authentication
- **JWT Authentication**: Secure user sessions
- **Password Encryption**: Bcrypt password hashing
- **Protected Routes**: Secure API endpoints
- **File Validation**: Safe file upload handling

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email notifications
- **Multer** - File upload handling
- **Bcrypt** - Password encryption

### Frontend
- **React.js** - User interface
- **Bootstrap** - Responsive styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Deployment
- **Render** - Cloud hosting platform
- **MongoDB Atlas** - Cloud database
- **Gmail SMTP** - Email service

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account with App Password

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-generator.git
   cd portfolio-generator
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Configure environment variables**
   Create `.env` file in root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password
   ```

4. **Start development servers**
   ```bash
   # Start backend (port 5000)
   npm run dev
   
   # In another terminal, start frontend (port 3000)
   cd client
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📧 Email Configuration

### Gmail Setup
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this password in `EMAIL_PASSWORD`

### Email Features
- **Welcome Email**: Sent on user registration
- **Publication Email**: Sent when portfolio is published
- **Beautiful HTML Templates**: Professional design
- **Social Sharing Buttons**: Easy portfolio promotion
- **Portfolio Statistics**: Skills, projects, experience counts

## 🌐 Deployment to Render

### Step 1: Prepare for Deployment
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy!

### Step 3: Update URLs
After deployment, update CORS settings with your Render URL.

## 📁 Project Structure

```
portfolio-generator/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── containers/     # Page components
│   │   ├── utils/          # Utility functions
│   │   └── index.js
│   └── package.json
├── routes/                 # API routes
│   ├── auth.js            # Authentication routes
│   ├── portfolio.js       # Portfolio routes
│   └── upload.js          # File upload routes
├── model/                 # Database models
│   ├── User.js
│   └── Portfolio.js
├── SERVICES/              # Service modules
│   ├── emailService.js    # Email functionality
│   └── fileUploadService.js # File handling
├── webToken/              # JWT utilities
├── config/                # Configuration files
├── uploads/               # File storage (created automatically)
├── .env                   # Environment variables
├── index.js               # Main server file
└── package.json
```

## 🎯 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/reset-password` - Password reset

### Portfolio
- `POST /api/portfolio/save` - Save portfolio data
- `POST /api/portfolio/publish` - Publish portfolio
- `GET /api/portfolio/my-portfolio` - Get user's portfolio
- `GET /portfolio/:slug` - Public portfolio view

### File Upload
- `POST /api/upload/profile-image` - Upload profile picture
- `POST /api/upload/project-image` - Upload project image
- `POST /api/upload/certificate-image` - Upload certificate image
- `POST /api/upload/resume` - Upload resume file

## 🎨 Portfolio Sections

### 1. Personal Information
- Name, title, email, phone
- Location, social media links
- Profile picture upload
- About/bio section

### 2. Skills
- Skill name and proficiency level
- Categorization (Technical, Soft Skills, etc.)
- Visual progress bars

### 3. Projects
- Project title and description
- Technologies used
- GitHub and demo links
- Project images
- Featured project highlighting

### 4. Experience
- Company, position, duration
- Location and description
- Key achievements
- Chronological ordering

### 5. Education
- Institution, degree, field of study
- Duration, location, GPA
- Descriptions and achievements

### 6. Certifications
- Certification name and issuer
- Date and verification URL
- Certificate images
- Professional credentials

### 7. Internships
- Company, position, duration
- Location and description
- Key achievements and learnings

## 📧 Email Templates

### Welcome Email
- Professional greeting
- Platform introduction
- Getting started guide
- Feature highlights

### Publication Email
- Celebration message
- Portfolio statistics
- Direct portfolio link
- Social sharing buttons
- Professional promotion tips

## 🔒 Security Features

- **JWT Authentication**: Secure user sessions
- **Password Hashing**: Bcrypt encryption
- **File Validation**: Safe upload handling
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Joi schema validation
- **Error Handling**: Comprehensive error management

## 🎯 Performance Features

- **Responsive Design**: Mobile-first approach
- **Image Optimization**: Efficient file handling
- **SEO Optimization**: Meta tags and structured data
- **Fast Loading**: Optimized build process
- **Caching**: Static file caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the deployment guide

## 🎉 Acknowledgments

- React.js community
- Node.js ecosystem
- MongoDB Atlas
- Render hosting platform
- Bootstrap framework

---

**Built with ❤️ for developers who want to showcase their work professionally.**

## 🌟 Star this repository if you found it helpful!