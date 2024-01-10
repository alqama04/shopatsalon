import connectDb from "@/database/connectdb";
import { NextResponse, NextRequest } from "next/server";
import { Order } from "@/models/Order";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import { checkAdminPermission } from "../../(lib)/checkAuth";
 


export async function GET(req: NextRequest) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const id = req.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 })
        }

        const order = await Order.findById({ _id: id })
        if (order) {
            
            const customer = await BusinessCustomer.findOne({ user: order.user })
            .select('username display_name phone_number address city state')
            .populate("user", { username: 1, email: 1 })
            
            return NextResponse.json({ order, customer }, { status: 200 })
        }
        
        return NextResponse.json({ error: "order not found" }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: "somehting went wrong" }, { status: 500 })
    }
}