import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Purchase } from "@/models/Purchase";
import { User } from "@/models/User";
;




const unauthorizedResponse = NextResponse.json({ error: "unauthorized" }, { status: 401 });

const checkAdminPermission = async () => {
    const session = await getServerSession(options);
    if (session && session?.user.role === 'admin') {
        return session.user;
    } else return false
};


export async function GET(req: NextRequest) {

    let purchases
    // const admin = await checkAdminPermission()
    // if(admin){
    // }
    console.log(req.nextUrl.searchParams.get('keyword'))

    purchases = await Purchase.find({})

    return NextResponse.json(purchases, { status: 200 });
}
export async function POST(req: NextRequest) {
    try {
        const admin = await checkAdminPermission()
        if (!admin) return unauthorizedResponse;
        const { userId, billamount, files } = await req.json()
        if (!userId || !billamount || !files.length) {
            return NextResponse.json({ error: 'all fields are required' }, { status: 400 })
        }

        // check user exist 
        const user = await User.findById(userId).exec()
        if (!user) {
            return NextResponse.json({ error: 'user does not exist' }, { status: 400 })
        }
        const fileUrl = files.map((url: any) => ({ url }))

        const purchase = await Purchase.create({
            user: user._id,
            amount: Number(billamount),
            billFile: fileUrl,
            addedBy: admin.userId
        })

        console.log(purchase)

        if (purchase) {
            return NextResponse.json({ success: 'saved successfully' }, { status: 201 })
        }
        else {
            return NextResponse.json({ error: 'Unable create purchase record' }, { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}
