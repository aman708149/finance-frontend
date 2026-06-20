import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;
  const isVerified = request.cookies.get("isVerified")?.value;
  const { pathname } = request.nextUrl;

  // Handle root route
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // redirect logged-in users based on role
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (
      role === "partner" &&
      isVerified !== "true" &&
      !pathname.startsWith("/partner/onboarding")
    ) {
      return NextResponse.redirect(
        new URL("/partner/onboarding", request.url)
      );
    }

    if (role === "invester") {
      return NextResponse.redirect(new URL("/investor", request.url));
    }
  }

  // allow login route without token
  if (pathname === "/login") {
    if (token && role) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      if (role === "partner") {
        return NextResponse.redirect(new URL("/partner", request.url));
      }

      if (role === "invester") {
        return NextResponse.redirect(new URL("/investor", request.url));
      }
    }

    return NextResponse.next();
  }

  // block protected routes if token missing
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // role-based protection
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/partner") && role !== "partner") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/investor") && role !== "invester") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/partner/:path*",
    "/investor/:path*",
    "/login",
  ],
};