import express, { Router, Request, Response } from 'express';
import Progress from '../models/Progress';
import User from '../models/User';

const router: Router = express.Router();

// GET all progress records
router.get('/', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.find().populate('userId', 'username email');
    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching progress records'
    });
  }
});

// GET progress records for specific user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .populate('userId', 'username email');

    if (!progress.length) {
      return res.status(404).json({
        success: false,
        error: 'No progress records found for this user'
      });
    }

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching user progress'
    });
  }
});

// GET single progress record by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findById(req.params.id).populate('userId', 'username email');

    if (!progress) {
      return res.status(404).json({
        success: false,
        error: 'Progress record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching progress record'
    });
  }
});

// CREATE new progress record
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, date, weight, bodyFat, chestMeasurement, waistMeasurement, armMeasurement, legMeasurement, notes } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'Please provide userId'
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

    const progress = new Progress({
      userId,
      date: date || new Date(),
      weight,
      bodyFat,
      chestMeasurement,
      waistMeasurement,
      armMeasurement,
      legMeasurement,
      notes
    });

    await progress.save();
    await progress.populate('userId', 'username email');

    res.status(201).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error creating progress record'
    });
  }
});

// UPDATE progress record
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { date, weight, bodyFat, chestMeasurement, waistMeasurement, armMeasurement, legMeasurement, notes } = req.body;

    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      {
        date,
        weight,
        bodyFat,
        chestMeasurement,
        waistMeasurement,
        armMeasurement,
        legMeasurement,
        notes
      },
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!progress) {
      return res.status(404).json({
        success: false,
        error: 'Progress record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error updating progress record'
    });
  }
});

// DELETE progress record
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        error: 'Progress record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Progress record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error deleting progress record'
    });
  }
});

export default router;
