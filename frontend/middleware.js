import { NextResponse } from 'next/server'
import { decode } from './app/libs/decodeToken';

// This function can be marked `async` if using `await` inside
export function middleware(request) {

    const path = request.nextUrl.pathname;
    console.log('Middleware processing path:', path);

    const publicPath = path === "/log-in" || path === "/sign-up" || path === "/email-verification";
    const token = request.cookies.get('Token')?.value || '';

    if (publicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    const protectedPath = path === "/my-tickets";
    if (protectedPath && !token) {
        return NextResponse.redirect(new URL('/log-in', request.url))
    }


    // dashboard only for admin
    const adminPath = path === "/dashboard" || path.startsWith("/dashboard");

    if (adminPath) {
        if (!token) {
            return NextResponse.redirect(new URL('/log-in', request.url))
        }

        try {
            const tokenDecode = decode(token);
            
            if (tokenDecode && tokenDecode.role !== "admin") {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            console.error('Token decode error:', error);
            return NextResponse.redirect(new URL('/log-in', request.url))
        }
    }
    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/my-tickets",
        "/log-in", 
        "/sign-up",
        "/email-verification",
        "/dashboard",
        "/dashboard/:path*"
    ]
}