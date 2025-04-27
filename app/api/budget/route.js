import { NextResponse } from "next/server";
import User from "@/database/user";

export async function PUT(req) {
  try {
    const { userId, month, category, amount } = await req.json();

    if (!userId || !month || !category || amount == null) {
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    let monthBudget = user.budget.find(b => b.month === month);

    if (!monthBudget) {
      user.budget.push({ month, categories: [{ name: category, amount }], totalAmount: amount });
    } else {
      let existingCategory = monthBudget.categories.find(c => c.name === category);

      if (existingCategory) {
        existingCategory.amount = amount;
      } else {
        monthBudget.categories.push({ name: category, amount });
      }

      monthBudget.totalAmount = monthBudget.categories.reduce((sum, cat) => sum + cat.amount, 0);
    }

    await user.save();

    return NextResponse.json({ message: "Budget updated successfully!", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
