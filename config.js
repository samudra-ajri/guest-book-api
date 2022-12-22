require('dotenv').config()

module.exports = {
    APP_ENV: process.env.NODE_ENV || 'development',
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
}
