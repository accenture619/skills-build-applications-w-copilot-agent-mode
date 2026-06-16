import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database';

/**
 * Seed the octofit_db database with test data
 * This script initializes the database with sample users and fitness data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    
    console.log('Seeding the octofit_db database with test data...');
    
    // Clear existing collections
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    
    console.log('Test data seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

// Run the seed script
seedDatabase();
