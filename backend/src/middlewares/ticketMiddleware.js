import mongoose from "mongoose";
import eventModel from "../models/event.model.js";
import ticketModel from "../models/tickets.model.js";



export const ticketAvaiablityCheck = async (req, res, next) => {
    try {
        const eventid = new mongoose.Types.ObjectId(req.body.eventID);


        const event_data = await eventModel.findOne(
            {
                _id: eventid
            }
        )

        // if no event found
        if (!event_data) {
            return res.status(404).json({
                status: "successfull",
                message: "No such event found"
            })
        }


        // ticket_left
        const avaiable_ticket = (event_data.ticket_limit - event_data.ticket_sold);
        if (avaiable_ticket <= 0) {
            return res.status(400).json({
                status: "failed",
                message: "All tickets are sold"
            });
        }

        // ticket deadline
        const ticket_deadline = event_data.deadline;
        if (ticket_deadline < Date.now()) {
            return res.status(400).json({
                status: "failed",
                message: "Ticket is not available. Deadline passed."
            });
        }


        // if user already has a ticket of this event
        const user_id = new mongoose.Types.ObjectId(req.headers.user_id);

        const userTicket = await ticketModel.findOne(
            {
                event: eventid,
                user: user_id
            }
        )

        if (userTicket) {
            return res.status(400).json({
                status: "failed",
                message: "User already purchased a ticket"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            error: error.message
        });
    }
}