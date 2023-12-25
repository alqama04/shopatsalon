// @ts-nochec
import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    target_amt: {
        type: Number,
        required: true
    },
    reward_percentage: {
        type: Number,
        required: true
    },
    
}, { timestamps: true })

levelSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
export const Level = mongoose.models.Level || mongoose.model('Level', levelSchema)