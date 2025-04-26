import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  payee: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ["income", "expense"], required: true },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
