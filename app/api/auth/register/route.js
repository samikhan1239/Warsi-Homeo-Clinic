import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, name, role } = await request.json();

    const validRoles = ["PATIENT", "STUDENT", "ADMIN"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    const token = generateToken(user);
    return NextResponse.json({ token, role: user.role });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
