import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { Level } from "@/models/level";
import { checkAdminPermission } from "../(lib)/checkAuth";

export async function GET() {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()

        if (!isAdmin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const levels = await Level.find().exec()

        return NextResponse.json(levels, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const { name, target_amt, reward_percentage } = await req.json()
        await Level.create({
            user: isAdmin.userId,
            name: name,
            target_amt: target_amt,
            reward_percentage: reward_percentage
        })
        return NextResponse.json({ message: 'Level created' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const { id, name, target_amt, reward_percentage } = await req.json()

        if (!id || !name.trim() || !target_amt) {
            return NextResponse.json({ error: 'all fields are required' }, { status: 400 })
        }

        const duplicate = await Level.findOne({ name: name }).exec()
        if (duplicate && duplicate._id.toString() !== id) {
            return NextResponse.json({ error: `${name} already exist` }, { status: 409 })
        }
        
        await Level.findByIdAndUpdate({ _id: id }, { user: isAdmin.userId, name: name, target_amt: target_amt, reward_percentage: reward_percentage }, { new: true, timestamps: true })


        return NextResponse.json({ message: 'update successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'level id is required' }, { status: 400 })
        }
        await Level.findByIdAndDelete({ _id: id }).exec();
        return NextResponse.json({ message: 'level is deleted successfully' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}
