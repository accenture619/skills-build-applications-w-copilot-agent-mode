import express, { Router, Request, Response } from 'express';
import Workout from '../models/Workout';
import User from '../models/User';

const router: Router = express.Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId', 'username email');
    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching workouts'
    });
  }
});

// GET workouts for specific user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .populate('userId', 'username email');

    if (!workouts.length) {
      return res.status(404).json({
        success: false,
        error: 'No workouts found for this user'
      });
    }

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching user workouts'
    });
  }
});

// GET single workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId', 'username email');

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found'
      });
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching workout'
    });
  }
});

// CREATE new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, date, type, duration, calories, exercises, notes, intensity } = req.body;

    // Validation
    if (!userId || !type || !duration || !intensity) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: userId, type, duration, intensity'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const workout = new Workout({
      userId,
      date: date || new Date(),
      type,
      duration,
      calories,
      exercises: exercises || [],
      notes,
      intensity
    });

    await workout.save();
    await workout.populate('userId', 'username email');

    res.status(201).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error creating workout'
    });
  }
});

// UPDATE workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { date, type, duration, calories, exercises, notes, intensity } = req.body;

    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        date,
        type,
        duration,
        calories,
        exercises,
        notes,
        intensity
      },
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found'
      });
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error updating workout'
    });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        error: 'Workout not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error deleting workout'
    });
  }
});

export default router;
