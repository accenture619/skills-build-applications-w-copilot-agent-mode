import mongoose from 'mongoose';
import User from '../models/User';
import Workout from '../models/Workout';
import Progress from '../models/Progress';
import { connectDB, disconnectDB } from '../config/database';

// Sample Users Data
const sampleUsers = [
  {
    username: 'john_fitness',
    email: 'john@example.com',
    password: 'hashedPassword123',
    firstName: 'John',
    lastName: 'Smith',
    age: 28,
    weight: 180,
    height: 72,
    fitnessLevel: 'intermediate'
  },
  {
    username: 'sarah_runner',
    email: 'sarah@example.com',
    password: 'hashedPassword456',
    firstName: 'Sarah',
    lastName: 'Johnson',
    age: 25,
    weight: 140,
    height: 66,
    fitnessLevel: 'advanced'
  },
  {
    username: 'mike_beginner',
    email: 'mike@example.com',
    password: 'hashedPassword789',
    firstName: 'Mike',
    lastName: 'Davis',
    age: 35,
    weight: 220,
    height: 70,
    fitnessLevel: 'beginner'
  }
];

// Sample Workouts Data
const generateWorkouts = (userIds: string[]) => {
  const workouts = [];
  const today = new Date();

  // John's workouts
  workouts.push(
    {
      userId: userIds[0],
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      type: 'strength',
      duration: 60,
      calories: 400,
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 8, weight: 225 },
        { name: 'Squats', sets: 4, reps: 8, weight: 315 },
        { name: 'Deadlifts', sets: 3, reps: 5, weight: 405 }
      ],
      notes: 'Good upper body workout',
      intensity: 'high'
    },
    {
      userId: userIds[0],
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      type: 'cardio',
      duration: 45,
      calories: 350,
      exercises: [
        { name: 'Running', sets: 1, reps: 1, duration: 45 }
      ],
      notes: '5K run at steady pace',
      intensity: 'moderate'
    }
  );

  // Sarah's workouts
  workouts.push(
    {
      userId: userIds[1],
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      type: 'cardio',
      duration: 50,
      calories: 450,
      exercises: [
        { name: 'Running', sets: 1, reps: 1, duration: 50 }
      ],
      notes: '10K morning run',
      intensity: 'high'
    },
    {
      userId: userIds[1],
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      type: 'flexibility',
      duration: 40,
      calories: 100,
      exercises: [
        { name: 'Yoga', sets: 1, reps: 1, duration: 40 }
      ],
      notes: 'Relaxing yoga session',
      intensity: 'low'
    }
  );

  // Mike's workouts
  workouts.push(
    {
      userId: userIds[2],
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
      type: 'strength',
      duration: 45,
      calories: 300,
      exercises: [
        { name: 'Dumbbell Press', sets: 3, reps: 10, weight: 30 },
        { name: 'Leg Press', sets: 3, reps: 12, weight: 250 }
      ],
      notes: 'Beginner strength training',
      intensity: 'moderate'
    },
    {
      userId: userIds[2],
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      type: 'cardio',
      duration: 30,
      calories: 200,
      exercises: [
        { name: 'Treadmill', sets: 1, reps: 1, duration: 30 }
      ],
      notes: 'Walking on treadmill',
      intensity: 'low'
    }
  );

  return workouts;
};

// Sample Progress Data
const generateProgress = (userIds: string[]) => {
  const progress = [];
  const today = new Date();

  // John's progress
  progress.push(
    {
      userId: userIds[0],
      date: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      weight: 185,
      bodyFat: 18,
      chestMeasurement: 42,
      waistMeasurement: 34,
      armMeasurement: 16,
      legMeasurement: 25,
      notes: 'Starting measurements'
    },
    {
      userId: userIds[0],
      date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000),
      weight: 182,
      bodyFat: 17,
      chestMeasurement: 42.5,
      waistMeasurement: 33.5,
      armMeasurement: 16.2,
      legMeasurement: 25.2,
      notes: 'Mid-month progress check'
    },
    {
      userId: userIds[0],
      date: today,
      weight: 180,
      bodyFat: 16,
      chestMeasurement: 43,
      waistMeasurement: 33,
      armMeasurement: 16.5,
      legMeasurement: 25.5,
      notes: 'Good progress!'
    }
  );

  // Sarah's progress
  progress.push(
    {
      userId: userIds[1],
      date: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      weight: 142,
      bodyFat: 22,
      chestMeasurement: 36,
      waistMeasurement: 28,
      armMeasurement: 12,
      legMeasurement: 21,
      notes: 'Starting point'
    },
    {
      userId: userIds[1],
      date: today,
      weight: 140,
      bodyFat: 21,
      chestMeasurement: 36.2,
      waistMeasurement: 27.5,
      armMeasurement: 12.2,
      legMeasurement: 21.2,
      notes: 'Consistent improvement'
    }
  );

  // Mike's progress
  progress.push(
    {
      userId: userIds[2],
      date: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      weight: 225,
      bodyFat: 32,
      chestMeasurement: 44,
      waistMeasurement: 38,
      armMeasurement: 15,
      legMeasurement: 26,
      notes: 'Beginning fitness journey'
    },
    {
      userId: userIds[2],
      date: today,
      weight: 220,
      bodyFat: 31,
      chestMeasurement: 44,
      waistMeasurement: 37,
      armMeasurement: 15.2,
      legMeasurement: 26.2,
      notes: 'First month progress'
    }
  );

  return progress;
};

// Seed Database
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Progress.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(sampleUsers);
    const userIds = createdUsers.map(user => user._id.toString());
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create workouts
    console.log('💪 Creating workouts...');
    const workoutsData = generateWorkouts(userIds);
    await Workout.insertMany(workoutsData);
    console.log(`✅ Created ${workoutsData.length} workouts`);

    // Create progress records
    console.log('📈 Creating progress records...');
    const progressData = generateProgress(userIds);
    await Progress.insertMany(progressData);
    console.log(`✅ Created ${progressData.length} progress records`);

    console.log('\n✨ Database seeding completed successfully!\n');
    console.log('Sample Users:');
    console.log('  1. john_fitness (john@example.com)');
    console.log('  2. sarah_runner (sarah@example.com)');
    console.log('  3. mike_beginner (mike@example.com)');
    console.log('\nYou can now use the API to query this data.');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

// Run seed
seedDatabase();
