export const dynamic = "force-dynamic";

import { verifyToken } from "../../../../lib/jwt";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("GET /api/auth/me: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      console.log("GET /api/auth/me: User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("GET /api/auth/me: Successfully fetched user", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/auth/me: Error fetching user", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}
