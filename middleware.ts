import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login" || path === "/admin/signup";

  // Check if the user is authenticated by looking for the Firebase auth token
  // Note: Firebase stores auth in localStorage, which is not accessible in middleware
  // For better security, consider using Firebase Admin SDK with session cookies

  // For now, we'll allow access to public paths and protect admin paths
  // The actual protection will be handled by the AuthGuard component

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
