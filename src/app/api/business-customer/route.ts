import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { User } from "@/models/User";
import { BusinessCustomer } from "@/models/BusinessCustomer";
export async function POST(req: NextRequest) {
    try {
        connectDb();
        let GSTRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
        const phoneRegex = /^\d{10}$/;

        const session = await getServerSession(options);

        if (!session) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const currentUser = await User.findOne({ email: session?.user.email }).exec();
        if (!currentUser) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }
        const body = await req.json();

        if (!GSTRegex.test(body.gstIn)) {
            return NextResponse.json({ error: 'Invalid GST' }, { status: 400 });

        }

        if (!phoneRegex.test(body.phone)) {
            return NextResponse.json({ error: 'Invalid Phone Number' }, { status: 400 });

        }
        if (
            body.display_name.length < 3 ||
            body.display_name.length > 50
        ) {
            return NextResponse.json({ error: 'display name should be 3-50' }, { status: 400 });

        }
        if (
            body.address.length < 3 ||
            body.address.length > 50
        ) {
            return NextResponse.json({ error: 'Address should be 10-80' }, { status: 400 });

        }
        const { display_name, gstIn, phone, address } = body
        let businessCustomer = await BusinessCustomer.findOne({ user: currentUser._id })
        if (businessCustomer) {
            return NextResponse.json({ error: 'Profile already Exist' }, { status: 400 });

        }

        businessCustomer = await BusinessCustomer.create({
            user: currentUser._id,
            display_name: display_name,
            gstin: gstIn,
            phone_number: phone,
            address: address

        })

      
        currentUser.business_customer = true
        await currentUser.save()


        return NextResponse.json({ user: "Profile Update successfully" }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
