import nodemailer from "nodemailer";
import config from "../config/config.js";


export const emailSender = async (emailto, emailSub, emailText)=>{

    const transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure:false,
        auth:{
            user:config.USER,
            pass:config.PASS
        }
    })

    const mailOptions = {
        from: config.EMAIL_FROM,
        to: emailto,
        subject: emailSub,
        text:emailText
    }
    
    return await transporter.sendMail(mailOptions);

}