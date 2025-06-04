import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { password: true },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    return NextResponse.json(
      { message: "Failed to update password" },
      { status: 500 }
    );
  }
}
