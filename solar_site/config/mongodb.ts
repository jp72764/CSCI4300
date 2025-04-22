import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectMongoDB() {
  if (connection.isConnected === 1) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectMongoDB;
