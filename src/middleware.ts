import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        if (req.nextUrl.pathname.startsWith('/admin-dashboard')
            && req.nextauth.token?.role !== 'admin'
        ) {
            console.log(req.nextUrl.href)
            return NextResponse.rewrite(
                new URL('/access-denied', req.url)
            )
        }
        if (req.nextUrl.pathname.startsWith('/dashboard')
            && req.nextauth.token?.role !== 'admin'
            && req.nextauth.token?.role !== 'user'
        ) {
            return NextResponse.rewrite(
                new URL('/access-denied', req.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        
        '/dashboard',
        '/dashboard/purchases',
        '/dashboard/profile',
        
        '/admin-dashboard', 
        '/admin-dashboard/levels',
        '/admin-dashboard/purchases',
        '/admin-dashboard/purchases/add-purchase-record',



    ]
}