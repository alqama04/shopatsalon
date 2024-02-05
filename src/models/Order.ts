import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    orderList: {
        type: String,
    },
    files: [
        {
            type: String
        }
    ],
  
    status: {
        type: String,
        default: "pending"
    },
    
    
}, { timestamps: true })

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
