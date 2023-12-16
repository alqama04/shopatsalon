import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        
    },
    target_amt: {
        type: Number,
        required: true
    },
}, { timestamps: true })

export const Level = mongoose.models.Level || mongoose.model('Level', levelSchema)