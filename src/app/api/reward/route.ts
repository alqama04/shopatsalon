import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { User } from "@/models/User";
import { checkAdminPermission } from "../(lib)/checkAuth";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import { Level } from "@/models/Level";

export async function GET(req: NextRequest) {
    try {
        connectDb()
        const admin = await checkAdminPermission()
        if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        let queryObj: {
             user?: string 
             phone_number?: string 
            } = {}
        const page = Number(req.nextUrl.searchParams.get('page')) || 1
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        const phone = req.nextUrl.searchParams.get('phone')
        const email = req.nextUrl.searchParams.get('email')
     

        const skip = (page - 1) * limit

        console.log(phone)

        if (phone) {
            queryObj.phone_number = phone            
        }

        if (email) {
            const user = await User.findOne({ email: email })
            if (user) {
                queryObj.user = user._id
            }
        }

      

        const rewards = await BusinessCustomer.find(queryObj)
            .sort({ createdAt: -1 })
            .populate('user', { username: 1, email: 1 })
            .populate('currentCycle', { name: 1 })
            .select('cyclePurchase reward cycleStartDate cycleEndDate')
            .sort('-cycleEndDate')
            .limit(limit)
            .skip(skip)
        return NextResponse.json({ rewards: rewards }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {

        const admin = await checkAdminPermission();
        if (!admin) return new Response("Unauthorized", { status: 401 });

        const { id } = await req.json()

        const level = await Level.find().sort({ target_amt: 1 }).limit(1)


        const reward = await BusinessCustomer.findByIdAndUpdate({ _id: id }, {
            currentCycle: level[0]._id,
            cyclePurchase: 0,
            reward: 0,
            cycleStartDate: Date.now(),
            cycleEndDate: Date.now() + 31536000000
        })

        if (!reward) return NextResponse.json({ error: "reward not settled" })

        return NextResponse.json({ message: 'reward settled' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }

}