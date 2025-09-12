import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
        required: true
    },
    ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tickets",
        required: false
    },
    coupon:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupons",
    },
    amount: {
        type: Number,
        required: true,
        min: [0, "Amount cannot be negative"]
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    payment_method: {
        type: String,
        enum: ["credit_card", "debit_card", "paypal", "stripe", "cash", "bkash", "nagad"],
        required: false
    },
    transaction_id: { // renamed transactions_id → transaction_id for consistency
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true }
)

const transactionModel = mongoose.model("transactions", transactionSchema);
export default transactionModel;