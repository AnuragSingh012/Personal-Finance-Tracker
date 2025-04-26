import connectDB from "@/database/connection";
import User from "@/database/user";
import Transaction from "@/database/transactions";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, category, amount, payee, type } = await req.json();

    if (!userId || !category || !amount || !payee || !type) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Create the new transaction
    const newTransaction = new Transaction({
      category,
      amount,
      payee,
      type,
    });

    await newTransaction.save();

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    user.transactions.push(newTransaction._id);

    let totalIncome = 0;
    let totalExpenses = 0;

    for (let transactionId of user.transactions) {
      const transaction = await Transaction.findById(transactionId);
      if (transaction) {
        if (transaction.type === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          totalExpenses += transaction.amount;
        }
      }
    }

    user.income = totalIncome;
    user.expenses = totalExpenses;

    await user.save();

    return new Response(
      JSON.stringify({
        message: "Transaction added successfully",
        transaction: newTransaction,
        user: {
          _id: user._id,
          name: user.name,
          income: user.income,
          expenses: user.expenses,
          transactions: user.transactions,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding transaction:", error);
    return new Response(
      JSON.stringify({ message: "Failed to add transaction" }),
      { status: 500 }
    );
  }
}
