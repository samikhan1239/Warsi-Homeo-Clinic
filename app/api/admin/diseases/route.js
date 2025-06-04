import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/jwt";
import cloudinary from "../../../../lib/cloudinary";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const diseases = await prisma.disease.findMany();
    return NextResponse.json(diseases);
  } catch (error) {
    console.error("Fetch diseases error:", error);
    return NextResponse.json(
      { message: "Failed to fetch diseases", error: error.message },
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
    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Debug environment variables
    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    // Verify Cloudinary initialization
    if (!cloudinary || !cloudinary.uploader) {
      throw new Error("Cloudinary uploader is not initialized");
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description") || null;
    const symptoms = formData.get("symptoms") || null;
    const remedies = formData.get("remedies") || null;
    const precautions = formData.get("precautions") || null;
    const file = formData.get("file");
    const videoLink = formData.get("videoLink") || null;

    if (!name) {
      return NextResponse.json(
        { message: "Disease name is required" },
        { status: 400 }
      );
    }

    let videoUrl = null;
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: "clinic",
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "clinic",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        });
        videoUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", {
          message: uploadError.message,
          stack: uploadError.stack,
        });
        return NextResponse.json(
          {
            message: "Failed to upload file to Cloudinary",
            error: uploadError.message,
          },
          { status: 500 }
        );
      }
    }

    const disease = await prisma.disease.create({
      data: {
        name,
        description,
        symptoms,
        remedies,
        precautions,
        videoUrl,
        videoLink,
      },
    });
    return NextResponse.json(disease);
  } catch (error) {
    console.error("Create disease error:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Failed to create disease", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = await verifyToken(token);
    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });

    const disease = await prisma.disease.findUnique({
      where: { id: parseInt(id) },
    });
    if (disease?.videoUrl) {
      try {
        const publicId = `clinic/${disease.videoUrl.split("/").pop().split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "video",
        });
      } catch (deleteError) {
        console.error("Cloudinary delete error:", deleteError);
      }
    }

    await prisma.disease.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Disease deleted" });
  } catch (error) {
    console.error("Delete disease error:", error);
    return NextResponse.json(
      { message: "Failed to delete disease", error: error.message },
      { status: 500 }
    );
  }
}
