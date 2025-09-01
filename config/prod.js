module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_SECRET_ID,
    // Accept correct name MONGO_URI and fallback to legacy MOGO_URI if present
    mongoURI: process.env.MONGO_URI || process.env.MOGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
};