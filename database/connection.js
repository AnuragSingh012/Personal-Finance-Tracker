import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect("mongodb://localhost:27017/finance-tracker", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected 🚀");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
