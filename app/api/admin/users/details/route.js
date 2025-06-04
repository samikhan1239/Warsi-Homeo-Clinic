import prisma from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        appointments: {
          select: { id: true, date: true, status: true, reason: true },
        },
      },
    });

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        courses: {
          select: { id: true, title: true },
        },
      },
    });

    return NextResponse.json({ patients, students });
  } catch (error) {
    console.error("GET /api/admin/users/details error:", error);
    return NextResponse.json(
      { message: "Error fetching user details", patients: [], students: [] },
      { status: 500 }
    );
  }
}
