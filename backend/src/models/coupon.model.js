import mongoose from "mongoose";


const couponSchema = new mongoose.Schema({

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    coupon_code:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    discount:{
        type:Number,
        defaulta:0,
        required:true,
        min: [0, "Price cannot be negative"]
    },
    total_used:{
        type:Number,
        default:0,
        required:false
    }
},
    { timestamps: true }
)

const couponModel = mongoose.model("coupons", couponSchema);
export default couponModel;