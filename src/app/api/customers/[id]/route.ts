import connectDb from "@/database/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminPermission } from "../../(lib)/checkAuth";
import { BusinessCustomer } from "@/models/BusinessCustomer";


export async function GET(req: NextRequest, context: { params: { id: string } }) {
    connectDb()
    const isAdmin = await checkAdminPermission()
    if (!isAdmin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

    const id = context.params.id
    
    let customer = await BusinessCustomer.findOne({ user: id }) 
    .populate('currentCycle',{name:1,target_amt:1})
    .populate("user",{'__v':0})
   

    if (!customer) {
        return NextResponse.json({ error: "customer profile not created" }, { status: 402 })
    }

    return NextResponse.json({ customer }, { status: 200 })


}

