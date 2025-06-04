import { NextResponse } from "next/server";
import { verifyToken } from "../lib/jwt";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard/admin",
    "/dashboard/patient",
    "/dashboard/student",
  ];
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decoded = await verifyToken(token);
      const role = decoded.role;

      if (path.startsWith("/dashboard/admin") && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (path.startsWith("/dashboard/patient") && role !== "PATIENT") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (path.startsWith("/dashboard/student") && role !== "STUDENT") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
