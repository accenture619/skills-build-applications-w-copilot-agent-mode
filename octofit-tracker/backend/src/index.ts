import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app: Express = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Welcome to OctoFit Tracker API', 
    version: '0.0.1',
    endpoints: {
      health: '/health'
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 OctoFit Tracker Backend running on http://localhost:${PORT}`);
});
