import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
 
import { BusinessCustomer } from "@/models/BusinessCustomer";
import { isAuthenticated } from "../(lib)/checkAuth";
import { Level } from "@/models/level";
import { Purchase } from "@/models/Purchase";

export async function GET() {
    try {
        await connectDb()

        const isAuth = await isAuthenticated()

        if (!isAuth) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

        let customer = await BusinessCustomer.findOne({ user: isAuth.userId }).select(
            'currentCycle cyclePurchase reward cycleEndDate allTimePurchase',
        )
        const level = await Level.findOne({ name: customer.currentCycle }).select('name target_amt reward_percentage')

        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const purchase = await Purchase.find({
            user: isAuth.userId,
            createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth },
        }).select('-billFile -addedBy -user -_id -updatedAt').populate('addedBy', { username: 1 });

        return NextResponse.json({ customer,level,purchase}, { status: 200 })
    } catch (error) {
        return NextResponse.json({  error:'something went wrong'}, { status: 500 })
    }


}