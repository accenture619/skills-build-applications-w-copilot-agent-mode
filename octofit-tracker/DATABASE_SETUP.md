# OctoFit Tracker - Database Setup & Population

## Overview

The OctoFit Tracker database is built on MongoDB with three main collections:
- **Users** - User profiles and fitness information
- **Workouts** - Workout sessions and exercise logs
- **Progress** - Body measurements and fitness progress tracking

## Database Models

### User Schema
```typescript
{
  username: string (unique, lowercase)
  email: string (unique, lowercase)
  password: string (hashed)
  firstName: string
  lastName: string
  age?: number
  weight?: number (lbs)
  height?: number (inches)
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced'
  createdAt: Date
  updatedAt: Date
}
```

### Workout Schema
```typescript
{
  userId: ObjectId (ref: User)
  date: Date
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other'
  duration: number (minutes)
  calories?: number
  exercises: [
    {
      name: string
      sets: number
      reps: number
      weight?: number (lbs)
      duration?: number (minutes)
    }
  ]
  notes?: string
  intensity: 'low' | 'moderate' | 'high'
  createdAt: Date
  updatedAt: Date
}
```

### Progress Schema
```typescript
{
  userId: ObjectId (ref: User)
  date: Date
  weight?: number (lbs)
  bodyFat?: number (%)
  chestMeasurement?: number (inches)
  waistMeasurement?: number (inches)
  armMeasurement?: number (inches)
  legMeasurement?: number (inches)
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

## Setup Instructions

### 1. Start MongoDB
```bash
# Using mongod (if installed locally)
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Install Backend Dependencies
```bash
cd octofit-tracker/backend
npm install
```

### 3. Seed the Database
```bash
npm run seed
```

This will:
- Create 3 sample users (john_fitness, sarah_runner, mike_beginner)
- Generate 6 workout records across the users
- Create 7 progress tracking entries
- Populate timestamps and relationships

### 4. Verify Data
Once seeded, you can verify the data:
```bash
# Start the server
npm run dev

# Test API endpoints in another terminal
curl http://localhost:8000/api/users
curl http://localhost:8000/api/workouts
curl http://localhost:8000/api/progress
```

## Sample Data Overview

### Users Created
1. **john_fitness** - Intermediate fitness level, strength training focus
2. **sarah_runner** - Advanced fitness level, cardio/running focus
3. **mike_beginner** - Beginner fitness level, starting journey

### Sample Workouts
- John: Strength training (60 min), Cardio (45 min)
- Sarah: Long run (50 min), Yoga (40 min)
- Mike: Beginner strength (45 min), Treadmill (30 min)

### Sample Progress Tracking
- 30-day progress records for each user
- Weight loss tracking
- Body measurements progress
- Fitness level improvements

## API Endpoints

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Workouts
- `GET /api/workouts` - List all workouts
- `GET /api/workouts/user/:userId` - Get user's workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Progress
- `GET /api/progress` - List all progress records
- `GET /api/progress/user/:userId` - Get user's progress
- `GET /api/progress/:id` - Get progress record by ID
- `POST /api/progress` - Create new progress record
- `PUT /api/progress/:id` - Update progress record
- `DELETE /api/progress/:id` - Delete progress record

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or Docker container
- Check connection string: `mongodb://localhost:27017/octofit-tracker`
- Verify port 27017 is not blocked

### Seed Script Issues
- Clear existing data: Delete database manually if needed
- Check TypeScript compilation: Ensure `tsx` is installed
- Review logs for detailed error messages

### API Not Responding
- Verify backend is running: `npm run dev`
- Check port 8000 availability
- Review console logs for connection errors

## Next Steps

- Implement user authentication (JWT)
- Add data validation and sanitization
- Create frontend integration
- Set up API documentation (Swagger/OpenAPI)
- Implement caching for performance
- Add data export features (CSV, PDF)
