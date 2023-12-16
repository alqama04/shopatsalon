import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Level } from "@/models/level";



const unauthorizedResponse = NextResponse.json({ error: "unauthorized" }, { status: 401 });

const checkAdminPermission = async () => {
    const session = await getServerSession(options);
    if (!session || session && session.user.role !== "admin") {
        return false
    }
    return true;
};

export async function GET() {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return unauthorizedResponse
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
            return unauthorizedResponse
        }
        const { name, targetAmt } = await req.json()
        await Level.create({
            name: name,
            target_amt: targetAmt,
        })
        return NextResponse.json({ message: 'Level created' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if (!isAdmin) {
            return unauthorizedResponse
        }
        const {levelId} = await req.json()
        if(!levelId) {
        return NextResponse.json({ error: 'level id is required' }, { status: 400 })

        }
        await Level.findByIdAndDelete({_id:levelId}).exec();

        return NextResponse.json({ message: 'level is deleted successfully' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })

    }
}
