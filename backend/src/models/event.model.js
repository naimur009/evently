import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    event_title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minLength: [30, "Description must be at least 30 characters long"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    organizer: {
        type:String,
        required: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
    },
    event_date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: "event date must be in the future"
        }
    },
    time:{
        type:String,
        // required:true
    },
    venue: {
        type: String,
        required: true,
        lowercase: true,
    },
    image: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Price cannot be negative"]
    },
    ticket_limit: {
        type: Number,
        required: true,
        min: [1, "Ticket limit must be at least 1"],
    },
    ticket_sold: {
        type: Number,
        default: 0
    },
    start_date: {
        type: Date,
        required: false,
        validate: {
            validator: (value) => value > Date.now(),
            message: "Start date must be in the future",
        },
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: "Deadline must be in the future"
        }
    },
    status:{
        type:String,
        default:"Active"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},
    { timestamps: true }
)

const eventModel = mongoose.model("events", eventSchema);
export default eventModel;