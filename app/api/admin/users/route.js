import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const patients = await prisma.user.count({ where: { role: "PATIENT" } });
    const students = await prisma.user.count({ where: { role: "STUDENT" } });

    return NextResponse.json({ patients, students });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching stats" },
      { status: 500 }
    );
  }
}
