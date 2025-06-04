import prisma from "../../../../../lib/prisma";
import { verifyToken } from "../../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log(`GET /api/student/courses/${params.id}: No token provided`);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "STUDENT") {
      console.log(
        `GET /api/student/courses/${params.id}: User role ${decoded.role} is not STUDENT`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(params.id),
        students: {
          some: { id: decoded.id },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        level: true,
        category: true,
        imageUrl: true,
      },
    });

    if (!course) {
      console.log(
        `GET /api/student/courses/${params.id}: Course not found or not enrolled`
      );
      return NextResponse.json(
        { message: "Course not found or not enrolled" },
        { status: 404 }
      );
    }

    console.log(
      `GET /api/student/courses/${params.id}: Successfully fetched course`,
      course
    );
    return NextResponse.json(course);
  } catch (error) {
    console.error(
      `GET /api/student/courses/${params.id}: Error fetching course`,
      {
        message: error.message,
        stack: error.stack,
      }
    );
    return NextResponse.json(
      { message: "Error fetching course", error: error.message },
      { status: 500 }
    );
  }
}
