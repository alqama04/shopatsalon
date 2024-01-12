import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import {checkAdminPermission} from "../../(lib)/checkAuth";
import { Order } from "@/models/Order";
import { BusinessCustomer } from "@/models/BusinessCustomer";

export async function GET(req: NextRequest) {
    try {
        connectDb()

        const admin = await checkAdminPermission()
        if (!admin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        let queryObj: {
            isAccepted?: string|undefined,
            user?:string |null
        } = {}

        // pagination
        let page = Number(req.nextUrl.searchParams.get('page')) || 1
        let limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        let isAccepted = (req.nextUrl.searchParams.get('isAccepted'))
        let search = req.nextUrl.searchParams.get('search')

        if (isAccepted !=='undefined' && isAccepted) {
            queryObj.isAccepted = isAccepted
        }

        if(search){
            const customer = await BusinessCustomer.findOne({phone_number:search})

            queryObj.user = customer?.user.toString()
        }

        let skip = (page - 1) * limit

        const order = await Order.find(queryObj)
            .populate('user', { username: 1, })
            .limit(limit)
            .skip(skip)
            .sort('-createdAt')


        return NextResponse.json(order, { status: 200 })
    } catch (error) {
       
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        connectDb()
        const admin = await checkAdminPermission()
        
        if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        const { id } = await req.json()

        if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

        const updatedOrder = await Order.findByIdAndUpdate({ _id: id }, {
            isAccepted: true
        })

        if (!updatedOrder) {
            return NextResponse.json({ error: "unable to update order" }, { status: 400 })
        }

        return NextResponse.json({ message: "Order Update" }, { status: 200 })

    } catch (error) {
         
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        connectDb()

        const admin = await checkAdminPermission()
        if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        const { id } = await req.json()

        const order = await Order.findOne({ _id: id })

        if (!order) {
            return NextResponse.json({ error: 'order not found' }, { status: 400 })
        }

        await order.deleteOne()
        return NextResponse.json({ message: 'order is cancelled' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}