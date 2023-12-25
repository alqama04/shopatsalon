import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/database/connectdb";
import { Purchase } from "@/models/Purchase";
import { isAuthenticated } from "../(lib)/checkAuth";

function isValidDate(dateString:string) {
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
        if (!user) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }

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

