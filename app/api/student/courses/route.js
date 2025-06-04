import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("GET /api/student/courses: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "STUDENT") {
      console.log(
        `GET /api/student/courses: User role ${decoded.role} is not STUDENT`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { all } = Object.fromEntries(request.nextUrl.searchParams);
    let courses;

    if (all === "true") {
      // Fetch all courses, marking enrolled ones
      courses = await prisma.course.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          level: true,
          category: true,
          imageUrl: true,
          students: { where: { id: decoded.id }, select: { id: true } },
        },
      });
      // Add isEnrolled flag and remove students data
      courses = courses.map((course) => ({
        ...course,
        isEnrolled: course.students.length > 0,
        students: undefined,
      }));
    } else {
      // Fetch only enrolled courses
      courses = await prisma.course.findMany({
        where: {
          students: { some: { id: decoded.id } },
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
    }

    console.log(
      "GET /api/student/courses: Successfully fetched courses",
      courses
    );
    return NextResponse.json(courses);
  } catch (error) {
    console.error("GET /api/student/courses: Error fetching courses", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Error fetching courses", error: error.message },
      { status: 500 }
    );
  }
}
