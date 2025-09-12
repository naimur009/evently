import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({

    ticket_id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
        required:true,
        default:null,
    }
},
    { timestamps: true }
)

const ticketModel = mongoose.model("tickets", ticketSchema);
export default ticketModel;