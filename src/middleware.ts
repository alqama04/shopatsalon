// export { default } from "next-auth/middleware"
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        

        if (req.nextUrl.pathname.startsWith('/admin-dashboard')
        && req.nextauth.token?.role !== 'admin'
    ) {
            console.log(req.nextUrl.pathname)
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

export const config = { matcher: ['/admin-dashboard', '/dashboard'] }