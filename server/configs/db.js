import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ProConnect",
      autoIndex: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected to:", conn.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
