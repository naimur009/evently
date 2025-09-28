import dotenv from 'dotenv';
dotenv.config();

const config = {

    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI,


    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8000",

    JSON_LIMIT: process.env.JSON_LIMIT || "5mb",

    URL_ENCODED: process.env.URL_ENCODED || true,
    URL_LIMIT: process.env.URL_LIMIT || "5mb",

    RATE_LIMIT: process.env.RATE_LIMIT || 15 * 60 * 1000,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 1000000,

    // email service
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,


    // jwt
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRED: process.env.JWT_EXPIRED,


    // payment info
    STORE_ID: process.env.STORE_ID,
    STORE_PASS: process.env.STORE_PASS

}

export default config;