import connectDB from "@/database/connection";
import User from "@/database/user";

export async function GET(req, { params }) {
  try {
    await connectDB();

    // Ensure params are awaited before using
    const { id } = await params;

    const user = await User.findById(id).populate("transactions");

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch user" }), { status: 500 });
  }
}
