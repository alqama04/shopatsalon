import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { User } from "@/models/User";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import { isAuthenticated } from "../(lib)/checkAuth";

 
 
// admin can GET User For admin to add Purchase record
export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const isAuth = isAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        let user;
        const value = req.nextUrl.searchParams.get('value')
        const searchThrough = req.nextUrl.searchParams.get('searchThrough')

        if (!searchThrough || !value) {
            return NextResponse.json({ error: "all fields are required" }, { status: 400 })
        }
        if (searchThrough.toLowerCase() === 'phone') {
            user = await BusinessCustomer.findOne({ phone_number: value }).populate('user')
            user = user?.user
        } else if (searchThrough.toLowerCase() === 'gstin') {
            user = await BusinessCustomer.findOne({ gstin: value }).populate('user')
            user = user?.user

        } else if (searchThrough.toLowerCase() === 'email') {
            user = await User.findOne({ email: value });
        }
        if (!user) return NextResponse.json({ error: 'user not found' }, { status: 400 })

        return NextResponse.json({ user: user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}

