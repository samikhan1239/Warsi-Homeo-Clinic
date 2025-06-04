import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!["PATIENT", "STUDENT", "ADMIN"].includes(user.role)) {
      console.error("Invalid user role in database:", user.role);
      return NextResponse.json(
        { message: "Invalid user role" },
        { status: 400 }
      );
    }

    const token = generateToken(user);
    return NextResponse.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
