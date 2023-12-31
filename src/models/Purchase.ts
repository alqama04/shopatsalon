// @ts-nocheck

import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    // buye ->(or customer) user
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    billFile: {
        type:String,
        requird:true,
        trim:true
    },
    
    addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },


}, { timestamps: true })

export const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema)