import connectDB from "@/database/connection"; // Database connection utility
import User from "@/database/user"; // User model

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming request body
    const { name } = await req.json();

    // Check if the name is provided
    if (!name) {
      return new Response(
        JSON.stringify({ message: "Name is required" }),
        { status: 400 }
      );
    }

    // Create a new user in the database
    const newUser = new User({ name });

    // Save the user to the database
    await newUser.save();

    // Return a success response with the user data
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
