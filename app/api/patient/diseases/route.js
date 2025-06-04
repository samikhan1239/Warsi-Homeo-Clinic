import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { search } = Object.fromEntries(request.nextUrl.searchParams);
    const diseases = await prisma.disease.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : {},
    });
    return NextResponse.json(diseases);
  } catch (error) {
    console.error("Error fetching diseases:", error);
    return NextResponse.json(
      { message: "Error fetching diseases", error: error.message },
      { status: 500 }
    );
  }
}
