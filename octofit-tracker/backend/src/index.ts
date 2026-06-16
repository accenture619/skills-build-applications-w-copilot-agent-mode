import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/users';
import workoutRoutes from './routes/workouts';
import progressRoutes from './routes/progress';

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB().then((connected) => {
  if (!connected) {
    console.warn('⚠️  Continuing without database connection');
  }
});

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`📍 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to OctoFit Tracker API',
    version: '0.1.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      workouts: '/api/workouts',
      progress: '/api/progress',
      documentation: '/docs'
    }
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/progress', progressRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.path} not found`
  });
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 OctoFit Tracker Backend running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/docs`);
});
