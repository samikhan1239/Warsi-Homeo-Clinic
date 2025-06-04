import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("GET /api/admin/videos: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      console.log(
        `GET /api/admin/videos: User role ${decoded.role} is not ADMIN`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const videos = await prisma.video.findMany({
      include: {
        course: {
          select: { id: true, title: true },
        },
      },
    });

    console.log("GET /api/admin/videos: Successfully fetched videos", videos);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("GET /api/admin/videos: Error fetching videos", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { message: "Failed to fetch videos", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("POST /api/admin/videos: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      console.log(
        `POST /api/admin/videos: User role ${decoded.role} is not ADMIN`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const courseId = parseInt(formData.get("courseId")) || null;
    const lectureNumber = parseInt(formData.get("lectureNumber")) || null;
    const description = formData.get("description") || null;
    const duration = parseInt(formData.get("duration")) || null;
    const videoLink = formData.get("videoLink") || null;
    const isFree = formData.get("isFree") === "true";
    const file = formData.get("file");

    if (!title) {
      console.log("POST /api/admin/videos: Missing title");
      return NextResponse.json(
        { message: "Video title is required" },
        { status: 400 }
      );
    }
    if (!courseId) {
      console.log("POST /api/admin/videos: Missing courseId");
      return NextResponse.json(
        { message: "Course selection is required" },
        { status: 400 }
      );
    }
    if (!videoLink && !file) {
      console.log("POST /api/admin/videos: No video source provided");
      return NextResponse.json(
        { message: "Either a video link or file is required" },
        { status: 400 }
      );
    }

    let url = null;
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "video",
                folder: "videos",
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "clinic",
              },
              (error, result) => {
                if (error) {
                  console.error(
                    "POST /api/admin/videos: Cloudinary upload error",
                    {
                      message: error.message,
                      stack: error.stack,
                    }
                  );
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(buffer);
        });
        url = result.secure_url;
        console.log("POST /api/admin/videos: Video uploaded to Cloudinary", {
          url,
        });
      } catch (uploadError) {
        console.error("POST /api/admin/videos: Cloudinary upload error", {
          message: uploadError.message,
          stack: uploadError.stack,
        });
        return NextResponse.json(
          {
            message: "Failed to upload video to Cloudinary",
            error: uploadError.message,
          },
          { status: 500 }
        );
      }
    }

    const video = await prisma.video.create({
      data: {
        title,
        url, // Cloudinary URL or null
        courseId,
        lectureNumber,
        description,
        duration,
        videoLink, // External link or null
        isFree,
      },
      include: {
        course: {
          select: { id: true, title: true },
        },
      },
    });

    console.log("POST /api/admin/videos: Video created successfully", video);
    return NextResponse.json(video);
  } catch (error) {
    console.error("POST /api/admin/videos: Error creating video", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { message: "Failed to create video", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("DELETE /api/admin/videos: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      console.log(
        `DELETE /api/admin/videos: User role ${decoded.role} is not ADMIN`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id"));
    if (!id) {
      console.log("DELETE /api/admin/videos: No video ID provided");
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    const video = await prisma.video.findUnique({ where: { id } });
    if (video?.url) {
      try {
        const publicId = `videos/${video.url.split("/").pop().split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "video",
        });
        console.log(
          `DELETE /api/admin/videos: Video deleted from Cloudinary for video ID ${id}`
        );
      } catch (deleteError) {
        console.error("DELETE /api/admin/videos: Cloudinary delete error", {
          message: deleteError.message,
          stack: deleteError.stack,
        });
      }
    }

    await prisma.video.delete({ where: { id } });
    console.log(
      `DELETE /api/admin/videos: Video with ID ${id} deleted successfully`
    );
    return NextResponse.json({ message: "Video deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/videos: Error deleting video", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { message: "Failed to delete video", error: error.message },
      { status: 500 }
    );
  }
}
