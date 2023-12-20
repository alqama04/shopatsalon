// @ts-nochec
import mongoose from "mongoose";
const Business_customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    gstin: {
        type: String,
        minLength: [15, "Invalid GST Number"],
        maxLength: [15, 'Invalid GST Number'],
        trim: true  ,
        unique:true
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
        unique:true
    },
    address: {
        type: String,
        required: true,
        minLength: [10, "Address should be 10 characters long"],
        maxLength: [60, 'Address can not be more than 60 characters.'],
        trim: true  
    }
}, { timestamps: true });

export const BusinessCustomer = mongoose.models.BusinessCustomer || mongoose.model('BusinessCustomer', Business_customerSchema);
