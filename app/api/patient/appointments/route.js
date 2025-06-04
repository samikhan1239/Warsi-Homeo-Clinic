import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    const appointments = await prisma.appointment.findMany({
      where: { userId: decoded.id },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("GET /api/patient/appointments error:", error);
    return NextResponse.json(
      { message: "Error fetching appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    const { firstName, lastName, email, phone, date, time, reason } =
      await request.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !reason
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: decoded.id,
        firstName,
        lastName,
        email,
        phone,
        date: new Date(date),
        time,
        reason,
        status: "PENDING",
      },
    });
    return NextResponse.json(appointment);
  } catch (error) {
    console.error("POST /api/patient/appointments error:", error);
    return NextResponse.json(
      { message: "Error booking appointment" },
      { status: 500 }
    );
  }
}
