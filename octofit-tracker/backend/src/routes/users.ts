import express, { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';

const router: Router = express.Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching users'
    });
  }
});

// GET single user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching user'
    });
  }
});

// CREATE new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, age, weight, height, fitnessLevel } = req.body;

    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this email or username'
      });
    }

    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      age,
      weight,
      height,
      fitnessLevel
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error creating user'
    });
  }
});

// UPDATE user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, age, weight, height, fitnessLevel } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        firstName,
        lastName,
        age,
        weight,
        height,
        fitnessLevel
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error updating user'
    });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error deleting user'
    });
  }
});

export default router;
