import mongoose from "mongoose";
import eventModel from "../models/event.model.js"
import categoryModel from '../models/category.model.js';

export const allEventsServices = async () => {
    try {

        await eventModel.updateMany(
            { event_date: { $lt: new Date() }, 
            status: { $ne: "Completed" } }, // condition
            { $set: { status: "Completed" } } // update
        );
        
            
        const data = await eventModel.aggregate([
            {
                $match: {}
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind:"$category" },
            {
                $project: {
                    category: {
                        categoryName: 1
                    },
                    event_title: 1,
                    event_date: 1,
                    venue: 1,
                    image: 1,
                    status:1
                }
            },
            {
                $sort: {
                    event_date: 1
                }
            }
        ]);
        

        if (!data || data.length === 0) {
            return {
                status: "failed",
                message: "No events found",
                data: []
            };
        }
        return {
            status: "success",
            message: "Events retrieved successfully",
            data: data
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Error while fetching events",
            error: error.message
        };
    }
}


export const singleEventsServices = async (req) => {
    try {
        
        const ID = new mongoose.Types.ObjectId(req.params.eventID);
        const data = await eventModel.aggregate([
            {
                $match: {
                    _id: ID
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
            { $unwind:"$category" },
            {
                $project: {
                    category:{
                        categoryName:1
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
                    organizer:1
                }
            }
        ]);
        

        if (!data) {
            return {
                status: "failed",
                message: "Event not found",
                data: null
            };
        }

        return {
            status: "success",
            message: "Event retrieved successfully",
            data: data
        };

    } catch (error) {

        return {
            status: "error",
            message: "Invalid Event ID or error while fetching event",
            error: error.message
        };
    }
}


export const categoryServices = async () => {
    try {

        const category = await categoryModel.find();
        

        if (!category || category.length === 0) {
            return {
                status: "failed",
                message: "No events found",
                data: []
            };
        }
        return {
            status: "success",
            message: "Events retrieved successfully",
            data: category
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Error while fetching events",
            error: error.message
        };
    }
}