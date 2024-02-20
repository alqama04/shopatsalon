import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { checkAdminPermission } from "../../(lib)/checkAuth";
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
            status?: string | undefined,
            user?: string | null
        } = {}

        // pagination
        let page = Number(req.nextUrl.searchParams.get('page')) || 1
        let limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        let status = (req.nextUrl.searchParams.get('status'))
        let search = req.nextUrl.searchParams.get('search')

        if (status !== 'undefined' && status) {
            queryObj.status = status
        }

        if (search) {
            const customer = await BusinessCustomer.findOne({ phone_number: search })

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


export async function POST(req: NextRequest) {
    try {
        connectDb()
        const admin = await checkAdminPermission()
        if (!admin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }

        const { orderList, files, userId, orderStatus } = await req.json()
        if (!orderList && !files) {
            return NextResponse.json({ error: "one field is required" }, { status: 400 })
        }

        await Order.create({
            user: userId,
            orderList: orderList,
            files: files,
            status: orderStatus
        })
        return NextResponse.json({ message: 'order created' }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        connectDb()
        const admin = await checkAdminPermission()

        if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        const { id, orderStatus,orderListText } = await req.json()

        if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 })

        const updatedOrder = await Order.findByIdAndUpdate({ _id: id }, {
            status: orderStatus,
            orderList:orderListText
        },
            {
                new: true
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