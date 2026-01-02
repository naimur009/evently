import { NextResponse } from 'next/server'
import { decode } from './app/libs/decodeToken';

// This function can be marked `async` if using `await` inside
export function middleware(request) {

    const path = request.nextUrl.pathname;

    // Only log in development to avoid Vercel function timeout
    if (process.env.NODE_ENV === 'development') {
        console.log('Middleware processing path:', path);
    }

    const publicPath = path === "/log-in" || path === "/sign-up" || path === "/email-verification";

    // Get token with better error handling
    let token = '';
    try {
        token = request.cookies.get('Token')?.value || '';
        // Handle edge cases where cookie might be malformed
        if (token && typeof token !== 'string') {
            token = String(token);
        }
    } catch (error) {
        console.error('Cookie parsing error:', error);
        token = '';
    }

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

            // If token decode fails or returns null
            if (!tokenDecode) {
                return NextResponse.redirect(new URL('/log-in', request.url))
            }

            // Check if token has required fields
            if (!tokenDecode.role || !tokenDecode.user_id) {
                return NextResponse.redirect(new URL('/log-in', request.url))
            }

            // Check admin/organizer role
            if (tokenDecode.role !== "admin" && tokenDecode.role !== "organizer") {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Token decode error:', error);
            }
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