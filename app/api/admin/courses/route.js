import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../lib/jwt";
import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("GET /api/admin/courses: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      console.log(
        `GET /api/admin/courses: User role ${decoded.role} is not ADMIN`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const courses = await prisma.course.findMany({
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

    console.log(
      "GET /api/admin/courses: Successfully fetched courses",
      courses
    );
    return NextResponse.json(courses);
  } catch (error) {
    console.error("GET /api/admin/courses: Error fetching courses", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { message: "Failed to fetch courses", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("POST /api/admin/courses: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      console.log(
        `POST /api/admin/courses: User role ${decoded.role} is not ADMIN`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Debug environment variables
    console.log("POST /api/admin/courses: Cloudinary config", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    // Verify Cloudinary initialization
    if (!cloudinary || !cloudinary.uploader) {
      console.error(
        "POST /api/admin/courses: Cloudinary uploader is not initialized"
      );
      throw new Error("Cloudinary uploader is not initialized");
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const duration = parseInt(formData.get("duration")) || null;
    const level = formData.get("level") || null;
    const category = formData.get("category") || null;
    const file = formData.get("file");

    if (!title || !description) {
      console.log("POST /api/admin/courses: Missing required fields", {
        title,
        description,
      });
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "courses",
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "clinic",
              },
              (error, result) => {
                if (error) {
                  console.error(
                    "POST /api/admin/courses: Cloudinary upload error",
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
        imageUrl = result.secure_url;
        console.log("POST /api/admin/courses: Image uploaded to Cloudinary", {
          imageUrl,
        });
      } catch (uploadError) {
        console.error("POST /api/admin/courses: Cloudinary upload error", {
          message: uploadError.message,
          stack: uploadError.stack,
        });
        return NextResponse.json(
          {
            message: "Failed to upload image to Cloudinary",
            error: uploadError.message,
          },
          { status: 500 }
        );
      }
    }

    const data = {
      title,
      description,
      duration,
      level,
      category,
      imageUrl,
      userId: decoded.id,
    };

    const course = await prisma.course.create({ data });
    console.log("POST /api/admin/courses: Course created successfully", course);
    return NextResponse.json(course);
  } catch (error) {
    console.error("POST /api/admin/courses: Error creating course", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { message: "Failed to create course", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("DELETE /api/admin/courses: No token provided");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      console.log(
        `DELETE /api/admin/courses: User role ${decoded.role} is not ADMIN`
      );
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      console.log("DELETE /api/admin/courses: No course ID provided");
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });
    if (course?.imageUrl) {
      try {
        const publicId = `courses/${course.imageUrl.split("/").pop().split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
        console.log(
          `DELETE /api/admin/courses: Image deleted from Cloudinary for course ID ${id}`
        );
      } catch (deleteError) {
        console.error("DELETE /api/admin/courses: Cloudinary delete error", {
          message: deleteError.message,
          stack: deleteError.stack,
        });
      }
    }

    await prisma.course.delete({ where: { id: parseInt(id) } });
    console.log(
      `DELETE /api/admin/courses: Course with ID ${id} deleted successfully`
    );
    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/courses: Error deleting course", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { message: "Error deleting course", error: error.message },
      { status: 500 }
    );
  }
}
