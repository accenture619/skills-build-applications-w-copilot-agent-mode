import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  weight?: number;
  bodyFat?: number;
  chestMeasurement?: number;
  waistMeasurement?: number;
  armMeasurement?: number;
  legMeasurement?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID']
    },
    date: {
      type: Date,
      required: [true, 'Please provide progress date'],
      default: new Date()
    },
    weight: {
      type: Number,
      min: 0
    },
    bodyFat: {
      type: Number,
      min: 0,
      max: 100
    },
    chestMeasurement: {
      type: Number,
      min: 0
    },
    waistMeasurement: {
      type: Number,
      min: 0
    },
    armMeasurement: {
      type: Number,
      min: 0
    },
    legMeasurement: {
      type: Number,
      min: 0
    },
    notes: {
      type: String,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

const Progress = mongoose.model<IProgress>('Progress', progressSchema);

export default Progress;
