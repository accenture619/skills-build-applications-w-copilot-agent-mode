import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Successfully disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB:', error);
    process.exit(1);
  }
}