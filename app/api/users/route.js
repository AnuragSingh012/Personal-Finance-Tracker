import connectDB from "@/database/connection"; // Database connection utility
import User from "@/database/user"; // User model

export async function POST(req) {
  try {
    await connectDB();

    const { name } = await req.json();

    if (!name) {
      return new Response(
        JSON.stringify({ message: "Name is required" }),
        { status: 400 }
      );
    }

    const newUser = new User({ name });

    await newUser.save();

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create user" }),
      { status: 500 }
    );
  }
}
