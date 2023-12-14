import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    target_amt: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })

export const User = mongoose.models.Level || mongoose.model('Level', levelSchema)