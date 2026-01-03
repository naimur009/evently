import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

// custom module
import config from "./src/config/config.js";
import router from "./src/routes/api.js";


const app = express();


// security middleware
app.use(cookieParser());

const allowedOrigins = [
    config.FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:3005",
    "http://localhost:5173",
    "http://localhost:5174",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true                // allow cookies to be sent
}));

app.use(helmet());
app.use(hpp());


//parsing
app.use(express.json({ limit: config.JSON_LIMIT }));
app.use(urlencoded({ extended: config.URL_ENCODED, limit: config.URL_LIMIT }));


// rate limit
app.use(rateLimit({ windowMs: config.RATE_LIMIT, max: config.RATE_LIMIT_MAX }));


// cacheing
app.disable('etag')

// api routes
app.use('/', router);
// connect to database
mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        console.log("Database connected");
        // run server
        app.listen(config.PORT, () => {
            console.log("Server is runnign on port", config.PORT);
            console.log(`http://localhost:${config.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })


