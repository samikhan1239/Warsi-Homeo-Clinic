import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("POST /api/student/enroll: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "STUDENT") {
      console.log(
        `POST /api/student/enroll: User role ${decoded.role} is not STUDENT`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { courseId } = await request.json();
    if (!courseId || isNaN(parseInt(courseId))) {
      console.log("POST /api/student/enroll: Invalid courseId", { courseId });
      return NextResponse.json(
        { message: "Invalid courseId" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      select: { id: true },
    });

    if (!course) {
      console.log(`POST /api/student/enroll: Course ${courseId} not found`);
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Enroll student (no restrictions, allow re-enrollment)
    await prisma.course.update({
      where: { id: parseInt(courseId) },
      data: { students: { connect: { id: decoded.id } } },
    });

    console.log(
      `POST /api/student/enroll: User ${decoded.id} enrolled in course ${courseId}`
    );
    return NextResponse.json({ message: "Enrolled successfully" });
  } catch (error) {
    console.error("POST /api/student/enroll: Error enrolling", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Error enrolling", error: error.message },
      { status: 500 }
    );
  }
}
