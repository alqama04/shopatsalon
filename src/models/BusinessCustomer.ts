// @ts-nochec
import mongoose from "mongoose";
const Business_customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    currentCycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
        required: true,
    },

    cyclePurchase: {
        type: Number,
        required: true,
        default: 0
    },

    reward: {
        type: Number,
        required: true,
        default:0
    },
    cycleStartDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    cycleEndDate: {
        type: Date,
        required: true,
        default: Date.now() + 31536000000
    },
   
    allTimePurchase: {
        type: Number,
        required: true,
        default: 0
    },
    display_name: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        minLength: [10, "Address should be 10 characters long"],
        maxLength: [80, 'Address can not be more than 60 characters.'],
        trim: true
    },
    city: {
        type: String,
        required: true,
        minLength: [4, "city Name should be 10 characters long"],
        maxLength: [60, 'city Name can not be more than 60 characters.'],
        trim: true
    },
    state: {
        type: String,
        required: true,
        minLength: [4, "state name should be 10 characters long"],
        maxLength: [60, 'state name can not be more than 60 characters.'],
        trim: true
    },
}, { timestamps: true });

export const BusinessCustomer = mongoose.models.BusinessCustomer || mongoose.model('BusinessCustomer', Business_customerSchema);
