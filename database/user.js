import mongoose from 'mongoose';
import Transaction from './transactions';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
