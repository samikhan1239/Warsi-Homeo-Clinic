export const dynamic = "force-dynamic";

import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("GET /api/student/videos: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "STUDENT") {
      console.log(
        `GET /api/student/videos: User role ${decoded.role} is not STUDENT`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { courseId } = Object.fromEntries(request.nextUrl.searchParams);
    if (!courseId) {
      console.log("GET /api/student/videos: Missing courseId");
      return NextResponse.json(
        { message: "Missing courseId" },
        { status: 400 }
      );
    }

    const videos = await prisma.video.findMany({
      where: {
        courseId: parseInt(courseId),
        course: {
          students: {
            some: { id: decoded.id },
          },
        },
        OR: [
          { isFree: true },
          { course: { students: { some: { id: decoded.id } } } },
        ],
      },
      select: {
        id: true,
        title: true,
        url: true,
        videoLink: true,
        lectureNumber: true,
        description: true,
        duration: true,
        isFree: true,
      },
      orderBy: { lectureNumber: "asc" },
    });

    console.log(
      `GET /api/student/videos: Successfully fetched videos for courseId ${courseId}`,
      videos
    );
    return NextResponse.json(videos);
  } catch (error) {
    console.error("GET /api/student/videos: Error fetching videos", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Error fetching videos", error: error.message },
      { status: 500 }
    );
  }
}
