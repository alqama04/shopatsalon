// @ts-nocheck

import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    billFile: [
        {
            url: {
                type: String,
                required: true,
            },
        }
    ],
    purchase_date: {
        type: Date,
        default: Date.now,
    },
    addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },


}, { timestamps: true })

export const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema)