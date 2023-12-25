// @ts-nochec
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    business_customer: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model('User', userSchema)