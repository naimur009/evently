import mongoose from "mongoose"
import eventModel from '../models/event.model.js';
import couponModel from "../models/coupon.model.js";
import transactionModel from "../models/transaction.model.js";
import userModel from "../models/user.model.js";


export const createEventServices = async (req, res) => {
    try {

        const event_data = {
            event_title: req.body.event_title,
            description: req.body.description,
            organizer: req.body.organizer,
            city: req.body.city,
            event_date: new Date(req.body.event_date),
            venue: req.body.venue,
            category: new mongoose.Types.ObjectId(req.body.category),
            image: req.body.image,
            price: req.body.price,
            ticket_limit: req.body.ticket_limit,
            ticket_sold: req.body.ticket_sold,
            deadline: new Date(req.body.deadline),
            createdBy: new mongoose.Types.ObjectId(req.headers.user_id),
            time: req.body.time
        }


        const createdEvent = await eventModel.create(event_data);

        return {
            status: "success",
            message: "Event created successfully",
            data: createdEvent
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to create event",
            error: error.message
        };
    }
}

export const updateEventServices = async (req, res) => {
    try {

        const id = new mongoose.Types.ObjectId(req.params.eventID);
        const data = req.body


        const updatedEvent = await eventModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    ...data
                }
            },
            {
                new: true
            }
        )
        if (!updatedEvent) {
            return {
                status: "failed",
                message: "Event not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Event updated successfully",
            data: updatedEvent
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Error updating event",
            error: error.message
        };
    }
}

export const deleteEventServices = async (req, res) => {
    try {

        const eventID = new mongoose.Types.ObjectId(req.params.eventID);

        const deletedEvent = await eventModel.findByIdAndDelete(eventID);

        if (!deletedEvent) {
            return {
                status: "failed",
                message: "Event not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Event deleted successfully",
            data: deletedEvent
        };
    } catch (error) {
        console.error(error);
        return {
            status: "failed",
            message: "Failed to delete event",
            error: error.message
        };
    }
};

export const createCouponServices = async (req, res) => {
    try {

        const coupon_data = {
            event: new mongoose.Types.ObjectId(req.body.couponData.eventID),
            createdBy: new mongoose.Types.ObjectId(req.headers.user_id),
            coupon_code: req.body.couponData.coupon_code,
            discount: req.body.couponData.discount
        }


        const coupon = await couponModel.create(coupon_data)

        return {
            status: "success",
            message: "Coupon created successfully",
            data: coupon
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to create coupon",
            error: error.message
        };
    }
}


export const deleteCouponServices = async (req, res) => {
    try {

        const coupon_id = new mongoose.Types.ObjectId(req.params.couponID);


        const deletedCoupon = await couponModel.findByIdAndDelete(coupon_id)


        if (!deletedCoupon) {
            return {
                status: "failed",
                message: "Coupon not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Coupon deleted successfully",
            data: deletedCoupon
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to delete coupon",
            error: error.message
        };
    }
}


export const salesReportServices = async (req, res) => {
    try {

        // find event data
        const id = new mongoose.Types.ObjectId(req.params.eventID);
        const event_data = await eventModel.aggregate([
            {
                $match: {
                    _id: id
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },

            { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },


            {
                $project: {

                    createdBy: {
                        name: 1
                    },
                    category: {
                        categoryName: 1
                    },
                    event_title: 1,
                    description: 1,
                    event_date: 1,
                    venue: 1,
                    image: 1,
                    city: 1,
                    price: 1,
                    ticket_limit: 1,
                    ticket_sold: 1,
                    deadline: 1,
                    start_date: 1,
                    time: 1,
                    organizer: 1
                }
            }
        ]);

        if (!event_data) {
            return {
                status: "failed",
                message: "No event found",
                data: null
            };
        }

        // find payment info
        const payment = await transactionModel.aggregate([
            {
                $match: {
                    event: id,
                    status: "paid"
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])


        // find coupon data
        const coupon_data = await couponModel.find({ event: id }, { coupon_code: 1, discount: 1, total_used: 1 });

        const report = {
            event_data,
            payment,
            coupons: coupon_data
        }

        return {
            status: "success",
            message: "Sales report generated successfully",
            data: report
        };

    } catch (error) {
        console.log(error);

        return {
            status: "failed",
            message: "Error generating sales report",
            error: error.message
        };
    }
}


export const userDetailsServices = async (req, res) => {
    try {

        const userdata = await userModel.find(
            {},
            {
                name: 1,
                email: 1,
                status: 1,
                role: 1
            }
        );

        return {
            status: "success",
            message: "User data fetched successfully",
            data: userdata
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to Fetch user data",
            error: error.message
        };
    }
}

export const singleUserDetailsServices = async (req, res) => {
    try {
        const ID = req.params.userID
        const userdata = await userModel.findOne(
            { _id: ID },
            {
                name: 1,
                status: 1,
                role: 1,
                email: 1
            }
        );


        return {
            status: "success",
            message: "User data fetched successfully",
            data: userdata
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to Fetch user data",
            error: error.message
        };
    }
}

export const updateUserDetailsServices = async (req, res) => {
    try {

        const id = new mongoose.Types.ObjectId(req.params.userID);
        const data = req.body

        const userdata = await userModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    ...data
                }
            },
            {
                new: true
            }
        )


        return {
            status: "success",
            message: "User data fetched successfully",
            data: userdata
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to Fetch user data",
            error: error.message
        };
    }
}

export const deleteUserServices = async (req, res) => {
    try {

        const id = new mongoose.Types.ObjectId(req.params.userID);
        const deleteData = await userModel.findByIdAndDelete(id)


        return {
            status: "success",
            message: "User deleted successfully",
            data: deleteData
        };
    } catch (error) {
        return {
            status: "failed",
            message: "Failed to delete user",
            error: error.message
        };
    }
}