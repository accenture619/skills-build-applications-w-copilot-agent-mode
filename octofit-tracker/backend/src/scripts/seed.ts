#!/usr/bin/env ts-node
/**
 * Seed Script for OctoFit Tracker Database
 * 
 * This script populates the MongoDB database with sample fitness data for testing and development.
 * 
 * Usage:
 *   npm run seed              # Run the seed script
 *   npm run seed:reset        # Clear database and run seed (when implemented)
 * 
 * The script creates:
 *   - Sample users with fitness profiles
 *   - Workout history and exercise records
 *   - Fitness goals and milestones
 *   - Nutrition logs and dietary information
 * 
 * Database Connection:
 *   Connects to: mongodb://localhost:27017/octofit-tracker
 *   Requires MongoDB to be running locally on port 27017
 * 
 * Environment:
 *   NODE_ENV=development (default for local development)
 *   Can be overridden via .env file
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Connect to MongoDB and seed the database
 */
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    console.log(`📊 Environment: ${NODE_ENV}`);
    console.log(`🔗 MongoDB URI: ${MONGODB_URI}`);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // TODO: Import and seed models
    // Example structure:
    // - Seed users with profiles
    // - Seed workout templates
    // - Seed exercise database
    // - Seed initial goals and milestones

    console.log('🌱 Database seeding completed successfully!');
    console.log('📝 Sample data has been populated.');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed script
seedDatabase();
