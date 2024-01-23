import mongoose from 'mongoose'
import { BusinessCustomer } from '@/models/BusinessCustomer'
import { User } from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import connectDb from '@/database/connectdb'
import { checkAdminPermission } from '../(lib)/checkAuth'

export async function GET(req: NextRequest) {
    try {
        connectDb()
        const isAdmin = await checkAdminPermission()
        if(!isAdmin) return NextResponse.json({error:"unauthorized"},{status:401})
    
        const queryObj: any = {}

        const page = Number(req.nextUrl.searchParams.get('page')) || 1
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 20
        const email = req.nextUrl.searchParams.get('email')
        const phone = req.nextUrl.searchParams.get('phone')

        if (email) {
            queryObj.email = email
        }
        if (phone) {
            const customer = await BusinessCustomer.findOne({ phone_number: phone })
            if (customer) {
                queryObj._id = customer.user.toString()
            }
        }

        const skip = (page - 1) * limit

        const user = await User.find(queryObj)
        .select('-__v')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        
       return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "something went wrong" }, { status: 500 })

    }

}