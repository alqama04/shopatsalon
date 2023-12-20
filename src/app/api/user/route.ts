import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { User } from "@/models/User";
 
import { BusinessCustomer } from "@/models/BusinessCustomer";


const unauthorizedResponse = NextResponse.json({ error: "unauthorized" }, { status: 401 });

const checkAdminPermission = async () => {
    const session = await getServerSession(options);
    if (session && session?.user.role === 'admin') {
        return true;
    } else return false
};

export async function POST(req: NextRequest) {
    try {
        
   
    await connectDb()
    // Check user is authenticated and has admin role
    const admin = checkAdminPermission()
    if (!admin) {
        return unauthorizedResponse
    }

    let user;

    const { value, searchThrough } = await req.json()

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
        user = await User.findOne({email:value});
    }
    if (!user) return NextResponse.json({ error: 'user not found' }, { status: 400 })

    return NextResponse.json({user:user}, { status: 200 })
} catch (error) {
    return NextResponse.json({error:"internal server error"}, { status: 500 })
        
}
}

