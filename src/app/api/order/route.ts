import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { isAuthenticated } from "../(lib)/checkAuth";
import { Order } from "@/models/Order";

export async function GET(req: NextRequest) {
    try {
        connectDb()
        const isAuth = await isAuthenticated()
        if (!isAuth) return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        
        const page = Number(req.nextUrl.searchParams.get('page')) || 1
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        const skip = (page - 1) * limit


        const orders = await Order.find({ user: isAuth.userId })
            .limit(limit)
            .skip(skip)
            .sort('-createdAt')

        return NextResponse.json({ orders }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'something wen wrong' }, { status: 500 })

    }
}

export async function POST(req: NextRequest) {
    try {
        connectDb()
        const isAuth = await isAuthenticated()
        if (!isAuth) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        const { orderList, files } = await req.json()
        if (!orderList && !files) {
            return NextResponse.json({ error: "one field is required" }, { status: 400 })
        }
        console.log(orderList, files)

        const order = await Order.create({
            user: isAuth.userId,
            orderList: orderList,
            files: files
        })
        return NextResponse.json({ message: 'order created' }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ error: 'something wen wrong' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        connectDb()
        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
        }

        const { id } = await req.json()

        const order = await Order.findOne({ _id: id })

        if (order.user.toString() !== isAuth.userId) {
            return NextResponse.json({ error: "can't cancel others orders" }, { status: 401 })
        }

        if (order && !order.isAccepted) {
           
            await order.deleteOne()
            return NextResponse.json({ message: 'order is cancelled' }, { status: 200 })
        }
        else {
            return NextResponse.json({ error: 'order cannot be cancelled' }, { status: 400 })
        }

    } catch (error) {
        return NextResponse.json({ error: 'something went wrong' }, { status: 500 })
    }

}