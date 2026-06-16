import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  duration: number;
  calories?: number;
  exercises: IExercise[];
  notes?: string;
  intensity: 'low' | 'moderate' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide exercise name']
  },
  sets: {
    type: Number,
    required: true,
    min: 1
  },
  reps: {
    type: Number,
    required: true,
    min: 1
  },
  weight: {
    type: Number
  },
  duration: {
    type: Number
  }
});

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID']
    },
    date: {
      type: Date,
      required: [true, 'Please provide workout date'],
      default: new Date()
    },
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
      required: [true, 'Please provide workout type']
    },
    duration: {
      type: Number,
      required: [true, 'Please provide workout duration in minutes'],
      min: 1
    },
    calories: {
      type: Number,
      min: 0
    },
    exercises: {
      type: [exerciseSchema],
      default: []
    },
    notes: {
      type: String,
      maxlength: 500
    },
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: [true, 'Please provide intensity level']
    }
  },
  {
    timestamps: true
  }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
