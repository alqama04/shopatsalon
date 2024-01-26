import connectDb from "@/database/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminPermission } from "../../(lib)/checkAuth";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import mongoose from "mongoose";
import { Level } from "@/models/Level";


export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        const id = context.params.id
        // conver id to objectId
        const objectId = new mongoose.Types.ObjectId(id);
        
        
        let customer = await BusinessCustomer.findOne({ user: objectId })
        // .populate('currentCycle')
        .populate("user", { '__v': 0 })
        
        .exec()
        
        if (!customer) {
            return NextResponse.json({ error: "customer profile not created" }, { status: 402 })
        }

        const level = await Level.findById(customer.currentCycle).select('-createdAT -updatedAt -user')
        
        customer.currentCycle = level

        console.log(customer)
       
        return NextResponse.json({ customer}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }

}

