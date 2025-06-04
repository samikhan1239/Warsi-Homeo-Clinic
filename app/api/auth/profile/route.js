import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/jwt";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    const { name, email } = await request.json();

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: { name, email },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
