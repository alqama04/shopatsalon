import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { User } from "@/models/User";
import { BusinessCustomer } from "@/models/BusinessCustomer";

const unauthorizedResponse = NextResponse.json({ error: "unauthorized" }, { status: 401 });
const isAuthenticated = async () => {
    const session = await getServerSession(options);
    if (session) {
        return session.user;
    } else return false
};
// get Business customer
export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return unauthorizedResponse
        }

        const profile = await BusinessCustomer.findOne({ user: isAuth.userId })


        if (!profile) {
            return NextResponse.json({ error: "user profile does not exist" }, { status: 400 })
        }
        return NextResponse.json({ profile: profile }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}



export async function POST(req: NextRequest) {
    try {
        connectDb();
        let GSTRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
        const phoneRegex = /^\d{10}$/;

        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return unauthorizedResponse
        }
        console.log(isAuth)
        const body = await req.json();
        console.log(body)
        const { display_name, gstIn, phone, address, city, state } = body

        const currentUser = await User.findById(isAuth.userId).exec();

        if (!currentUser) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        if (gstIn) {
            if (!GSTRegex.test(gstIn)) {
                return NextResponse.json({ error: "Please enter a valid GSTIN number." }, { status: 400 });
            }
            // check duplaicate
            const isDuplicate = await BusinessCustomer.findOne({ gstin: gstIn })
            if (isDuplicate) {
                return NextResponse.json({ error: "GST Number already registered" }, { status: 209 });
            }
        }

        if (!phoneRegex.test(phone)) {
            return NextResponse.json({ error: 'Invalid Phone Number' }, { status: 400 });
        }
        if (
            display_name.length < 3 ||
            display_name.length > 50
        ) {
            return NextResponse.json({ error: 'display name should be 3-50' }, { status: 400 });
        }
        if (
            address.length < 3 ||
            address.length > 50
        ) {
            return NextResponse.json({ error: 'Address should be 10-80' }, { status: 400 });
        }
        if (city.length < 3 || city.length > 50) {
            return NextResponse.json({ error: 'city name should be 10-80 char' }, { status: 400 });
        }
        if (state.length < 3 || state.length > 50) {
            return NextResponse.json({ error: 'state name should be 10-80 char' }, { status: 400 });
        }
        let businessCustomer = await BusinessCustomer.findOne({ user: currentUser._id })
        if (businessCustomer) {
            return NextResponse.json({ error: 'Profile already Exist' }, { status: 400 });
        }

        businessCustomer = await BusinessCustomer.create({
            user: currentUser._id,
            display_name: display_name,
            gstin: gstIn,
            phone_number: phone,
            address: address,
            city: city,
            state: state
        })
        currentUser.business_customer = true
        await currentUser.save()
        return NextResponse.json({ user: "Profile Update successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        connectDb();
        let GSTRegex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
        const phoneRegex = /^\d{10}$/;
        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return unauthorizedResponse
        }
        const body = await req.json();
        const { id, display_name, gstIn, phone, address, city, state } = body

        if (!id || !display_name || !gstIn || !phone || !address || !city || !state) {
            return NextResponse.json({ error: "all fields are required" }, { status: 400 });
        }

        // find customer

        const customer = await BusinessCustomer.findById({ _id: id }).exec()
        if (!customer) {
            return NextResponse.json({ error: "customer profile not exist" }, { status: 400 });
        }
        // validate gst and check for duplicate
        if (gstIn) {
            if (!GSTRegex.test(gstIn)) {
                return NextResponse.json({ error: "Please enter a valid GSTIN number." }, { status: 400 });
            }
            // check duplaicate
            const isDuplicate = await BusinessCustomer.findOne({ gstin: gstIn })

            if (isDuplicate._id.toString() !== customer._id.toString()) {
                return NextResponse.json({ error: "GST number already registered" }, { status: 409 });
            }
        }
        if (!phoneRegex.test(phone)) {
            return NextResponse.json({ error: 'Invalid Phone Number' }, { status: 400 });
        }

        customer.display_name = display_name
        customer.gstin = gstIn
        customer.phone_number = phone
        customer.address = address
        customer.city = city
        customer.state = state

        await customer.save()


        return NextResponse.json({ user: "Profile Update successfully" }, { status: 200 });

    } catch (error: any) {


    }
}
