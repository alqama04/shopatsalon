import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { Purchase } from "@/models/Purchase";
import { User } from "@/models/User";
import { checkAdminPermission } from "../../(lib)/checkAuth";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import { Level } from "@/models/level";


export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        let queryObj: {
            phone?: number
        } = {}

        const page = Number(req.nextUrl.searchParams.get('page')) || 1
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        const phone = Number(req.nextUrl.searchParams.get('phone'))

        if(phone){
            queryObj.phone = phone
        }

        const skip = (page - 1) * limit


        const purchases = await Purchase.find(queryObj)
            .populate(['user', 'addedBy'])
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)

        return NextResponse.json(purchases, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}
export async function POST(req: NextRequest) {
    try {
        const admin = await checkAdminPermission()
        if (!admin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const { userId, billamount, file } = await req.json()
        if (!userId || !billamount || !file) {
            return NextResponse.json({ error: 'all fields are required' }, { status: 400 })
        }
        const user = await User.findById(userId).exec()
        if (!user) {
            return NextResponse.json({ error: 'user does not exist' }, { status: 400 })
        }
        const customer = await BusinessCustomer.findOne({ user: user._id })


        if (customer.cycleEndDate < Date.now() && customer.reward >= 0) {
            return NextResponse.json({ error: `unsettled reward of Rs.${customer.reward}` }, { status: 400 })
        }

        const purchase = await Purchase.create({
            user: user._id,
            amount: Number(billamount),
            billFile: file.toString(),
            addedBy: admin.userId
        })

        const level = await Level.findOne({ _id: customer.currentCycle })
        let reward
        if (purchase) {
            customer.allTimePurchase += purchase.amount
            customer.cyclePurchase += purchase.amount
            // customer.reward = customer.cyclePurchase * (level.reward_percentage / 100)
            reward = (level.reward_percentage / 100) * purchase.amount

            // upgrade customer level if he achieved level target
            if (customer.cycleEndDate > Date.now() && customer.cyclePurchase > level.target_amt) {
                const nextLevel = await Level.find({
                    target_amt: { $gte: customer.cyclePurchase }
                }).sort('target_amt')

                customer.currentCycle = nextLevel[0]._id,
                    reward = (nextLevel[0].reward_percentage / 100) * purchase.amount
            }

            customer.reward += reward
            await customer.save()
            return NextResponse.json({ success: 'saved successfully' }, { status: 201 })
        }
        else {
            return NextResponse.json({ error: 'Unable create purchase record' }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const admin = await checkAdminPermission()
        if (!admin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const { id } = await req.json()
        if (!id) {
            return NextResponse.json({ error: "Id is required" }, { status: 400 })
        }

        const purchase: any = await Purchase.findByIdAndDelete({ _id: id })
        let reward
        if (purchase) {
            // find customer 
            const customer = await BusinessCustomer.findOne({ user: purchase.user })
            customer.allTimePurchase -= purchase.amount


            if (customer.cyclePurchase != 0 && customer.cycleStartDate < purchase.createdAt) {
                const level = await Level.findOne({ _id: customer.currentCycle })
                customer.cyclePurchase -= purchase.amount
                reward = (level.reward_percentage / 100) * purchase.amount

                if (customer.cyclePurchase < level.target_amt) {
                    // find level & decrease customer level
                    const prevLevel = await Level.find({
                        target_amt: { $gte: customer.cyclePurchase }
                    }).sort({ target_amt: 1 })

                    reward = (prevLevel[0].reward_percentage / 100) * customer.cyclePurchase
                    customer.currentCycle = prevLevel[0]._id
                }

                customer.reward = reward
                await customer.save()
            }

            return NextResponse.json({ message: "record deleted successfully" }, { status: 200 })
        }

        return NextResponse.json({ error: "record not found" }, { status: 400 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
