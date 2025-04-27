import mongoose from 'mongoose';
import Transaction from './transactions';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
}, { _id: false });

const budgetSchema = new mongoose.Schema({
  month: { type: String, required: true },
  categories: [categorySchema],
  totalAmount: { type: Number, default: 0 },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  budget: [budgetSchema],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
