# Portfolio Generator 🚀

A full-stack web application that allows users to create professional portfolios with multiple templates, authentication, and deployment capabilities.

## 🌟 Features

### Core Features
- **User Authentication**: Register, login, password reset with JWT tokens
- **Multiple Templates**: 6 different portfolio templates to choose from
- **Enhanced Builder**: Advanced portfolio builder with rich customization options
- **File Upload**: Support for profile images, project images, and resume uploads
- **Email Integration**: Password reset and portfolio sharing via email
- **Responsive Design**: Mobile-friendly interface
- **Real-time Preview**: Live preview of portfolio changes

### Templates Available
1. **Template 1**: Clean and minimal design
2. **Template 2**: Modern with project showcase
3. **Template 3**: Creative layout with animations
4. **Template 4**: Professional business style
5. **Template 5**: Developer-focused with skills section
6. **Template 6**: Portfolio with integrated blog

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email services
- **Bcrypt** for password hashing

### Frontend
- **React.js** with Hooks
- **Bootstrap** for styling
- **Axios** for API calls
- **React Router** for navigation
- **Context API** for state management

## 📦 Installation

### Prerequisites
- Node.js (v16.x recommended)
- MongoDB database
- Gmail account for email services

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Smr2005/portfolio-Gen.git
   cd portfolio-Gen
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create `.env` file in root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   FLASK_SECRET_KEY=your_flask_secret_key
   EMAIL_USER=your_gmail_address
   EMAIL_PASSWORD=your_gmail_app_password
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

   Create `client/.env.production`:
   ```env
   REACT_APP_API_URL=https://your-render-app.onrender.com
   ```

5. **Start the application**
   
   Development mode (runs both backend and frontend):
   ```bash
   npm run dev
   ```
   
   Or run separately:
   ```bash
   # Backend only
   npm start
   
   # Frontend only (in client directory)
   cd client
   npm start
   ```

## 🚀 Deployment

### Deploy to Render

1. **Push code to GitHub**
2. **Connect Render to your GitHub repository**
3. **Configure Render settings**:
   - **Build Command**: `npm install && cd client && npm install && NODE_OPTIONS=--openssl-legacy-provider npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 16.x (specified in .nvmrc)

4. **Set Environment Variables** in Render dashboard:
   - `MONGO_URI`
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `FLASK_SECRET_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `NODE_ENV=production`

## 📁 Project Structure

```
Portfolio-Generator/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── containers/     # Page containers
│   │   ├── templates/      # Portfolio templates
│   │   ├── context/        # React context
│   │   └── utils/          # Utility functions
│   └── package.json
├── config/                 # Configuration files
├── model/                  # MongoDB models
├── routes/                 # Express routes
├── SERVICES/              # Service modules
├── webToken/              # JWT utilities
├── uploads/               # File uploads (gitignored)
├── index.js               # Main server file
├── package.json           # Backend dependencies
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset confirmation

### Portfolio
- `GET /portfolio/user/:userId` - Get user portfolio
- `POST /portfolio/save` - Save portfolio data
- `PUT /portfolio/update/:id` - Update portfolio
- `DELETE /portfolio/delete/:id` - Delete portfolio

### File Upload
- `POST /upload/profile-image` - Upload profile image
- `POST /upload/project-image` - Upload project image
- `POST /upload/resume` - Upload resume

## 🎨 Templates

Each template includes:
- **Responsive design**
- **Customizable sections** (About, Skills, Projects, Contact)
- **Color theme options**
- **Typography choices**
- **Layout variations**

## 🔐 Security Features

- **JWT Authentication** with access and refresh tokens
- **Password hashing** with bcrypt
- **Input validation** with Joi
- **CORS protection**
- **File upload restrictions**
- **Environment variable protection**

## 📧 Email Features

- **Password reset emails**
- **Portfolio sharing**
- **Contact form submissions**
- **Welcome emails for new users**

## 🐛 Troubleshooting

### Common Issues

1. **Node.js Version Error**
   - Ensure you're using Node.js v16.x
   - Check `.nvmrc` file for version specification

2. **MongoDB Connection**
   - Verify MongoDB URI in `.env`
   - Check network connectivity

3. **Email Not Working**
   - Use Gmail App Password, not regular password
   - Enable 2-factor authentication on Gmail

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sameer Shaik**
- GitHub: [@Smr2005](https://github.com/Smr2005)
- Email: shaiksameershubhan71@gmail.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Bootstrap for responsive design components
- MongoDB for flexible database solutions
- Render for deployment platform

---

**Happy Portfolio Building! 🎉**