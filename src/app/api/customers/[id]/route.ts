import connectDb from "@/database/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminPermission } from "../../(lib)/checkAuth";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import mongoose from "mongoose";


export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {


        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        const id = context.params.id
        // conver id to objectId
        const objectId = new mongoose.Types.ObjectId(id);
        
        let customer = await BusinessCustomer.findOne({ user: objectId })
        .populate("user", { '__v': 0 })
        .populate('currentCycle', { name: 1, target_amt: 1 })

        if (!customer) {
            return NextResponse.json({ error: "customer profile not created" }, { status: 402 })
        }

        return NextResponse.json({ customer }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }

}

