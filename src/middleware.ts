import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        if (req.nextUrl.pathname.startsWith('/admin-dashboard')
            && req.nextauth.token?.role !== 'admin'
        ) {
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
        '/dashboard/orders',
        '/dashboard/place-orders',
        
        '/admin-dashboard', 
        '/admin-dashboard/levels',
        '/admin-dashboard/reward',
        '/admin-dashboard/purchases',
        '/admin-dashboard/purchases/add-purchase-record',
        '/admin-dashboard/orders',
        '/admin-dashboard/orders/place-order',
        '/admin-dashboard/customers',
        '/admin-dashboard/customers/:id*',

    ]
}