import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Define the User type
interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  // Add other user properties as needed
}

// This is a mock database - replace with your actual database
const users: User[] = [];

export async function GET() {
  try {
    // Await the cookies() promise
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key",
    ) as { userId: string };

    const user = users.find((u) => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Use a different variable name to avoid unused warning
    const { password: userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    // Use the error variable or remove it
    console.error("Auth check error:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
