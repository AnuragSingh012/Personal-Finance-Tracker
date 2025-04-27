// app/api/budget/route.js

import { NextResponse } from "next/server";
import User from "@/database/user"; // Ensure you're using the correct path for the User model

export async function POST(req) {
  try {
    const { userId, budgets } = await req.json();

    // Validate input
    if (!userId || !Array.isArray(budgets) || budgets.length === 0) {
      return NextResponse.json(
        { message: "Please provide valid user and budgets data." },
        { status: 400 }
      );
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // Update the user's budgets
    user.budget = budgets;

    // Save the updated user document
    await user.save();

    return NextResponse.json({ message: "Budgets updated successfully!", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
