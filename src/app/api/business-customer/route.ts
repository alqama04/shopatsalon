import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { User } from "@/models/User";
import { BusinessCustomer } from "@/models/BusinessCustomer";
import { isAuthenticated } from "../(lib)/checkAuth";
import { Level } from "@/models/Level";
 

// get Business customer
export async function GET(req: NextRequest) {
    try {
        await connectDb()
        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
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
        const phoneRegex = /^\d{10}$/;
        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const { display_name, phone, address, city, state } = body

        const currentUser = await User.findById(isAuth.userId).exec();

        if (!currentUser) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        if (!phoneRegex.test(phone)) {
            return NextResponse.json({ error: 'Invalid Phone Number' }, { status: 400 });
        }
        // check duplicate phone 
        const duplicatePhone = await BusinessCustomer.findOne({ phone_number: phone })
        if (duplicatePhone) {
            return NextResponse.json({ error: "Phone Number already registered" }, { status: 209 });
        }

        if (
            display_name.length < 3 ||
            display_name.length > 50
        ) {
            return NextResponse.json({ error: 'display name should be 3-50' }, { status: 400 });
        }
        if (
            address.length < 10 ||
            address.length > 80
        ) {
            return NextResponse.json({ error: 'Address should be 10-80' }, { status: 400 });
        }
        if (city.length < 4 || city.length > 60) {
            return NextResponse.json({ error: 'city name should be 4-60 char' }, { status: 400 });
        }
        if (state.length < 4 || state.length > 60) {
            return NextResponse.json({ error: 'state name should be 4-60 char' }, { status: 400 });
        }
        let duplicate = await BusinessCustomer.findOne({ user: currentUser._id })
        if (duplicate) {
            return NextResponse.json({ error: 'Profile already Exist' }, { status: 400 });
        }


        //find levels and sort to asc 
        const level = await Level.find().sort({ target_amt: 1 }).limit(1)

        await BusinessCustomer.create({
            user: currentUser._id,
            display_name: display_name,
            phone_number: phone,
            address: address,
            city: city,
            state: state,
            currentCycle: level.length && level[0]._id,
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

        const phoneRegex = /^\d{10}$/;
        const isAuth = await isAuthenticated()
        if (!isAuth) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        const { id, display_name, phone, address, city, state } = body

        if (!id || !display_name || !phone || !address || !city || !state) {
            return NextResponse.json({ error: "all fields are required" }, { status: 400 });
        }

        if (display_name.length < 5 || display_name.length > 60) {
            return NextResponse.json({ error: "display name should be 5-60 character" },{status:400})
        }

        if (address.length < 10 || address.length > 60) {
            return NextResponse.json({ error: "address should be 10-80 character" },{status:400})
        }
        if (city.length < 4 || city.length > 60) {
            return NextResponse.json({ error: "city name should be 4-60 character" },{status:400})
        }
        if (state.length < 4 || state.length > 60) {
            
            return NextResponse.json({ error: "state name should be 4-60 character" },{status:400})
        }

        // find customer
        const customer = await BusinessCustomer.findById({ _id: id }).exec()
        if (!customer) {
            return NextResponse.json({ error: "customer profile not exist" }, { status: 400 });
        }

        if (!phoneRegex.test(phone)) {
            return NextResponse.json({ error: 'Invalid Phone Number' }, { status: 400 });
        }

        const duplaicatePhone = await BusinessCustomer.findOne({ phone_number: phone })

        if (duplaicatePhone && (duplaicatePhone._id.toString() !== customer._id.toString())) {
            return NextResponse.json({ error: "phone number already registered" }, { status: 409 });
        }

        customer.display_name = display_name
        customer.phone_number = phone
        customer.address = address
        customer.city = city
        customer.state = state

        await customer.save()
        return NextResponse.json({ user: "Profile Update successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "internal server Error" }, { status: 500 });

    }
}
