import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { maxAge: -1, path: "/" });
    console.log("POST /api/auth/logout: Successfully logged out");
    return response;
  } catch (error) {
    console.error("POST /api/auth/logout: Error logging out", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { message: "Error logging out", error: error.message },
      { status: 500 }
    );
  }
}
