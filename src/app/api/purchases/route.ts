import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Purchase } from "@/models/Purchase";

;




const unauthorizedResponse = NextResponse.json({ error: "unauthorized" }, { status: 401 });

const isAuthenticated = async () => {
    const session = await getServerSession(options);
    if (session) {
        return session.user;
    } else return false
};
function isValidDate(dateString:string) {
    // Try to create a Date object from the string and check if it is a valid date
    return !isNaN(Date.parse(dateString));
}

export async function GET(req: NextRequest) {
    try {
        let queryData: {
            user?: string,
            createdAt?: {
                $gte: any,
                $lt: any,
            };
        } = {};
        await connectDb()
        const user = await isAuthenticated()
        if (!user) return unauthorizedResponse

        let page = Number(req.nextUrl.searchParams.get('page')) || 1
        let limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        let fromDate = req.nextUrl.searchParams.get('fromDate') || ''
        let toDate = req.nextUrl.searchParams.get('toDate') || ''



        if (isValidDate(fromDate) && isValidDate(toDate)) {
            queryData.createdAt = {
                $gte: new Date(fromDate).toISOString(),
                $lt: new Date(toDate).toISOString(),
            };
        }
        let skip = (page - 1) * limit

        queryData.user = user?.userId
        console.log(queryData)

        const purchases = await Purchase.find(queryData)
            .populate('user', { username: 1 })
            .populate('addedBy', { username: 1 })
            .skip(skip)
            .limit(limit)
            .sort('-createdAt')


        const totalPurchasesCount = await Purchase.countDocuments(queryData)

        return NextResponse.json({ purchases, totalPurchasesCount }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "internal server error" }, { status: 500 })
    }
}

