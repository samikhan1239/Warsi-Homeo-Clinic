import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const appointments = await prisma.appointment.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        date: true,
        time: true,
        reason: true,
        status: true,
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("GET /api/admin/appointments error:", error);
    return NextResponse.json(
      { message: `Error fetching appointments: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const { id, status } = await request.json();

    if (!id || !["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid ID or status" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        date: true,
        time: true,
        reason: true,
        status: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("PATCH /api/admin/appointments error:", error);
    return NextResponse.json(
      { message: `Error updating appointment: ${error.message}` },
      { status: 500 }
    );
  }
}
