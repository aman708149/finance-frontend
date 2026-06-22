import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;
  const isVerified = request.cookies.get("isVerified")?.value;

  const { pathname } = request.nextUrl;

  // No token => login
  if (!token) {
    if (pathname !== "/login") {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return NextResponse.next();
  }

  // Root route redirect
  if (pathname === "/") {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    if (role === "partner") {
      return NextResponse.redirect(
        new URL(
          isVerified === "true"
            ? "/partner"
            : "/partner/onboarding",
          request.url
        )
      );
    }

    if (role === "invester") {
      return NextResponse.redirect(
        new URL("/investor", request.url)
      );
    }
  }

  // Logged-in user visiting login page
  if (pathname === "/login") {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    if (role === "partner") {
      return NextResponse.redirect(
        new URL(
          isVerified === "true"
            ? "/partner"
            : "/partner/onboarding",
          request.url
        )
      );
    }

    if (role === "invester") {
      return NextResponse.redirect(
        new URL("/investor", request.url)
      );
    }
  }

  // PARTNER ONBOARDING PROTECTION
  if (
    role === "partner" &&
    isVerified !== "true"
  ) {
    // Allow onboarding page only
    if (
      !pathname.startsWith(
        "/partner/onboarding"
      )
    ) {
      return NextResponse.redirect(
        new URL("/partner/onboarding", request.url)
      );
    }

    return NextResponse.next();
  }

  // Role protection
  if (
    pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    pathname.startsWith("/partner") &&
    role !== "partner"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    pathname.startsWith("/investor") &&
    role !== "invester"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/partner/:path*",
    "/investor/:path*",
  ],
};