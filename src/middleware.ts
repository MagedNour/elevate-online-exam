// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";


// const authPages = ["/login", "/register", "/forgotYourPassword"];

// export default async function middleware(request: NextRequest) {
//     // const token = request.cookies.get("next-auth.session-token")
//     const token = await getToken({ req: request })
//     const currentUrl = request.nextUrl.pathname;

//     if (token && authPages.includes(currentUrl)) {
//         return NextResponse.redirect(new URL("/", request.nextUrl.origin));
//     }  else  if (!token) {
//         const loginUrl = new URL("/login", request.url);
//         loginUrl.searchParams.set("redirect", currentUrl); // Store the attempted URL
//         return NextResponse.redirect(loginUrl);
//     }
//     else {
//         return NextResponse.next()
//     }
// }

// export const config = {
//     matcher: ["/", "/exams/:path*"]
// }


// ==========================================================================


import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = ["/login", "/register", "/forgotYourPassword"];
const publicPages = [""]; // Add public pages here

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const currentUrl = request.nextUrl.pathname;

    // Redirect to login page if user is not authenticated
    if (!token && !authPages.includes(currentUrl) && !publicPages.includes(currentUrl)) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", currentUrl);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to home page if user is authenticated and tries to access auth pages
    if (token && authPages.includes(currentUrl)) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};