import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, "minimum length is 4"],
        maxlength: [30, "maximul length is 30"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: Number
    },
    expire_verification_code: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["admin", "organizer", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum:["Active", "Pending", "Suspended"],
        default: "Pending"
    },
},
    { timestamps: true }
)

const userModel = mongoose.model("users", userSchema);
export default userModel;