import { emailSender } from "../utils/emailHelper.js";
import userModel from '../models/user.model.js';
import { decodePassword, encodePassword } from "../utils/bcryptHelper.js";
import { encodeToken } from "../utils/tokenHelper.js";
import ticketModel from "../models/tickets.model.js";
import mongoose from "mongoose";

export const signUpServices = async (req, res) => {
    try {
        const userData = req.body;
        const verification_code = Math.floor(100000 + Math.random() * 900000);
        const code_expire = Date.now() + 15 * 60 * 1000;

        const emailText = `Your verification code is ${verification_code}`;
        const emailSub = "e-ticket verification";

        await emailSender(userData.email, emailSub, emailText);


        // check if verified user exists
        const user = await userModel.findOne({ email: userData.email });

        if (user && user.isVerified) {
            return {
                status: "failed",
                message: "User already exists and is verified.",
                data: null
            };
        }

        // hash password
        const hashPassword = await encodePassword(userData.password);

        await userModel.updateOne(
            {
                email: userData.email
            },
            {
                $set:
                {
                    name: userData.username,
                    password: hashPassword,
                    verification_code: verification_code,
                    expire_verification_code: code_expire
                }
            },
            {
                upsert: true,
            }
        )

        return {
            status: "success",
            message: "OTP has been sent to your email. It will expire in 15 minutes.",
            data: { email: userData.email }
        };
    } catch (error) {
        return {
            status: "error",
            message: "Error during signup process",
            error: error.message
        };
    }
}

export const verifyUserServices = async (req, res) => {
    try {
        const email = req.params.email;
        const otp = req.params.otp;
        const user = await userModel.findOne(
            {
                email: email,
                verification_code: otp
            }
        )

        if (user) {
            if (user.isVerified) {
                return {
                    status: "failed",
                    message: "User is already verified",
                    data: { email: user.email }
                };
            }

            if (user.expire_verification_code < Date.now()) {
                return {
                    status: "failed",
                    message: "Verification code expired. Please request a new one.",
                    data: null
                };
            }

            const verifiedUser = await userModel.updateOne(
                {
                    email: email
                },
                {
                    $set: {
                        isVerified: true,
                        isActive: true,
                        verification_code: 0,
                        status: "Active"
                    }
                }
            )

            return {
                status: "success",
                message: "Email verified successfully",
                data: { email: user.email }
            };
        }

        return {
            status: "failed",
            message: "Invalid OTP or email",
            data: null
        };

    } catch (error) {
        return {
            status: "error",
            message: "Error during email verification",
            error: error.message
        };
    }
}

export const loginServices = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const user = await userModel.findOne(
            {
                email: email
            }
        )
        if (!user) {
            if (!user) {
                return {
                    status: "failed",
                    message: "Invalid email. User not found.",
                    data: null
                };
            }
        }

        if (!user.isVerified) {
            return {
                status: "failed",
                message: "User not verified. Please verify your email first.",
                data: null
            };
        }

        const password_match = await decodePassword(password, user.password);

        if (password_match) {
            const userToken = encodeToken(user.email, user._id, user.role);

            const option = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            };
            res.cookie("Token", userToken, option);
            return {
                status: "success",
                message: "Login successful",
                token: userToken,
                data: {
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            };

        }
        return {
            status: "failed",
            message: "Invalid password",
            data: null
        };


    } catch (error) {
        return {
            status: "error",
            message: "Error during login process",
            error: error.message
        };
    }
}

export const logoutServices = (req, res) => {
    try {
        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 0
        };
        res.cookie("Token", "", option);

        return {
            status: "success",
            message: "logout successfull"
        }
    } catch (error) {
        return {
            status: "error",
            message: "Error during logout process",
            error: error.message
        };
    }
}

export const userTicketServices = async (req, res) => {
    try {

        const user_id = new mongoose.Types.ObjectId(req.headers.user_id);

        const userTicket = await ticketModel.aggregate(
            [
                {
                    $match: {
                        user: user_id
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $lookup: {
                        from: "events",
                        localField: "event",
                        foreignField: "_id",
                        as: "eventDetails"
                    }
                },
                {
                    $unwind: "$userDetails",
                },
                {
                    $unwind: "$eventDetails"
                },
                {
                    $project: {
                        userDetails: {
                            username: 1,
                            email: 1
                        },
                        eventDetails: {
                            image: 1,
                            event_title: 1,
                            city: 1,
                            venue: 1,
                            event_date: 1
                        },
                        ticket_id: 1,
                        createdAt: 1,
                    }
                }
            ]
        )

        if (!userTicket || userTicket.length === 0) {
            return {
                status: "failed",
                message: "No tickets found for this user",
                data: []
            };
        }

        return {
            status: "success",
            message: "Tickets retrieved successfully",
            data: userTicket
        };
    } catch (error) {
        return {
            status: "error",
            message: "Error while fetching user tickets",
            error: error.message
        };
    }
}

export const singleTicketService = async (req, res) => {
    try {

        const ticket_id = req.params.ticketID;

        const userTicket = await ticketModel.aggregate(
            [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(ticket_id)
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                {
                    $lookup: {
                        from: "events",
                        localField: "event",
                        foreignField: "_id",
                        as: "eventDetails"
                    }
                },
                {
                    $unwind: "$userDetails",
                },
                {
                    $unwind: "$eventDetails"
                },
                {
                    $project: {
                        userDetails: {
                            username: 1,
                            email: 1
                        },
                        eventDetails: {
                            event_title: 1,
                            city: 1,
                            venue: 1,
                            event_date: 1
                        },
                        ticket_id: 1,
                        createdAt: 1,
                    }
                }
            ]
        )
        if (!userTicket || userTicket.length === 0) {
            return {
                status: "failed",
                message: "Ticket not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Ticket retrieved successfully",
            data: userTicket[0] // since it's a single ticket
        };
    } catch (error) {
        return {
            status: "error",
            message: "Error while fetching ticket",
            error: error.message
        };
    }
}