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
    await connectDb()
    let purchases
    // const admin = await checkAdminPermission()
    // if(admin){
    // }
    // console.log(req.nextUrl.searchParams.get('keyword'))

    purchases = await Purchase.find({}).populate(['user','addedBy'])

    return NextResponse.json(purchases, { status: 200 });
}
export async function POST(req: NextRequest) {
    try {
        const admin = await checkAdminPermission()
        if (!admin) return unauthorizedResponse;
        const { userId, billamount, file } = await req.json()
        if (!userId || !billamount || !file) {
            return NextResponse.json({ error: 'all fields are required' }, { status: 400 })
        }
        const user = await User.findById(userId).exec()
        if (!user) {
            return NextResponse.json({ error: 'user does not exist' }, { status: 400 })
        }
        const purchase = await Purchase.create({
            user: user._id,
            amount: Number(billamount),
            billFile: file.toString(),
            addedBy: admin.userId
        })
        if (purchase) {
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
        
    const admin = checkAdminPermission()
    if(!admin){
        return unauthorizedResponse
    }

    const {id} = await req.json()
     
    if(!id){
        return NextResponse.json({error:"Id is required"},{status:400})
    }

    const purchase = await Purchase.findByIdAndDelete({_id:id})
  
    if(purchase){
        return NextResponse.json({message:"record deleted successfully"},{status:200})
    }
    return NextResponse.json({error:"record not found"},{status:400})


} catch (error) {
    return NextResponse.json({error:"Something went wrong"},{status:500})
}

}
