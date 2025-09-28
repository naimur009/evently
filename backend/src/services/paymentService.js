import SSLCommerzPayment from "sslcommerz-lts"
import config from "../config/config.js"
import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import userModel from "../models/user.model.js";
import transactionModel from "../models/transaction.model.js";
import ticketModel from "../models/tickets.model.js";
import couponModel from '../models/coupon.model.js';

export const couponServices = async (req, res) => {
    try {
        const coupon_code = req.params.couponCode;
        const event_id = new mongoose.Types.ObjectId(req.params.eventID);

        const coupon = await couponModel.findOne(
            {
                event:event_id,
                coupon_code : coupon_code
            }
        )
        
        return {
            status: "success",
            message: "Valid coupon",
            discount:coupon.discount
        }
    } catch (error) {
        return {
            status: "error",
            message: "Error during coupon process",
            error: error.message
        };
    }
}

export const paymentService = async (req, res) => {
    try {

        const store_id = config.STORE_ID;
        const store_passwd = config.STORE_PASS;
        const is_live = false //true for live, false for sandbox

        const event_data = await eventModel.findOne(
            {
                _id: new mongoose.Types.ObjectId(req.body.eventID)
            }
        )


        const customer = await userModel.findOne(
            {
                _id: new mongoose.Types.ObjectId(req.headers.user_id)
            }
        )


        // coupon discount

        let netAmount = event_data.price;
        const coupon_applied = req.body.coupon_apply;
        const coupon_code = req.body.coupon_code;
        const event_id = new mongoose.Types.ObjectId(req.body.eventID);

        let coupon_id = null;
        if (coupon_applied) {
            const coupon = await couponModel.findOne(
                {
                    coupon_code: coupon_code,
                    event: event_id
                }
            )
            if (!coupon) {
                return {
                    status: "failed",
                    message: "Invaliv coupon",
                    data: null
                }
            }
            coupon_id = coupon._id;
            const discount = coupon.discount;
            netAmount -= (netAmount * (discount / 100));
        }

        const transaction_id = new mongoose.Types.ObjectId().toString();

        
        const data = {
            total_amount: netAmount,
            currency: 'BDT',
            tran_id: transaction_id, // use unique tran_id for each api call
            success_url: `${config.BACKEND_URL}/success/${transaction_id}`,
            fail_url: `${config.BACKEND_URL}/fail/${transaction_id}`,
            cancel_url: `${config.BACKEND_URL}/cancel/${transaction_id}`,
            ipn_url: `${config.BACKEND_URL}/ipn`,
            shipping_method: 'Courier',
            product_name: event_data.event_title,
            product_category: 'ticket',
            product_profile: 'general',
            cus_name: customer.name,
            cus_email: customer.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);


        await transactionModel.create({
            user: customer._id,
            event: event_data._id,
            ticket: null,
            coupon: coupon_id,
            amount: netAmount,
            status: "pending",
            payment_method: null,
            transaction_id: transaction_id
        })
        

        if (apiResponse?.GatewayPageURL) {
            return {
                status: "success",
                message: "Payment gateway URL retrieved successfully",
                data: {
                    amount: netAmount,
                    url: apiResponse.GatewayPageURL
                }
            };
        } else {
            
            return {
                status: "failed",
                message: "Failed to retrieve payment gateway URL",
                data: null
            };
        }
    } catch (error) {
        return {
            status: "error",
            message: "Payment process failed",
            error: error.message
        };
    }
}

export const paymentSuccessService = async (req, res) => {
    try {

        const paymentDetails = await transactionModel.updateOne(
            {
                transaction_id: req.params.tran_id
            },
            {
                $set: {
                    status: "paid"
                }
            }
        )

        const paymentHistory = await transactionModel.findOne(
            {
                transaction_id: req.params.tran_id
            }
        )

        if (!paymentHistory) {
            return {
                status: "failed",
                message: "Transaction not found",
                data: null
            };
        }

        // generate a ticket 

        const ticket_id = Math.floor(10000000000 + Math.random() * 90000000000);
        const event = paymentHistory.event;
        const user = paymentHistory.user;
        const payment = paymentHistory._id
        const coupon = paymentHistory.coupon;


        const ticket = await ticketModel.create({
            ticket_id: ticket_id,
            event: event,
            user: user,
            payment: payment
        })

        await eventModel.updateOne(
            {
                _id: event
            },
            {
                $inc: {
                    ticket_sold: 1
                }
            },
            { new: true }
        )

        await couponModel.updateOne(
            {
                _id: coupon
            },
            {
                $inc: {
                    total_used: 1
                }
            },
            { new: true }
        )

        return {
            status: "success",
            message: "Ticket purchase successful",
            data: {
                ticket: ticket
            }
        };
    } catch (error) {
        return {
            status: "error",
            message: "Failed to process payment success",
            error: error.message
        };
    }
}


export const paymentFailedService = async (req, res) => {
    try {
        const tran_id = req.params.tran_id;

        // Update transaction status to failed
        const paymentHistory = await transactionModel.findOneAndUpdate(
            { transaction_id: tran_id },
            { $set: { status: "failed" } },
            { new: true } // return the updated document
        );

        if (!paymentHistory) {
            return {
                status: "failed",
                message: "Transaction not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Payment marked as failed",
            data: paymentHistory
        };
    } catch (error) {
        console.error(error);
        return {
            status: "error",
            message: "Failed to process payment failure",
            error: error.message
        };
    }
};



export const paymentCancelService = async (req, res) => {
    try {
        const tran_id = req.params.tran_id;

        // Update transaction status to canceled
        const paymentHistory = await transactionModel.findOneAndUpdate(
            { transaction_id: tran_id },
            { $set: { status: "cancel" } },
            { new: true } // return the updated document
        );

        if (!paymentHistory) {
            return {
                status: "failed",
                message: "Transaction not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Payment canceled successfully",
            data: paymentHistory
        };
    } catch (error) {
        console.error(error);
        return {
            status: "error",
            message: "Failed to cancel payment",
            error: error.message
        };
    }
};
