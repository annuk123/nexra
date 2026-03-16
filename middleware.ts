import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nexra_access_token")?.value;

  // Check token in cookie (we'll also set it as a cookie in callback)
  if (!token) {
    const signInUrl = new URL("/auth", request.url);
    signInUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/thinking-engine-v2.0/:path*"],
};