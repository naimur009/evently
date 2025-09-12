
const config = {

    PORT : process.env.PORT || 8080,
    MONGO_URI :"mongodb+srv://naimurrahaman955:naimur123456@database.xzeijuo.mongodb.net/evently",

    JSON_LIMIT : "5mb",

    URL_ENCODED : true,
    URL_LIMIT: "5mb",

    RATE_LIMIT: 15*60*1000,
    RATE_LIMIT_MAX: 1000000,

    // email service
    SMTP_HOST: "smtp-relay.brevo.com",
    SMTP_PORT: 587,
    USER: "955e3b001@smtp-brevo.com",
    PASS: "gNa142XBZqvbShHs",
    EMAIL_FROM: "naimurrahaman955@gmail.com",

    // jwy
    JWT_KEY:"naimur@518529@.",
    JWT_EXPIRED: 30*60*1000,


    // payment info
    STORE_ID:"ostad68a9602d4f14a",
    STORE_PASS:"ostad68a9602d4f14a@ssl"

}

export default config;